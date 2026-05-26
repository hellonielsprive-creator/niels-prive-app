"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";
import { type User } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { updateBookingStatus as persistBookingStatus } from "@/lib/firestore/bookings";
import { fetchPartnerDashboardData } from "@/lib/dashboard/fetchDashboardData";
import { selectPartnerPmsBookings } from "@/lib/dashboard/selectors";
import {
  isSameBookings,
  isSamePartner,
  isSameRooms,
} from "@/lib/dashboard/stateEquality";

const LIVE_SYNC_INTERVAL_MS = 10000;

export type DashboardRecord = Record<string, unknown> & {
  id: string;
};

type RefreshOptions = {
  force?: boolean;
};

type DashboardDataContextValue = {
  partnerId: string | null;
  partnerData: Record<string, unknown> | null;
  rooms: DashboardRecord[];
  bookings: DashboardRecord[];
  hotelBookings: DashboardRecord[];
  isLoading: boolean;
  refreshDashboard: (
    options?: RefreshOptions
  ) => Promise<void>;
  syncAfterMutation: () => Promise<void>;
  updateBookingStatus: (
    id: string,
    status: string
  ) => Promise<void>;
  patchRooms: (
    updater: (
      rooms: DashboardRecord[]
    ) => DashboardRecord[]
  ) => void;
  patchBookings: (
    updater: (
      bookings: DashboardRecord[]
    ) => DashboardRecord[]
  ) => void;
  patchPartner: (
    partial: Record<string, unknown>
  ) => void;
};

type DashboardUIContextValue = {
  luxuryMode: boolean;
  setLuxuryMode: (value: boolean) => void;
  showStats: boolean;
  setShowStats: (value: boolean) => void;
  showPropertyOverview: boolean;
  setShowPropertyOverview: (value: boolean) => void;
};

const DashboardDataContext =
  createContext<DashboardDataContextValue | null>(
    null
  );

const DashboardUIContext =
  createContext<DashboardUIContextValue | null>(
    null
  );

export function useDashboardData() {
  const context = useContext(DashboardDataContext);

  if (!context) {
    throw new Error(
      "useDashboardData must be used within DashboardProvider"
    );
  }

  return context;
}

export function useDashboardUI() {
  const context = useContext(DashboardUIContext);

  if (!context) {
    throw new Error(
      "useDashboardUI must be used within DashboardProvider"
    );
  }

  return context;
}

export function useDashboard() {
  return {
    ...useDashboardData(),
    ...useDashboardUI(),
  };
}

export function useDashboardLiveSync(
  enabled: boolean
) {
  const { refreshDashboard } = useDashboardData();
  const refreshRef = useRef(refreshDashboard);

  refreshRef.current = refreshDashboard;

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      void refreshRef.current();
    }, LIVE_SYNC_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [enabled]);
}

export default function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const [partnerId, setPartnerId] =
    useState<string | null>(null);

  const [partnerData, setPartnerData] =
    useState<Record<string, unknown> | null>(
      null
    );

  const [rooms, setRooms] = useState<
    DashboardRecord[]
  >([]);

  const [bookings, setBookings] = useState<
    DashboardRecord[]
  >([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [luxuryMode, setLuxuryMode] =
    useState(false);

  const [showStats, setShowStats] =
    useState(true);

  const [
    showPropertyOverview,
    setShowPropertyOverview,
  ] = useState(true);

  const partnerIdRef = useRef<string | null>(null);
  const fetchInFlightRef = useRef(false);

  const hotelBookings = useMemo(
    () =>
      selectPartnerPmsBookings(
        bookings as Array<{
          bookingType?: string;
        }>
      ) as DashboardRecord[],
    [bookings]
  );

  useEffect(() => {
    const unsubscribe =
      auth.onAuthStateChanged((user: User | null) => {
        if (!user) {
          partnerIdRef.current = null;
          setPartnerId(null);
          setIsLoading(false);
          router.push("/signin");
          return;
        }

        partnerIdRef.current = user.uid;
        setPartnerId(user.uid);
      });

    return () => unsubscribe();
  }, [router]);

  const refreshDashboard = useCallback(
    async (options?: RefreshOptions) => {
      const uid = partnerIdRef.current;
      const force = options?.force ?? false;

      if (!uid || fetchInFlightRef.current) {
        return;
      }

      fetchInFlightRef.current = true;

      try {
        const {
          partner,
          rooms: nextRooms,
          bookings: nextBookings,
        } = await fetchPartnerDashboardData(uid);

        if (partner) {
          setPartnerData((current) =>
            !force &&
            isSamePartner(current, partner)
              ? current
              : partner
          );
        }

        setRooms((current) =>
          !force && isSameRooms(current, nextRooms)
            ? current
            : nextRooms
        );

        setBookings((current) =>
          !force &&
          isSameBookings(current, nextBookings)
            ? current
            : nextBookings
        );
      } catch (error) {
        console.log(error);
      } finally {
        fetchInFlightRef.current = false;
        setIsLoading(false);
      }
    },
    []
  );

  const syncAfterMutation = useCallback(
    () => refreshDashboard({ force: true }),
    [refreshDashboard]
  );

  useEffect(() => {
    if (!partnerId) return;

    setIsLoading(true);
    void refreshDashboard({ force: true });
  }, [partnerId, refreshDashboard]);

  const updateBookingStatus = useCallback(
    async (id: string, status: string) => {
      try {
        await persistBookingStatus(
          id,
          status,
          partnerIdRef.current
        );

        setBookings((current) =>
          current.map((booking) =>
            booking.id === id
              ? { ...booking, status }
              : booking
          )
        );
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const patchRooms = useCallback(
    (
      updater: (
        current: DashboardRecord[]
      ) => DashboardRecord[]
    ) => {
      setRooms((current) => updater(current));
    },
    []
  );

  const patchBookings = useCallback(
    (
      updater: (
        current: DashboardRecord[]
      ) => DashboardRecord[]
    ) => {
      setBookings((current) => updater(current));
    },
    []
  );

  const patchPartner = useCallback(
    (partial: Record<string, unknown>) => {
      setPartnerData((current) => {
        const uid = partnerIdRef.current;

        if (current) {
          return { ...current, ...partial };
        }

        if (!uid) {
          return current;
        }

        return {
          id: uid,
          ...partial,
        };
      });
    },
    []
  );

  const dataValue = useMemo(
    () => ({
      partnerId,
      partnerData,
      rooms,
      bookings,
      hotelBookings,
      isLoading,
      refreshDashboard,
      syncAfterMutation,
      updateBookingStatus,
      patchRooms,
      patchBookings,
      patchPartner,
    }),
    [
      partnerId,
      partnerData,
      rooms,
      bookings,
      hotelBookings,
      isLoading,
      refreshDashboard,
      syncAfterMutation,
      updateBookingStatus,
      patchRooms,
      patchBookings,
      patchPartner,
    ]
  );

  const uiValue = useMemo(
    () => ({
      luxuryMode,
      setLuxuryMode,
      showStats,
      setShowStats,
      showPropertyOverview,
      setShowPropertyOverview,
    }),
    [
      luxuryMode,
      showStats,
      showPropertyOverview,
    ]
  );

  return (
    <DashboardDataContext.Provider
      value={dataValue}
    >
      <DashboardUIContext.Provider
        value={uiValue}
      >
        {children}
      </DashboardUIContext.Provider>
    </DashboardDataContext.Provider>
  );
}

"use client";

import { useEffect, useState } from "react";

import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/app/components/dashboard/DashboardTopbar";
import DashboardStats from "@/app/components/dashboard/DashboardStats";
import UpcomingBookings from "@/app/components/dashboard/UpcomingBookings";
import DailyOperations from "@/app/components/dashboard/DailyOperations";
import PropertyOverview from "@/app/components/dashboard/PropertyOverview";
import PropertyToggle from "@/app/components/dashboard/PropertyToggle";
import ActivityFeed from "@/app/components/dashboard/ActivityFeed";

import { useRouter } from "next/navigation";

import { auth } from "../../firebase/config";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

export default function PartnerDashboardPage() {

  const router = useRouter();

  const [partnerData, setPartnerData] =
    useState<any>(null);

  const [rooms, setRooms] =
    useState<any[]>([]);

  const [bookings, setBookings] =
    useState<any[]>([]);

  const [showPropertyOverview,
    setShowPropertyOverview,
  ] = useState(true);

  const [showStats,
    setShowStats,
  ] = useState(true);

  const [luxuryMode,
    setLuxuryMode,
  ] = useState(false);

  const [lastUpdated,
    setLastUpdated,
  ] = useState("");

  useEffect(() => {

    const unsubscribe =
      auth.onAuthStateChanged(
        (user) => {

          if (!user) {

            router.push("/signin");

          }

        }
      );

    return () => unsubscribe();

  }, [router]);

  /* LIVE CLOCK */

  useEffect(() => {

    const updateClock = () => {

      const now =
        new Date();

      setLastUpdated(
        now.toLocaleTimeString()
      );

    };

    updateClock();

    const interval =
      setInterval(
        updateClock,
        1000
      );

    return () =>
      clearInterval(interval);

  }, []);

  /* LIVE PMS FETCH */

  useEffect(() => {

    const fetchDashboardData =
      async () => {

        try {

          /* PARTNER */

          const partnerSnapshot =
            await getDocs(
              collection(
                db,
                "partners"
              )
            );

          const partnerData =
            partnerSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          if (
            partnerData.length > 0
          ) {

            setPartnerData(
              partnerData[0]
            );

          }

          /* ROOMS */

          const roomsQuery = query(
            collection(db, "rooms"),
            where(
              "partnerId",
              "==",
              auth.currentUser?.uid
            )
          );

          const roomsSnapshot =
            await getDocs(
              roomsQuery
            );

          const roomData =
            roomsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setRooms(roomData);

          /* BOOKINGS */

          const bookingsQuery =
            query(
              collection(
                db,
                "bookings"
              ),
              where(
                "partnerId",
                "==",
                auth.currentUser
                  ?.uid
              )
            );

          const bookingsSnapshot =
            await getDocs(
              bookingsQuery
            );

          const bookingData =
            bookingsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setBookings(
            bookingData.filter(
              (booking: any) =>
                booking.bookingType ===
                "hotel"
            )
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchDashboardData();

    /* AUTO REFRESH */

    const interval =
      setInterval(
        fetchDashboardData,
        10000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const updateBookingStatus =
    async (
      id: string,
      status: string
    ) => {

      try {

        await updateDoc(
          doc(
            db,
            "bookings",
            id
          ),
          {
            status,
          }
        );

        setBookings(
          bookings.map(
            (booking) =>

              booking.id === id
                ? {
                    ...booking,
                    status,
                  }
                : booking

          )
        );

      } catch (error) {

        console.log(error);

      }

    };

  const today =
    new Date();

  const arrivalsToday =
    bookings.filter(
      (booking: any) => {

        if (!booking.checkIn)
          return false;

        const checkIn =
          new Date(
            booking.checkIn
          );

        return (
          checkIn.toDateString() ===
            today.toDateString() &&
          booking.status !==
            "cancelled"
        );

      }
    );

  const departuresToday =
    bookings.filter(
      (booking: any) => {

        if (!booking.CheckOut)
          return false;

        const checkOut =
          new Date(
            booking.CheckOut
          );

        return (
          checkOut.toDateString() ===
            today.toDateString() &&
          booking.status ===
            "checked-in"
        );

      }
    );

  const occupiedRooms =
    bookings.filter(
      (booking: any) => {

        if (
          !booking.checkIn ||
          !booking.CheckOut
        ) return false;

        const checkIn =
          new Date(
            booking.checkIn
          );

        const checkOut =
          new Date(
            booking.CheckOut
          );

        return (
          booking.status ===
            "checked-in" &&
          today >= checkIn &&
          today <= checkOut
        );

      }
    );

  const cleaningQueue =
    departuresToday.length;

  return (

    <main
      className={`min-h-screen flex overflow-hidden transition-all duration-300 ${
        luxuryMode
          ? "bg-[#f5f1eb] text-black"
          : "bg-[#050505] text-white"
      }`}
    >

      <DashboardSidebar />

      <section className="flex-1 overflow-y-auto">

        <DashboardTopbar
          showStats={showStats}
          setShowStats={setShowStats}
          luxuryMode={luxuryMode}
          setLuxuryMode={setLuxuryMode}
          partnerData={partnerData}
        />

        {/* LIVE PMS BAR */}

        <div
          className={`mx-10 mt-6 rounded-[28px] px-6 py-5 border flex flex-wrap items-center justify-between gap-4 ${
            luxuryMode
              ? "bg-white border-[#e8dfd3]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <div className="flex items-center gap-4">

            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

            <div>

              <p className="font-medium">

                Live PMS Sync Active

              </p>

              <p
                className={`text-sm ${
                  luxuryMode
                    ? "text-neutral-500"
                    : "text-white/45"
                }`}
              >

                Dashboard auto-refreshing every 10 seconds

              </p>

            </div>

          </div>

          <div
            className={`text-sm ${
              luxuryMode
                ? "text-neutral-500"
                : "text-white/45"
            }`}
          >

            Last Updated:
            {" "}
            {lastUpdated}

          </div>

        </div>

        <PropertyToggle
          showPropertyOverview={showPropertyOverview}
          setShowPropertyOverview={setShowPropertyOverview}
          luxuryMode={luxuryMode}
        />

        <div className="p-10 pt-6">

          <PropertyOverview
            partnerData={partnerData}
            luxuryMode={luxuryMode}
            showPropertyOverview={showPropertyOverview}
          />

          <DailyOperations
            arrivalsToday={arrivalsToday}
            departuresToday={departuresToday}
            occupiedRooms={occupiedRooms}
            cleaningQueue={cleaningQueue}
            luxuryMode={luxuryMode}
          />

          {/* STATS */}

          {

            showStats && (

              <DashboardStats
                rooms={rooms}
                bookings={bookings}
                luxuryMode={luxuryMode}
              />

            )

          }

          {/* BOOKINGS */}

          <ActivityFeed
            bookings={bookings}
            luxuryMode={luxuryMode}
          />

          <UpcomingBookings
            bookings={bookings}
            updateBookingStatus={updateBookingStatus}
          />

        </div>

      </section>

    </main>

  );

}
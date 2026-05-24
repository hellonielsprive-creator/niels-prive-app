"use client";

import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import {
  useDashboardData,
  useDashboardLiveSync,
} from "@/app/components/dashboard/DashboardProvider";

function isOverviewRoute(pathname: string) {
  return (
    pathname === "/partner/dashboard" ||
    pathname === "/partner/dashboard/"
  );
}

export default function DashboardSyncController() {
  const pathname = usePathname();
  const { partnerId, refreshDashboard } =
    useDashboardData();

  const refreshRef = useRef(refreshDashboard);
  refreshRef.current = refreshDashboard;

  useDashboardLiveSync(
    isOverviewRoute(pathname)
  );

  const isFirstPathRef = useRef(true);

  useEffect(() => {
    if (!partnerId) return;

    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return;
    }

    void refreshRef.current();
  }, [pathname, partnerId]);

  useEffect(() => {
    if (!partnerId) return;

    const handleVisibilityChange = () => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        void refreshRef.current();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
  }, [partnerId]);

  return null;
}

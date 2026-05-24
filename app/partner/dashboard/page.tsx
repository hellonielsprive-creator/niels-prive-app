"use client";

import { useMemo } from "react";

import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/app/components/dashboard/DashboardTopbar";
import DashboardStats from "@/app/components/dashboard/DashboardStats";
import UpcomingBookings from "@/app/components/dashboard/UpcomingBookings";
import DailyOperations from "@/app/components/dashboard/DailyOperations";
import PropertyOverview from "@/app/components/dashboard/PropertyOverview";
import PropertyToggle from "@/app/components/dashboard/PropertyToggle";
import ActivityFeed from "@/app/components/dashboard/ActivityFeed";
import LivePmsBar from "@/app/components/dashboard/LivePmsBar";

import {
  useDashboardData,
  useDashboardUI,
} from "@/app/components/dashboard/DashboardProvider";
import {
  getArrivalsToday,
  getCleaningQueueCount,
  getDeparturesToday,
  getOccupiedRooms,
} from "@/lib/dashboard/dailyOperations";

function DashboardOverviewContent() {
  const {
    partnerData,
    rooms,
    hotelBookings,
    updateBookingStatus,
  } = useDashboardData();

  const {
    luxuryMode,
    setLuxuryMode,
    showStats,
    setShowStats,
    showPropertyOverview,
    setShowPropertyOverview,
  } = useDashboardUI();

  const today = useMemo(
    () => new Date(),
    [hotelBookings]
  );

  const arrivalsToday = useMemo(
    () =>
      getArrivalsToday(
        hotelBookings as Array<{
          checkIn?: string;
          status?: string;
        }>,
        today
      ),
    [hotelBookings, today]
  );

  const departuresToday = useMemo(
    () =>
      getDeparturesToday(
        hotelBookings as Array<{
          checkOut?: string;
          status?: string;
        }>,
        today
      ),
    [hotelBookings, today]
  );

  const occupiedRooms = useMemo(
    () =>
      getOccupiedRooms(
        hotelBookings as Array<{
          checkIn?: string;
          checkOut?: string;
          status?: string;
        }>,
        today
      ),
    [hotelBookings, today]
  );

  const cleaningQueue = useMemo(
    () => getCleaningQueueCount(departuresToday),
    [departuresToday]
  );

  return (
    <>
      <DashboardTopbar
        showStats={showStats}
        setShowStats={setShowStats}
        luxuryMode={luxuryMode}
        setLuxuryMode={setLuxuryMode}
        partnerData={partnerData}
      />

      <LivePmsBar luxuryMode={luxuryMode} />

      <PropertyToggle
        showPropertyOverview={showPropertyOverview}
        setShowPropertyOverview={
          setShowPropertyOverview
        }
        luxuryMode={luxuryMode}
      />

      <div className="p-10 pt-6">
        <PropertyOverview
          partnerData={partnerData}
          luxuryMode={luxuryMode}
          showPropertyOverview={
            showPropertyOverview
          }
        />

        <DailyOperations
          arrivalsToday={arrivalsToday}
          departuresToday={departuresToday}
          occupiedRooms={occupiedRooms}
          cleaningQueue={cleaningQueue}
          luxuryMode={luxuryMode}
        />

        {showStats && (
          <DashboardStats
            rooms={rooms}
            bookings={hotelBookings}
            luxuryMode={luxuryMode}
          />
        )}

        <ActivityFeed
          bookings={hotelBookings}
          luxuryMode={luxuryMode}
        />

        <UpcomingBookings
          bookings={hotelBookings}
          updateBookingStatus={updateBookingStatus}
        />
      </div>
    </>
  );
}

function DashboardOverviewShell() {
  const { luxuryMode } = useDashboardUI();

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
        <DashboardOverviewContent />
      </section>
    </main>
  );
}

export default function PartnerDashboardPage() {
  return <DashboardOverviewShell />;
}

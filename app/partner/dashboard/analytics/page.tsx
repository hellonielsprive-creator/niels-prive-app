"use client";

import { useRouter } from "next/navigation";

import { useDashboardData } from "@/app/components/dashboard/DashboardProvider";
import { useDashboardRoomBookings } from "@/lib/dashboard/useDashboardRoomBookings";

import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsLoadingState from "./AnalyticsLoadingState";
import AnalyticsRevenueChart from "./AnalyticsRevenueChart";
import AnalyticsStatsGrid from "./AnalyticsStatsGrid";
import AnalyticsStatusCards from "./AnalyticsStatusCards";
import RecentBookingActivity from "./RecentBookingActivity";
import { useAnalyticsMetrics } from "./useAnalyticsMetrics";

type AnalyticsRoom = Record<string, unknown>;

type AnalyticsBooking = {
  id?: string;
  status?: string;
  hotelName?: string;
  roomName?: string;
  guests?: string | number;
  totalPrice?: string | number;
  total?: string | number;
  checkIn?: string;
};

export default function AnalyticsPage() {
  const router = useRouter();
  const { isLoading } = useDashboardData();
  const { rooms, bookings } = useDashboardRoomBookings() as {
    rooms: AnalyticsRoom[];
    bookings: AnalyticsBooking[];
  };

  const metrics = useAnalyticsMetrics(rooms, bookings);

  if (isLoading) {
    return <AnalyticsLoadingState />;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.12),transparent_50%)] pointer-events-none" />
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-10">
        <AnalyticsHeader router={router} />
        <AnalyticsStatsGrid
          totalRevenue={metrics.totalRevenue}
          totalBookings={metrics.totalBookings}
          activeRooms={metrics.activeRooms}
          occupancyRate={metrics.occupancyRate}
        />
        <AnalyticsStatusCards
          confirmedBookings={metrics.confirmedBookings}
          pendingBookings={metrics.pendingBookings}
          cancelledBookings={metrics.cancelledBookings}
        />
        <AnalyticsRevenueChart revenueData={metrics.revenueData} />
        <RecentBookingActivity bookings={bookings} />
      </section>
    </main>
  );
}

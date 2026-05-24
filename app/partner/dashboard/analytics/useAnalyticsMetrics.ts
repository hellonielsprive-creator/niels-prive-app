import { useMemo } from "react";

const EMPTY_REVENUE_DATA = [
  { month: "Jan", revenue: 0 },
  { month: "Feb", revenue: 0 },
  { month: "Mar", revenue: 0 },
  { month: "Apr", revenue: 0 },
  { month: "May", revenue: 0 },
  { month: "Jun", revenue: 0 },
];

type AnalyticsBooking = {
  totalPrice?: unknown;
  total?: unknown;
  status?: string;
};

export function useAnalyticsMetrics(
  rooms: unknown[],
  bookings: AnalyticsBooking[]
) {
  return useMemo(() => {
    const totalRevenue = bookings.reduce(
      (acc, booking) =>
        acc + Number(booking.totalPrice || booking.total || 0),
      0
    );

    const totalBookings = bookings.length;
    const activeRooms = rooms.length;
    const confirmedBookings = bookings.filter(
      (booking) => booking.status === "confirmed"
    ).length;
    const pendingBookings = bookings.filter(
      (booking) => booking.status === "payment_pending"
    ).length;
    const cancelledBookings = bookings.filter(
      (booking) => booking.status === "cancelled"
    ).length;
    const occupancyRate =
      activeRooms > 0
        ? Math.min(
            100,
            Math.round((confirmedBookings / activeRooms) * 100)
          )
        : 0;

    const revenueData = EMPTY_REVENUE_DATA.map((item) => ({ ...item }));

    bookings.forEach((booking) => {
      const revenue = Number(booking.totalPrice || booking.total || 0);
      revenueData[5].revenue += revenue;
    });

    return {
      totalRevenue,
      totalBookings,
      activeRooms,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      occupancyRate,
      revenueData,
    };
  }, [rooms, bookings]);
}

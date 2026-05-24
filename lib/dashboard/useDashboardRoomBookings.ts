import { useMemo } from "react";

import { useDashboardData } from "@/app/components/dashboard/DashboardProvider";
import { selectRoomScopedBookings } from "@/lib/dashboard/selectors";

export function useDashboardRoomBookings() {
  const { rooms, bookings } = useDashboardData();

  const roomBookings = useMemo(
    () =>
      selectRoomScopedBookings(
        rooms as Array<{ roomName?: string }>,
        bookings as Array<{ roomName?: string }>
      ),
    [rooms, bookings]
  );

  return {
    rooms,
    bookings: roomBookings,
  };
}

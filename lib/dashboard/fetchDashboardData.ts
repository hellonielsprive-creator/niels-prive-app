import { auth } from "@/app/firebase/config";
import { getBookingsByPartnerId } from "@/lib/firestore/bookings";
import { getPartnerByUserId } from "@/lib/firestore/partners";
import { getRoomsByPartnerId } from "@/lib/firestore/rooms";

import { filterActiveRooms } from "./selectors";

export async function fetchPartnerDashboardData(
  partnerId: string
) {
  const [partner, rooms, bookings] = await Promise.all([
    getPartnerByUserId(
      partnerId,
      auth.currentUser?.email ?? null
    ),
    getRoomsByPartnerId(partnerId),
    getBookingsByPartnerId(partnerId),
  ]);

  return {
    partner,
    rooms: filterActiveRooms(rooms),
    bookings,
  };
}

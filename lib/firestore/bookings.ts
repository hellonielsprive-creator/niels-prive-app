import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import {
  buildBookingRecord,
  sortBookingsByCreatedAt,
  type BookingWriteInput,
} from "@/lib/bookings/schema";

import { mapQueryDocs } from "./mappers";

export async function getBookingsByPartnerId(
  partnerId: string
) {
  const bookingsQuery = query(
    collection(db, "bookings"),
    where("partnerId", "==", partnerId)
  );

  const bookingsSnapshot = await getDocs(bookingsQuery);

  return mapQueryDocs(bookingsSnapshot);
}

export async function getPartnerReservations(
  partnerId: string,
  limit = 20
) {
  const bookings =
    await getBookingsByPartnerId(partnerId);

  return sortBookingsByCreatedAt(bookings).slice(
    0,
    limit
  );
}

export async function createBooking(
  input: BookingWriteInput
) {
  const payload = buildBookingRecord(input);
  const docRef = await addDoc(
    collection(db, "bookings"),
    payload
  );

  return docRef.id;
}

export async function updateBookingStatus(
  id: string,
  status: string,
  partnerId?: string | null
) {
  if (partnerId) {
    const bookingSnapshot = await getDoc(
      doc(db, "bookings", id)
    );

    if (!bookingSnapshot.exists()) {
      throw new Error("Booking not found");
    }

    if (bookingSnapshot.data().partnerId !== partnerId) {
      throw new Error("Booking does not belong to this partner");
    }
  }

  await updateDoc(doc(db, "bookings", id), {
    status,
  });
}

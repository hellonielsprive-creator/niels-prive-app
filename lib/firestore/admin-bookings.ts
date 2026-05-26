import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function updateBookingStatus(bookingId: string, status: string) {
  await updateDoc(doc(db, "bookings", bookingId), {
    status,
    updatedAt: new Date().toISOString(),
  });
}

export async function archiveBooking(bookingId: string) {
  await updateDoc(doc(db, "bookings", bookingId), {
    archived: true,
    updatedAt: new Date().toISOString(),
  });
}

export async function restoreBooking(bookingId: string) {
  await updateDoc(doc(db, "bookings", bookingId), {
    archived: false,
    updatedAt: new Date().toISOString(),
  });
}

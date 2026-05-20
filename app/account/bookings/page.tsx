"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  orderBy,
  query,
    where,
} from "firebase/firestore";

import { auth, db } from "@/app/firebase/config";

export default function BookingHistoryPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

    const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {

  router.push("/signin");

  return;
}

    const fetchBookings = async () => {

      const q = query(
  collection(db, "bookings"),
  where(
    "userId",
    "==",
    auth.currentUser?.uid
  ),
  orderBy("createdAt", "desc")
);

      const querySnapshot =
        await getDocs(q);

      const bookingData =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setBookings(bookingData);

    };

    fetchBookings();

  }, []);

  return (

    <main className="min-h-screen bg-[#f3efe8] px-6 md:px-16 py-20 text-[#111111]">

      {/* HEADER */}
      <section className="mb-14">

        <p className="uppercase tracking-[0.35em] text-xs text-neutral-500 mb-5">
          Niels Privé Account
        </p>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-none mb-6">
          Booking History
        </h1>

        <p className="text-neutral-600 text-lg max-w-2xl">
          Your recent premium journeys and luxury travel reservations.
        </p>

      </section>

      {/* BOOKINGS */}
      <div className="space-y-6">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="rounded-[32px] bg-white border border-black/5 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.05)]"
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <p className="uppercase tracking-[0.3em] text-xs text-neutral-400 mb-3">
                  {booking.airline}
                </p>

                <h2 className="text-3xl font-semibold tracking-tight mb-3">
                  {booking.from} → {booking.to}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm text-neutral-600">

                  <p>
                    Cabin: {booking.cabin}
                  </p>

                  <p>
                    Travelers: {booking.travelers}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="text-4xl font-semibold mb-2">
                  ${booking.price}
                </p>

                <p className="text-sm text-neutral-500">
                  Confirmed Journey
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}
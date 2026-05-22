"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

export default function ReservationsPage() {
  const router = useRouter();

  const [bookings, setBookings] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(db, "bookings")
          );

        const bookingsData =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setBookings(bookingsData);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchBookings();

  }, []);

  if (loading) {

    return (

      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">

        Loading Reservations...

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050505] text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <p className="tracking-[0.3em] text-[#d4a574] text-sm mb-3">

            NIELS PRIVÉ

          </p>
          <button
  onClick={() =>
    router.push("/partner/dashboard")
  }
  className="mb-6 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
>

  ← Back To Dashboard

</button>

          <h1 className="text-5xl font-semibold">

            Reservations

          </h1>

          <p className="text-white/45 mt-4">

            Live guest reservations and booking activity.

          </p>

        </div>

        {/* BOOKINGS */}

        <div className="grid md:grid-cols-2 gap-6">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="bg-white/[0.03] border border-white/10 rounded-[28px] p-7"
            >

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-white/40 text-sm mb-2">
                    Hotel
                  </p>

                  <h2 className="text-2xl font-semibold">
                    {booking.hotelName}
                  </h2>

                </div>

                <div className="bg-[#d4a574]/20 text-[#d4a574] px-4 py-2 rounded-full text-sm">

                  {booking.bookingType}

                </div>

              </div>

              <div className="space-y-4">

                <div>

                  <p className="text-white/40 text-sm">
                    Room
                  </p>

                  <p className="text-lg">
                    {booking.roomName}
                  </p>

                </div>

                <div>

                  <p className="text-white/40 text-sm">
                    Guest Name
                  </p>

                  <p className="text-lg">
                    {booking.fullName || "Guest"}
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <p className="text-white/40 text-sm">
                      Check In
                    </p>

                    <p>
                      {booking.checkIn}
                    </p>

                  </div>

                  <div>

                    <p className="text-white/40 text-sm">
                      Check Out
                    </p>

                    <p>
                      {booking.checkOut}
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <p className="text-white/40 text-sm">
                      Guests
                    </p>

                    <p>
                      {booking.guests}
                    </p>

                  </div>

                  <div>

                    <p className="text-white/40 text-sm">
                      Total
                    </p>

                    <p>
                      ₹{booking.totalPrice || booking.total}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );

}
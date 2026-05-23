"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
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

        const sortedBookings =
          bookingsData
            .sort(
              (a: any, b: any) =>

                (
                  b.createdAt?.seconds || 0
                ) -
                (
                  a.createdAt?.seconds || 0
                )

            )
            .slice(0, 20);

        setBookings(
          sortedBookings
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchBookings();

  }, []);

  const updateBookingStatus =
    async (
      id: string,
      status: string
    ) => {

      try {

        await updateDoc(
          doc(db, "bookings", id),
          {
            status,
          }
        );

        setBookings((prevBookings) =>

          prevBookings.map((booking) =>

            booking.id === id
              ? {
                  ...booking,
                  status,
                }
              : booking

          )

        );

      } catch (error) {

        console.log(error);

      }

    };

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
              router.push(
                "/partner/dashboard"
              )
            }
            className="mb-6 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
          >

            ← Back To Dashboard

          </button>

          <h1 className="text-5xl font-semibold">

            Reservations

          </h1>

          <p className="text-white/45 mt-4">

            Live guest reservations,
            operational activity,
            and hospitality workflow management.

          </p>

        </div>

        {/* BOOKINGS */}

        <div className="grid md:grid-cols-2 gap-6">

          {bookings
            .filter(
              (booking) =>
                booking.status !==
                "cancelled"
            )
            .map((booking) => (

              <div
                key={booking.id}
                className="bg-white/[0.03] border border-white/10 rounded-[32px] p-7 hover:border-[#d4a574]/30 transition-all duration-300"
              >

                {/* TOP */}

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className="text-white/40 text-sm mb-2">

                      Hotel

                    </p>

                    <h2 className="text-2xl font-semibold">

                      {booking.hotelName}

                    </h2>

                  </div>

                  <div
                    className={`px-4 py-2 rounded-full text-sm capitalize ${
                      booking.status ===
                      "confirmed"
                        ? "bg-green-900/40 text-green-300"
                        : booking.status ===
                          "hold"
                        ? "bg-yellow-900/40 text-yellow-300"
                        : booking.status ===
                          "checked-in"
                        ? "bg-blue-900/40 text-blue-300"
                        : booking.status ===
                          "checked-out"
                        ? "bg-purple-900/40 text-purple-300"
                        : booking.status ===
                          "cleaning"
                        ? "bg-orange-900/40 text-orange-300"
                        : "bg-[#d4a574]/20 text-[#d4a574]"
                    }`}
                  >

                    {
                      booking.status ||
                      "pending"
                    }

                  </div>

                </div>

                {/* DETAILS */}

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

                      {
                        booking.fullName ||
                        "Guest"
                      }

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

                        {
                          booking.checkOut
                        }

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

                        ₹
                        {
                          booking.totalPrice ||
                          booking.total
                        }

                      </p>

                    </div>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="grid grid-cols-2 gap-3 mt-8">

                  {booking.status !==
                    "confirmed" &&

                    booking.status !==
                      "checked-in" && (

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "confirmed"
                        )
                      }
                      className="bg-green-700 hover:bg-green-600 transition-all text-white py-4 rounded-2xl font-medium"
                    >

                      Confirm

                    </button>

                  )}

                  {booking.status !==
                    "hold" &&

                    booking.status !==
                      "checked-in" && (

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "hold"
                        )
                      }
                      className="bg-yellow-700 hover:bg-yellow-600 transition-all text-white py-4 rounded-2xl font-medium"
                    >

                      Hold

                    </button>

                  )}

                  {booking.status ===
                    "confirmed" && (

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "checked-in"
                        )
                      }
                      className="bg-blue-700 hover:bg-blue-600 transition-all text-white py-4 rounded-2xl font-medium"
                    >

                      Check-In

                    </button>

                  )}

                  {booking.status ===
                    "checked-in" && (

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "checked-out"
                        )
                      }
                      className="bg-purple-700 hover:bg-purple-600 transition-all text-white py-4 rounded-2xl font-medium"
                    >

                      Check-Out

                    </button>

                  )}

                  {booking.status ===
                    "checked-out" && (

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "cleaning"
                        )
                      }
                      className="bg-orange-700 hover:bg-orange-600 transition-all text-white py-4 rounded-2xl font-medium"
                    >

                      Move To Cleaning

                    </button>

                  )}

                  {booking.status ===
                    "cleaning" && (

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "completed"
                        )
                      }
                      className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black py-4 rounded-2xl font-medium"
                    >

                      Mark Available

                    </button>

                  )}

                  {booking.status !==
                    "cancelled" && (

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "cancelled"
                        )
                      }
                      className="bg-red-800 hover:bg-red-700 transition-all text-white py-4 rounded-2xl font-medium"
                    >

                      Cancel

                    </button>

                  )}

                </div>

              </div>

            ))}

        </div>

      </div>

    </main>

  );

}
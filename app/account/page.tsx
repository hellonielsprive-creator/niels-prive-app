"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Moon,
  Sun,
} from "lucide-react";

import {
  auth,
  db,
} from "../firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function AccountPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

  const [darkMode, setDarkMode] =
    useState(true);

  const upcomingBookings =
    bookings.filter(
      (booking: any) =>
        new Date(booking.checkOut) >= new Date()
    );

  const pastBookings =
    bookings.filter(
      (booking: any) =>
        new Date(booking.checkOut) < new Date()
    );

  useEffect(() => {

    const fetchBookings = async () => {

      if (!auth.currentUser?.email) return;

      const snapshot =
        await getDocs(
          collection(db, "bookings")
        );

      const filtered =
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (booking: any) =>
              booking.guestEmail?.toLowerCase() ===
              auth.currentUser?.email?.toLowerCase()
          );

      setBookings(filtered);

    };

    fetchBookings();

  }, []);

  return (

    <main
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-[#0a0a0b] text-white"
          : "bg-[#f5f1ea] text-[#1a1a1a]"
      }`}
    >

      {/* HERO */}

      <section
        className={`border-b ${
          darkMode
            ? "border-white/10"
            : "border-black/10"
        }`}
      >

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">

          <div className="flex items-center justify-between mb-10">

            <div>

              <p className="text-sm tracking-[0.3em] uppercase text-[#c6a77b] mb-4">
                Niels Privé Account
              </p>

            </div>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                darkMode
                  ? "border-white/10 bg-white/5 hover:bg-white/10"
                  : "border-black/10 bg-black/5 hover:bg-black/10"
              }`}
            >
              {
                darkMode
                  ? <Sun size={20} />
                  : <Moon size={20} />
              }
            </button>

          </div>

          <h1 className="text-5xl md:text-7xl font-light leading-tight max-w-4xl">
            Your journeys,
            reservations &
            luxury stays.
          </h1>

          <p
            className={`text-lg mt-8 max-w-xl leading-relaxed ${
              darkMode
                ? "text-white/50"
                : "text-black/50"
            }`}
          >
            Manage your upcoming reservations,
            revisit previous escapes and access
            your premium travel experience.
          </p>

        </div>

      </section>

      {/* BOOKINGS */}

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">

        {
          bookings.length === 0 ? (

            <div
              className={`rounded-[36px] p-12 border transition-all duration-500 ${
                darkMode
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white/70 border-black/10"
              }`}
            >

              <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-6">
                No Reservations
              </p>

              <h2 className="text-4xl font-light mb-4 leading-tight max-w-2xl">
                Your account is waiting
                for its first escape.
              </h2>

              <p
                className={`max-w-lg leading-relaxed ${
                  darkMode
                    ? "text-white/50"
                    : "text-black/50"
                }`}
              >
                Once you reserve a stay,
                your luxury travel history
                and upcoming experiences
                will appear here.
              </p>

            </div>

          ) : (

            <div>

              {/* UPCOMING */}

              <div className="mb-14">

                <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-4">
                  Upcoming Escapes
                </p>

                <h2 className="text-4xl font-light">
                  Your upcoming stays
                </h2>

              </div>

              <div className="space-y-10">

                {
                  upcomingBookings.map((booking) => (

                    <div
                      key={booking.id}
                      className={`rounded-[36px] overflow-hidden border backdrop-blur-xl transition-all duration-500 ${
                        darkMode
                          ? "bg-white/[0.03] border-white/10"
                          : "bg-white/70 border-black/10"
                      }`}
                    >

                      {/* TOP */}

                      <div
                        className={`p-8 md:p-12 border-b ${
                          darkMode
                            ? "border-white/10"
                            : "border-black/10"
                        }`}
                      >

                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

                          <div>

                            <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-5">
                              Reservation
                            </p>

                            <h2 className="text-3xl md:text-5xl font-light leading-tight">
                              {booking.hotelName}
                            </h2>

                            <p
                              className={`text-lg mt-4 ${
                                darkMode
                                  ? "text-white/50"
                                  : "text-black/50"
                              }`}
                            >
                              {booking.roomName}
                            </p>

                          </div>

                          <div className="md:text-right">

                            <div
                              className={`
                                inline-flex px-4 py-2 rounded-full text-sm capitalize border
                                ${
                                  booking.status === "confirmed"
                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                    : booking.status === "cancelled"
                                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                                    : "bg-[#c6a77b]/10 text-[#c6a77b] border-[#c6a77b]/20"
                                }
                              `}
                            >
                              {booking.status}
                            </div>

                            <p className="text-4xl font-light mt-6">
                              ₹{booking.totalPrice}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* DETAILS */}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 p-8 md:p-12">

                        <div>

                          <p
                            className={`text-sm uppercase tracking-[0.15em] mb-3 ${
                              darkMode
                                ? "text-white/40"
                                : "text-black/40"
                            }`}
                          >
                            Check In
                          </p>

                          <p className="text-lg">
                            {booking.checkIn}
                          </p>

                        </div>

                        <div>

                          <p
                            className={`text-sm uppercase tracking-[0.15em] mb-3 ${
                              darkMode
                                ? "text-white/40"
                                : "text-black/40"
                            }`}
                          >
                            Check Out
                          </p>

                          <p className="text-lg">
                            {booking.checkOut}
                          </p>

                        </div>

                        <div>

                          <p
                            className={`text-sm uppercase tracking-[0.15em] mb-3 ${
                              darkMode
                                ? "text-white/40"
                                : "text-black/40"
                            }`}
                          >
                            Guests
                          </p>

                          <p className="text-lg">
                            {booking.guests}
                          </p>

                        </div>

                        <div>

                          <p
                            className={`text-sm uppercase tracking-[0.15em] mb-3 ${
                              darkMode
                                ? "text-white/40"
                                : "text-black/40"
                            }`}
                          >
                            Reserved By
                          </p>

                          <p className="text-lg">
                            {booking.guestName}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))
                }

              </div>

              {/* PAST BOOKINGS */}

              {
                pastBookings.length > 0 && (

                  <div className="mt-28">

                    <div className="mb-14">

                      <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-4">
                        Previous Journeys
                      </p>

                      <h2 className="text-4xl font-light">
                        Revisit your stays
                      </h2>

                    </div>

                    <div className="space-y-10">

                      {
                        pastBookings.map((booking) => (

                          <div
                            key={booking.id}
                            className={`rounded-[36px] overflow-hidden border backdrop-blur-xl transition-all duration-500 opacity-70 hover:opacity-100 ${
                              darkMode
                                ? "bg-white/[0.03] border-white/10"
                                : "bg-white/70 border-black/10"
                            }`}
                          >

                            <div
                              className={`p-8 md:p-12 border-b ${
                                darkMode
                                  ? "border-white/10"
                                  : "border-black/10"
                              }`}
                            >

                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

                                <div>

                                  <p className="text-[#c6a77b] uppercase tracking-[0.25em] text-sm mb-5">
                                    Previous Stay
                                  </p>

                                  <h2 className="text-3xl md:text-5xl font-light leading-tight">
                                    {booking.hotelName}
                                  </h2>

                                  <p
                                    className={`text-lg mt-4 ${
                                      darkMode
                                        ? "text-white/50"
                                        : "text-black/50"
                                    }`}
                                  >
                                    {booking.roomName}
                                  </p>

                                </div>

                                <div className="md:text-right">

                                  <p className="text-3xl font-light">
                                    ₹{booking.totalPrice}
                                  </p>

                                </div>

                              </div>

                            </div>

                          </div>

                        ))
                      }

                    </div>

                  </div>

                )
              }

            </div>

          )
        }

      </section>

    </main>

  );

}
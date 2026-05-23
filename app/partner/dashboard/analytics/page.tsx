"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  db,
  auth,
} from "@/app/firebase/config";

import {
  Wallet,
  BedDouble,
  CalendarDays,
  TrendingUp,
  CheckCircle2,
  Clock3,
  XCircle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

export default function AnalyticsPage() {

  const router = useRouter();

  const [rooms,
    setRooms,
  ] = useState<any[]>([]);

  const [bookings,
    setBookings,
  ] = useState<any[]>([]);

  const [loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    if (!auth.currentUser) {

      router.push("/signin");

      return;

    }

    const fetchAnalytics =
      async () => {

        try {

          setLoading(true);

          /* PARTNER ROOMS */

          const roomsQuery =
            query(
              collection(
                db,
                "rooms"
              ),
              where(
                "partnerId",
                "==",
                auth.currentUser?.uid
              )
            );

          const roomsSnapshot =
            await getDocs(
              roomsQuery
            );

          const roomsData =
            roomsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setRooms(roomsData);

          /* BOOKINGS */

          const bookingsSnapshot =
            await getDocs(
              collection(
                db,
                "bookings"
              )
            );

          const bookingsData =
            bookingsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          /* FILTER ONLY PARTNER BOOKINGS */

          const partnerBookings =
            bookingsData.filter(
              (booking: any) =>
                roomsData.some(
                  (room: any) =>
                    room.roomName ===
                    booking.roomName
                )
            );

          setBookings(
            partnerBookings
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchAnalytics();

  }, []);

  /* TOTALS */

  const totalRevenue =
    bookings.reduce(
      (
        acc,
        booking
      ) =>
        acc +
        Number(
          booking.totalPrice ||
            booking.total ||
            0
        ),
      0
    );

  const totalBookings =
    bookings.length;

  const activeRooms =
    rooms.length;

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "confirmed"
    ).length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "payment_pending"
    ).length;

  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "cancelled"
    ).length;

  const occupancyRate =
    activeRooms > 0
      ? Math.min(
          100,
          Math.round(
            (confirmedBookings /
              activeRooms) *
              100
          )
        )
      : 0;

  /* REVENUE CHART */

  const revenueData =
    useMemo(() => {

      const monthlyRevenue = [

        {
          month: "Jan",
          revenue: 0,
        },

        {
          month: "Feb",
          revenue: 0,
        },

        {
          month: "Mar",
          revenue: 0,
        },

        {
          month: "Apr",
          revenue: 0,
        },

        {
          month: "May",
          revenue: 0,
        },

        {
          month: "Jun",
          revenue: 0,
        },

      ];

      bookings.forEach(
        (booking) => {

          const revenue =
            Number(
              booking.totalPrice ||
                booking.total ||
                0
            );

          monthlyRevenue[5].revenue +=
            revenue;

        }
      );

      return monthlyRevenue;

    }, [bookings]);

  /* LOADING */

  if (loading) {

    return (

      <main className="min-h-screen bg-[#050505] text-white px-8 py-10">

        <div className="animate-pulse">

          <div className="h-16 w-72 bg-white/10 rounded-2xl mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            {[1, 2, 3, 4].map(
              (item) => (

              <div
                key={item}
                className="h-[180px] rounded-[32px] bg-white/[0.04]"
              />

            ))}

          </div>

          <div className="h-[420px] rounded-[35px] bg-white/[0.04] mb-10" />

          <div className="h-[320px] rounded-[35px] bg-white/[0.04]" />

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.12),transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-10">

        {/* HEADER */}

        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">

          <div>

            <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-5">

              BUSINESS INTELLIGENCE

            </p>

            <button
              onClick={() =>
                router.push(
                  "/partner/dashboard"
                )
              }
              className="mb-7 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] transition-all"
            >

              ← Back To Dashboard

            </button>

            <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] tracking-[-0.05em]">

              Hospitality
              <br />
              Analytics

            </h1>

            <p className="text-white/45 mt-6 leading-8 max-w-3xl text-lg">

              Monitor booking performance, operational occupancy, revenue growth, and luxury hospitality insights powered by the Niels Privé ecosystem.

            </p>

          </div>

          {/* QUICK INSIGHT */}

          <div className="bg-white/[0.04] border border-white/10 rounded-[30px] px-7 py-6 min-w-[260px]">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-14 h-14 rounded-2xl bg-[#d4a574]/10 flex items-center justify-center">

                <ArrowUpRight
                  className="text-[#d4a574]"
                />

              </div>

              <div>

                <p className="text-white/45 text-sm">

                  Growth Momentum

                </p>

                <h3 className="text-3xl font-semibold">

                  +28%

                </h3>

              </div>

            </div>

            <p className="text-white/45 leading-7 text-sm">

              Hospitality demand and reservation performance continue to grow across your luxury inventory.

            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* REVENUE */}

          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">

            <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-7">

              <Wallet
                className="text-[#d4a574]"
                size={28}
              />

            </div>

            <p className="text-white/45 mb-4">

              Total Revenue

            </p>

            <h2 className="text-4xl font-semibold mb-3">

              ₹{totalRevenue.toLocaleString()}

            </h2>

            <p className="text-[#d4a574] text-sm">

              Live reservation revenue

            </p>

          </div>

          {/* BOOKINGS */}

          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">

            <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-7">

              <CalendarDays
                className="text-[#d4a574]"
                size={28}
              />

            </div>

            <p className="text-white/45 mb-4">

              Total Reservations

            </p>

            <h2 className="text-4xl font-semibold mb-3">

              {totalBookings}

            </h2>

            <p className="text-[#d4a574] text-sm">

              Connected bookings

            </p>

          </div>

          {/* ROOMS */}

          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">

            <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-7">

              <BedDouble
                className="text-[#d4a574]"
                size={28}
              />

            </div>

            <p className="text-white/45 mb-4">

              Active Inventory

            </p>

            <h2 className="text-4xl font-semibold mb-3">

              {activeRooms}

            </h2>

            <p className="text-[#d4a574] text-sm">

              Luxury room operations

            </p>

          </div>

          {/* OCCUPANCY */}

          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">

            <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-7">

              <TrendingUp
                className="text-[#d4a574]"
                size={28}
              />

            </div>

            <p className="text-white/45 mb-4">

              Occupancy Rate

            </p>

            <h2 className="text-4xl font-semibold mb-3">

              {occupancyRate}%

            </h2>

            <p className="text-[#d4a574] text-sm">

              Reservation utilization

            </p>

          </div>

        </div>

        {/* STATUS CARDS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">

            <div className="flex items-center gap-4 mb-5">

              <CheckCircle2
                className="text-green-500"
                size={24}
              />

              <h3 className="text-2xl font-semibold">

                Confirmed

              </h3>

            </div>

            <p className="text-5xl font-semibold mb-3">

              {confirmedBookings}

            </p>

            <p className="text-white/45">

              Successful reservations

            </p>

          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">

            <div className="flex items-center gap-4 mb-5">

              <Clock3
                className="text-[#d4a574]"
                size={24}
              />

              <h3 className="text-2xl font-semibold">

                Pending

              </h3>

            </div>

            <p className="text-5xl font-semibold mb-3">

              {pendingBookings}

            </p>

            <p className="text-white/45">

              Awaiting confirmation

            </p>

          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">

            <div className="flex items-center gap-4 mb-5">

              <XCircle
                className="text-red-500"
                size={24}
              />

              <h3 className="text-2xl font-semibold">

                Cancelled

              </h3>

            </div>

            <p className="text-5xl font-semibold mb-3">

              {cancelledBookings}

            </p>

            <p className="text-white/45">

              Reservation cancellations

            </p>

          </div>

        </div>

        {/* REVENUE GRAPH */}

        <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10 mb-10">

          <div className="mb-10">

            <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-4">

              REVENUE PERFORMANCE

            </p>

            <h2 className="text-4xl md:text-5xl font-semibold mb-5">

              Revenue Growth

            </h2>

            <p className="text-white/45 leading-8 max-w-3xl">

              Monitor reservation momentum, hospitality performance, and revenue expansion across your luxury inventory operations.

            </p>

          </div>

          <div className="h-[420px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={revenueData}
              >

                <defs>

                  <linearGradient
                    id="colorRevenue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#d4a574"
                      stopOpacity={0.5}
                    />

                    <stop
                      offset="100%"
                      stopColor="#d4a574"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <XAxis
                  dataKey="month"
                  stroke="#777"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#d4a574"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={4}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* RECENT BOOKINGS */}

        <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10">

          <div className="mb-10">

            <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-4">

              LIVE RESERVATIONS

            </p>

            <h2 className="text-4xl md:text-5xl font-semibold mb-5">

              Recent Booking Activity

            </h2>

            <p className="text-white/45 leading-8 max-w-2xl">

              Track real-time reservation activity and hospitality operations connected to your inventory.

            </p>

          </div>

          {/* EMPTY */}

          {bookings.length === 0 && (

            <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-14 text-center">

              <div className="w-20 h-20 rounded-full bg-[#d4a574]/10 flex items-center justify-center mx-auto mb-8">

                <Sparkles
                  size={32}
                  className="text-[#d4a574]"
                />

              </div>

              <h3 className="text-4xl font-semibold mb-5">

                No Reservation Activity Yet

              </h3>

              <p className="text-white/45 leading-8 max-w-2xl mx-auto">

                Reservation insights and hospitality analytics will automatically appear here once guests begin booking your luxury inventory.

              </p>

            </div>

          )}

          {/* BOOKINGS */}

          <div className="space-y-5">

            {bookings
              .slice(0, 6)
              .map((booking) => (

                <div
                  key={booking.id}
                  className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border border-white/10 rounded-[28px] px-6 py-6 bg-white/[0.02]"
                >

                  <div>

                    <div className="flex items-center gap-3 mb-3">

                      {booking.status ===
                      "confirmed" ? (

                        <CheckCircle2
                          size={18}
                          className="text-green-500"
                        />

                      ) : booking.status ===
                        "cancelled" ? (

                        <XCircle
                          size={18}
                          className="text-red-500"
                        />

                      ) : (

                        <Clock3
                          size={18}
                          className="text-[#d4a574]"
                        />

                      )}

                      <p className="capitalize text-sm text-white/60">

                        {booking.status ||
                          "confirmed"}

                      </p>

                    </div>

                    <p className="text-2xl font-semibold mb-3">

                      {booking.hotelName ||
                        booking.roomName}

                    </p>

                    <div className="flex flex-wrap gap-5 text-sm text-white/45">

                      <p>
                        Room:
                        {" "}
                        {booking.roomName}
                      </p>

                      <p>
                        Guests:
                        {" "}
                        {booking.guests}
                      </p>

                    </div>

                  </div>

                  <div className="lg:text-right">

                    <p className="text-[#d4a574] text-3xl font-semibold mb-3">

                      ₹
                      {booking.totalPrice ||
                        booking.total}

                    </p>

                    <p className="text-white/45">

                      {booking.checkIn ||
                        "Upcoming Reservation"}

                    </p>

                  </div>

                </div>

              ))}

          </div>

        </div>

      </section>

    </main>

  );

}
"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

import {
  Wallet,
  BedDouble,
  CalendarDays,
  TrendingUp,
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

  const [rooms, setRooms] =
    useState<any[]>([]);

  const [bookings, setBookings] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const roomsSnapshot =
            await getDocs(
              collection(db, "rooms")
            );

          const bookingsSnapshot =
            await getDocs(
              collection(db, "bookings")
            );

          const roomsData =
            roomsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          const bookingsData =
            bookingsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setRooms(roomsData);

          setBookings(bookingsData);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchAnalytics();

  }, []);

  const totalRevenue =
    bookings.reduce(
      (acc, booking) =>
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

  const occupancyRate =
    activeRooms > 0
      ? Math.min(
          100,
          Math.round(
            (totalBookings /
              activeRooms) *
              20
          )
        )
      : 0;

  const revenueData = [

    {
      month: "Jan",
      revenue: 120000,
    },

    {
      month: "Feb",
      revenue: 180000,
    },

    {
      month: "Mar",
      revenue: 240000,
    },

    {
      month: "Apr",
      revenue: 310000,
    },

    {
      month: "May",
      revenue: 420000,
    },

    {
      month: "Jun",
      revenue: totalRevenue || 520000,
    },

  ];

  if (loading) {

    return (

      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">

        Loading Analytics...

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050505] text-white">

      <section className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER */}

        <div className="mb-14">

          <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

            BUSINESS INTELLIGENCE

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

          <h1 className="text-5xl font-semibold leading-tight">

            Luxury Hospitality
            <br />
            Analytics

          </h1>

          <p className="text-white/45 mt-5 leading-8 max-w-3xl">

            Monitor operational performance,
            revenue growth,
            booking activity,
            and luxury inventory insights.

          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* REVENUE */}

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

            <div className="w-14 h-14 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-6">

              <Wallet
                className="text-[#d4a574]"
              />

            </div>

            <p className="text-white/45 mb-3">

              Total Revenue

            </p>

            <h2 className="text-4xl font-semibold">

              ₹{totalRevenue.toLocaleString()}

            </h2>

          </div>

          {/* BOOKINGS */}

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

            <div className="w-14 h-14 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-6">

              <CalendarDays
                className="text-[#d4a574]"
              />

            </div>

            <p className="text-white/45 mb-3">

              Total Bookings

            </p>

            <h2 className="text-4xl font-semibold">

              {totalBookings}

            </h2>

          </div>

          {/* ROOMS */}

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

            <div className="w-14 h-14 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-6">

              <BedDouble
                className="text-[#d4a574]"
              />

            </div>

            <p className="text-white/45 mb-3">

              Active Rooms

            </p>

            <h2 className="text-4xl font-semibold">

              {activeRooms}

            </h2>

          </div>

          {/* OCCUPANCY */}

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

            <div className="w-14 h-14 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-6">

              <TrendingUp
                className="text-[#d4a574]"
              />

            </div>

            <p className="text-white/45 mb-3">

              Occupancy Rate

            </p>

            <h2 className="text-4xl font-semibold">

              {occupancyRate}%

            </h2>

          </div>

        </div>

        {/* GRAPH */}

        <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8 mb-10">

          <div className="mb-10">

            <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

              REVENUE PERFORMANCE

            </p>

            <h2 className="text-4xl font-semibold">

              Revenue Growth

            </h2>

            <p className="text-white/45 mt-4 leading-8 max-w-2xl">

              Monitor hospitality revenue trends,
              booking momentum,
              and luxury business performance.

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

        <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

          <div className="mb-8">

            <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

              LIVE RESERVATIONS

            </p>

            <h2 className="text-4xl font-semibold">

              Recent Booking Activity

            </h2>

          </div>

          <div className="space-y-5">

            {bookings
              .slice(0, 5)
              .map((booking) => (

                <div
                  key={booking.id}
                  className="flex items-center justify-between border border-white/10 rounded-2xl px-6 py-5 bg-white/[0.02]"
                >

                  <div>

                    <p className="text-xl font-medium mb-2">

                      {booking.hotelName}

                    </p>

                    <p className="text-white/45">

                      {booking.roomName}

                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-[#d4a574] text-lg font-medium mb-2">

                      ₹
                      {booking.totalPrice ||
                        booking.total}

                    </p>

                    <p className="text-white/45">

                      {booking.checkIn}

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
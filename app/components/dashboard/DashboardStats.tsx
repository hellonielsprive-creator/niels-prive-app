"use client";

import {
  TrendingUp,
  BedDouble,
  Wallet,
  Activity,
  Sparkles,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export default function DashboardStats({
  rooms,
  bookings,
  luxuryMode,
}: any) {

  const today =
    new Date();

  const totalRevenue =
    (bookings || []).reduce(
      (
        total: number,
        booking: any
      ) =>
        total +
        Number(
          booking.totalPrice || 0
        ),
      0
    );

  const activeBookings =
    (bookings || []).filter(
      (booking: any) =>
        booking.status !==
        "cancelled"
    ).length;

  const occupiedRooms =
    (bookings || []).filter(
      (booking: any) => {

        if (
          !booking.checkIn ||
          !booking.CheckOut
        ) return false;

        const checkIn =
          new Date(
            booking.checkIn
          );

        const checkOut =
          new Date(
            booking.CheckOut
          );

        return (
          booking.status ===
            "checked-in" &&
          today >= checkIn &&
          today <= checkOut
        );

      }
    ).length;

  const occupancyRate =
    rooms.length > 0
      ? Math.round(
          (
            occupiedRooms /
            rooms.length
          ) * 100
        )
      : 0;

  const averageRevenue =
    activeBookings > 0
      ? Math.round(
          totalRevenue /
            activeBookings
        )
      : 0;

  const operationalScore =
    Math.max(
      75,
      100 -
        Math.max(
          0,
          rooms.length -
            occupiedRooms
        )
    );

  const cardStyles =
    luxuryMode
      ? "bg-white border border-[#e8dfd3] shadow-[0_10px_35px_rgba(15,23,42,0.05)] hover:shadow-[0_15px_45px_rgba(15,23,42,0.08)]"
      : "bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10";

  return (

    <div className="mt-12">

      {/* HEADER */}

      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">

        <div>

          <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-4">

            ENTERPRISE ANALYTICS

          </p>

          <h2 className="text-5xl font-semibold mb-5 leading-tight">

            Property Intelligence

          </h2>

          <p
            className={`max-w-3xl text-lg leading-8 ${
              luxuryMode
                ? "text-neutral-500"
                : "text-white/45"
            }`}
          >

            Real-time hospitality analytics,
            operational performance,
            occupancy intelligence,
            and luxury property metrics.

          </p>

        </div>

        {/* LIVE */}

        <div
          className={`flex items-center gap-4 rounded-2xl px-6 py-5 ${
            luxuryMode
              ? "bg-white border border-[#e8dfd3]"
              : "bg-white/[0.03] border border-white/10"
          }`}
        >

          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

          <div>

            <p className="font-medium">

              Live Analytics Active

            </p>

            <p
              className={`text-sm ${
                luxuryMode
                  ? "text-neutral-500"
                  : "text-white/45"
              }`}
            >

              Real-Time PMS Intelligence

            </p>

          </div>

        </div>

      </div>

      {/* MAIN STATS */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

        {/* TOTAL ROOMS */}

        <div
          className={`rounded-[38px] p-8 transition-all duration-300 hover:-translate-y-1 ${cardStyles}`}
        >

          <div className="flex items-center justify-between mb-8">

            <div className="w-16 h-16 rounded-3xl bg-green-500/10 text-green-500 flex items-center justify-center">

              <BedDouble size={28} />

            </div>

            <TrendingUp
              size={20}
              className="text-green-500"
            />

          </div>

          <p
            className={`mb-4 text-sm tracking-[0.25em] ${
              luxuryMode
                ? "text-neutral-500"
                : "text-neutral-400"
            }`}
          >

            TOTAL INVENTORY

          </p>

          <h3 className="text-6xl font-semibold mb-5">

            {rooms.length}

          </h3>

          <p className="text-green-500 text-sm font-medium">

            Live synced hospitality inventory

          </p>

        </div>

        {/* REVENUE */}

        <div
          className={`rounded-[38px] p-8 transition-all duration-300 hover:-translate-y-1 ${cardStyles}`}
        >

          <div className="flex items-center justify-between mb-8">

            <div className="w-16 h-16 rounded-3xl bg-[#d4a574]/10 text-[#d4a574] flex items-center justify-center">

              <Wallet size={28} />

            </div>

            <BarChart3
              size={20}
              className="text-[#d4a574]"
            />

          </div>

          <p
            className={`mb-4 text-sm tracking-[0.25em] ${
              luxuryMode
                ? "text-neutral-500"
                : "text-neutral-400"
            }`}
          >

            REVENUE FLOW

          </p>

          <h3 className="text-5xl font-semibold mb-5 break-words">

            ₹{totalRevenue}

          </h3>

          <p className="text-[#d4a574] text-sm font-medium">

            Average booking ₹{averageRevenue}

          </p>

        </div>

        {/* OCCUPANCY */}

        <div
          className={`rounded-[38px] p-8 transition-all duration-300 hover:-translate-y-1 ${
            luxuryMode
              ? "bg-white border border-green-200 shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
              : "bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20"
          }`}
        >

          <div className="flex items-center justify-between mb-8">

            <div className="w-16 h-16 rounded-3xl bg-green-500/10 text-green-500 flex items-center justify-center">

              <Activity size={28} />

            </div>

            <Sparkles
              size={20}
              className="text-green-500"
            />

          </div>

          <p
            className={`mb-4 text-sm tracking-[0.25em] ${
              luxuryMode
                ? "text-neutral-500"
                : "text-neutral-400"
            }`}
          >

            LIVE OCCUPANCY

          </p>

          <h3 className="text-6xl font-semibold mb-5">

            {occupancyRate}%

          </h3>

          <p className="text-green-500 text-sm font-medium">

            {occupiedRooms} occupied suites active

          </p>

        </div>

        {/* PMS STATUS */}

        <div
          className={`rounded-[38px] p-8 transition-all duration-300 hover:-translate-y-1 ${
            luxuryMode
              ? "bg-white border border-[#eadfce] shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
              : "bg-gradient-to-br from-[#d4a574]/10 to-white/[0.03] border border-[#d4a574]/20"
          }`}
        >

          <div className="flex items-center justify-between mb-8">

            <div className="w-16 h-16 rounded-3xl bg-[#d4a574]/10 text-[#d4a574] flex items-center justify-center">

              <ShieldCheck size={28} />

            </div>

            <div className="w-3 h-3 rounded-full bg-[#d4a574] animate-pulse" />

          </div>

          <p
            className={`mb-4 text-sm tracking-[0.25em] ${
              luxuryMode
                ? "text-neutral-500"
                : "text-neutral-400"
            }`}
          >

            PMS HEALTH

          </p>

          <h3 className="text-5xl font-semibold mb-5">

            {operationalScore}%

          </h3>

          <p className="text-[#d4a574] text-sm font-medium">

            {activeBookings} reservations operational

          </p>

        </div>

      </div>

      {/* INSIGHTS */}

      <div className="grid xl:grid-cols-3 gap-6 mt-8">

        {/* REVENUE INSIGHT */}

        <div
          className={`rounded-[35px] border p-7 ${
            luxuryMode
              ? "bg-white border-[#e8dfd3]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <p className="tracking-[0.25em] text-[#d4a574] text-xs mb-4">

            REVENUE INSIGHT

          </p>

          <h3 className="text-4xl font-semibold mb-5">

            ₹{averageRevenue}

          </h3>

          <p
            className={
              luxuryMode
                ? "text-neutral-500 leading-7"
                : "text-white/45 leading-7"
            }
          >

            Average revenue generated
            per reservation across
            active hospitality operations.

          </p>

        </div>

        {/* OCCUPANCY INSIGHT */}

        <div
          className={`rounded-[35px] border p-7 ${
            luxuryMode
              ? "bg-white border-[#e8dfd3]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <p className="tracking-[0.25em] text-[#d4a574] text-xs mb-4">

            OCCUPANCY INSIGHT

          </p>

          <h3 className="text-4xl font-semibold mb-5">

            {occupiedRooms}/{rooms.length}

          </h3>

          <p
            className={
              luxuryMode
                ? "text-neutral-500 leading-7"
                : "text-white/45 leading-7"
            }
          >

            Real-time occupied room
            tracking powered by
            enterprise PMS operations.

          </p>

        </div>

        {/* PMS STATUS */}

        <div
          className={`rounded-[35px] border p-7 ${
            luxuryMode
              ? "bg-white border-[#e8dfd3]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <p className="tracking-[0.25em] text-[#d4a574] text-xs mb-4">

            PMS STATUS

          </p>

          <h3 className="text-4xl font-semibold mb-5">

            Stable

          </h3>

          <p
            className={
              luxuryMode
                ? "text-neutral-500 leading-7"
                : "text-white/45 leading-7"
            }
          >

            Enterprise hospitality
            systems operational with
            real-time inventory syncing.

          </p>

        </div>

      </div>

    </div>

  );

}
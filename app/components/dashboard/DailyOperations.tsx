"use client";

import {
  Sparkles,
  BedDouble,
  LogIn,
  LogOut,
  BrushCleaning,
} from "lucide-react";

export default function DailyOperations({
  arrivalsToday,
  departuresToday,
  occupiedRooms,
  cleaningQueue,
  luxuryMode,
}: any) {

  return (

    <div className="mt-10 mb-10">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

        <div>

          <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

            LIVE OPERATIONS

          </p>

          <h2 className="text-5xl font-semibold leading-tight">

            Daily Operations

          </h2>

          <p
            className={`mt-4 max-w-2xl leading-8 ${
              luxuryMode
                ? "text-neutral-500"
                : "text-white/40"
            }`}
          >

            Monitor live hospitality activity,
            guest movements,
            operational workflow,
            and enterprise intelligence.

          </p>

        </div>

        <div
          className={`flex items-center gap-3 rounded-2xl px-5 py-4 border ${
            luxuryMode
              ? "bg-white border-[#ece3d7]"
              : "bg-white/[0.03] border-white/10"
          }`}
        >

          <Sparkles
            size={18}
            className="text-[#d4a574]"
          />

          <div>

            <p
              className={`text-xs mb-1 ${
                luxuryMode
                  ? "text-neutral-500"
                  : "text-white/40"
              }`}
            >

              LIVE PMS STATUS

            </p>

            <p className="text-sm font-medium">

              Enterprise Operations Active

            </p>

          </div>

        </div>

      </div>

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

        {/* ARRIVALS */}

        <div
          className={`rounded-[35px] border p-8 transition-all duration-300 hover:-translate-y-1 ${
            luxuryMode
              ? "bg-white border-[#ece3d7] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              : "bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20"
          }`}
        >

          <div className="flex items-center justify-between mb-7">

            <div className="w-16 h-16 rounded-3xl bg-green-500/10 text-green-400 flex items-center justify-center">

              <LogIn size={26} />

            </div>

            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

          </div>

          <p
            className={`text-xs tracking-[0.25em] mb-4 ${
              luxuryMode
                ? "text-neutral-500"
                : "text-white/40"
            }`}
          >

            ARRIVALS TODAY

          </p>

          <h3 className="text-6xl font-semibold mb-5">

            {arrivalsToday.length}

          </h3>

        </div>

        {/* DEPARTURES */}

        <div
          className={`rounded-[35px] border p-8 transition-all duration-300 hover:-translate-y-1 ${
            luxuryMode
              ? "bg-white border-[#ece3d7] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              : "bg-gradient-to-br from-[#d4a574]/10 to-transparent border-[#d4a574]/20"
          }`}
        >

          <div className="flex items-center justify-between mb-7">

            <div className="w-16 h-16 rounded-3xl bg-[#d4a574]/10 text-[#d4a574] flex items-center justify-center">

              <LogOut size={26} />

            </div>

            <div className="w-3 h-3 rounded-full bg-[#d4a574] animate-pulse" />

          </div>

          <p
            className={`text-xs tracking-[0.25em] mb-4 ${
              luxuryMode
                ? "text-neutral-500"
                : "text-white/40"
            }`}
          >

            DEPARTURES TODAY

          </p>

          <h3 className="text-6xl font-semibold mb-5">

            {departuresToday.length}

          </h3>

        </div>

        {/* OCCUPIED */}

        <div
          className={`rounded-[35px] border p-8 transition-all duration-300 hover:-translate-y-1 ${
            luxuryMode
              ? "bg-white border-[#ece3d7] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              : "bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20"
          }`}
        >

          <div className="flex items-center justify-between mb-7">

            <div className="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-400 flex items-center justify-center">

              <BedDouble size={26} />

            </div>

            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />

          </div>

          <p
            className={`text-xs tracking-[0.25em] mb-4 ${
              luxuryMode
                ? "text-neutral-500"
                : "text-white/40"
            }`}
          >

            OCCUPIED ROOMS

          </p>

          <h3 className="text-6xl font-semibold mb-5">

            {occupiedRooms.length}

          </h3>

        </div>

        {/* CLEANING */}

        <div
          className={`rounded-[35px] border p-8 transition-all duration-300 hover:-translate-y-1 ${
            luxuryMode
              ? "bg-white border-[#ece3d7] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              : "bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20"
          }`}
        >

          <div className="flex items-center justify-between mb-7">

            <div className="w-16 h-16 rounded-3xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center">

              <BrushCleaning size={26} />

            </div>

            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />

          </div>

          <p
            className={`text-xs tracking-[0.25em] mb-4 ${
              luxuryMode
                ? "text-neutral-500"
                : "text-white/40"
            }`}
          >

            CLEANING QUEUE

          </p>

          <h3 className="text-6xl font-semibold mb-5">

            {cleaningQueue}

          </h3>

        </div>

      </div>
       
    {/* PMS AUTOMATION CENTER */}

<div
  className={`mt-10 rounded-[38px] border overflow-hidden ${
    luxuryMode
      ? "bg-white border-[#ece3d7]"
      : "bg-gradient-to-br from-white/[0.04] to-white/[0.02] border-white/10"
  }`}
>

  {/* TOP */}

  <div className="p-8 border-b border-white/10">

    <div className="flex flex-wrap items-center justify-between gap-6">

      <div>

        <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

          PMS AUTOMATION CENTER

        </p>

        <h3 className="text-4xl font-semibold mb-4">

          Operational Intelligence

        </h3>

        <p
          className={`max-w-3xl leading-8 ${
            luxuryMode
              ? "text-neutral-500"
              : "text-white/45"
          }`}
        >

          Live operational automation,
          hospitality readiness,
          cleaning intelligence,
          and enterprise workflow tracking.

        </p>

      </div>

      {/* LIVE */}

      <div className="flex items-center gap-3 rounded-2xl bg-green-500/10 border border-green-500/20 px-5 py-4">

        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

        <div>

          <p className="text-green-300 font-medium">

            Automation Active

          </p>

          <p className="text-green-400/60 text-sm">

            PMS Intelligence Running

          </p>

        </div>

      </div>

    </div>

  </div>

  {/* BODY */}

  <div className="p-8 grid xl:grid-cols-3 gap-6">

    {/* READINESS */}

    <div
      className={`rounded-[30px] border p-7 ${
        luxuryMode
          ? "bg-[#faf7f2] border-[#ece3d7]"
          : "bg-black/20 border-white/10"
      }`}
    >

      <p className="tracking-[0.25em] text-[#d4a574] text-xs mb-4">

        PROPERTY READINESS

      </p>

      <h3 className="text-6xl font-semibold mb-5">

        {Math.max(
          0,
          100 - cleaningQueue * 10
        )}%

      </h3>

      <p
        className={
          luxuryMode
            ? "text-neutral-500 leading-7"
            : "text-white/45 leading-7"
        }
      >

        Real-time operational readiness
        based on occupancy,
        cleaning queue,
        and live guest movement.

      </p>

    </div>

    {/* CLEANING */}

    <div
      className={`rounded-[30px] border p-7 ${
        luxuryMode
          ? "bg-[#faf7f2] border-[#ece3d7]"
          : "bg-black/20 border-white/10"
      }`}
    >

      <p className="tracking-[0.25em] text-[#d4a574] text-xs mb-4">

        CLEANING AUTOMATION

      </p>

      <h3 className="text-4xl font-semibold mb-5">

        {cleaningQueue > 0
          ? `${cleaningQueue} Rooms Pending`
          : "All Rooms Ready"}

      </h3>

      <p
        className={
          luxuryMode
            ? "text-neutral-500 leading-7"
            : "text-white/45 leading-7"
        }
      >

        Automated operational intelligence
        actively monitoring departures,
        housekeeping flow,
        and room readiness.

      </p>

    </div>

    {/* LIVE INSIGHTS */}

    <div
      className={`rounded-[30px] border p-7 ${
        luxuryMode
          ? "bg-[#faf7f2] border-[#ece3d7]"
          : "bg-black/20 border-white/10"
      }`}
    >

      <p className="tracking-[0.25em] text-[#d4a574] text-xs mb-4">

        LIVE PMS INSIGHTS

      </p>

      <div className="space-y-4">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          <p>

            {arrivalsToday.length} guest arrivals active

          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />

          <p>

            {occupiedRooms.length} rooms occupied

          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />

          <p>

            {cleaningQueue} housekeeping operations pending

          </p>

        </div>

      </div>

    </div>

  </div>

</div>

    </div>

  );

}
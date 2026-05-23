"use client";

import { useEffect, useState } from "react";

import {
  Bell,
  Moon,
  Sun,
  Plus,
  Clock3,
  BarChart3,
} from "lucide-react";

export default function DashboardTopbar({

  showStats,
  setShowStats,

  luxuryMode,
  setLuxuryMode,

  partnerData,

}: any) {

  const [
    currentTime,
    setCurrentTime,
  ] = useState("");

  useEffect(() => {

    const updateClock = () => {

      const now =
        new Date();

      setCurrentTime(
        now.toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      );

    };

    updateClock();

    const interval =
      setInterval(
        updateClock,
        1000
      );

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div>

      {/* TOPBAR */}

      <div
        className={`border-b px-10 py-6 flex items-center justify-between transition-all duration-300 ${
          luxuryMode
            ? "border-[#e7dccd] bg-[#f5f1eb] text-black"
            : "border-white/10 bg-[#050505] text-white"
        }`}
      >

        {/* LEFT */}

        <div>

          <p className="text-[#d4a574] tracking-[0.3em] text-xs mb-3">

            OVERVIEW

          </p>

          <h2 className="text-4xl font-semibold leading-tight">

            Welcome Back,
            <br />

            {
              partnerData?.propertyName ||
              "Luxury Partner"
            }

          </h2>

          <div className="flex items-center gap-3 mt-5">

            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />

            <p
              className={`text-sm ${
                luxuryMode
                  ? "text-neutral-500"
                  : "text-white/45"
              }`}
            >

              Operations Active

            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          {/* CLOCK */}

          <div
            className={`hidden xl:flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all ${
              luxuryMode
                ? "border-[#e7dccd] bg-white"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >

            <Clock3
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

                Bengaluru

              </p>

              <p className="text-sm font-medium">

                {currentTime}

              </p>

            </div>

          </div>

          {/* QUICK ACTION */}

          <button className="hidden lg:flex items-center gap-3 bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-5 py-4 rounded-2xl font-medium">

            <Plus size={18} />

            Add Room

          </button>

          {/* STATS TOGGLE */}

          <button
            onClick={() =>
              setShowStats(
                !showStats
              )
            }
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border ${
              luxuryMode
                ? "border-[#e7dccd] bg-white"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >

            <BarChart3 size={20} />

          </button>

          {/* THEME TOGGLE */}

          <button
            onClick={() =>
              setLuxuryMode(
                !luxuryMode
              )
            }
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border ${
              luxuryMode
                ? "border-[#e7dccd] bg-white"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >

            {
              luxuryMode
                ? (
                  <Sun size={20} />
                )
                : (
                  <Moon size={20} />
                )
            }

          </button>

          {/* NOTIFICATIONS */}

          <button
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all border ${
              luxuryMode
                ? "border-[#e7dccd] bg-white"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >

            <Bell size={20} />

            <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#d4a574]" />

          </button>

        </div>

      </div>

    </div>

  );

}
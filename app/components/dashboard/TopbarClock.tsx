"use client";

import { memo, useEffect, useState } from "react";

import { Clock3 } from "lucide-react";

function TopbarClock({
  luxuryMode,
}: {
  luxuryMode: boolean;
}) {
  const [currentTime, setCurrentTime] =
    useState("");

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateClock();

    const interval = setInterval(
      updateClock,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
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
  );
}

export default memo(TopbarClock);

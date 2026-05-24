"use client";

import { memo, useEffect, useState } from "react";

function LivePmsBar({
  luxuryMode,
}: {
  luxuryMode: boolean;
}) {
  const [lastUpdated, setLastUpdated] =
    useState("");

  useEffect(() => {
    const updateClock = () => {
      setLastUpdated(
        new Date().toLocaleTimeString()
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
      className={`mx-10 mt-6 rounded-[28px] px-6 py-5 border flex flex-wrap items-center justify-between gap-4 ${
        luxuryMode
          ? "bg-white border-[#e8dfd3]"
          : "bg-white/[0.03] border-white/10"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

        <div>
          <p className="font-medium">
            Live PMS Sync Active
          </p>

          <p
            className={`text-sm ${
              luxuryMode
                ? "text-neutral-500"
                : "text-white/45"
            }`}
          >
            Dashboard auto-refreshing every 10 seconds
          </p>
        </div>
      </div>

      <div
        className={`text-sm ${
          luxuryMode
            ? "text-neutral-500"
            : "text-white/45"
        }`}
      >
        Last Updated: {lastUpdated}
      </div>
    </div>
  );
}

export default memo(LivePmsBar);

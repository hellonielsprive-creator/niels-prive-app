"use client";

import { memo, useMemo } from "react";

import {
  CheckCircle2,
  XCircle,
  Sparkles,
  BedDouble,
  BrushCleaning,
} from "lucide-react";

import { selectLatestActivities } from "@/lib/dashboard/activity";

function ActivityFeed({
  bookings,
  luxuryMode,
}: any) {
  const latestActivities = useMemo(
    () => selectLatestActivities(bookings),
    [bookings]
  );

  return (

    <div className="mt-10">

      <div className="mb-8">

        <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

          LIVE OPERATIONS

        </p>

        <h2 className="text-5xl font-semibold">

          Activity Feed

        </h2>

      </div>

      <div className="space-y-5">

        {latestActivities.map(
          (booking: any) => {

            let icon =
              <Sparkles size={20} />;

            let iconBg =
              "bg-[#d4a574]/10 text-[#d4a574]";

            let activity =
              "New reservation created";

            if (
              booking.status ===
              "confirmed"
            ) {

              icon =
                <CheckCircle2 size={20} />;

              iconBg =
                "bg-green-500/10 text-green-400";

              activity =
                "Guest reservation confirmed";

            }

            if (
              booking.status ===
              "cancelled"
            ) {

              icon =
                <XCircle size={20} />;

              iconBg =
                "bg-red-500/10 text-red-400";

              activity =
                "Reservation cancelled";

            }

            if (
              booking.status ===
              "checked-in"
            ) {

              icon =
                <BedDouble size={20} />;

              iconBg =
                "bg-blue-500/10 text-blue-400";

              activity =
                "Guest checked in";

            }

            if (
              booking.status ===
              "cleaning"
            ) {

              icon =
                <BrushCleaning size={20} />;

              iconBg =
                "bg-yellow-500/10 text-yellow-400";

              activity =
                "Suite sent for cleaning";

            }

            return (

              <div
                key={booking.id}
                className={`rounded-[28px] border p-6 flex items-center justify-between transition-all ${
                  luxuryMode
                    ? "bg-white border-[#ece3d7]"
                    : "bg-white/[0.03] border-white/10"
                }`}
              >

                <div className="flex items-center gap-5">

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg}`}
                  >

                    {icon}

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold mb-1">

                      {activity}

                    </h3>

                    <p
                      className={`text-sm ${
                        luxuryMode
                          ? "text-neutral-500"
                          : "text-white/40"
                      }`}
                    >

                      {booking.hotelName}

                    </p>

                  </div>

                </div>

                <div
                  className={`text-sm ${
                    luxuryMode
                      ? "text-neutral-500"
                      : "text-white/40"
                  }`}
                >

                  {booking.checkIn || "Live"}

                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  );
}

export default memo(ActivityFeed);
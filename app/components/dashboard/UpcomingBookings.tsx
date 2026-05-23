"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Sparkles,
  ShieldCheck,
  BedDouble,
  Waves,
} from "lucide-react";

export default function UpcomingBookings({
  bookings,
  updateBookingStatus,
}: any) {

  const today =
    new Date();

  /* UPCOMING */

  const activeBookings =
    (bookings || [])
      .filter(
        (booking: any) =>
          booking.status !==
          "cancelled"
      )
      .sort(
        (a: any, b: any) =>
          new Date(
            a.checkIn
          ).getTime() -
          new Date(
            b.checkIn
          ).getTime()
      );

  /* OCCUPIED */

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
    );

  /* STATUS UI */

  const getStatusStyles =
    (status: string) => {

      switch (status) {

        case "confirmed":

          return {
            label:
              "Confirmed",
            styles:
              "bg-green-500/10 text-green-400 border-green-500/20",
          };

        case "checked-in":

          return {
            label:
              "Checked In",
            styles:
              "bg-blue-500/10 text-blue-400 border-blue-500/20",
          };

        case "cleaning":

          return {
            label:
              "Cleaning",
            styles:
              "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
          };

        case "checked-out":

          return {
            label:
              "Checked Out",
            styles:
              "bg-purple-500/10 text-purple-300 border-purple-500/20",
          };

        case "cancelled":

          return {
            label:
              "Cancelled",
            styles:
              "bg-red-500/10 text-red-400 border-red-500/20",
          };

        default:

          return {
            label:
              "Pending",
            styles:
              "bg-[#d4a574]/10 text-[#d4a574] border-[#d4a574]/20",
          };

      }

    };

  return (

    <div className="mt-16">

      {/* HEADER */}

      <div className="flex items-end justify-between gap-6 flex-wrap mb-12">

        <div>

          <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-4">

            LIVE PMS OPERATIONS

          </p>

          <h2 className="text-5xl font-semibold leading-tight mb-5">

            Reservation Control Center

          </h2>

          <p className="text-white/45 text-lg leading-8 max-w-3xl">

            Manage arrivals, departures,
            room readiness,
            guest operations,
            and luxury hospitality workflows
            in real time.

          </p>

        </div>

        {/* LIVE */}

        <div className="flex items-center gap-4 rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-4">

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          <div>

            <p className="text-green-300 font-medium">

              PMS Active

            </p>

            <p className="text-green-400/60 text-sm">

              Live Reservation Sync

            </p>

          </div>

        </div>

      </div>

      {/* EMPTY */}

      {activeBookings.length === 0 && (

        <div className="rounded-[38px] border border-dashed border-white/10 bg-white/[0.02] p-20 text-center">

          <div className="w-24 h-24 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-8">

            <CalendarDays
              size={40}
              className="text-[#d4a574]"
            />

          </div>

          <h3 className="text-4xl font-semibold mb-5">

            No Active Reservations

          </h3>

          <p className="text-white/45 max-w-2xl mx-auto leading-8 text-lg">

            Upcoming guest operations,
            arrivals,
            and premium hospitality stays
            will appear here automatically.

          </p>

        </div>

      )}

      {/* BOOKINGS */}

      <div className="grid lg:grid-cols-2 gap-8">

        {activeBookings.map(
          (booking: any) => {

            const statusData =
              getStatusStyles(
                booking.status
              );

            return (

              <div
                key={booking.id}
                className="rounded-[38px] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:border-[#d4a574]/30 transition-all duration-300"
              >

                {/* TOP */}

                <div className="p-8 border-b border-white/10">

                  <div className="flex items-start justify-between gap-6">

                    <div>

                      <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

                        NIELS PRIVÉ PMS

                      </p>

                      <h3 className="text-4xl font-semibold mb-3">

                        {booking.hotelName ||
                          "Luxury Stay"}

                      </h3>

                      <p className="text-white/45 text-lg">

                        {booking.roomName}

                      </p>

                    </div>

                    {/* STATUS */}

                    <div
                      className={`px-5 py-3 rounded-2xl border text-sm font-medium ${statusData.styles}`}
                    >

                      {statusData.label}

                    </div>

                  </div>

                </div>

                {/* BODY */}

                <div className="p-8">

                  {/* GUEST */}

                  <div className="grid grid-cols-2 gap-5 mb-8">

                    <div className="rounded-2xl bg-black/20 border border-white/5 p-5">

                      <p className="text-white/40 text-sm mb-2">

                        Guest

                      </p>

                      <h4 className="text-xl font-medium">

                        {booking.guestName ||
                          "Guest"}

                      </h4>

                    </div>

                    <div className="rounded-2xl bg-black/20 border border-white/5 p-5">

                      <p className="text-white/40 text-sm mb-2">

                        Guest Count

                      </p>

                      <h4 className="text-xl font-medium">

                        {booking.guests || 1}

                      </h4>

                    </div>

                  </div>

                  {/* DATE GRID */}

                  <div className="grid grid-cols-2 gap-5 mb-8">

                    <div className="rounded-2xl bg-black/20 border border-white/5 p-5">

                      <p className="text-white/40 text-sm mb-2">

                        Arrival

                      </p>

                      <h4 className="text-lg font-medium">

                        {booking.checkIn}

                      </h4>

                    </div>

                    <div className="rounded-2xl bg-black/20 border border-white/5 p-5">

                      <p className="text-white/40 text-sm mb-2">

                        Departure

                      </p>

                      <h4 className="text-lg font-medium">

                        {booking.CheckOut}

                      </h4>

                    </div>

                  </div>

                  {/* OPERATIONS */}

                  <div className="rounded-[28px] border border-white/10 bg-black/20 p-6 mb-8">

                    <div className="flex items-center gap-3 mb-6">

                      <ShieldCheck
                        size={20}
                        className="text-[#d4a574]"
                      />

                      <h4 className="text-xl font-semibold">

                        PMS Operations

                      </h4>

                    </div>

                    <div className="flex flex-wrap gap-4">

                      {/* CONFIRM */}

                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "confirmed"
                          )
                        }
                        className="bg-green-500 hover:bg-green-400 transition-all text-white px-5 py-4 rounded-2xl font-medium"
                      >

                        Confirm

                      </button>

                      {/* CHECK IN */}

                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "checked-in"
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-400 transition-all text-white px-5 py-4 rounded-2xl font-medium"
                      >

                        Check In

                      </button>

                      {/* CLEANING */}

                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "cleaning"
                          )
                        }
                        className="bg-yellow-500 hover:bg-yellow-400 transition-all text-black px-5 py-4 rounded-2xl font-medium"
                      >

                        Cleaning

                      </button>

                      {/* CHECK OUT */}

                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "checked-out"
                          )
                        }
                        className="bg-purple-500 hover:bg-purple-400 transition-all text-white px-5 py-4 rounded-2xl font-medium"
                      >

                        Check Out

                      </button>

                      {/* CANCEL */}

                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "cancelled"
                          )
                        }
                        className="bg-red-500 hover:bg-red-400 transition-all text-white px-5 py-4 rounded-2xl font-medium"
                      >

                        Cancel

                      </button>

                    </div>

                  </div>

                  {/* FOOTER */}

                  <div className="flex items-center justify-between flex-wrap gap-6 pt-6 border-t border-white/10">

                    <div>

                      <p className="text-white/40 mb-2">

                        Reservation Revenue

                      </p>

                      <h3 className="text-4xl font-semibold text-[#d4a574]">

                        ₹{booking.totalPrice || 0}

                      </h3>

                    </div>

                    <div className="flex items-center gap-3">

                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                      <p className="text-white/45">

                        Live Hospitality Operations

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            );

          }
        )}

      </div>

      {/* ACTIVE OCCUPANCY */}

      <div className="mt-24">

        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">

          <div>

            <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-4">

              LIVE OCCUPANCY

            </p>

            <h2 className="text-5xl font-semibold mb-5">

              Active Guest Stays

            </h2>

            <p className="text-white/45 text-lg leading-8 max-w-3xl">

              Monitor active guests,
              occupied rooms,
              and current hospitality operations
              in real time.

            </p>

          </div>

          <div className="flex items-center gap-3">

            <Clock3
              size={18}
              className="text-[#d4a574]"
            />

            <p className="text-white/45">

              Real-Time Occupancy Tracking

            </p>

          </div>

        </div>

        {/* EMPTY */}

        {occupiedRooms.length === 0 && (

          <div className="rounded-[38px] border border-dashed border-white/10 bg-white/[0.02] p-20 text-center">

            <h3 className="text-4xl font-semibold mb-5">

              No Active Occupancy

            </h3>

            <p className="text-white/45 max-w-2xl mx-auto leading-8 text-lg">

              There are currently no guests
              staying at your luxury property.

            </p>

          </div>

        )}

        {/* OCCUPIED GRID */}

        <div className="grid lg:grid-cols-2 gap-8">

          {occupiedRooms.map(
            (booking: any) => (

              <div
                key={booking.id}
                className="rounded-[38px] border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent p-8"
              >

                <div className="flex items-start justify-between mb-8">

                  <div>

                    <p className="tracking-[0.25em] text-green-400 text-xs mb-3">

                      ACTIVE GUEST

                    </p>

                    <h3 className="text-3xl font-semibold mb-3">

                      {booking.roomName}

                    </h3>

                    <p className="text-white/45 text-lg">

                      {booking.guestName}

                    </p>

                  </div>

                  <div className="px-5 py-3 rounded-2xl border bg-green-500/10 text-green-400 border-green-500/20 text-sm font-medium">

                    Occupied

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-5 mb-8">

                  <div className="rounded-2xl bg-black/20 border border-white/5 p-5">

                    <p className="text-white/40 text-sm mb-2">

                      Arrival

                    </p>

                    <h4 className="text-lg font-medium">

                      {booking.checkIn}

                    </h4>

                  </div>

                  <div className="rounded-2xl bg-black/20 border border-white/5 p-5">

                    <p className="text-white/40 text-sm mb-2">

                      Departure

                    </p>

                    <h4 className="text-lg font-medium">

                      {booking.CheckOut}

                    </h4>

                  </div>

                </div>

                {/* LIVE BADGES */}

                <div className="flex flex-wrap gap-4">

                  <div className="bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3">

                    <BedDouble
                      size={18}
                      className="text-[#d4a574]"
                    />

                    Occupied Room

                  </div>

                  <div className="bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3">

                    <Sparkles
                      size={18}
                      className="text-[#d4a574]"
                    />

                    Premium Guest

                  </div>

                  <div className="bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3">

                    <Waves
                      size={18}
                      className="text-[#d4a574]"
                    />

                    Luxury Hospitality

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}
"use client";

export default function UpcomingBookings({
  bookings,
  updateBookingStatus,
}: any) {

  return (

    <div>
        <div className="mt-12">

  <div className="flex items-center justify-between mb-8">

    <div>

      <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

        RESERVATIONS

      </p>

      <h2 className="text-4xl font-semibold">

        Upcoming Bookings

      </h2>

    </div>

  </div>

  <div className="grid grid-cols-2 gap-6">

    {bookings
  .filter(
    (booking: any) =>
      booking.status !==
      "cancelled"
  )
  .slice(0, 4)
  .map((booking: any) => (

      <div
        key={booking.id}
        className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7"
      >

        <div className="flex items-center justify-between mb-6">

          <div>

            <h3 className="text-2xl font-semibold mb-2">

              {booking.hotelName}

            </h3>

            <p className="text-neutral-400">

              {booking.roomName}

            </p>

          </div>

          <div className="bg-[#d4a574] text-black px-4 py-2 rounded-xl text-sm font-medium">

            {booking.status}
            <div className="flex gap-3 mt-5">

  <button
    onClick={() =>
      updateBookingStatus(
        booking.id,
        "confirmed"
      )
    }
    className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm"
  >

    Confirm

  </button>

  <button
    onClick={() =>
      updateBookingStatus(
        booking.id,
        "cancelled"
      )
    }
    className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm"
  >

    Cancel

  </button>

</div>

          </div>

        </div>

        <div className="space-y-3 text-sm">

          <p>

            Guest:
            <span className="text-white ml-2">

              {booking.guestName}

            </span>

          </p>

          <p>

            Check In:
            <span className="text-white ml-2">

              {booking.checkIn}

            </span>

          </p>

          <p>

            Check Out:
            <span className="text-white ml-2">

              {booking.CheckOut}

            </span>

          </p>

          <p>

            Guests:
            <span className="text-white ml-2">

              {booking.guests}

            </span>

          </p>

          <p>

            Total:
            <span className="text-[#d4a574] ml-2 font-semibold">

              ₹{booking.totalPrice}

            </span>

          </p>

        </div>

      </div>

    ))}

  </div>

</div>

    </div>

  );

}
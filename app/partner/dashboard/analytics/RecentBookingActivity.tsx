import { CheckCircle2, Clock3, Sparkles, XCircle } from "lucide-react";

type RecentBooking = {
  id?: string;
  status?: string;
  hotelName?: string;
  roomName?: string;
  guests?: string | number;
  totalPrice?: string | number;
  total?: string | number;
  checkIn?: string;
};

type RecentBookingActivityProps = {
  bookings: RecentBooking[];
};

export default function RecentBookingActivity({
  bookings,
}: RecentBookingActivityProps) {
  return (
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
      {bookings.length === 0 && (
        <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-14 text-center">
          <div className="w-20 h-20 rounded-full bg-[#d4a574]/10 flex items-center justify-center mx-auto mb-8">
            <Sparkles size={32} className="text-[#d4a574]" />
          </div>
          <h3 className="text-4xl font-semibold mb-5">
            No Reservation Activity Yet
          </h3>
          <p className="text-white/45 leading-8 max-w-2xl mx-auto">
            Reservation insights and hospitality analytics will automatically appear here once guests begin booking your luxury inventory.
          </p>
        </div>
      )}
      <div className="space-y-5">
        {bookings.slice(0, 6).map((booking) => (
          <div
            key={booking.id ?? `${booking.roomName}-${booking.checkIn}`}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border border-white/10 rounded-[28px] px-6 py-6 bg-white/[0.02]"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                {booking.status === "confirmed" ? (
                  <CheckCircle2 size={18} className="text-green-500" />
                ) : booking.status === "cancelled" ? (
                  <XCircle size={18} className="text-red-500" />
                ) : (
                  <Clock3 size={18} className="text-[#d4a574]" />
                )}
                <p className="capitalize text-sm text-white/60">
                  {booking.status || "confirmed"}
                </p>
              </div>
              <p className="text-2xl font-semibold mb-3">
                {booking.hotelName || booking.roomName}
              </p>
              <div className="flex flex-wrap gap-5 text-sm text-white/45">
                <p>Room: {booking.roomName}</p>
                <p>Guests: {booking.guests}</p>
              </div>
            </div>
            <div className="lg:text-right">
              <p className="text-[#d4a574] text-3xl font-semibold mb-3">
                ₹{booking.totalPrice || booking.total}
              </p>
              <p className="text-white/45">
                {booking.checkIn || "Upcoming Reservation"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

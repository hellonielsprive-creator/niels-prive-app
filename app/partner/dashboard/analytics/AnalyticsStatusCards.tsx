import { CheckCircle2, Clock3, XCircle } from "lucide-react";

type AnalyticsStatusCardsProps = {
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
};

export default function AnalyticsStatusCards({
  confirmedBookings,
  pendingBookings,
  cancelledBookings,
}: AnalyticsStatusCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
        <div className="flex items-center gap-4 mb-5">
          <CheckCircle2 className="text-green-500" size={24} />
          <h3 className="text-2xl font-semibold">Confirmed</h3>
        </div>
        <p className="text-5xl font-semibold mb-3">{confirmedBookings}</p>
        <p className="text-white/45">Successful reservations</p>
      </div>
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
        <div className="flex items-center gap-4 mb-5">
          <Clock3 className="text-[#d4a574]" size={24} />
          <h3 className="text-2xl font-semibold">Pending</h3>
        </div>
        <p className="text-5xl font-semibold mb-3">{pendingBookings}</p>
        <p className="text-white/45">Awaiting confirmation</p>
      </div>
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
        <div className="flex items-center gap-4 mb-5">
          <XCircle className="text-red-500" size={24} />
          <h3 className="text-2xl font-semibold">Cancelled</h3>
        </div>
        <p className="text-5xl font-semibold mb-3">{cancelledBookings}</p>
        <p className="text-white/45">Reservation cancellations</p>
      </div>
    </div>
  );
}

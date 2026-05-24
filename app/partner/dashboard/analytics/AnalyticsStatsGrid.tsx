import { BedDouble, CalendarDays, TrendingUp, Wallet } from "lucide-react";

type AnalyticsStatsGridProps = {
  totalRevenue: number;
  totalBookings: number;
  activeRooms: number;
  occupancyRate: number;
};

export default function AnalyticsStatsGrid({
  totalRevenue,
  totalBookings,
  activeRooms,
  occupancyRate,
}: AnalyticsStatsGridProps) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">
        <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-7">
          <Wallet className="text-[#d4a574]" size={28} />
        </div>
        <p className="text-white/45 mb-4">Total Revenue</p>
        <h2 className="text-4xl font-semibold mb-3">
          ₹{totalRevenue.toLocaleString()}
        </h2>
        <p className="text-[#d4a574] text-sm">Live reservation revenue</p>
      </div>
      <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">
        <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-7">
          <CalendarDays className="text-[#d4a574]" size={28} />
        </div>
        <p className="text-white/45 mb-4">Total Reservations</p>
        <h2 className="text-4xl font-semibold mb-3">{totalBookings}</h2>
        <p className="text-[#d4a574] text-sm">Connected bookings</p>
      </div>
      <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">
        <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-7">
          <BedDouble className="text-[#d4a574]" size={28} />
        </div>
        <p className="text-white/45 mb-4">Active Inventory</p>
        <h2 className="text-4xl font-semibold mb-3">{activeRooms}</h2>
        <p className="text-[#d4a574] text-sm">Luxury room operations</p>
      </div>
      <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">
        <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-7">
          <TrendingUp className="text-[#d4a574]" size={28} />
        </div>
        <p className="text-white/45 mb-4">Occupancy Rate</p>
        <h2 className="text-4xl font-semibold mb-3">{occupancyRate}%</h2>
        <p className="text-[#d4a574] text-sm">Reservation utilization</p>
      </div>
    </div>
  );
}

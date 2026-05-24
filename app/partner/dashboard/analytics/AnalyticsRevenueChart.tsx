"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

type RevenueDataPoint = {
  month: string;
  revenue: number;
};

type AnalyticsRevenueChartProps = {
  revenueData: RevenueDataPoint[];
};

export default function AnalyticsRevenueChart({
  revenueData,
}: AnalyticsRevenueChartProps) {
  return (
    <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 md:p-10 mb-10">
      <div className="mb-10">
        <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-4">
          REVENUE PERFORMANCE
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold mb-5">
          Revenue Growth
        </h2>
        <p className="text-white/45 leading-8 max-w-3xl">
          Monitor reservation momentum, hospitality performance, and revenue expansion across your luxury inventory operations.
        </p>
      </div>
      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4a574" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#d4a574" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#777" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#d4a574"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

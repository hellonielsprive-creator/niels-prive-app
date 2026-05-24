import { ArrowUpRight } from "lucide-react";

type AnalyticsHeaderProps = {
  router: {
    push: (href: string) => void;
  };
};

export default function AnalyticsHeader({ router }: AnalyticsHeaderProps) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-5">
          BUSINESS INTELLIGENCE
        </p>
        <button
          onClick={() => router.push("/partner/dashboard")}
          className="mb-7 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] transition-all"
        >
          ← Back To Dashboard
        </button>
        <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] tracking-[-0.05em]">
          Hospitality
          <br />
          Analytics
        </h1>
        <p className="text-white/45 mt-6 leading-8 max-w-3xl text-lg">
          Monitor booking performance, operational occupancy, revenue growth, and luxury hospitality insights powered by the Niels Privé ecosystem.
        </p>
      </div>
      <div className="bg-white/[0.04] border border-white/10 rounded-[30px] px-7 py-6 min-w-[260px]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#d4a574]/10 flex items-center justify-center">
            <ArrowUpRight className="text-[#d4a574]" />
          </div>
          <div>
            <p className="text-white/45 text-sm">Growth Momentum</p>
            <h3 className="text-3xl font-semibold">+28%</h3>
          </div>
        </div>
        <p className="text-white/45 leading-7 text-sm">
          Hospitality demand and reservation performance continue to grow across your luxury inventory.
        </p>
      </div>
    </div>
  );
}

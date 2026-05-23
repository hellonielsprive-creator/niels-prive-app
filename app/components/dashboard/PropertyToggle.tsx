"use client";

import {
  Eye,
  EyeOff,
} from "lucide-react";

export default function PropertyToggle({
  showPropertyOverview,
  setShowPropertyOverview,
  luxuryMode,
}: any) {

  return (

    <div className="flex justify-end px-10 pt-6">

      <button
        onClick={() =>
          setShowPropertyOverview(
            !showPropertyOverview
          )
        }
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all text-sm ${
          luxuryMode
            ? "border-[#e7dccd] bg-white text-black"
            : "border-white/10 bg-white/[0.04] text-white"
        }`}
      >

        {
          showPropertyOverview
            ? (
              <EyeOff size={18} />
            )
            : (
              <Eye size={18} />
            )
        }

        {
          showPropertyOverview
            ? "Hide Property Overview"
            : "Show Property Overview"
        }

      </button>

    </div>

  );

}
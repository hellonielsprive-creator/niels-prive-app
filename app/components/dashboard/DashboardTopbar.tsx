"use client";
import {
  Bell,
  Search,
} from "lucide-react";

export default function DashboardTopbar() {

  return (

    <div>
        {/* TOPBAR */}

        <div className="border-b border-white/10 px-10 py-6 flex items-center justify-between">

          <div>

            <p className="text-[#d4a574] tracking-[0.3em] text-xs mb-3">

              OVERVIEW

            </p>

            <h2 className="text-4xl font-semibold leading-tight">

              Welcome Back,
              <br />

              Luxury Partner
            </h2>

          </div>

          <div className="flex items-center gap-4">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                placeholder="Search dashboard..."
                className="bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none w-[260px]"
              />

            </div>

            <button className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">

              <Bell size={20} />

            </button>

          </div>

        </div>

    </div>

  );

}
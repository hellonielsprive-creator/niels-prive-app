"use client";

import {
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

type RoomsHeaderProps = {
  router: any;
  search: string;
  setSearch: any;
};

export default function RoomsHeader({
  router,
  search,
  setSearch,
}: RoomsHeaderProps) {

  return (

    <div className="flex items-center justify-between mb-14 flex-wrap gap-6">

      <div>

        <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-5">

          ROOM MANAGEMENT

        </p>

        <button
          onClick={() =>
            router.push(
              "/partner/dashboard"
            )
          }
          className="mb-7 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
        >

          ← Back To Dashboard

        </button>

        <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] tracking-[-0.05em]">

          Hospitality
          <br />
          Inventory

        </h1>

        <p className="text-white/45 mt-6 leading-8 max-w-3xl text-lg">

          Manage room availability, hospitality operations, occupancy performance, and guest inventory experiences.

        </p>

      </div>

      {/* SEARCH + ACTION */}

      <div className="flex items-center gap-4 flex-wrap">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search rooms..."
            className="bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none w-[280px]"
          />

        </div>

        <button
          onClick={() =>
            router.push(
              "/partner/dashboard/rooms/add"
            )
          }
          className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-6 py-4 rounded-2xl font-medium flex items-center gap-3"
        >

          <Plus size={20} />

          Add New Room

        </button>

      </div>

    </div>

  );

}
"use client";

import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  BedDouble,
  Images,
  CalendarDays,
  Wallet,
  BarChart3,
  BadgeCheck,
  Settings,
} from "lucide-react";

export default function DashboardSidebar() {
  const router = useRouter();

  return (

    <div>
<aside className="w-[290px] border-r border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 flex flex-col justify-between">

        <div>

          <div className="mb-14">

            <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-4">

              NIELS PRIVÉ

            </p>

            <h1 className="text-3xl font-semibold leading-tight">

              Partner
              <br />
              Dashboard

            </h1>

          </div>

          <div className="space-y-3">

            <button className="w-full flex items-center gap-4 bg-[#d4a574] text-black px-5 py-4 rounded-2xl font-medium">

              <LayoutDashboard size={20} />

              Overview

            </button>

           <button
  onClick={() =>
    router.push("/partner/dashboard/property")
  }
  className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all"
>

              <Building2 size={20} />

              Property

            </button>

           <button
  onClick={() =>
    router.push("/partner/dashboard/rooms")
  }
  className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all"
>

              <BedDouble size={20} />

              Rooms

            </button>

          <button
  onClick={() =>
    router.push("/partner/dashboard/gallery")
  }
  className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all"
>
              <Images size={20} />

              Gallery

            </button>

            <button
  onClick={() =>
    router.push("/partner/dashboard/reservations")
  }
  className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all"
>
              <CalendarDays size={20} />

              Reservations

            </button>

            <button
  onClick={() =>
    router.push("/partner/dashboard/pricing")
  }
  className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all"
>
              <Wallet size={20} />

              Pricing

            </button>

            <button
  onClick={() =>
    router.push(
      "/partner/dashboard/analytics"
    )
  }
  className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all"
>

  <BarChart3 size={20} />

  Analytics

</button>

            <button
  onClick={() =>
    router.push("/partner/dashboard/verification")
  }
  className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all"
>

              <BadgeCheck size={20} />

              Verification

            </button>

            <button
  onClick={() =>
    router.push("/partner/dashboard/settings")
  }
  className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all"
>

              <Settings size={20} />

              Settings

            </button>

          </div>

        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">

          <p className="text-[#d4a574] text-sm mb-3">

            PROPERTY STATUS

          </p>

          <h3 className="text-2xl font-semibold mb-4">

            Verification
            <br />
            Pending

          </h3>

          <p className="text-neutral-400 leading-7 text-sm mb-6">

            Complete onboarding and verification
            to activate global visibility.

          </p>

          <button className="w-full bg-[#d4a574] text-black py-4 rounded-2xl font-medium">

            Continue Setup

          </button>

        </div>

      </aside>

    </div>

  );

}
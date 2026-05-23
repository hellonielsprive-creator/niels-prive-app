"use client";

import { useState } from "react";

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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function DashboardSidebar() {

  const router = useRouter();

  const [
    collapsed,
    setCollapsed,
  ] = useState(false);

  const menuItems = [

    {
      label: "Overview",
      icon: LayoutDashboard,
      active: true,
      action: () => {},
    },

    {
      label: "Property",
      icon: Building2,
      action: () =>
        router.push(
          "/partner/dashboard/property"
        ),
    },

    {
      label: "Rooms",
      icon: BedDouble,
      action: () =>
        router.push(
          "/partner/dashboard/rooms"
        ),
    },

    {
      label: "Gallery",
      icon: Images,
      action: () =>
        router.push(
          "/partner/dashboard/gallery"
        ),
    },

    {
      label: "Reservations",
      icon: CalendarDays,
      action: () =>
        router.push(
          "/partner/dashboard/reservations"
        ),
    },

    {
      label: "Pricing",
      icon: Wallet,
      action: () =>
        router.push(
          "/partner/dashboard/pricing"
        ),
    },

    {
      label: "Analytics",
      icon: BarChart3,
      action: () =>
        router.push(
          "/partner/dashboard/analytics"
        ),
    },

    {
      label: "Verification",
      icon: BadgeCheck,
      action: () =>
        router.push(
          "/partner/dashboard/verification"
        ),
    },

    {
      label: "Settings",
      icon: Settings,
      action: () =>
        router.push(
          "/partner/dashboard/settings"
        ),
    },

  ];

  return (

    <aside
      className={`border-r border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 flex flex-col transition-all duration-300 ${
        collapsed
          ? "w-[110px]"
          : "w-[290px]"
      }`}
    >

      {/* TOP */}

      <div className="flex items-start justify-between mb-14">

        {

          !collapsed && (

            <div>

              <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-4">

                NIELS PRIVÉ

              </p>

              <h1 className="text-3xl font-semibold leading-tight">

                Partner
                <br />
                Dashboard

              </h1>

            </div>

          )

        }

        <button
          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }
          className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all flex items-center justify-center"
        >

          {
            collapsed
              ? (
                <PanelLeftOpen size={20} />
              )
              : (
                <PanelLeftClose size={20} />
              )
          }

        </button>

      </div>

      {/* MENU */}

      <div className="space-y-3 flex-1">

        {

          menuItems.map(
            (
              item: any,
              index: number
            ) => {

              const Icon =
                item.icon;

              return (

                <button
                  key={index}
                  onClick={
                    item.action
                  }
                  className={`w-full flex items-center ${
                    collapsed
                      ? "justify-center"
                      : "gap-4"
                  } px-5 py-4 rounded-2xl transition-all font-medium ${
                    item.active
                      ? "bg-[#d4a574] text-black"
                      : "hover:bg-white/[0.05]"
                  }`}
                >

                  <Icon size={20} />

                  {

                    !collapsed && (
                      item.label
                    )

                  }

                </button>

              );

            }
          )

        }

      </div>

    </aside>

  );

}
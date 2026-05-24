"use client";

import { memo, useMemo, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

const menuConfig = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/partner/dashboard",
  },
  {
    label: "Property",
    icon: Building2,
    href: "/partner/dashboard/property",
  },
  {
    label: "Rooms",
    icon: BedDouble,
    href: "/partner/dashboard/rooms",
  },
  {
    label: "Gallery",
    icon: Images,
    href: "/partner/dashboard/gallery",
  },
  {
    label: "Reservations",
    icon: CalendarDays,
    href: "/partner/dashboard/reservations",
  },
  {
    label: "Pricing",
    icon: Wallet,
    href: "/partner/dashboard/pricing",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/partner/dashboard/analytics",
  },
  {
    label: "Verification",
    icon: BadgeCheck,
    href: "/partner/dashboard/verification",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/partner/dashboard/settings",
  },
] as const;

function isActiveRoute(
  pathname: string,
  href: string
) {
  if (href === "/partner/dashboard") {
    return pathname === href;
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

function DashboardSidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] =
    useState(false);

  const menuItems = useMemo(
    () =>
      menuConfig.map((item) => ({
        ...item,
        active: isActiveRoute(
          pathname,
          item.href
        ),
      })),
    [pathname]
  );

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

                <Link
                  key={item.href}
                  href={item.href}
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

                </Link>

              );

            }
          )

        }

      </div>

    </aside>

  );
}

export default memo(DashboardSidebar);
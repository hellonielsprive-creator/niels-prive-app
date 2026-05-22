"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Briefcase,
  TicketPercent,
  User,
} from "lucide-react";

export default function MobileBottomNav() {

  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Trips",
      href: "/account",
      icon: Briefcase,
    },
    {
      label: "Deals",
      href: "/deals",
      icon: TicketPercent,
    },
    {
      label: "Account",
      href: "/account",
      icon: User,
    },
  ];

  return (

    <div className="lg:hidden fixed bottom-0 left-0 w-full z-[120]">

      <div className="mx-3 mb-3 rounded-[28px] border border-white/10 bg-black/90 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.35)]">

        <div className="grid grid-cols-4 items-center py-3">

          {
            navItems.map((item) => {

              const Icon = item.icon;

              const active =
                pathname === item.href;

              return (

                <Link
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-1 py-2 transition-all duration-300"
                >

                  <div
                    className={`
                      transition-all duration-300
                      ${
                        active
                          ? "text-[#E7C58A] scale-110"
                          : "text-white/45"
                      }
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  <p
                    className={`
                      text-[11px] tracking-wide transition-all duration-300
                      ${
                        active
                          ? "text-[#E7C58A]"
                          : "text-white/45"
                      }
                    `}
                  >
                    {item.label}
                  </p>

                </Link>

              );

            })
          }

        </div>

      </div>

    </div>

  );

}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Hotel,
  Plane,
  Briefcase,
  Heart,
  TicketPercent,
  User,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";

interface MobileMenuProps {
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
}

export default function MobileMenu({
  mobileMenu,
  setMobileMenu,
}: MobileMenuProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Hotels", href: "/hotel", icon: Hotel },
    { label: "Flights", href: "/flights", icon: Plane },
    { label: "Trips", href: "/account", icon: Briefcase },
    { label: "Saved", href: "/saved", icon: Heart },
    { label: "Deals", href: "/deals", icon: TicketPercent },
    { label: "Account", href: "/account", icon: User },
    { label: "AI Concierge", href: "#", icon: Sparkles, action: () => {} },
    { label: "Partner With Us", href: "/partner/signup", icon: UserPlus },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          mobileMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenu(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-[100] h-full w-[85%] max-w-[360px] bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-r border-white/10 shadow-[20px_0_80px_rgba(0,0,0,0.6)] transform transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Niels <span className="text-[#E7C58A]">Privé</span>
              </h2>
              <p className="text-white/50 text-sm mt-1">Luxury Travel</p>
            </div>
            <button
              onClick={() => setMobileMenu(false)}
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      item.action();
                    }
                    setMobileMenu(false);
                  }}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-400 ${
                    active
                      ? "bg-[#E7C58A]/10 text-[#E7C58A] border border-[#E7C58A]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className={active ? "scale-110" : ""}>
                    <Icon size={22} />
                  </div>
                  <span className="text-lg font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs text-center">
              © 2026 Niels Privé. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

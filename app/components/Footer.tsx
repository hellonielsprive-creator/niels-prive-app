"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="relative overflow-hidden bg-[#050505] text-white mt-20 border-t border-white/10">
      {/* AMBIENT GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E7C58A]/12 blur-[140px] rounded-full pointer-events-none"></div>

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* BRAND */}
          <div className="lg:col-span-1">
            <h2 className="text-[32px] font-semibold tracking-[-0.03em] mb-5">
              Niels <span className="text-[#E7C58A]">Privé</span>
            </h2>
            <p className="text-white/50 leading-relaxed text-sm mb-6">
              Curated luxury stays, premium flights, and elevated travel experiences crafted for modern explorers.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="text-white/80 font-semibold mb-5 text-sm uppercase tracking-[0.3em]">
              Explore
            </h3>
            <div className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "Hotels", href: "/hotel" },
                { label: "Flights", href: "/flights" },
                { label: "Deals", href: "/deals" },
                { label: "Saved", href: "/saved" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="block text-white/40 hover:text-[#E7C58A] transition-all duration-300 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-white/80 font-semibold mb-5 text-sm uppercase tracking-[0.3em]">
              Company
            </h3>
            <div className="space-y-4">
              {[
                { label: "About", href: "/about" },
                { label: "Become a Partner", href: "/partner" },
                { label: "Support", href: "/support" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="block text-white/40 hover:text-[#E7C58A] transition-all duration-300 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-white/80 font-semibold mb-5 text-sm uppercase tracking-[0.3em]">
              Legal
            </h3>
            <div className="space-y-4">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Cookies Policy", href: "/cookies" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="block text-white/40 hover:text-[#E7C58A] transition-all duration-300 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <p className="text-white/25 text-xs tracking-wide">
            © 2026 Niels Privé. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-white/30 text-xs">
            <p className="hover:text-white transition">Bangalore, India</p>
            <p className="hover:text-white transition">hello.nielsprive@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

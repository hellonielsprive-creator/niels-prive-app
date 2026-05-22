"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer
      id="support"
      className="relative overflow-hidden bg-[#050505] md:bg-[#050505] bg-[#0f0f11] text-white md:mt-20 mt-12 border-t border-white/10"
    >

      {/* AMBIENT GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#E7C58A]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* TOP */}
        <div className="flex flex-col gap-8">

          {/* BRAND */}
          <div>

            <h2 className="text-[32px] font-semibold tracking-[-0.03em]">
              Niels{" "}
              <span className="text-[#E7C58A]">
                Privé
              </span>
            </h2>

            <p className="text-white/50 mt-4 leading-relaxed max-w-sm text-sm">
              Curated luxury stays, premium flights, and elevated travel
              experiences crafted for modern explorers.
            </p>

          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/40">

            {[
              "About",
              "Stays",
              "Flights",
              "Support",
            ].map((item, index) => (

              <p
                key={index}
                className="cursor-pointer transition-all duration-300 hover:text-white hover:-translate-y-[1px]"
              >
                {item}
              </p>

            ))}

          </div>

          {/* PARTNERSHIP */}
          <button
          onClick={() =>
  router.push("/partner")
}
            className="
              w-fit
              text-sm
              text-[#E7C58A]/45
              hover:text-[#E7C58A]
              transition-all
              duration-300
            "
          >
            Hospitality Partnerships
          </button>

          {/* CONTACT */}
          <div className="space-y-2 text-sm text-white/35">

            <p className="hover:text-white transition">
              hello.nielsprive@gmail.com
            </p>

            <p>
              Bangalore, India
            </p>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          <p className="text-white/25 text-xs tracking-wide">
            ©️ 2026 Niels Privé. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-white/25 text-xs">

            {[
              "Privacy",
              "Terms",
              "Cookies",
            ].map((item, index) => (

              <p
                key={index}
                className="cursor-pointer transition hover:text-white"
              >
                {item}
              </p>

            ))}

          </div>

        </div>

      </div>

    </footer>
  );
}
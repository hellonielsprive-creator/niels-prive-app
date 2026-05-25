"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";

const destinations = [
  "Goa",
  "Kerala",
  "Maldives",
  "Dubai",
  "Switzerland",
  "France"
];

export default function Hero() {
  const [currentDest, setCurrentDest] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDest((prev) => (prev + 1) % destinations.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-[#050505]">
      {/* Animated Layered Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#1a1a1a]"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#E7C58A]/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#C8A96B]/8 blur-[100px] animate-[pulse_14s_ease-in-out_infinite_reverse]"></div>

      {/* Floating Luxury Destinations */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {destinations.map((dest, idx) => (
          <div
            key={dest}
            className={`absolute text-white/10 text-4xl md:text-6xl font-bold tracking-tighter transition-all duration-1000 ease-in-out ${
              idx === currentDest
                ? "opacity-40 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-4"
            }`}
            style={{
              left: `${10 + idx * 15}%`,
              top: `${20 + (idx % 3) * 20}%`,
              transitionDelay: `${idx * 100}ms`
            }}
          >
            {dest}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <p className="uppercase tracking-[0.4em] text-white/50 text-xs md:text-sm mb-6">
          Niels Privé
        </p>

        <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-semibold leading-tight max-w-5xl mb-4">
          Luxury Hospitality
          <br />
          Reimagined
        </h1>

        <p className="text-white/60 text-sm md:text-lg max-w-2xl mb-10">
          AI‑native luxury travel experiences, curated for the modern explorer.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="relative flex items-center gap-3 px-5 py-4 bg-white/5 rounded-[24px] border border-white/10">
              <MapPin size={18} className="text-[#E7C58A]" />
              <input
                type="text"
                placeholder="Where to?"
                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm"
              />
            </div>

            <div className="relative flex items-center gap-3 px-5 py-4 bg-white/5 rounded-[24px] border border-white/10">
              <Calendar size={18} className="text-[#E7C58A]" />
              <input
                type="text"
                placeholder="Check In"
                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm"
              />
            </div>

            <div className="relative flex items-center gap-3 px-5 py-4 bg-white/5 rounded-[24px] border border-white/10">
              <Calendar size={18} className="text-[#E7C58A]" />
              <input
                type="text"
                placeholder="Check Out"
                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm"
              />
            </div>

            <div className="relative flex items-center gap-3 px-5 py-4 bg-white/5 rounded-[24px] border border-white/10">
              <Users size={18} className="text-[#E7C58A]" />
              <input
                type="text"
                placeholder="Guests"
                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm"
              />
            </div>

            <button className="bg-[#E7C58A] hover:bg-[#C8A96B] transition-all text-black rounded-[24px] px-6 py-4 font-semibold flex items-center justify-center gap-2">
              <Search size={18} />
              Discover
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#f8f8f6]/30 to-[#f8f8f6] z-30 pointer-events-none"></div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  Plane,
  Hotel,
  Home,
  Globe,
  BriefcaseBusiness,
} from "lucide-react";
export default function Navbar() {

  const [open, setOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 500);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <>
      <nav
 className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl rounded-full overflow-hidden transition-all duration-500 ${
  scrolled
    ? "bg-white/20 text-black backdrop-blur-xl border border-white/20"
    : "bg-white/10 text-white backdrop-blur-xl border border-white/10"
}`}
  
>

        <div className="rounded-full border border-white/10 backdrop-blur-xl px-10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">

          <div className="flex items-center justify-between">

            <div className="flex items-center">

              <h1
  className={`text-[28px] font-semibold tracking-[-0.5px] transition-all duration-500 ${
    scrolled ? "text-black" : "text-white"
  }`}
>
                Niels <span className="text-[#E7C58A]">Privé</span>
              </h1>

              <div className="hidden lg:flex items-center gap-8 text-[15px] ml-32">

<a
  href="/"
  className={`group relative transition-all duration-300 ${
    scrolled
      ? "text-black/80 hover:text-[#E7C58A]"
      : "text-white/80 hover:text-[#E7C58A]"
  }`}
>
  <div className="flex items-center gap-2">
  <Home size={18} />
  Home
</div>
  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#E7C58A] transition-all duration-300 group-hover:w-full"></span>
</a>
                <a
                  href="/#destinations"
                  className={`group relative transition-all duration-300 ${
  scrolled
    ? "text-black/80 hover:text-[#E7C58A]"
    : "text-white/80 hover:text-[#E7C58A]"
}`}
                >
                  <div className="flex items-center gap-2">
  <Globe size={18} />
  Destinations
</div>
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#E7C58A] transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a
                  href="/hotel"
                  className={`group relative transition-all duration-300 ${
  scrolled
    ? "text-black/80 hover:text-[#E7C58A]"
    : "text-white/80 hover:text-[#E7C58A]"
}`}
                >
                  <div className="flex items-center gap-2">
  <Hotel size={18} />
  Hotels
</div>
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#E7C58A] transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a
  href="/flights"
  className={`group relative transition-all duration-300 ${
    scrolled
      ? "text-black/80 hover:text-[#E7C58A]"
      : "text-white/80 hover:text-[#E7C58A]"
  }`}
>
  <div className="flex items-center gap-2">
  <Plane size={18} />
  Flights
</div>
  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#E7C58A] transition-all duration-300 group-hover:w-full"></span>
</a>
                <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("support")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
className={`group relative transition-all duration-300 ${
  scrolled
    ? "text-black/80 hover:text-[#E7C58A]"
    : "text-white/80 hover:text-[#E7C58A]"
}`}
                
                >
                  <div className="flex items-center gap-2">
  <BriefcaseBusiness size={18} />
  Support
</div>
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#E7C58A] transition-all duration-300 group-hover:w-full"></span>
                </a>
                
                <a
                    href="#support"
                    className={`relative transition-all duration-300 ${
  scrolled
    ? "text-black/80 hover:text-[#E7C58A]"
    : "text-white/80 hover:text-[#E7C58A]"
}`}
>       </a>
              </div>

            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1d1d1f] transition-all duration-300"
            >
              Sign In
            </button>

          </div>

        </div>

      </nav>

      {open && (

        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-md rounded-[36px] p-8 relative shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-black/40 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-4xl font-semibold text-black tracking-[-1px]">
              Welcome Back
            </h2>

            <p className="text-black/60 mt-3 leading-relaxed">
              Continue your premium hospitality experience.
            </p>

            <div className="mt-8 space-y-4">

              <button className="w-full border border-black/10 rounded-2xl py-4 text-black font-medium hover:bg-black/5 transition">
                Continue with Google
              </button>

              <button className="w-full border border-black/10 rounded-2xl py-4 text-black font-medium hover:bg-black/5 transition">
                Continue with Apple
              </button>

              <div className="text-center text-black/30 text-sm py-1">
                OR
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#f5f5f7] rounded-2xl px-5 py-4 outline-none text-black"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#f5f5f7] rounded-2xl px-5 py-4 outline-none text-black"
              />

              <button className="w-full bg-black text-white rounded-2xl py-4 font-medium hover:bg-[#1d1d1f] transition">
                Sign In
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  );
}
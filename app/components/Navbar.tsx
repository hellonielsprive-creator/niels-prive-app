"use client";

import { useEffect, useState } from "react";

import { auth } from "@/app/firebase/config";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  Plane,
  Hotel,
  Home,
  Globe,
  BriefcaseBusiness,
  Menu,
} from "lucide-react";

import MobileMenu from "./MobileMenu";

export default function Navbar() {

  const [user, setUser] =
    useState<any>(null);

  const [open, setOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
        }
      );

    return () => unsubscribe();

  }, []);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

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

        <div className="rounded-full border border-white/10 backdrop-blur-xl px-5 md:px-10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">

          <div className="flex items-center justify-between">

            {/* LEFT */}

            <div className="flex items-center">

              <h1
                className={`text-[24px] md:text-[28px] font-semibold tracking-[-0.5px] transition-all duration-500 ${
                  scrolled
                    ? "text-black"
                    : "text-white"
                }`}
              >
                Niels{" "}
                <span className="text-[#E7C58A]">
                  Privé
                </span>
              </h1>

              {/* DESKTOP NAV */}

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

                    document
                      .getElementById("support")
                      ?.scrollIntoView({
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

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-3">

              {/* MOBILE MENU BUTTON */}

              <button
                onClick={() =>
                  setOpen(true)
                }
                className={`lg:hidden flex items-center justify-center w-11 h-11 rounded-full transition-all duration-500 ${
                  scrolled
                    ? "bg-black/5 text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                <Menu size={20} />
              </button>

              {/* AUTH BUTTON */}

              {
                user ? (

                  <button
                    onClick={() =>
                      signOut(auth)
                    }
                    className="bg-black text-white px-5 md:px-6 py-3 rounded-full text-sm transition-all duration-300 hover:scale-[1.03]"
                  >
                    Sign Out
                  </button>

                ) : (

                  <a
                    href="/signin"
                    className="bg-black text-white px-5 md:px-6 py-3 rounded-full text-sm transition-all duration-300 hover:scale-[1.03]"
                  >
                    Sign In
                  </a>

                )
              }

            </div>

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}

      {
        open && (
         <MobileMenu
  mobileMenu={open}
  setMobileMenu={setOpen}
/>
        )
      }

    </>

  );

}
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "../firebase/config";
import {
  Moon,
  Sun,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Wallet,
  CalendarDays,
  Users,
  MapPin,
  Sparkles,
  CreditCard,
  BadgeCheck,
  Hotel,
  LockKeyhole,
} from "lucide-react";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [darkMode, setDarkMode] = useState(true);
  const [processing, setProcessing] = useState(false);

  const roomName = searchParams.get("roomName") || "Premium Suite";
  const hotelName = searchParams.get("hotelName") || "The Royal Atlantis";
  const guests = searchParams.get("guests") || "2";
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const totalPrice = searchParams.get("totalPrice") || "0";

  const calculateNightCount = () => {
    if (!checkIn || !checkOut) return 3;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nightCount = calculateNightCount();
  const roomPricePerNight = parseInt(totalPrice) || 0;
  const taxes = Math.round(roomPricePerNight * 0.1);
  const advancePayment = Math.round(roomPricePerNight * 0.3);
  const totalReservation = roomPricePerNight + taxes;

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/signin");
    }
  }, []);

  return (
    <main
      className={`min-h-screen transition-all duration-500 overflow-hidden relative ${
        darkMode
          ? "bg-[#050505] text-white"
          : "bg-[#f6f2eb] text-black"
      }`}
    >
      {/* BACKGROUND EFFECTS */}

      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.12),transparent_50%)] pointer-events-none" />

      <div className="absolute top-[-200px] right-[-120px] w-[500px] h-[500px] rounded-full bg-[#d4a574]/10 blur-[140px] pointer-events-none" />

      {/* PAGE */}

      <section className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-14">
        {/* TOPBAR */}

        <div className="flex items-start justify-between gap-5 mb-12 flex-wrap">
          <div>
            <p
              className={`uppercase tracking-[0.35em] text-[10px] mb-4 ${
                darkMode
                  ? "text-[#d4a574]"
                  : "text-[#8a6a3e]"
              }`}
            >
              Niels Privé Checkout
            </p>

            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-5">
              Secure Your Reservation
            </h1>

            <p
              className={`text-sm md:text-base leading-8 max-w-2xl ${
                darkMode
                  ? "text-white/50"
                  : "text-black/55"
              }`}
            >
              Complete your luxury hospitality reservation through the premium Niels Privé booking experience powered by enterprise-grade reservation infrastructure.
            </p>
          </div>

          {/* THEME BUTTON */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              darkMode
                ? "bg-white/[0.04] border border-white/10"
                : "bg-white border border-black/10"
            }`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* LIVE STATUS */}

        <div
          className={`mb-8 rounded-[28px] border px-6 py-5 flex flex-wrap items-center justify-between gap-5 ${
            darkMode
              ? "bg-white/[0.03] border-white/10"
              : "bg-white border-black/10"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <BadgeCheck
                size={26}
                className="text-green-400"
              />
            </div>

            <div>
              <p className="text-lg font-semibold">
                Reservation Session Active
              </p>

              <p
                className={
                  darkMode
                    ? "text-white/45"
                    : "text-black/45"
                }
              >
                Secure booking protection enabled
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

            <p
              className={
                darkMode
                  ? "text-white/50"
                  : "text-black/50"
              }
            >
              Live checkout environment
            </p>
          </div>
        </div>

        {/* GRID */}

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* LEFT SIDE */}

          <div>
            {/* PROPERTY CARD */}

            <div
              className={`rounded-[38px] overflow-hidden border mb-8 ${
                darkMode
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white border-black/10"
              }`}
            >
              {/* IMAGE */}

              <div className="relative h-[340px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2400&auto=format&fit=crop"
                  alt="Luxury Stay"
                  className="w-full h-full object-cover scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)]" />

                {/* LIVE BADGE */}

                <div className="absolute top-6 right-6">
                  <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white text-sm font-medium">
                    Premium Verified Stay
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-8">
                  <p className="uppercase tracking-[0.3em] text-[10px] text-white/60 mb-3">
                    Luxury Stay
                  </p>

                  <h2 className="text-white text-5xl font-semibold mb-4">
                    {hotelName}
                  </h2>

                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin size={16} />
                    Palm Jumeirah Waterfront
                  </div>
                </div>
              </div>

              {/* DETAILS */}

              <div className="p-7">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`rounded-[26px] p-5 ${
                      darkMode
                        ? "bg-white/[0.03] border border-white/10"
                        : "bg-black/[0.03] border border-black/10"
                    }`}
                  >
                    <CalendarDays
                      size={22}
                      className="text-[#d4a574] mb-4"
                    />

                    <p
                      className={`text-sm mb-2 ${
                        darkMode
                          ? "text-white/45"
                          : "text-black/45"
                      }`}
                    >
                      Stay Duration
                    </p>

                    <h3 className="text-2xl font-semibold">
                      {nightCount} Night{nightCount !== 1 ? "s" : ""}
                    </h3>
                  </div>

                  <div
                    className={`rounded-[26px] p-5 ${
                      darkMode
                        ? "bg-white/[0.03] border border-white/10"
                        : "bg-black/[0.03] border border-black/10"
                    }`}
                  >
                    <Users
                      size={22}
                      className="text-[#d4a574] mb-4"
                    />

                    <p
                      className={`text-sm mb-2 ${
                        darkMode
                          ? "text-white/45"
                          : "text-black/45"
                      }`}
                    >
                      Guests
                    </p>

                    <h3 className="text-2xl font-semibold">
                      {guests} Guest{guests !== "1" ? "s" : ""}
                    </h3>
                  </div>

                  <div
                    className={`rounded-[26px] p-5 ${
                      darkMode
                        ? "bg-white/[0.03] border border-white/10"
                        : "bg-black/[0.03] border border-black/10"
                    }`}
                  >
                    <Hotel
                      size={22}
                      className="text-[#d4a574] mb-4"
                    />

                    <p
                      className={`text-sm mb-2 ${
                        darkMode
                          ? "text-white/45"
                          : "text-black/45"
                      }`}
                    >
                      Reservation
                    </p>

                    <h3 className="text-2xl font-semibold">
                      {roomName}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* SECURITY */}

            <div
              className={`rounded-[36px] p-7 ${
                darkMode
                  ? "bg-white/[0.03] border border-white/10"
                  : "bg-white border border-black/10"
              }`}
            >
              <div className="flex gap-5">
                <div className="w-16 h-16 rounded-3xl bg-[#d4a574]/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck
                    className="text-[#d4a574]"
                    size={26}
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-semibold mb-4">
                    Enterprise Reservation Protection
                  </h3>

                  <p
                    className={`leading-8 ${
                      darkMode
                        ? "text-white/50"
                        : "text-black/55"
                    }`}
                  >
                    Your reservation remains secured while payment confirmation is processed through encrypted hospitality infrastructure and real-time booking protection systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div>
            <div
              className={`sticky top-10 rounded-[38px] overflow-hidden border ${
                darkMode
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white border-black/10"
              }`}
            >
              {/* HEADER */}

              <div className="p-7 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="uppercase tracking-[0.25em] text-[#d4a574] text-xs mb-3">
                      Payment Summary
                    </p>

                    <h2 className="text-3xl font-semibold">
                      Reservation Overview
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-[#d4a574]/10 flex items-center justify-center">
                    <CreditCard
                      size={24}
                      className="text-[#d4a574]"
                    />
                  </div>
                </div>
              </div>

              {/* PRICE LIST */}

              <div className="p-7">
                <div className="space-y-6 mb-8">
                  <div className="flex items-center justify-between">
                    <p
                      className={
                        darkMode
                          ? "text-white/50"
                          : "text-black/50"
                      }
                    >
                      {roomName}
                    </p>

                    <p className="font-semibold">
                      ₹{roomPricePerNight.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p
                      className={
                        darkMode
                          ? "text-white/50"
                          : "text-black/50"
                      }
                    >
                      Taxes & Hospitality
                    </p>

                    <p className="font-semibold">
                      ₹{taxes.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p
                      className={
                        darkMode
                          ? "text-white/50"
                          : "text-black/50"
                      }
                    >
                      Advance Payment
                    </p>

                    <p className="text-[#d4a574] font-semibold">
                      ₹{advancePayment.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* TOTAL */}

                <div
                  className={`border-t pt-6 flex items-center justify-between mb-8 ${
                    darkMode
                      ? "border-white/10"
                      : "border-black/10"
                  }`}
                >
                  <div>
                    <p
                      className={
                        darkMode
                          ? "text-white/45"
                          : "text-black/45"
                      }
                    >
                      Total Reservation
                    </p>

                    <p className="text-sm mt-2 text-[#d4a574]">
                      Flexible cancellation included
                    </p>
                  </div>

                  <h3 className="text-5xl font-semibold">
                    ₹{totalReservation.toLocaleString()}
                  </h3>
                </div>

                {/* PAYMENT METHODS */}

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div
                    className={`rounded-[24px] p-5 border ${
                      darkMode
                        ? "bg-white/[0.03] border-white/10"
                        : "bg-black/[0.03] border-black/10"
                    }`}
                  >
                    <Wallet
                      size={24}
                      className="text-[#d4a574] mb-4"
                    />

                    <h3 className="font-semibold mb-2">
                      UPI Payment
                    </h3>

                    <p
                      className={
                        darkMode
                          ? "text-white/45 text-sm"
                          : "text-black/45 text-sm"
                      }
                    >
                      Instant secure transfer
                    </p>
                  </div>

                  <div
                    className={`rounded-[24px] p-5 border ${
                      darkMode
                        ? "bg-white/[0.03] border-white/10"
                        : "bg-black/[0.03] border-black/10"
                    }`}
                  >
                    <LockKeyhole
                      size={24}
                      className="text-[#d4a574] mb-4"
                    />

                    <h3 className="font-semibold mb-2">
                      Encrypted Flow
                    </h3>

                    <p
                      className={
                        darkMode
                          ? "text-white/45 text-sm"
                          : "text-black/45 text-sm"
                      }
                    >
                      Protected hospitality checkout
                    </p>
                  </div>
                </div>

                {/* QR SECTION */}

                <div
                  className={`rounded-[32px] border border-dashed p-8 text-center mb-7 ${
                    darkMode
                      ? "border-[#d4a574]/20 bg-[#d4a574]/5"
                      : "border-[#8a6a3e]/20 bg-[#f8f3eb]"
                  }`}
                >
                  <div
                    className={`w-[210px] h-[210px] rounded-[34px] mx-auto flex items-center justify-center mb-6 ${
                      darkMode
                        ? "bg-black/30 border border-white/10"
                        : "bg-white border border-black/10"
                    }`}
                  >
                    <div>
                      <Sparkles
                        size={34}
                        className="text-[#d4a574] mx-auto mb-4"
                      />

                      <p className="text-[#d4a574] tracking-[0.25em] text-xs">
                        SECURE QR PAYMENT
                      </p>
                    </div>
                  </div>

                  <p
                    className={`text-sm leading-8 ${
                      darkMode
                        ? "text-white/50"
                        : "text-black/50"
                    }`}
                  >
                    Scan to securely complete your reservation payment through the premium Niels Privé checkout infrastructure.
                  </p>
                </div>

                {/* BUTTON */}

                <button
                  onClick={() => {
                    setProcessing(true);

                    setTimeout(() => {
                      setProcessing(false);

                      alert(
                        "Luxury reservation confirmed successfully"
                      );
                    }, 2500);
                  }}
                  disabled={processing}
                  className="w-full bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black rounded-[26px] py-5 font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {processing
                    ? "Securing Reservation..."
                    : "Complete Secure Payment"}

                  <ArrowRight size={20} />
                </button>

                {/* VERIFIED */}

                <div
                  className={`mt-7 rounded-[28px] p-6 flex gap-4 ${
                    darkMode
                      ? "bg-white/[0.03]"
                      : "bg-black/[0.03]"
                  }`}
                >
                  <CheckCircle2
                    className="text-[#d4a574] mt-1"
                    size={22}
                  />

                  <div>
                    <p className="font-medium mb-2">
                      Verified Reservation Infrastructure
                    </p>

                    <p
                      className={`text-sm leading-7 ${
                        darkMode
                          ? "text-white/50"
                          : "text-black/55"
                      }`}
                    >
                      Your reservation is protected through encrypted hospitality verification, operational booking intelligence, and enterprise-grade payment protection systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className={`min-h-screen flex items-center justify-center bg-[#050505] text-white`}>
      <p className="text-lg">Loading checkout...</p>
    </div>}>
      <PaymentContent />
    </Suspense>
  );
}

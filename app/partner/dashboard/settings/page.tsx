"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Bell,
  Globe,
  Wallet,
  Shield,
  User,
  Building2,
  LifeBuoy,
  MoonStar,
  LayoutDashboard,
} from "lucide-react";

export default function SettingsPage() {

  const router = useRouter();

  const [notifications, setNotifications] =
    useState(true);

  const [marketingEmails, setMarketingEmails] =
    useState(false);

  const [dashboardMode, setDashboardMode] =
    useState("Professional");

  return (

    <main className="min-h-screen bg-[#050505] text-white">

      <section className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER */}

        <div className="mb-14">

          <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

            PARTNER CONTROL CENTER

          </p>

          <button
            onClick={() =>
              router.push(
                "/partner/dashboard"
              )
            }
            className="mb-6 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
          >

            ← Back To Dashboard

          </button>

          <h1 className="text-5xl font-semibold leading-tight">

            Platform
            <br />
            Settings

          </h1>

          <p className="text-white/45 mt-5 leading-8 max-w-3xl">

            Personalize your hospitality dashboard,
            operational preferences,
            notifications,
            and luxury partner experience.

          </p>

        </div>

        {/* GRID */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-8">

            {/* ACCOUNT */}

            <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

              <div className="flex items-center gap-5 mb-10">

                <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center">

                  <User
                    className="text-[#d4a574]"
                  />

                </div>

                <div>

                  <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-2">

                    ACCOUNT SETTINGS

                  </p>

                  <h2 className="text-3xl font-semibold">

                    Partner Identity

                  </h2>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  placeholder="Owner Name"
                  className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

                <input
                  placeholder="Business Email"
                  className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

                <input
                  placeholder="Phone Number"
                  className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

                <input
                  placeholder="Property Name"
                  className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

            </div>

            {/* DASHBOARD EXPERIENCE */}

            <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

              <div className="flex items-center gap-5 mb-10">

                <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center">

                  <LayoutDashboard
                    className="text-[#d4a574]"
                  />

                </div>

                <div>

                  <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-2">

                    EXPERIENCE MODE

                  </p>

                  <h2 className="text-3xl font-semibold">

                    Dashboard Personalization

                  </h2>

                </div>

              </div>

              <div className="grid md:grid-cols-3 gap-5">

                {[
                  "Simple",
                  "Professional",
                  "Executive",
                ].map((mode) => (

                  <button
                    key={mode}
                    onClick={() =>
                      setDashboardMode(
                        mode
                      )
                    }
                    className={`rounded-2xl border px-6 py-6 transition-all text-left ${
                      dashboardMode ===
                      mode
                        ? "border-[#d4a574] bg-[#d4a574]/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >

                    <h3 className="text-xl font-semibold mb-3">

                      {mode}

                    </h3>

                    <p className="text-white/45 leading-7">

                      {mode ===
                        "Simple" &&
                        "Minimal dashboard experience focused on core hospitality operations."}

                      {mode ===
                        "Professional" &&
                        "Balanced analytics, reservations, and pricing visibility."}

                      {mode ===
                        "Executive" &&
                        "Advanced business intelligence and financial insights."}

                    </p>

                  </button>

                ))}

              </div>

            </div>

            {/* NOTIFICATIONS */}

            <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

              <div className="flex items-center gap-5 mb-10">

                <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center">

                  <Bell
                    className="text-[#d4a574]"
                  />

                </div>

                <div>

                  <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-2">

                    NOTIFICATIONS

                  </p>

                  <h2 className="text-3xl font-semibold">

                    Communication Preferences

                  </h2>

                </div>

              </div>

              <div className="space-y-5">

                {/* BOOKING ALERTS */}

                <div className="flex items-center justify-between border border-white/10 rounded-2xl px-6 py-5 bg-white/[0.02]">

                  <div>

                    <h3 className="text-xl font-medium mb-2">

                      Booking Alerts

                    </h3>

                    <p className="text-white/45">

                      Receive reservation and guest booking updates.

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setNotifications(
                        !notifications
                      )
                    }
                    className={`w-16 h-9 rounded-full transition-all ${
                      notifications
                        ? "bg-[#d4a574]"
                        : "bg-white/10"
                    }`}
                  >

                    <div
                      className={`w-7 h-7 rounded-full bg-white transition-all ${
                        notifications
                          ? "translate-x-8"
                          : "translate-x-1"
                      }`}
                    />

                  </button>

                </div>

                {/* MARKETING */}

                <div className="flex items-center justify-between border border-white/10 rounded-2xl px-6 py-5 bg-white/[0.02]">

                  <div>

                    <h3 className="text-xl font-medium mb-2">

                      Marketing Emails

                    </h3>

                    <p className="text-white/45">

                      Receive platform growth tips and hospitality updates.

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setMarketingEmails(
                        !marketingEmails
                      )
                    }
                    className={`w-16 h-9 rounded-full transition-all ${
                      marketingEmails
                        ? "bg-[#d4a574]"
                        : "bg-white/10"
                    }`}
                  >

                    <div
                      className={`w-7 h-7 rounded-full bg-white transition-all ${
                        marketingEmails
                          ? "translate-x-8"
                          : "translate-x-1"
                      }`}
                    />

                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-8">

            {/* OPERATIONS */}

            <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

              <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-6">

                <Building2
                  className="text-[#d4a574]"
                />

              </div>

              <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

                PROPERTY OPERATIONS

              </p>

              <div className="space-y-5">

                <div className="border border-white/10 rounded-2xl px-5 py-4 bg-white/[0.02]">

                  <div className="flex items-center gap-3 mb-3">

                    <Globe
                      size={18}
                      className="text-[#d4a574]"
                    />

                    <p className="font-medium">

                      Currency

                    </p>

                  </div>

                  <p className="text-white/45">

                    INR (₹)

                  </p>

                </div>

                <div className="border border-white/10 rounded-2xl px-5 py-4 bg-white/[0.02]">

                  <div className="flex items-center gap-3 mb-3">

                    <Wallet
                      size={18}
                      className="text-[#d4a574]"
                    />

                    <p className="font-medium">

                      Payout System

                    </p>

                  </div>

                  <p className="text-white/45">

                    Razorpay Settlements

                  </p>

                </div>

                <div className="border border-white/10 rounded-2xl px-5 py-4 bg-white/[0.02]">

                  <div className="flex items-center gap-3 mb-3">

                    <MoonStar
                      size={18}
                      className="text-[#d4a574]"
                    />

                    <p className="font-medium">

                      Theme

                    </p>

                  </div>

                  <p className="text-white/45">

                    Luxury Dark Experience

                  </p>

                </div>

              </div>

            </div>

            {/* SUPPORT */}

            <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

              <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center mb-6">

                <LifeBuoy
                  className="text-[#d4a574]"
                />

              </div>

              <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

                SUPPORT & SECURITY

              </p>

              <h2 className="text-3xl font-semibold mb-5">

                Contact Niels Privé

              </h2>

              <p className="text-white/45 leading-8 mb-8">

                Need assistance with bookings,
                verification,
                payouts,
                or hospitality operations?
                Our concierge support team is available to assist you.

              </p>

              <div className="space-y-4">

                <button className="w-full bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black py-4 rounded-2xl font-medium">

                  Contact Support

                </button>

                <button className="w-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all py-4 rounded-2xl">

                  Report An Issue

                </button>

              </div>

            </div>

            {/* SECURITY */}

            <div className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

              <div className="flex items-center gap-4 mb-6">

                <Shield
                  className="text-[#d4a574]"
                />

                <h2 className="text-2xl font-semibold">

                  Security Status

                </h2>

              </div>

              <div className="border border-green-500/20 bg-green-500/10 rounded-2xl px-5 py-5">

                <p className="text-green-400 font-medium mb-2">

                  Protected Partner Account

                </p>

                <p className="text-white/45 leading-7">

                  Your hospitality operations and
                  dashboard environment are secured.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}
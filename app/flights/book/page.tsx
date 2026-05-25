"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function BookingContent() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const airline = searchParams.get("airline");
  const flight = searchParams.get("flight");

  // Dynamic Times
  const departureRaw = searchParams.get("departure");
  const arrivalRaw = searchParams.get("arrival");

  const departureTime = departureRaw
    ? new Date(departureRaw).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "09:40 AM";

  const arrivalTime = arrivalRaw
    ? new Date(arrivalRaw).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "03:15 PM";

  // Cabin + Travelers
  const [cabin, setCabin] = useState("Business");
  const [travelers, setTravelers] = useState(1);

  // Dynamic Pricing
  const prices = {
    Economy: 850,
    Business: 4850,
    First: 9200,
  };

  const currentPrice = prices[cabin as keyof typeof prices] * travelers;

  return (
    <main className="min-h-screen bg-[#f3efe8] text-[#111111] px-6 md:px-16 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="uppercase tracking-[0.35em] text-xs text-neutral-500 mb-4">
          Niels Privé Booking
        </p>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.05em] leading-[0.95] max-w-4xl mb-6">
          Complete your curated journey.
        </h1>

        <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed">
          Secure your next luxury air experience with seamless traveler details
          and premium booking flow.
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
        {/* LEFT */}
        <div className="rounded-[36px] bg-white/80 backdrop-blur-xl border border-black/5 p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <div className="mb-10">
            <p className="uppercase tracking-[0.35em] text-[11px] text-neutral-400 mb-3">
              Passenger Information
            </p>

            <h2 className="text-3xl font-semibold tracking-tight">
              Traveler Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="First Name"
              className="rounded-[24px] bg-[#f7f4ef] border border-black/5 px-5 py-4 outline-none focus:border-black/20"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="rounded-[24px] bg-[#f7f4ef] border border-black/5 px-5 py-4 outline-none focus:border-black/20"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="rounded-[24px] bg-[#f7f4ef] border border-black/5 px-5 py-4 outline-none focus:border-black/20 md:col-span-2"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="rounded-[24px] bg-[#f7f4ef] border border-black/5 px-5 py-4 outline-none focus:border-black/20"
            />

            {/* Cabin Select */}
            <div className="relative">
              <select
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className="w-full rounded-[24px] appearance-none bg-[#f7f4ef] border border-black/5 px-5 py-4 outline-none focus:border-black/20"
              >
                <option value="Economy">Economy Class</option>
                <option value="Business">Business Class</option>
                <option value="First">First Class</option>
              </select>

              <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-black/40">
                ▼
              </div>
            </div>
          </div>

          {/* Travelers */}
          <div className="mt-8">
            <p className="text-sm text-neutral-500 mb-4">
              Travelers
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setTravelers((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="w-12 h-12 rounded-full bg-black text-white text-xl"
              >
                -
              </button>

              <div className="text-2xl font-semibold w-10 text-center">
                {travelers}
              </div>

              <button
                onClick={() =>
                  setTravelers((prev) => prev + 1)
                }
                className="w-12 h-12 rounded-full bg-black text-white text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Payment Button */}
          <button className="mt-10 w-full rounded-full bg-black text-white py-5 font-medium tracking-tight shadow-xl transition-all duration-300 hover:scale-[1.01] hover:opacity-95">
            Continue to Payment
          </button>
        </div>

        {/* RIGHT */}
        <div className="rounded-[36px] bg-[#111111] text-white p-8 md:p-10 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <p className="uppercase tracking-[0.35em] text-[11px] text-white/40 mb-4">
              Journey Summary
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] leading-none mb-10">
              {from} → {to}
            </h2>

            <div className="space-y-8">
              {/* Airline */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-sm mb-2">
                    Airline
                  </p>

                  <p className="text-lg font-medium">
                    {airline}
                  </p>
                </div>

                <div className="w-14 h-14 rounded-[20px] bg-white text-black flex items-center justify-center font-semibold">
                  {flight?.substring(0, 2).toUpperCase()}
                </div>
              </div>

              <div className="h-px w-full bg-white/10"></div>

              {/* Timing */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-sm mb-2">
                    Departure
                  </p>

                  <p className="text-lg font-medium">
                    {departureTime}
                  </p>
                </div>

                <div>
                  <p className="text-white/40 text-sm mb-2">
                    Arrival
                  </p>

                  <p className="text-lg font-medium">
                    {arrivalTime}
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-white/10"></div>

              {/* Cabin + Travelers */}
              <div className="flex items-center justify-between gap-8">
                <div>
                  <p className="text-white/40 text-sm mb-2">
                    Cabin
                  </p>

                  <p className="text-lg font-medium">
                    {cabin}
                  </p>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    {["Economy", "Business", "First"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setCabin(type)}
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                          cabin === type
                            ? "bg-white text-black"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-sm mb-2">
                    Travelers
                  </p>

                  <p className="text-lg font-medium">
                    {travelers} Adult
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-white/10"></div>

              {/* Price */}
              <div className="pt-2">
                <p className="text-white/40 text-sm mb-3">
                  Estimated Fare
                </p>

                <h3 className="text-5xl font-semibold tracking-[-0.05em]">
                  ${currentPrice.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3efe8] flex items-center justify-center">
      <p className="text-lg">Loading booking...</p>
    </div>}>
      <BookingContent />
    </Suspense>
  );
}

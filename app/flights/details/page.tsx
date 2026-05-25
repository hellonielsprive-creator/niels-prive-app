"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function FlightDetailsContent() {
  const searchParams = useSearchParams();

  const airline = searchParams.get("airline");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const price = searchParams.get("price");
  const departure = searchParams.get("departure");
  const arrival = searchParams.get("arrival");

  const [cabin, setCabin] = useState("Business");
  const [travelers, setTravelers] = useState(1);

  const basePrice = Number(price || 842);

  const cabinMultiplier =
    cabin === "Economy"
      ? 1
      : cabin === "Premium Economy"
      ? 1.5
      : cabin === "Business"
      ? 2.5
      : 5;

  const totalPrice = Math.round(
    basePrice * cabinMultiplier * travelers
  );

  return (
    <main className="min-h-screen bg-[#f3efe8] text-[#111111] px-6 md:px-16 py-20">
      {/* HERO */}
      <section className="mb-16">
        <p className="uppercase tracking-[0.35em] text-xs text-neutral-500 mb-5">
          Niels Privé Journey
        </p>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-none mb-6">
          {from} → {to}
        </h1>

        <p className="text-neutral-600 text-lg max-w-2xl">
          Refined global air experiences curated for modern luxury travelers.
        </p>
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-8">
          {/* Flight Card */}
          <div className="rounded-[32px] bg-white p-8 border border-black/5 shadow-[0_20px_70px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between mb-10">
              <div>
                <p className="uppercase tracking-[0.35em] text-xs text-neutral-500 mb-4">
                  {airline}
                </p>

                <h2 className="text-4xl font-semibold tracking-tight mb-3">
                  EK502
                </h2>

                <p className="text-neutral-600">
                  Non-stop premium route
                </p>
              </div>

              <div className="w-16 h-16 rounded-[24px] bg-black text-white flex items-center justify-center font-semibold">
                EK
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-5 mb-10">
              <div>
                <p className="text-4xl font-semibold mb-2">
                  {from}
                </p>

                <p className="text-neutral-500">
                  {departure}
                </p>
              </div>

              <div className="flex-1 h-px bg-black/10 relative">
                <div className="absolute right-0 -top-[4px] w-3 h-3 rounded-full bg-black"></div>
              </div>

              <div className="text-right">
                <p className="text-4xl font-semibold mb-2">
                  {to}
                </p>

                <p className="text-neutral-500">
                  {arrival}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* CABIN */}
              <div className="rounded-2xl bg-[#f8f5ef] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">
                  Cabin
                </p>

                <p className="font-medium">
                  {cabin}
                </p>
              </div>

              {/* DURATION */}
              <div className="rounded-2xl bg-[#f8f5ef] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">
                  Duration
                </p>

                <p className="font-medium">
                  {
                    cabin === "Economy"
                      ? "4h 45m"
                      : cabin === "Premium Economy"
                      ? "4h 10m"
                      : cabin === "Business"
                      ? "3h 10m"
                      : "2h 55m"
                  }
                </p>
              </div>

              {/* BAGGAGE */}
              <div className="rounded-2xl bg-[#f8f5ef] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">
                  Baggage
                </p>

                <p className="font-medium">
                  {
                    cabin === "Economy"
                      ? "20kg"
                      : cabin === "Premium Economy"
                      ? "25kg"
                      : cabin === "Business"
                      ? "32kg"
                      : "40kg"
                  }
                </p>
              </div>

              {/* WIFI */}
              <div className="rounded-2xl bg-[#f8f5ef] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">
                  Wi-Fi
                </p>

                <p className="font-medium">
                  {
                    cabin === "Economy"
                      ? "Optional"
                      : cabin === "Premium Economy"
                      ? "Included"
                      : cabin === "Business"
                      ? "Included"
                      : "Premium"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* CABIN + TRAVELERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {/* CABIN */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">
                Cabin Class
              </p>

              <select
                value={cabin}
                onChange={(e) =>
                  setCabin(e.target.value)
                }
                className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
              >
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>

            {/* TRAVELERS */}
            <div>
              <p className="text-sm text-neutral-500 mb-3">
                Travelers
              </p>

              <select
                value={travelers}
                onChange={(e) =>
                  setTravelers(Number(e.target.value))
                }
                className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
              >
                <option value={1}>1 Traveler</option>
                <option value={2}>2 Travelers</option>
                <option value={3}>3 Travelers</option>
                <option value={4}>4 Travelers</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="sticky top-10 rounded-[32px] bg-black text-white p-8">
            <p className="uppercase tracking-[0.35em] text-xs text-white/50 mb-5">
              Journey Summary
            </p>

            <h3 className="text-5xl font-semibold tracking-tight mb-10">
              ${totalPrice}
            </h3>

            <div className="space-y-5 mb-10">
              <div className="flex items-center justify-between">
                <p className="text-white/60">
                  Base Fare
                </p>
                <p>
                  ${Math.round(totalPrice * 0.9)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/60">
                  Taxes
                </p>
                <p>
                  ${Math.round(totalPrice * 0.07)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/60">
                  Concierge
                </p>
                <p>
                  ${Math.round(totalPrice * 0.03)}
                </p>
              </div>
            </div>

            <a
              href={`/checkout?airline=${airline}&from=${from}&to=${to}&price=${totalPrice}&cabin=${cabin}&travelers=${travelers}`}
              className="block text-center rounded-full bg-white text-black py-4 font-medium tracking-tight transition-all duration-300 hover:scale-[1.01]"
            >
              Continue to Checkout
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function FlightDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3efe8] flex items-center justify-center">
      <p className="text-lg">Loading flight details...</p>
    </div>}>
      <FlightDetailsContent />
    </Suspense>
  );
}

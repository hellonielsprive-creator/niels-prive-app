"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { BOOKING_TYPES } from "@/lib/bookings/schema";
import { createBooking } from "@/lib/firestore/bookings";

function CheckoutContent() {
  const searchParams = useSearchParams();

  const airline = searchParams.get("airline");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const price = searchParams.get("price");
  const cabin = searchParams.get("cabin");
  const travelers = searchParams.get("travelers");

  const handleBooking = async () => {
    console.log("HANDLE BOOKING RUNNING");
    console.log(auth.currentUser);

    await createBooking({
      bookingType: BOOKING_TYPES.FLIGHT,
      airline,
      from,
      to,
      price,
      cabin,
      travelers,
      userId: auth.currentUser?.uid || "guest",
      checkIn: "",
      checkOut: "",
      status: "confirmed",
    });

    window.location.href = "/confirmation";
  };

  return (
    <main className="min-h-screen bg-[#f3efe8] text-[#111111] px-6 md:px-16 py-20">
      {/* HEADER */}
      <section className="mb-16">
        <p className="uppercase tracking-[0.35em] text-xs text-neutral-500 mb-5">
          Niels Privé Checkout
        </p>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-none mb-6">
          Secure Journey Checkout
        </h1>

        <p className="text-neutral-600 text-lg max-w-2xl">
          Complete your premium booking experience with secure traveler details
          and protected payment processing.
        </p>
      </section>

      {/* GRID */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="xl:col-span-2">
          <div className="rounded-[32px] bg-white border border-black/5 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.05)]">
            <h2 className="text-3xl font-semibold tracking-tight mb-10">
              Traveler Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* FIRST NAME */}
              <div>
                <p className="text-sm text-neutral-500 mb-3">
                  First Name
                </p>

                <input
                  type="text"
                  placeholder="Aron"
                  className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
                />
              </div>

              {/* LAST NAME */}
              <div>
                <p className="text-sm text-neutral-500 mb-3">
                  Last Name
                </p>

                <input
                  type="text"
                  placeholder="Danthi"
                  className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
                />
              </div>

              {/* EMAIL */}
              <div className="md:col-span-2">
                <p className="text-sm text-neutral-500 mb-3">
                  Email Address
                </p>

                <input
                  type="email"
                  placeholder="traveler@nielsprive.com"
                  className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
                />
              </div>

              {/* PHONE */}
              <div className="md:col-span-2">
                <p className="text-sm text-neutral-500 mb-3">
                  Phone Number
                </p>

                <input
                  type="text"
                  placeholder="+91 9876543210"
                  className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
                />
              </div>

              {/* PASSPORT */}
              <div className="md:col-span-2">
                <p className="text-sm text-neutral-500 mb-3">
                  Passport Number
                </p>

                <input
                  type="text"
                  placeholder="N1234567"
                  className="w-full rounded-[24px] border border-black/5 bg-[#f7f4ef] px-5 py-4 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="sticky top-10 rounded-[32px] bg-black text-white p-8">
            <p className="uppercase tracking-[0.35em] text-xs text-white/50 mb-5">
              Booking Summary
            </p>

            <h3 className="text-5xl font-semibold tracking-tight mb-10">
              ${price}
            </h3>

            <div className="space-y-5 mb-10">
              <div className="flex items-center justify-between">
                <p className="text-white/60">
                  Airline
                </p>
                <p>
                  {airline}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/60">
                  Route
                </p>
                <p>
                  {from} → {to}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/60">
                  Cabin
                </p>
                <p>
                  {cabin}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/60">
                  Travelers
                </p>
                <p>
                  {travelers}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/60">
                  Concierge
                </p>
                <p>
                  Included
                </p>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="block w-full text-center rounded-full bg-white text-black py-4 font-medium tracking-tight transition-all duration-300 hover:scale-[1.01]"
            >
              Secure Payment
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3efe8] flex items-center justify-center">
      <p className="text-lg">Loading checkout...</p>
    </div>}>
      <CheckoutContent />
    </Suspense>
  );
}

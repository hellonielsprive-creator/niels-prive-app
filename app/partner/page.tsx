"use client";

import { useRouter } from "next/navigation";
export default function PartnerPage() {
  const router = useRouter();

  return (

    <main className="min-h-screen bg-[#f8f5ef] text-black">

      <section className="relative h-[90vh] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

          <p className="text-white tracking-[0.4em] mb-6 text-sm">
            NIELS PRIVÉ PARTNERS
          </p>

          <h1 className="text-6xl md:text-7xl font-semibold text-white leading-tight max-w-5xl">

            Bring Your Property
            <br />
            To Global Luxury Travelers

          </h1>

          <p className="text-neutral-200 text-xl leading-9 max-w-3xl mt-8">

            Join a curated hospitality platform designed for premium hotels,
            resorts, villas, and extraordinary stays worldwide.

          </p>

          <button
  onClick={() =>
    router.push("/signin")
  }
  className="mt-12 bg-white text-black px-10 py-5 rounded-full"
>

            Become A Partner

          </button>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-3 gap-10">

        <div className="bg-white rounded-[30px] p-10 shadow-sm">

          <h2 className="text-3xl font-semibold mb-6">
            Global Exposure
          </h2>

          <p className="text-neutral-600 leading-8">

            Reach luxury travelers from around the world through
            a premium hospitality experience platform.

          </p>

        </div>

        <div className="bg-white rounded-[30px] p-10 shadow-sm">

          <h2 className="text-3xl font-semibold mb-6">
            Premium Brand Positioning
          </h2>

          <p className="text-neutral-600 leading-8">

            Showcase your property alongside exceptional stays,
            curated experiences, and elevated hospitality.

          </p>

        </div>

        <div className="bg-white rounded-[30px] p-10 shadow-sm">

          <h2 className="text-3xl font-semibold mb-6">
            Dedicated Growth
          </h2>

          <p className="text-neutral-600 leading-8">

            Build long-term visibility, stronger bookings,
            and direct guest engagement through Niels Privé.

          </p>

        </div>

      </section>

    </main>

  );

}
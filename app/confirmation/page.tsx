"use client";

export default function ConfirmationPage() {

  return (

    <main className="min-h-screen bg-[#f3efe8] text-[#111111] flex items-center justify-center px-6 py-20">

      <div className="max-w-2xl w-full rounded-[40px] bg-white border border-black/5 shadow-[0_30px_90px_rgba(0,0,0,0.06)] p-10 md:p-14 text-center">

        <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl mx-auto mb-8">
          ✓
        </div>

        <p className="uppercase tracking-[0.35em] text-xs text-neutral-500 mb-5">
          Booking Request Confirmed
        </p>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.06em] leading-none mb-8">
          Your journey request has been received.
        </h1>

        <p className="text-neutral-600 text-lg leading-relaxed max-w-xl mx-auto mb-12">
          Our concierge team is now processing your premium flight request.
          Booking details and next steps will be delivered shortly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">

          <div className="rounded-2xl bg-[#f8f5ef] p-5">

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">
              Route
            </p>

            <p className="font-medium">
              BOM → DXB
            </p>

          </div>

          <div className="rounded-2xl bg-[#f8f5ef] p-5">

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">
              Airline
            </p>

            <p className="font-medium">
              Emirates
            </p>

          </div>

          <div className="rounded-2xl bg-[#f8f5ef] p-5">

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">
              Booking Ref
            </p>

            <p className="font-medium">
              NP48291
            </p>

          </div>

        </div>

        <a
          href="/"
          className="inline-block rounded-full bg-black text-white px-8 py-4 font-medium tracking-tight transition-all duration-300 hover:scale-[1.01]"
        >
          Return Home
        </a>

      </div>

    </main>

  );

}
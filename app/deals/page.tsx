"use client";

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          Exclusive <span className="text-[#E7C58A]">Deals</span>
        </h1>
        <p className="text-white/60 text-lg mb-12">
          Limited‑time offers at the world's finest properties.
        </p>
        <div className="w-full h-64 rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center">
          <p className="text-white/40">Deals & promotions section</p>
        </div>
      </div>
    </div>
  );
}

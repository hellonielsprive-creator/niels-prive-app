"use client";

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          Saved <span className="text-[#E7C58A]">Hotels</span>
        </h1>
        <p className="text-white/60 text-lg mb-12">
          Your collection of favorite luxury properties.
        </p>
        <div className="w-full h-64 rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center">
          <p className="text-white/40">Saved hotels grid</p>
        </div>
      </div>
    </div>
  );
}

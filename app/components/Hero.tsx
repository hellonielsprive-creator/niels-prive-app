export default function Hero() {
  return (
    <section className="relative h-[110vh] w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}

      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt="Luxury Beach"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">

        <p className="uppercase tracking-[6px] text-white/70 text-sm mb-6">
          Luxury Travel Reimagined
        </p>

        <h1 className="text-white text-5xl md:text-7xl font-semibold leading-tight max-w-5xl">
          Luxury Hospitality
          <br />
          Without Intimidation
        </h1>

        <p className="text-white/80 text-lg mt-8 max-w-2xl">
          Crafted luxury and premium stays around the world with a smooth modern experience.
        </p>

        {/* SEARCH BAR */}

        <div className="mt-16 bg-white rounded-full p-3 w-full max-w-6xl shadow-2xl">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

            <input
              type="text"
              placeholder="Destination"
              className="bg-neutral-100 rounded-full px-6 py-5 outline-none text-black"
            />

            <input
              type="text"
              placeholder="Check In"
              className="bg-neutral-100 rounded-full px-6 py-5 outline-none text-black"
            />

            <input
              type="text"
              placeholder="Check Out"
              className="bg-neutral-100 rounded-full px-6 py-5 outline-none text-black"
            />

            <input
              type="text"
              placeholder="Guests"
              className="bg-neutral-100 rounded-full px-6 py-5 outline-none text-black"
            />

            <button className="bg-black hover:bg-black/90 transition text-white rounded-full px-8 py-5 font-medium">
              Search Stays
            </button>

          </div>

        </div>

      </div>
<div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent via-[#f8f8f6]/40 to-[#f8f8f6] z-20 pointer-events-none" />
    </section>
  );
}
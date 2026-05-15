import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Hero from "../components/Hero";
export default function HotelPage() {
  return (
    <main className="bg-[#0f0f11] min-h-screen text-white">
        <Navbar />
        <section id="home">
  <Hero />
</section>
        
      {/* HERO IMAGE */}
      <section className="relative h-[70vh] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 pb-16">

          <p className="uppercase tracking-[4px] text-[#E7C58A] text-sm">
            Luxury Resort
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold mt-4">
            Niels Grand Resort
          </h1>

          <p className="text-white/80 mt-6 max-w-2xl text-lg">
            Oceanfront luxury stay crafted for modern premium travel experiences.
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <h2 className="text-3xl font-semibold">
              About This Stay
            </h2>

            <p className="text-white/70 leading-relaxed mt-6">
              Experience luxury hospitality with elegant ocean views,
              curated interiors, infinity pools and premium dining.
              Designed for modern travelers seeking comfort,
              sophistication and unforgettable stays.
            </p>

            {/* AMENITIES */}
            <div className="mt-16">

              <h3 className="text-2xl font-semibold mb-8">
                Amenities
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                {[
                  "Infinity Pool",
                  "Private Beach",
                  "Spa & Wellness",
                  "Luxury Dining",
                  "Ocean View",
                  "Free WiFi",
                ].map((item) => (

                  <div
                    key={item}
                    className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white/80"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT BOOKING CARD */}
          <div>

            <div className="bg-white text-black rounded-[32px] p-8 sticky top-28">

              <p className="text-sm text-black/60">
                Starting From
              </p>

              <h2 className="text-5xl font-semibold mt-2">
                ₹12,500
              </h2>

              <p className="text-black/60 mt-2">
                per night
              </p>

              <div className="space-y-4 mt-10">

                <input
                  type="text"
                  placeholder="Check In"
                  className="w-full bg-[#f5f5f5] rounded-2xl px-5 py-4 outline-none"
                />

                <input
                  type="text"
                  placeholder="Check Out"
                  className="w-full bg-[#f5f5f5] rounded-2xl px-5 py-4 outline-none"
                />

                <input
                  type="text"
                  placeholder="Guests"
                  className="w-full bg-[#f5f5f5] rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              <button className="w-full bg-black text-white rounded-2xl py-4 mt-8 hover:bg-[#1d1d1d] transition">
                Reserve Stay
              </button>

            </div>

          </div>

        </div>

      </section>
<Footer />
    </main>
  );
}
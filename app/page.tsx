import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import HotelCard from "@/app/components/HotelCard";
import Footer from "@/app/components/Footer";

export default function Home() {
  const featuredHotels = [
    {
      name: "Niels Grand Resort",
      location: "Goa, India",
      price: "₹12,500",
      rating: "4.9",
      rooms: "5 Rooms",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
    },
    {
      name: "Skyline Luxury Suites",
      location: "Dubai, UAE",
      price: "₹18,900",
      rating: "4.8",
      rooms: "3 Rooms",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
    },
    {
      name: "Ocean Paradise Villa",
      location: "Maldives",
      price: "₹32,000",
      rating: "5.0",
      rooms: "2 Rooms",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const indiaDestinations = [
    {
      title: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Kerala",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Kashmir",
      image:
        "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2400&auto=format&fit=crop",
    },
  ];

  const worldwideDestinations = [
    {
      title: "Maldives",
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Switzerland",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "France",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2400&auto=format&fit=crop",
    },
  ];

  return (
    <main className="bg-[#f8f8f6] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* DESKTOP HERO */}
      <div className="hidden md:block">
        <Hero />
      </div>

      {/* MOBILE CINEMATIC HERO */}
      <div className="md:hidden relative h-[78vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury Escape"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* SOFT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />

        {/* CONTENT */}
        <div className="absolute inset-x-0 bottom-10 px-6">
          <p className="text-white/60 uppercase tracking-[0.3em] text-xs mb-4">
            Niels Privé
          </p>

          <h1 className="text-white text-[42px] leading-[1.05] font-semibold max-w-sm">
            Discover your next escape.
          </h1>

          <p className="text-white/70 mt-5 leading-relaxed max-w-xs text-sm">
            Curated luxury stays and cinematic travel experiences crafted for
            modern explorers.
          </p>

          {/* FLOATING SEARCH */}
          <div className="mt-8 backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[30px] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 uppercase tracking-[0.15em] text-[10px] mb-1">
                  Destination
                </p>

                <p className="text-white text-sm">
                  Where would you like to go?
                </p>
              </div>

              <button className="bg-white text-black px-5 py-3 rounded-full text-sm font-medium">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      

      <section
        id="hotels"
        className="relative z-20 md:-mt-24 mt-0 pb-24"
      >
        {/* HERO BLEND */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#f8f8f6] z-0" />

        {/* MAIN WHITE CONTAINER */}
        <div className="relative w-[96%] max-w-7xl mx-auto bg-[#f8f8f6] rounded-[48px] px-6 md:px-10 pt-20 pb-24 shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">
          
          {/* GOLD LINE */}
          <div className="w-24 h-[2px] bg-[#C8A96B] mb-10 opacity-70 rounded-full" />

          {/* FEATURED HOTELS */}
          <div className="mb-28">
            <p className="uppercase tracking-[5px] text-[#C8A96B] text-sm mb-4">
              Signature Collection
            </p>

            <h2 className="text-4xl md:text-6xl font-semibold text-[#1a1a1a] leading-tight mb-6">
              Curated Escapes Around The World
            </h2>

            <p className="text-[#5c5c5c] text-lg max-w-3xl leading-relaxed mb-14">
              Handpicked luxury stays crafted for modern premium travel
              experiences with refined comfort, elegant architecture, and
              unforgettable hospitality.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredHotels.map((hotel, index) => (
                <HotelCard key={index} {...hotel} />
              ))}
            </div>
          </div>

          {/* INDIA */}
          <section id="destinations" className="mb-28">
            <p className="uppercase tracking-[5px] text-[#C8A96B] text-sm mb-4">
              India
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] leading-tight mb-6">
              Curated Indian Retreats
            </h2>

            <p className="text-[#5c5c5c] text-lg max-w-3xl leading-relaxed mb-14">
              From coastal sanctuaries to royal heritage escapes, discover
              India through a more refined lens of hospitality.
            </p>

            {/* HORIZONTAL CINEMATIC SLIDER */}
<div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">

  {indiaDestinations.map((place, index) => (

    <div
      key={index}
      className="
        min-w-[280px]
        h-[420px]
        rounded-[32px]
        overflow-hidden
        relative
        flex-shrink-0
        snap-start
        group
        transform-gpu
        transition-all
        duration-700
        hover:scale-[0.98]
        active:scale-[0.97]
        shadow-[0_10px_40px_rgba(0,0,0,0.12)]
      "
    >

      {/* IMAGE */}
      <img
        src={place.image}
        alt={place.title}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          scale-100
          group-hover:scale-105
          transition-transform
          duration-[4000ms]
          ease-out
        "
      />

      {/* CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]" />

      {/* LIGHT LEAK */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 p-6 z-10">

        <p className="text-white/60 uppercase tracking-[4px] text-xs mb-2">
          Niels Privé
        </p>

        <h3 className="text-white text-3xl font-semibold">
          {place.title}
        </h3>

        <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[220px]">
          Curated luxury experiences designed for elevated escapes.
        </p>

      </div>

    </div>

  ))}

</div>
          </section>

          {/* WORLDWIDE */}
          <div>
            <p className="uppercase tracking-[5px] text-[#C8A96B] text-sm mb-4">
              Worldwide
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] leading-tight mb-6">
              Journeys Beyond Ordinary
            </h2>

            <p className="text-[#5c5c5c] text-lg max-w-3xl leading-relaxed mb-14">
              Discover globally celebrated destinations shaped through elegant
              hospitality and unforgettable experiences.
            </p>

            {/* WORLDWIDE CINEMATIC SLIDER */}
<div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">

  {worldwideDestinations.map((place, index) => (

    <div
      key={index}
      className="
        min-w-[280px]
        h-[420px]
        rounded-[32px]
        overflow-hidden
        relative
        flex-shrink-0
        snap-start
        group
        transform-gpu
        transition-all
        duration-700
        hover:scale-[0.98]
        active:scale-[0.97]
        shadow-[0_10px_40px_rgba(0,0,0,0.12)]
      "
    >

      <img
        src={place.image}
        alt={place.title}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          scale-100
          group-hover:scale-105
          transition-transform
          duration-[4000ms]
          ease-out
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[1px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />

      <div className="absolute bottom-0 left-0 p-6 z-10">

        <p className="text-white/60 uppercase tracking-[4px] text-xs mb-2">
          Niels Privé
        </p>

        <h3 className="text-white text-3xl font-semibold">
          {place.title}
        </h3>

        <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[220px]">
          Elegant global retreats designed for elevated modern travel.
        </p>

      </div>

    </div>

  ))}

</div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
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
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Kerala",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Kashmir",
      image:
        "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const worldwideDestinations = [
    {
      title: "Maldives",
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Switzerland",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "France",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <main className="bg-[#f8f8f6] min-h-screen overflow-x-hidden">
      <Navbar />

      <Hero />

      <section id="hotels" className="relative z-20 -mt-24 pb-24">
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {indiaDestinations.map((place, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-[28px] bg-white shadow-md hover:shadow-xl transition duration-500"
                >
                  <div className="overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.title}
                      className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-2xl font-semibold text-[#1f1f1f]">
                      {place.title}
                    </h3>
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {worldwideDestinations.map((place, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-[28px] bg-white shadow-md hover:shadow-xl transition duration-500"
                >
                  <div className="overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.title}
                      className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-2xl font-semibold text-[#1f1f1f]">
                      {place.title}
                    </h3>

                    <p className="text-sm text-[#6b6b6b] mt-2 leading-relaxed">
                      Elegant global retreats designed for elevated modern
                      travel.
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
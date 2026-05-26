"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Heart, Search, X, MapPin, Star, ArrowRight } from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import HotelCard from "@/app/components/HotelCard";
import Footer from "@/app/components/Footer";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function Home() {
  const [featuredHotels, setFeaturedHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsSnapshot = await getDocs(collection(db, "hotels"));
        const hotelsData = hotelsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const roomsSnapshot = await getDocs(collection(db, "rooms"));
        const roomsData = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const formattedHotels = hotelsData.map((hotel: any) => {
          const hotelRooms = roomsData.filter(
            (room: any) => room.hotelId === hotel.id && room.archived !== true
          );

          const prices = hotelRooms.map((room: any) => Number(room.price || 0));
          const lowestPrice = prices.length > 0
            ? Math.min(...prices)
            : hotel.basePrice || 0;

          return {
            ...hotel,
            rooms: hotelRooms,
            totalRooms: hotelRooms.length,
            startingPrice: lowestPrice,
          };
        });

        setFeaturedHotels(formattedHotels);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  /* DESTINATIONS */

  const indiaDestinations = [
    {
      title: "Goa",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Kerala",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Jaipur",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Kashmir",
      image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2400&auto=format&fit=crop",
    },
  ];

  const worldwideDestinations = [
    {
      title: "Maldives",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Dubai",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Switzerland",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "France",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2400&auto=format&fit=crop",
    },
  ];

  const filteredHotels = searchQuery
    ? featuredHotels.filter((hotel) =>
        hotel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const allDestinations = [...indiaDestinations, ...worldwideDestinations];

  return (
    <main className="bg-[#f8f8f6] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* DESKTOP HERO */}
      <div className="hidden md:block">
        <Hero />
      </div>

      {/* MOBILE HERO - CUSTOM LUXURY ANIMATED */}
      <div className="md:hidden relative h-[85vh] overflow-hidden bg-[#070709]">
        {/* Background Layer 1 - Deep gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-[#09090b] to-[#050507]" />
        
        {/* Background Layer 2 - Gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(212,165,116,0.18),_transparent_60%)]" />
        
        {/* Background Layer 3 - Dark radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(255,255,255,0.03),_transparent_55%)]" />

        {/* Floating luxury shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Circle 1 - Gold gradient */}
          <div
            className="absolute w-64 h-64 rounded-full border border-[#d4a574]/10 top-10 -left-20 animate-float1"
            style={{
              background: 'radial-gradient(circle, rgba(212,165,116,0.12) 0%, transparent 70%)'
            }}
          />
          
          {/* Circle 2 - White glow */}
          <div
            className="absolute w-96 h-96 rounded-full border border-white/5 -bottom-32 -right-24 animate-float2"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)'
            }}
          />
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-20 pt-32 z-10">
          {/* Brand badge */}
          <p className="text-white/35 uppercase tracking-[0.7em] text-[8px] mb-10">
            NIELS PRIVÉ
          </p>

          {/* Main headline */}
          <h1 className="text-white text-[52px] leading-[0.95] font-medium max-w-[320px] mb-6">
            Luxury
            <br />
            redefined.
          </h1>

          {/* Subtitle */}
          <p className="text-white/55 mt-6 leading-relaxed max-w-[300px] text-[15px]">
            Curated stays and premium hospitality for the modern explorer.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>
      </div>

      {/* FLOATING SEARCH BUTTON (MOBILE) */}
      <button
        onClick={() => setSearchOpen(true)}
        className="md:hidden fixed bottom-32 right-6 z-[110] w-[72px] h-[72px] bg-gradient-to-br from-[#d4a574] to-[#b88c4e] rounded-[28px] shadow-[0_20px_60px_rgba(212,165,116,0.45)] flex items-center justify-center hover:scale-[1.08] active:scale-[0.95] transition-all duration-500"
      >
        <Search className="w-8 h-8 text-black" />
      </button>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-[280] md:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          />

          <div className="absolute inset-x-0 top-0 h-full bg-[#070709] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 pt-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-white/50 uppercase tracking-[0.45em] text-[10px] mb-2">
                    DISCOVER
                  </p>
                  <h2 className="text-3xl font-semibold text-white">
                    Search Stays
                  </h2>
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-white/20 transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="relative mb-10">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#d4a574]" />
                </div>
                <input
                  type="text"
                  placeholder="Search destinations, hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[32px] pl-16 pr-6 py-5 text-white placeholder-white/40 outline-none focus:border-[#d4a574]/40 focus:bg-white/[0.06] transition-all text-lg"
                  autoFocus
                />
              </div>

              {searchQuery ? (
                <div className="space-y-4">
                  {filteredHotels.length > 0 ? (
                    filteredHotels.map((hotel) => (
                      <Link
                        key={hotel.id}
                        href={`/hotel/${hotel.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-5 p-5 rounded-[32px] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all"
                      >
                        <div className="w-20 h-20 rounded-[28px] overflow-hidden shrink-0">
                          <img
                            src={
                              hotel.image ||
                              "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop"
                            }
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium text-lg truncate">
                            {hotel.name || "Luxury Stay"}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="w-4 h-4 text-white/40" />
                            <p className="text-white/50 text-sm truncate">
                              {hotel.city || "Niels Privé Collection"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[#d4a574] font-semibold text-xl">
                            ₹{hotel.startingPrice || 0}
                          </p>
                          <p className="text-white/40 text-[11px]">per night</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-white/40 text-lg">No hotels found</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-10">
                  {/* QUICK DESTINATIONS */}
                  <div>
                    <p className="text-white/50 uppercase tracking-[0.4em] text-[10px] mb-6">
                      POPULAR DESTINATIONS
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {allDestinations.slice(0, 6).map((dest, index) => (
                        <Link
                          key={index}
                          href={`/hotel?destination=${dest.title.toLowerCase()}`}
                          onClick={() => setSearchOpen(false)}
                          className="relative h-36 rounded-[28px] overflow-hidden group"
                        >
                          <img
                            src={dest.image}
                            alt={dest.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,165,116,0.15),_transparent_60%)]" />
                          <div className="absolute bottom-5 left-5">
                            <h3 className="text-white font-semibold text-xl">{dest.title}</h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* EXPLORE ALL */}
                  <Link
                    href="/hotel"
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-7 rounded-[36px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/15 transition-all"
                  >
                    <div>
                      <h3 className="text-white font-semibold text-xl">Explore All Stays</h3>
                      <p className="text-white/40 text-sm mt-2">
                        Discover our complete collection
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-[#d4a574]/20 border border-[#d4a574]/30 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-[#d4a574]" />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM QUICK ACCESS SECTION */}

      <section className="relative z-15 md:-mt-16 mt-0 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/my-trips"
              className="group bg-white/80 backdrop-blur-xl border border-white/20 rounded-[28px] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E7C58A]/20 flex items-center justify-center">
                  <Calendar className="text-[#C8A96B]" size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-2">
                My Trips
              </h3>
              <p className="text-[#5c5c5c] leading-relaxed">
                Your personal luxury travel hub — past, present, and future stays.
              </p>
            </Link>

            <Link
              href="/saved"
              className="group bg-white/80 backdrop-blur-xl border border-white/20 rounded-[28px] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#E7C58A]/20 flex items-center justify-center">
                  <Heart className="text-[#C8A96B]" size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-2">
                Saved Stays
              </h3>
              <p className="text-[#5c5c5c] leading-relaxed">
                Your dreamboard of curated luxury escapes, saved for future journeys.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN SECTION */}

      <section
        id="hotels"
        className="relative z-20 md:-mt-24 mt-0 pb-24"
      >

        {/* HERO BLEND */}

        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#f8f8f6] z-0" />

        {/* MAIN CONTAINER */}

        <div className="relative w-[96%] max-w-7xl mx-auto bg-[#f8f8f6] rounded-[48px] px-6 md:px-10 pt-20 pb-24 shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">

          {/* GOLD LINE */}

          <div className="w-24 h-[2px] bg-[#C8A96B] mb-10 opacity-70 rounded-full" />

          {/* LIVE INVENTORY */}

          <div className="mb-32">

            <div className="mb-10">

              <p className="uppercase tracking-[5px] text-[#C8A96B] text-sm mb-4">

                Live Hotels

              </p>

              <h2 className="text-4xl md:text-6xl font-semibold text-[#1a1a1a] leading-tight mb-6">

                Curated Luxury Hotels Around The World

              </h2>

              <p className="text-[#5c5c5c] text-lg max-w-3xl leading-relaxed">

                Discover premium hospitality destinations connected directly to the Niels Privé luxury operations platform.

              </p>

            </div>

            {/* LOADING */}

            {loading && (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {[1, 2, 3].map((item) => (

                  <div
                    key={item}
                    className="h-[520px] rounded-[34px] bg-white animate-pulse"
                  />

                ))}

              </div>

            )}

            {/* EMPTY */}

            {!loading &&
              featuredHotels.length === 0 && (

              <div className="bg-white rounded-[40px] border border-black/5 p-14 text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)]">

                <h3 className="text-4xl font-semibold text-black mb-5">

                  No Luxury Hotels Yet

                </h3>

                <p className="text-[#6a6a6a] text-lg max-w-2xl mx-auto leading-8">

                  Hotels added from the partner dashboard will automatically appear here in real-time.

                </p>

              </div>

            )}

            {/* HOTEL CARDS — CINEMATIC HORIZONTAL SLIDER */}

            <div className="relative">
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#f8f8f6] to-transparent z-10 pointer-events-none opacity-60" />
              
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#f8f8f6] to-transparent z-10 pointer-events-none opacity-60" />
              
              <div className="flex gap-6 overflow-x-auto pb-5 no-scrollbar snap-x snap-mandatory">

              {featuredHotels.map(
                (
                  hotel,
                  index
                ) => (

                  <div
                    key={index}
                    className="min-w-[340px] md:min-w-[420px] xl:min-w-[460px] snap-start"
                  >
                    <HotelCard
                      id={hotel.id}

                      name={
                        hotel.name ||
                        "Luxury Stay"
                      }

                      location={
                        hotel.city ||
                        "Niels Privé Collection"
                      }

                      price={`₹${hotel.startingPrice || 0}`}

                      rating={
                        hotel.rating ||
                        "4.9"
                      }

                      rooms={
                        hotel.totalRooms > 0
                          ? `${hotel.totalRooms} Room Types`
                          : "Luxury Hospitality"
                      }

                      status={
                        hotel.status ||
                        "Available"
                      }

                      image={
                        hotel.image ||
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop"
                      }
                    />
                  </div>

                )
              )}

              </div>
            </div>

          </div>

          {/* INDIA DESTINATIONS */}

          <section
            id="destinations"
            className="mb-32"
          >

            <p className="uppercase tracking-[5px] text-[#C8A96B] text-sm mb-4">

              India

            </p>

            <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] leading-tight mb-6">

              Curated Indian Retreats

            </h2>

            <p className="text-[#5c5c5c] text-lg max-w-3xl leading-relaxed mb-14">

              Discover India through refined hospitality, cinematic stays, and elevated travel experiences.

            </p>

            <div className="relative">
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#f8f8f6] to-transparent z-10 pointer-events-none opacity-60" />
              
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#f8f8f6] to-transparent z-10 pointer-events-none opacity-60" />
              
              <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar snap-x snap-mandatory">

              {indiaDestinations.map((place, index) => (

                <Link
                  key={index}
                  href={`/hotel?destination=${place.title.toLowerCase()}`}
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

                      Curated luxury experiences designed for elevated escapes.

                    </p>

                  </div>

                </Link>

              ))}

              </div>
            </div>

          </section>

          {/* WORLDWIDE DESTINATIONS */}

          <div>

            <p className="uppercase tracking-[5px] text-[#C8A96B] text-sm mb-4">

              Worldwide

            </p>

            <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] leading-tight mb-6">

              Journeys Beyond Ordinary

            </h2>

            <p className="text-[#5c5c5c] text-lg max-w-3xl leading-relaxed mb-14">

              Discover globally celebrated destinations crafted through elegant hospitality and cinematic travel experiences.

            </p>

            <div className="relative">
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#f8f8f6] to-transparent z-10 pointer-events-none opacity-60" />
              
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#f8f8f6] to-transparent z-10 pointer-events-none opacity-60" />
              
              <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar snap-x snap-mandatory">

              {worldwideDestinations.map((place, index) => (

                <Link
                  key={index}
                  href={`/hotel?destination=${place.title.toLowerCase()}`}
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

                </Link>

              ))}

              </div>
            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import HotelCard from "@/app/components/HotelCard";
import Footer from "@/app/components/Footer";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

export default function Home() {

  const [featuredHotels,
    setFeaturedHotels,
  ] = useState<any[]>([]);

  const [loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const fetchHotels =
      async () => {

        try {

          /* FETCH HOTELS */

          const hotelsSnapshot =
            await getDocs(
              collection(
                db,
                "hotels"
              )
            );

          const hotelsData =
            hotelsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          /* FETCH ROOMS */

          const roomsSnapshot =
            await getDocs(
              collection(
                db,
                "rooms"
              )
            );

          const roomsData =
            roomsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          /* CONNECT HOTELS WITH ROOMS */

          const formattedHotels =
            hotelsData.map(
              (hotel: any) => {

                const hotelRooms =
                  roomsData.filter(
                    (room: any) =>

                      room.hotelId ===
                        hotel.id &&

                      room.archived !==
                        true

                  );

                /* STARTING PRICE */

                const prices =
                  hotelRooms.map(
                    (room: any) =>
                      Number(
                        room.price || 0
                      )
                  );

                const lowestPrice =
                  prices.length > 0
                    ? Math.min(
                        ...prices
                      )
                    : hotel.basePrice ||
                      0;

                return {

                  ...hotel,

                  rooms:
                    hotelRooms,

                  totalRooms:
                    hotelRooms.length,

                  startingPrice:
                    lowestPrice,

                };

              }
            );

          setFeaturedHotels(
            formattedHotels
          );

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

      {/* MOBILE HERO */}

      <div className="md:hidden relative h-[78vh] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury Escape"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />

        <div className="absolute inset-x-0 bottom-10 px-6">

          <p className="text-white/60 uppercase tracking-[0.3em] text-xs mb-4">

            Niels Privé

          </p>

          <h1 className="text-white text-[42px] leading-[1.05] font-semibold max-w-sm">

            Discover your next cinematic escape.

          </h1>

          <p className="text-white/70 mt-5 leading-relaxed max-w-xs text-sm">

            Discover globally curated luxury hotels powered by the Niels Privé hospitality platform.

          </p>

          {/* FLOATING SEARCH */}

          <div className="mt-8 backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[30px] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-white/50 uppercase tracking-[0.15em] text-[10px] mb-1">

                  Destination

                </p>

                <p className="text-white text-sm">

                  Search premium stays

                </p>

              </div>

              <button className="bg-white text-black px-5 py-3 rounded-full text-sm font-medium hover:scale-[1.03] transition-all">

                Search

              </button>

            </div>

          </div>

        </div>

      </div>

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

            <div className="flex items-end justify-between gap-6 flex-wrap mb-10">

              <div>

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

              <div className="bg-white border border-black/5 rounded-[24px] px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">

                <p className="text-[#8a8a8a] text-sm mb-2">

                  Active Luxury Hotels

                </p>

                <h3 className="text-4xl font-semibold text-black">

                  {featuredHotels.length}

                </h3>

              </div>

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

            {/* HOTEL CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {featuredHotels.map(
                (
                  hotel,
                  index
                ) => (

                  <HotelCard
                    key={index}
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

                )
              )}

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

            <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">

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

            <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">

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

      </section>

      <Footer />

    </main>

  );

}
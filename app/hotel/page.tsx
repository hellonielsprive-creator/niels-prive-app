"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

import { Star } from "lucide-react";

function HotelContent() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "hotels"));
        const roomsSnapshot = await getDocs(collection(db, "rooms"));

        const hotelData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const roomsData = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const formattedHotels = hotelData.map((hotel: any) => {
          const hotelRooms = roomsData.filter(
            (room: any) => room.hotelId === hotel.id && room.archived !== true
          );
          const prices = hotelRooms.map((room: any) => Number(room.price || 0));
          const lowestPrice = prices.length > 0 ? Math.min(...prices) : hotel.basePrice || 0;
          return {
            ...hotel,
            startingPrice: lowestPrice,
            rooms: hotelRooms,
          };
        });

        let filteredHotels = formattedHotels;
        if (destination) {
          filteredHotels = formattedHotels.filter((hotel: any) => {
            const hotelCity = (hotel.city || "").toLowerCase();
            const hotelState = (hotel.state || "").toLowerCase();
            const hotelCountry = (hotel.country || "").toLowerCase();
            return (
              hotelCity.includes(destination.toLowerCase()) ||
              hotelState.includes(destination.toLowerCase()) ||
              hotelCountry.includes(destination.toLowerCase())
            );
          });
        }

        setHotels(filteredHotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination]);

  return (
    <main className="bg-[#f8f8f6] min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-[#050505] pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-[#E7C58A]/80 text-xs mb-4">
            {destination ? `${destination.charAt(0).toUpperCase() + destination.slice(1)}` : "Premium Stays"}
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-semibold max-w-3xl">
            {destination
              ? `Discover Luxury in ${destination.charAt(0).toUpperCase() + destination.slice(1)}`
              : "Curated Luxury Hotels Worldwide"}
          </h1>
        </div>
      </section>

      {/* HOTELS LIST */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[500px] rounded-[32px] bg-white animate-pulse" />
            ))}
          </div>
        )}

        {!loading && hotels.length === 0 && (
          <div className="bg-white rounded-[40px] border border-black/5 p-12 text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            <h3 className="text-3xl font-semibold text-black mb-4">
              No Luxury Hotels Yet
            </h3>
            <p className="text-[#6a6a6a] text-lg max-w-xl mx-auto leading-8">
              {destination
                ? `Stay tuned for premium ${destination.charAt(0).toUpperCase() + destination.slice(1)} properties coming soon.`
                : "Hotels added from the partner dashboard will automatically appear here in real-time."}
            </p>
          </div>
        )}

        {!loading && hotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <Link
                key={hotel.id}
                href={`/hotel/${hotel.id}`}
                className="group rounded-[32px] overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.01]"
              >
                <div className="relative h-[340px] overflow-hidden">
                  <img
                    src={
                      hotel.image ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop"
                    }
                    alt={hotel.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="p-7">
                  <p className="text-[#C8A96B] uppercase tracking-[3px] text-xs mb-3">
                    {hotel.city || "Niels Privé Collection"}
                  </p>
                  <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
                    {hotel.name || "Luxury Stay"}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#5c5c5c] text-sm">From</p>
                      <p className="text-2xl font-semibold text-[#1a1a1a]">
                        ₹{hotel.startingPrice || 0}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star
                        size={18}
                        className="text-[#C8A96B] fill-[#C8A96B]"
                      />
                      <span className="text-[#1a1a1a] font-medium">
                        {hotel.rating || "4.9"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function HotelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center">
          <p className="text-lg text-[#5c5c5c]">Loading discovery...</p>
        </div>
      }
    >
      <HotelContent />
    </Suspense>
  );
}

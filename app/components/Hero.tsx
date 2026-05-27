"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const destinations = [
  "Goa",
  "Kerala",
  "Maldives",
  "Dubai",
  "Switzerland",
  "France",
];

const stats = [
  { value: "200+", label: "Curated Stays" },
  { value: "12", label: "Countries" },
  { value: "4.9★", label: "Avg Rating" },
];

export default function Hero() {
  const router = useRouter();

  const [currentDest, setCurrentDest] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [hotels, setHotels] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);

  const [loaded, setLoaded] = useState(false);

  // FETCH DATA
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [hotelsSnapshot, roomsSnapshot] = await Promise.all([
          getDocs(collection(db, "hotels")),
          getDocs(collection(db, "rooms")),
        ]);

        if (!mounted) return;

        setHotels(
          hotelsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        setRooms(
          roomsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Hero search fetch error:", error);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  // DESTINATION ROTATOR
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDest((prev) => (prev + 1) % destinations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // LOADED ANIMATION
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // SEARCH SUGGESTIONS
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchQuery.trim() || searchQuery.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      const query = searchQuery.toLowerCase().trim();

      const resultMap = new Map();

      hotels.forEach((hotel) => {
        const matches =
          hotel.name?.toLowerCase().includes(query) ||
          hotel.city?.toLowerCase().includes(query) ||
          hotel.state?.toLowerCase().includes(query) ||
          hotel.country?.toLowerCase().includes(query);

        if (matches) {
          resultMap.set(`hotel-${hotel.id}`, {
            type: "hotel",
            id: hotel.id,
            name: hotel.name,
            city: hotel.city,
            country: hotel.country,
            image: hotel.image,
          });
        }
      });

      rooms.forEach((room) => {
        if (room.roomName?.toLowerCase().includes(query)) {
          const hotel = hotels.find((h) => h.id === room.hotelId);

          resultMap.set(`room-${room.id}`, {
            type: "room",
            id: room.id,
            name: room.roomName,
            hotelName: hotel?.name,
            city: hotel?.city,
            country: hotel?.country,
            image: room.image || hotel?.image,
          });
        }
      });

      const finalResults = Array.from(resultMap.values()).slice(0, 6);

      setSuggestions(finalResults);
      setShowSuggestions(finalResults.length > 0);
    }, 250);

    return () => clearTimeout(handler);
  }, [searchQuery, hotels, rooms]);

  const handleSuggestionClick = (suggestion: any) => {
    setShowSuggestions(false);
    setSearchQuery("");

    if (suggestion.type === "hotel") {
      router.push(
        `/hotel?destination=${encodeURIComponent(
          suggestion.city?.toLowerCase() ||
            suggestion.country?.toLowerCase()
        )}`
      );
    } else {
      router.push(`/room/${suggestion.id}`);
    }
  };

  const handleDiscoverClick = () => {
    setShowSuggestions(false);

    router.push(
      searchQuery.trim()
        ? `/hotel?destination=${encodeURIComponent(
            searchQuery.toLowerCase().trim()
          )}`
        : "/hotel"
    );
  };

  const headlineAnimation = useMemo(
    () => ({
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.9s ease, transform 0.9s ease",
    }),
    [loaded]
  );

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#040404]">
      {/* BASE GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0e] via-[#060608] to-[#0a0a0c]" />

      {/* GOLD ORBS */}
      <div className="absolute top-[-15%] left-[-5%] w-[55%] h-[55%] rounded-full bg-[#E7C58A]/10 blur-[130px] animate-[pulse_12s_ease-in-out_infinite]" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-[#C8A96B]/8 blur-[110px] animate-[pulse_16s_ease-in-out_infinite_reverse]" />

      <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] rounded-full bg-[#E7C58A]/5 blur-[90px] animate-[pulse_8s_ease-in-out_infinite]" />

      {/* LOCAL NOISE TEXTURE */}
      <div className="absolute inset-0 opacity-[0.035] bg-[url('/noise.svg')] pointer-events-none" />

      {/* FLOATING DESTINATIONS */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        {destinations.map((dest, idx) => (
          <div
            key={dest}
            className="absolute font-bold tracking-tighter transition-all duration-1000 ease-in-out select-none"
            style={{
              left: `${8 + idx * 14}%`,
              top: `${15 + (idx % 3) * 22}%`,
              fontSize: "clamp(2rem, 4vw, 5rem)",
              color: "rgba(255,255,255,0.04)",
              opacity: idx === currentDest ? 0.6 : 0,
              transform:
                idx === currentDest
                  ? "translateY(0) scale(1)"
                  : "translateY(16px) scale(0.9)",
              transitionDelay: `${idx * 80}ms`,
            }}
          >
            {dest}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[100svh] px-5 md:px-8 text-center pb-24 md:pb-16 pt-24 md:pt-20">
        {/* BADGE */}
        <div
          className="flex items-center gap-2 mb-8 md:mb-10"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s ease",
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E7C58A]/20 bg-[#E7C58A]/8 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#E7C58A]" />
            <span className="text-[#E7C58A] text-[10px] md:text-xs uppercase tracking-[0.4em]">
              Niels Privé
            </span>
          </div>
        </div>

        {/* HEADLINE */}
        <div style={headlineAnimation}>
          <h1
            className="text-white font-semibold leading-[1.0] tracking-[-0.03em] mb-4 md:mb-6"
            style={{
              fontSize: "clamp(2.6rem, 8vw, 6rem)",
            }}
          >
            Luxury Hospitality
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E7C58A] via-[#d4a96b] to-[#C8A96B]">
              Reimagined
            </span>
          </h1>
        </div>

        {/* SUBTITLE */}
        <p
          className="text-white/50 max-w-lg md:max-w-2xl mb-3 md:mb-4 leading-relaxed"
          style={{
            fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s ease 0.2s",
          }}
        >
          AI-native luxury travel experiences, curated for the modern explorer.
        </p>

        {/* DESTINATION TEXT */}
        <div
          className="flex items-center gap-2 mb-8 md:mb-10 h-7"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.9s ease 0.35s",
          }}
        >
          <span className="text-white/25 text-sm">Explore</span>

          <div className="relative overflow-hidden h-6 w-28">
            {destinations.map((dest, idx) => (
              <span
                key={dest}
                className="absolute inset-0 text-[#E7C58A] text-sm font-medium text-left transition-all duration-500"
                style={{
                  opacity: idx === currentDest ? 1 : 0,
                  transform:
                    idx === currentDest
                      ? "translateY(0)"
                      : "translateY(8px)",
                }}
              >
                {dest}
              </span>
            ))}
          </div>

          <span className="text-white/25 text-sm">& more</span>
        </div>

        {/* SEARCH */}
        <div
          className="w-full max-w-3xl relative z-30"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "all 1s ease 0.45s",
          }}
        >
          <div className="bg-white/8 backdrop-blur-2xl border border-white/10 rounded-[28px] md:rounded-[36px] p-3 md:p-4 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            {/* MOBILE */}
            <div className="flex flex-col gap-2 md:hidden">
              <div className="flex items-center gap-3 px-4 py-3.5 bg-white/6 rounded-[20px] border border-white/8">
                <MapPin size={16} className="text-[#E7C58A] shrink-0" />

                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() =>
                    searchQuery.length >= 2 &&
                    suggestions.length > 0 &&
                    setShowSuggestions(true)
                  }
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/35 w-full text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-white/6 rounded-[20px] border border-white/8">
                  <Calendar
                    size={15}
                    className="text-[#E7C58A] shrink-0"
                  />

                  <input
                    type="text"
                    placeholder="Check In"
                    className="bg-transparent border-none outline-none text-white placeholder:text-white/35 w-full text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 px-4 py-3.5 bg-white/6 rounded-[20px] border border-white/8">
                  <Calendar
                    size={15}
                    className="text-[#E7C58A] shrink-0"
                  />

                  <input
                    type="text"
                    placeholder="Check Out"
                    className="bg-transparent border-none outline-none text-white placeholder:text-white/35 w-full text-xs"
                  />
                </div>
              </div>

              <button
                onClick={handleDiscoverClick}
                className="w-full bg-[#E7C58A] hover:bg-[#d4a96b] active:scale-[0.97] transition-all text-black rounded-[20px] px-6 py-4 font-semibold flex items-center justify-center gap-2 text-sm"
              >
                <Search size={16} />
                Discover Stays
              </button>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:grid md:grid-cols-5 gap-3">
              <div className="relative flex items-center gap-3 px-5 py-4 bg-white/6 rounded-[24px] border border-white/8 md:col-span-2">
                <MapPin size={17} className="text-[#E7C58A] shrink-0" />

                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() =>
                    searchQuery.length >= 2 &&
                    suggestions.length > 0 &&
                    setShowSuggestions(true)
                  }
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/35 w-full text-sm"
                />
              </div>

              <div className="flex items-center gap-3 px-5 py-4 bg-white/6 rounded-[24px] border border-white/8">
                <Calendar size={17} className="text-[#E7C58A] shrink-0" />

                <input
                  type="text"
                  placeholder="Check In"
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/35 w-full text-sm"
                />
              </div>

              <div className="flex items-center gap-3 px-5 py-4 bg-white/6 rounded-[24px] border border-white/8">
                <Calendar size={17} className="text-[#E7C58A] shrink-0" />

                <input
                  type="text"
                  placeholder="Check Out"
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/35 w-full text-sm"
                />
              </div>

              <button
                onClick={handleDiscoverClick}
                className="bg-[#E7C58A] hover:bg-[#d4a96b] active:scale-[0.97] transition-all text-black rounded-[24px] px-5 py-4 font-semibold flex items-center justify-center gap-2 text-sm"
              >
                <Search size={17} />
                Discover
              </button>
            </div>
          </div>

          {/* SUGGESTIONS */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mt-3 bg-white/95 backdrop-blur-xl border border-white/20 rounded-[24px] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-2 duration-300">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(s)}
                  className="w-full text-left flex items-center gap-4 p-3 rounded-[18px] hover:bg-[#E7C58A]/10 transition-all duration-200"
                >
                  {s.image && (
                    <div className="relative w-12 h-12 rounded-[14px] overflow-hidden shrink-0">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-[#1a1a1a] font-semibold text-sm truncate">
                      {s.name}
                    </p>

                    <p className="text-[#5c5c5c] text-xs truncate">
                      {s.hotelName ? `${s.hotelName} · ` : ""}
                      {s.city}
                      {s.country ? `, ${s.country}` : ""}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#C8A96B] shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* STATS */}
        <div
          className="flex items-center gap-6 md:gap-10 mt-10 md:mt-12"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 1s ease 0.7s",
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-white font-semibold text-lg md:text-2xl tracking-tight">
                {stat.value}
              </p>

              <p className="text-white/35 text-[10px] md:text-xs uppercase tracking-[0.3em] mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#f8f8f6]/20 to-[#f8f8f6] z-30 pointer-events-none" />
    </section>
  );
}
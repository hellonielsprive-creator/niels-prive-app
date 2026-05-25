"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const destinations = [
  "Goa",
  "Kerala",
  "Maldives",
  "Dubai",
  "Switzerland",
  "France"
];

function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default function Hero() {
  const [currentDest, setCurrentDest] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hotels, setHotels] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelsSnapshot = await getDocs(collection(db, "hotels"));
        const roomsSnapshot = await getDocs(collection(db, "rooms"));

        const hotelsData = hotelsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const roomsData = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHotels(hotelsData);
        setRooms(roomsData);
      } catch (e) {
        console.error("Error fetching search data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentDest((prev) => (prev + 1) % destinations.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const updateSuggestions = () => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results: any[] = [];

    hotels.forEach((hotel) => {
      if (
        hotel.name?.toLowerCase().includes(query) ||
        hotel.city?.toLowerCase().includes(query) ||
        hotel.state?.toLowerCase().includes(query) ||
        hotel.country?.toLowerCase().includes(query)
      ) {
        results.push({
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
        results.push({
          type: "room",
          id: room.id,
          name: room.roomName,
          hotelName: hotel?.name,
          city: hotel?.city,
          image: room.image || hotel?.image,
        });
      }
    });

    setSuggestions(results.slice(0, 8));
    setShowSuggestions(true);
  };

  const debouncedUpdateSuggestions = useRef(debounce(updateSuggestions, 300)).current;

  useEffect(() => {
    debouncedUpdateSuggestions();
    return () => {
      (debouncedUpdateSuggestions as any).cancel?.();
    };
  }, [searchQuery, hotels, rooms]);

  const handleSuggestionClick = (suggestion: any) => {
    setShowSuggestions(false);
    setSearchQuery("");

    if (suggestion.type === "hotel") {
      router.push(`/hotel?destination=${encodeURIComponent(suggestion.city?.toLowerCase() || suggestion.country?.toLowerCase())}`);
    } else if (suggestion.type === "room") {
      router.push(`/room/${suggestion.id}`);
    }
  };

  const handleDiscoverClick = () => {
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      router.push(`/hotel?destination=${encodeURIComponent(searchQuery.toLowerCase().trim())}`);
    } else {
      router.push("/hotel");
    }
  };

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-[#050505]">
      {/* Animated Layered Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#1a1a1a]"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#E7C58A]/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#C8A96B]/8 blur-[100px] animate-[pulse_14s_ease-in-out_infinite_reverse]"></div>

      {/* Floating Luxury Destinations */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {destinations.map((dest, idx) => (
          <div
            key={dest}
            className={`absolute text-white/10 text-4xl md:text-6xl font-bold tracking-tighter transition-all duration-1000 ease-in-out ${
              idx === currentDest
                ? "opacity-40 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-4"
            }`}
            style={{
              left: `${10 + idx * 15}%`,
              top: `${20 + (idx % 3) * 20}%`,
              transitionDelay: `${idx * 100}ms`
            }}
          >
            {dest}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <p className="uppercase tracking-[0.4em] text-white/50 text-xs md:text-sm mb-6">
          Niels Privé
        </p>

        <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-semibold leading-tight max-w-5xl mb-4">
          Luxury Hospitality
          <br />
          Reimagined
        </h1>

        <p className="text-white/60 text-sm md:text-lg max-w-2xl mb-10">
          AI‑native luxury travel experiences, curated for the modern explorer.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-4xl relative z-30">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="relative flex items-center gap-3 px-5 py-4 bg-white/5 rounded-[24px] border border-white/10 md:col-span-2">
                <MapPin size={18} className="text-[#E7C58A]" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm"
                />
              </div>

              <div className="relative flex items-center gap-3 px-5 py-4 bg-white/5 rounded-[24px] border border-white/10">
                <Calendar size={18} className="text-[#E7C58A]" />
                <input
                  type="text"
                  placeholder="Check In"
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm"
                />
              </div>

              <div className="relative flex items-center gap-3 px-5 py-4 bg-white/5 rounded-[24px] border border-white/10">
                <Calendar size={18} className="text-[#E7C58A]" />
                <input
                  type="text"
                  placeholder="Check Out"
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm"
                />
              </div>

              <button
                onClick={handleDiscoverClick}
                className="bg-[#E7C58A] hover:bg-[#C8A96B] transition-all text-black rounded-[24px] px-6 py-4 font-semibold flex items-center justify-center gap-2"
              >
                <Search size={18} />
                Discover
              </button>
            </div>
          </div>

          {/* Live Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mt-4 bg-white/95 backdrop-blur-xl border border-white/20 rounded-[28px] p-4 shadow-[0_25px_70px_rgba(0,0,0,0.25)] animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left flex items-center gap-4 p-4 rounded-[20px] hover:bg-[#E7C58A]/10 transition-all duration-200"
                  >
                    {suggestion.image && (
                      <div className="w-14 h-14 rounded-[16px] overflow-hidden flex-shrink-0">
                        <img
                          src={suggestion.image}
                          alt={suggestion.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-[#1a1a1a] font-semibold">
                        {suggestion.name}
                      </p>
                      <p className="text-[#5c5c5c] text-sm">
                        {suggestion.hotelName ? `${suggestion.hotelName} · ` : ""}
                        {suggestion.city}, {suggestion.country}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#f8f8f6]/30 to-[#f8f8f6] z-30 pointer-events-none"></div>
    </section>
  );
}

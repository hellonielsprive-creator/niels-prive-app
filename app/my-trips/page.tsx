"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Calendar, MapPin, MessageCircle, ArrowRight } from "lucide-react";

export default function MyTripsPage() {
  return (
    <main className="bg-[#f8f8f6] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-[#C8A96B] text-xs mb-6">
            Your Journey
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-4">
              My Trips
            </h1>
          <p className="text-[#5c5c5c] text-lg max-w-2xl mb-16">
            Your personal luxury travel hub — past, present, and future stays.
          </p>

          <div className="space-y-8">
            {[
              {
                hotel: "Niels Grand Resort",
                location: "Goa, India",
                dates: "Dec 21–26, 2026",
                status: "Upcoming",
                image:
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop"
              },
              {
                hotel: "Kerala Backwaters Retreat",
                location: "Kerala, India",
                dates: "Oct 10–15, 2025",
                status: "Past",
                image:
                  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop"
              },
            ].map((trip, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="md:col-span-1 relative h-[240px md:h-auto">
                    <img
                      src={trip.image}
                      alt={trip.hotel}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[#C8A96B] uppercase tracking-[0.3em] text-xs mb-2">
                          {trip.status}
                        </p>
                        <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-2">
                          {trip.hotel}
                        </h2>
                        <p className="text-[#5c5c5c] flex items-center gap-2 mb-4">
                          <MapPin size={16} />
                          {trip.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[#5c5c5c] mb-8">
                      <Calendar size={18} />
                      <span>{trip.dates}</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1d1d1d] transition-all duration-300">
                        View Itinerary
                        <ArrowRight size={16} />
                      </button>
                      <button className="flex items-center gap-2 bg-[#E7C58A]/10 text-[#C8A96B] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#E7C58A]/20 transition-all duration-300">
                        <MessageCircle size={16} />
                        Contact Concierge
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

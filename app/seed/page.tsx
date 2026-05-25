"use client";

import { useState } from "react";
import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { hotels, getRoomsForHotel } from "@/scripts/seed-data";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function SeedPage() {
  const [status, setStatus] = useState<"idle" | "seeding" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    try {
      setStatus("seeding");
      setMessage("Starting to seed Firestore...");

      const batch = writeBatch(db);
      const hotelIds: string[] = [];

      for (const hotel of hotels) {
        const hotelRef = doc(collection(db, "hotels"));
        hotelIds.push(hotelRef.id);
        
        batch.set(hotelRef, {
          name: hotel.name,
          city: hotel.city,
          state: hotel.state,
          country: hotel.country,
          description: hotel.description,
          image: hotel.image,
          rating: hotel.rating,
          featured: hotel.featured,
          amenities: hotel.amenities,
          luxuryTier: hotel.luxuryTier,
          basePrice: hotel.basePrice,
          status: "Available",
          partnerId: "niels-prive-curated",
          createdAt: new Date().toISOString()
        });

        const rooms = getRoomsForHotel(hotel.name, hotel.basePrice, hotelRef.id);
        
        for (const room of rooms) {
          const roomRef = doc(collection(db, "rooms"));
          batch.set(roomRef, room);
        }
      }

      await batch.commit();

      setStatus("success");
      setMessage(`Successfully seeded ${hotels.length} hotels and ${hotels.length * 5} rooms!`);
    } catch (error) {
      console.error("Error seeding Firestore:", error);
      setStatus("error");
      setMessage("Failed to seed Firestore. Check console for details.");
    }
  };

  return (
    <main className="bg-[#f8f8f6] min-h-screen">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-32">
        <div className="bg-white rounded-[40px] border border-black/5 p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          <h1 className="text-4xl font-semibold text-black mb-6">
            Seed Firestore Inventory
          </h1>
          <p className="text-[#6a6a6a] text-lg mb-8 leading-8">
            Click the button below to populate Firestore with realistic luxury hotels and rooms across all curated destinations.
          </p>
          
          {message && (
            <div className={`mb-6 p-4 rounded-2xl ${status === "success" ? "bg-green-50 text-green-800" : status === "error" ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleSeed}
            disabled={status === "seeding"}
            className={`px-8 py-4 rounded-full font-semibold text-white transition-all ${status === "seeding" ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:opacity-90 hover:scale-[0.98]"}`}
          >
            {status === "seeding" ? "Seeding..." : "Seed Firestore"}
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}

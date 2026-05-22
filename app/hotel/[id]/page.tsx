"use client";

import {
  useEffect,
  useState,
  use,
} from "react";

import { useRouter } from "next/navigation";

import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";

import {
  db,
  auth,
} from "@/app/firebase/config";

import {
  Star,
  MapPin,
} from "lucide-react";

export default function HotelDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const resolvedParams = use(params);

  const router = useRouter();

  const [hotel, setHotel] =
    useState<any>(null);

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [guests, setGuests] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const fetchHotel = async () => {

      try {

        if (!resolvedParams?.id) return;

        const docRef = doc(
          db,
          "hotels",
          resolvedParams.id
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {

          setHotel({
            id: docSnap.id,
            ...docSnap.data(),
          });

        } else {

          console.log("Hotel not found");

        }

      } catch (error) {

        console.log(error);

      }

    };

    fetchHotel();

  }, [resolvedParams.id]);

  if (!hotel) {

    return (
      <div className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center">
        Loading...
      </div>
    );

  }

  return (

    <main className="min-h-screen bg-[#0f0f11] text-white">

      {/* HERO IMAGE */}
      <div className="relative">

        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-[45vh] md:h-[72vh] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-black/20 to-transparent" />

      </div>

      {/* CONTENT */}
      <section className="relative z-50 max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-16 -mt-16 md:-mt-24">

        <div className="backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-[32px] p-6 md:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.35)]">

          {/* TITLE */}
          <div className="mb-8">

            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              {hotel.name}
            </h1>

            <div className="flex items-center gap-2 text-white/60 mt-4">

              <MapPin size={18} />

              <p className="text-sm md:text-base">
                {hotel.city}
              </p>

            </div>

          </div>

          {/* PRICE */}
          <div className="flex items-center justify-between flex-wrap gap-6 mb-10">

            <div>

              <p className="text-white/50 text-sm mb-2">
                Starting From
              </p>

              <h2 className="text-4xl font-semibold">
                ₹{hotel.price}
              </h2>

            </div>

            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">

              <Star
                size={18}
                className="text-[#d4a574] fill-[#d4a574]"
              />

              <p className="text-sm">
                {hotel.rating}
              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

            <input
              type="date"
              value={checkIn}
              onChange={(e) =>
                setCheckIn(e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="date"
              value={checkOut}
              onChange={(e) =>
                setCheckOut(e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Guests"
              value={guests}
              onChange={(e) =>
                setGuests(e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={async () => {

              if (!checkIn || !checkOut || !guests) {

                alert("Please fill all booking details");
                return;

              }

              try {

                setLoading(true);

                await addDoc(
                  collection(db, "bookings"),
                  {

                    bookingType: "hotel",

                    hotelName: hotel.name || "",

                    roomName: "Luxury Suite",

                    guestName:
                      auth.currentUser?.displayName ||
                      "Guest",

                    guestEmail:
                      auth.currentUser?.email ||
                      "guest@niels.com",

                   guests: String(guests),

checkIn: String(checkIn),

checkOut: String(checkOut),

totalPrice: String(hotel.price),

                    status: "payment_pending",

                    createdAt:
                      new Date(),

                  }
                );

                router.push("/payment");

              } catch (error: any) {

  console.log(error);

  alert(error.message);

}
               finally {

                setLoading(false);

              }

            }}

            className="relative z-50 w-full md:w-auto bg-[#d4a574] text-black px-10 py-5 rounded-2xl font-semibold text-lg hover:scale-[1.02] transition-all disabled:opacity-50"
          >

            {loading
              ? "Processing..."
              : "Reserve Stay"}

          </button>

          {/* DESCRIPTION */}
          <p className="text-white/60 leading-8 mt-10 max-w-3xl">
            Experience elevated luxury hospitality with premium comfort,
            world-class amenities, breathtaking architecture, and cinematic stays crafted for modern travelers.
          </p>

        </div>

      </section>

    </main>

  );

}
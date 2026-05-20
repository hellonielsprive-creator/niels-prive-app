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

import { db } from "@/app/firebase/config";

import {
  Star,
} from "lucide-react";

export default function HotelDetailsPage({
  params,
}: any) {

  const resolvedParams: any = use(params);

  const router = useRouter();

  const [hotel, setHotel] =
    useState<any>(null);

  useEffect(() => {

    const fetchHotel = async () => {

      try {

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

  }, [resolvedParams]);

  if (!hotel) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );

  }

  return (

    <main className="min-h-screen bg-[#0f0f11] text-white">

      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-[70vh] object-cover"
      />

      <section className="max-w-6xl mx-auto px-8 py-16">

        <h1 className="text-5xl font-semibold mb-4">
          {hotel.name}
        </h1>

        <p className="text-xl text-neutral-400 mb-6">
          {hotel.city}
        </p>

        <div className="flex gap-6 items-center mb-10">

          <p className="text-3xl font-semibold">
            ₹{hotel.price}
          </p>

          <div className="flex items-center gap-2">

            <Star
              size={22}
              className="text-[#d4a574] fill-[#d4a574]"
            />

            <p className="text-xl">
              {hotel.rating}
            </p>

          </div>

        </div>

        <button
          onClick={async () => {

            try {

              await addDoc(
                collection(db, "bookings"),
                {

                  bookingType: "hotel",

                  hotelName: hotel.name,

                  roomName: "Luxury Suite",

                  guestName: "Aron Neal",

                  guests: 2,

                  checkIn: "2026-06-01",

                  CheckOut: "2026-06-04",

                  totalPrice: hotel.price,

                  status: "payment_pending",

                }
              );

              router.push("/payment");

            } catch (error) {

              console.log(error);

            }

          }}

          className="bg-[#d4a574] text-black px-10 py-5 rounded-2xl font-semibold text-lg mb-10 hover:scale-[1.02] transition-all"
        >

          Reserve Stay

        </button>

        <p className="text-neutral-300 leading-8 max-w-3xl">
          Experience elevated luxury hospitality with premium comfort,
          world-class amenities, breathtaking design, and unforgettable stays.
        </p>

      </section>

    </main>

  );

}
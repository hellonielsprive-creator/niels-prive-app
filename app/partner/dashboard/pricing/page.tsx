"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

import {
  Wallet,
  IndianRupee,
} from "lucide-react";

export default function PricingPage() {

  const router = useRouter();

  const [rooms, setRooms] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchRooms = async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(db, "rooms")
          );

        const roomsData =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setRooms(roomsData);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchRooms();

  }, []);

  const handlePriceChange = (
    id: string,
    value: string
  ) => {

    setRooms((prev) =>
      prev.map((room) =>
        room.id === id
          ? {
              ...room,
              price: value,
            }
          : room
      )
    );

  };

  const handleSave = async (
    room: any
  ) => {

    try {

      await updateDoc(
        doc(db, "rooms", room.id),
        {

          price: Number(room.price),

        }
      );

      alert(
        "Pricing Updated Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Update Pricing"
      );

    }

  };

  return (

    <main className="min-h-screen bg-[#050505] text-white">

      <section className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER */}

        <div className="mb-14">

          <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

            REVENUE MANAGEMENT

          </p>

          <button
            onClick={() =>
              router.push(
                "/partner/dashboard"
              )
            }
            className="mb-6 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
          >

            ← Back To Dashboard

          </button>

          <h1 className="text-5xl font-semibold leading-tight">

            Pricing &
            <br />
            Revenue Control

          </h1>

          <p className="text-white/45 mt-5 leading-8 max-w-3xl">

            Configure room pricing,
            review platform deductions,
            taxation,
            and estimated partner payouts.

          </p>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="text-center py-32 text-white/40 text-xl">

            Loading Pricing Dashboard...

          </div>

        )}

        {/* EMPTY */}

        {!loading &&
          rooms.length === 0 && (

          <div className="border border-dashed border-white/10 rounded-[35px] p-16 text-center bg-white/[0.02]">

            <div className="w-24 h-24 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-8">

              <Wallet
                size={38}
                className="text-[#d4a574]"
              />

            </div>

            <h2 className="text-3xl font-semibold mb-4">

              No Rooms Available

            </h2>

            <p className="text-white/45 max-w-xl mx-auto leading-8">

              Add rooms first to begin configuring
              luxury pricing and revenue settings.

            </p>

          </div>

        )}

        {/* ROOM PRICING */}

        <div className="grid lg:grid-cols-2 gap-8">

          {rooms.map((room) => {

            const basePrice =
              Number(room.price || 0);

            const gst =
              Math.round(
                basePrice * 0.18
              );

            const platformFee =
              Math.round(
                basePrice * 0.10
              );

            const razorpayFee =
              Math.round(
                basePrice * 0.025
              );

            const finalGuestPrice =
              basePrice +
              gst +
              platformFee +
              razorpayFee;

            const partnerReceives =
              basePrice -
              platformFee -
              razorpayFee;

            return (

              <div
                key={room.id}
                className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8"
              >

                {/* ROOM HEADER */}

                <div className="flex items-center justify-between mb-8">

                  <div>

                    <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

                      LUXURY ROOM

                    </p>

                    <h2 className="text-4xl font-semibold">

                      {room.roomName}

                    </h2>

                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center">

                    <IndianRupee
                      className="text-[#d4a574]"
                    />

                  </div>

                </div>

                {/* PRICE INPUT */}

                <div className="mb-8">

                  <p className="text-white/40 text-sm mb-3">

                    Base Room Price

                  </p>

                  <input
                    type="number"
                    value={room.price}
                    onChange={(e) =>
                      handlePriceChange(
                        room.id,
                        e.target.value
                      )
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                  />

                </div>

                {/* PLATFORM FEES */}

                <div className="grid md:grid-cols-2 gap-5 mb-8">

                  <div>

                    <p className="text-white/40 text-sm mb-3">

                      Platform Commission

                    </p>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white/70">

                      10% Fixed By Niels Privé

                    </div>

                  </div>

                  <div>

                    <p className="text-white/40 text-sm mb-3">

                      Payment Processing

                    </p>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white/70">

                      2.5% Razorpay Fee

                    </div>

                  </div>

                </div>

                {/* BREAKDOWN */}

                <div className="space-y-4 mb-8">

                  <div className="flex items-center justify-between text-white/70">

                    <span>
                      Base Price
                    </span>

                    <span>
                      ₹{basePrice}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-white/70">

                    <span>
                      GST (18%)
                    </span>

                    <span>
                      ₹{gst}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-white/70">

                    <span>
                      Platform Fee
                    </span>

                    <span>
                      ₹{platformFee}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-white/70">

                    <span>
                      Razorpay Processing
                    </span>

                    <span>
                      ₹{razorpayFee}
                    </span>

                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="flex items-center justify-between text-2xl font-semibold">

                    <span>
                      Guest Pays
                    </span>

                    <span>
                      ₹{finalGuestPrice}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-green-400 text-lg">

                    <span>
                      Partner Receives
                    </span>

                    <span>
                      ₹{partnerReceives}
                    </span>

                  </div>

                </div>

                {/* SAVE */}

                <button
                  onClick={() =>
                    handleSave(room)
                  }
                  className="w-full bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black py-4 rounded-2xl font-medium"
                >

                  Save Pricing

                </button>

              </div>

            );

          })}

        </div>

      </section>

    </main>

  );

}
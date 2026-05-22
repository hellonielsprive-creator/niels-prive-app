"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

import {
  BedDouble,
  Users,
  Bath,
  Expand,
  Pencil,
  Plus,
  Search,
  ImagePlus,
} from "lucide-react";

export default function RoomsPage() {

  const router = useRouter();

  const [rooms, setRooms] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

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

  const filteredRooms =
    useMemo(() => {

      return rooms.filter((room) =>
        room.roomName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    }, [rooms, search]);

  return (

    <main className="min-h-screen bg-[#050505] text-white">

      <section className="max-w-7xl mx-auto px-8 py-10">

        {/* TOPBAR */}

        <div className="flex items-center justify-between mb-12">

          <div>

            <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

              ROOM MANAGEMENT

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

              Manage Your
              <br />
              Luxury Inventory

            </h1>

            <p className="text-white/45 mt-5 leading-8 max-w-2xl">

              Control your live hospitality inventory,
              room availability, pricing,
              and premium guest experiences.

            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search rooms..."
                className="bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none w-[260px]"
              />

            </div>

            <button
              onClick={() =>
                router.push(
                  "/partner/dashboard/rooms/add"
                )
              }
              className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-6 py-4 rounded-2xl font-medium flex items-center gap-3"
            >

              <Plus size={20} />

              Add New Room

            </button>

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="text-center py-32 text-white/40 text-xl">

            Loading Luxury Rooms...

          </div>

        )}

        {/* EMPTY STATE */}

        {!loading &&
          filteredRooms.length === 0 && (

          <div className="border border-dashed border-white/10 rounded-[35px] p-16 text-center bg-white/[0.02]">

            <div className="w-24 h-24 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-8">

              <BedDouble
                size={38}
                className="text-[#d4a574]"
              />

            </div>

            <h2 className="text-3xl font-semibold mb-4">

              No Rooms Added Yet

            </h2>

            <p className="text-white/45 max-w-xl mx-auto leading-8 mb-10">

              Begin building your luxury hospitality
              inventory by adding premium suites,
              villas, and curated guest experiences.

            </p>

            <button
              onClick={() =>
                router.push(
                  "/partner/dashboard/rooms/add"
                )
              }
              className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-8 py-4 rounded-2xl font-medium inline-flex items-center gap-3"
            >

              <Plus size={20} />

              Add First Room

            </button>

          </div>

        )}

        {/* LIVE ROOM GRID */}

        <div className="grid lg:grid-cols-2 gap-8">

          {filteredRooms.map((room) => (

            <div
              key={room.id}
              className="rounded-[35px] overflow-hidden border border-white/10 bg-white/[0.03]"
            >

              {/* IMAGE */}

              <div className="relative">

                <img
                  src={
                    room.image ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                  }
                  alt={room.roomName}
                  className="w-full h-[320px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8">

                  <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

                    NIELS PRIVÉ COLLECTION

                  </p>

                  <h2 className="text-4xl font-semibold mb-4">

                    {room.roomName}

                  </h2>

                  <p className="text-neutral-300 max-w-lg leading-8">

                    {room.description ||
                      "Luxury hospitality experience crafted for premium guests."}

                  </p>

                </div>

              </div>

              {/* DETAILS */}

              <div className="p-8">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">

                    <Users
                      size={22}
                      className="text-[#d4a574] mb-4"
                    />

                    <p className="text-neutral-400 text-sm mb-2">

                      Guests

                    </p>

                    <h3 className="text-2xl font-semibold">

                      {room.guests || 2}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">

                    <BedDouble
                      size={22}
                      className="text-[#d4a574] mb-4"
                    />

                    <p className="text-neutral-400 text-sm mb-2">

                      Beds

                    </p>

                    <h3 className="text-2xl font-semibold">

                      {room.bedType || "King"}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">

                    <Bath
                      size={22}
                      className="text-[#d4a574] mb-4"
                    />

                    <p className="text-neutral-400 text-sm mb-2">

                      Baths

                    </p>

                    <h3 className="text-2xl font-semibold">

                      {room.bathrooms || 1}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">

                    <Expand
                      size={22}
                      className="text-[#d4a574] mb-4"
                    />

                    <p className="text-neutral-400 text-sm mb-2">

                      Size

                    </p>

                    <h3 className="text-2xl font-semibold">

                      {room.size || "65m²"}

                    </h3>

                  </div>

                </div>

                {/* FOOTER */}

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-neutral-400 mb-2">

                      Starting Price

                    </p>

                    <h3 className="text-4xl font-semibold">

                      ₹{room.price || 0}

                      <span className="text-lg text-neutral-400">

                        /night

                      </span>

                    </h3>

                  </div>

                  <div className="flex items-center gap-4">

                    <button className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">

                      <ImagePlus size={20} />

                    </button>

                    <button className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-6 py-4 rounded-2xl font-medium flex items-center gap-3">

                      <Pencil size={18} />

                      Edit Room

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>

  );

}
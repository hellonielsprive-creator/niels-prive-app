"use client";

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

  return (

    <main className="min-h-screen bg-[#050505] text-white">

      <section className="max-w-7xl mx-auto px-8 py-10">

        {/* TOPBAR */}

        <div className="flex items-center justify-between mb-12">

          <div>

            <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

              ROOM MANAGEMENT

            </p>

            <h1 className="text-5xl font-semibold leading-tight">

              Manage Your
              <br />
              Luxury Inventory

            </h1>

          </div>

          <div className="flex items-center gap-4">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                placeholder="Search rooms..."
                className="bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none w-[260px]"
              />

            </div>

            <button className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-6 py-4 rounded-2xl font-medium flex items-center gap-3">

              <Plus size={20} />

              Add New Room

            </button>

          </div>

        </div>

        {/* ROOM GRID */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ROOM CARD */}

          <div className="rounded-[35px] overflow-hidden border border-white/10 bg-white/[0.03]">

            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop"
                alt="Room"
                className="w-full h-[320px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8">

                <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

                  OCEAN COLLECTION

                </p>

                <h2 className="text-4xl font-semibold mb-4">

                  Ocean View Suite

                </h2>

                <p className="text-neutral-300 max-w-lg leading-8">

                  Elegant ocean-facing suite featuring
                  premium interiors, private balcony,
                  and immersive hospitality comfort.

                </p>

              </div>

            </div>

            <div className="p-8">

              <div className="grid grid-cols-4 gap-4 mb-8">

                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">

                  <Users
                    size={22}
                    className="text-[#d4a574] mb-4"
                  />

                  <p className="text-neutral-400 text-sm mb-2">

                    Guests

                  </p>

                  <h3 className="text-2xl font-semibold">

                    4

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

                    King

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

                    2

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

                    85m²

                  </h3>

                </div>

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-neutral-400 mb-2">

                    Starting Price

                  </p>

                  <h3 className="text-4xl font-semibold">

                    $1,200
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

          {/* SECOND ROOM */}

          <div className="rounded-[35px] overflow-hidden border border-white/10 bg-white/[0.03]">

            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
                alt="Room"
                className="w-full h-[320px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8">

                <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

                  SKYLINE COLLECTION

                </p>

                <h2 className="text-4xl font-semibold mb-4">

                  Skyline Penthouse

                </h2>

                <p className="text-neutral-300 max-w-lg leading-8">

                  Modern penthouse suite with
                  skyline views, luxury interiors,
                  and premium executive comfort.

                </p>

              </div>

            </div>

            <div className="p-8">

              <div className="grid grid-cols-4 gap-4 mb-8">

                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">

                  <Users
                    size={22}
                    className="text-[#d4a574] mb-4"
                  />

                  <p className="text-neutral-400 text-sm mb-2">

                    Guests

                  </p>

                  <h3 className="text-2xl font-semibold">

                    6

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

                    Queen

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

                    3

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

                    120m²

                  </h3>

                </div>

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-neutral-400 mb-2">

                    Starting Price

                  </p>

                  <h3 className="text-4xl font-semibold">

                    $2,400
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

        </div>

      </section>

    </main>

  );

}
"use client";

import {
  useEffect,
  useState,
  use,
} from "react";

import Link from "next/link";

import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

import {
  Star,
  MapPin,
  Wifi,
  Waves,
  Sparkles,
  BedDouble,
  Users,
  Bath,
  ArrowRight,
} from "lucide-react";

export default function HotelDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const resolvedParams =
    use(params);

  const [hotel,
    setHotel,
  ] = useState<any>(null);

  const [rooms,
    setRooms,
  ] = useState<any[]>([]);

  const [loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const fetchHotelData =
      async () => {

        try {

          if (!resolvedParams?.id)
            return;

          setLoading(true);

          /* FETCH HOTEL */

          const hotelRef =
            doc(
              db,
              "hotels",
              resolvedParams.id
            );

          const hotelSnap =
            await getDoc(
              hotelRef
            );

          if (
            !hotelSnap.exists()
          ) {

            console.log(
              "Hotel not found"
            );

            return;

          }

          const hotelData = {

            id: hotelSnap.id,

            ...hotelSnap.data(),

          };

          setHotel(
            hotelData
          );

          /* FETCH CONNECTED ROOMS */

          const roomsQuery =
            query(
              collection(
                db,
                "rooms"
              ),

              where(
                "hotelId",
                "==",
                hotelSnap.id
              )
            );

          const roomsSnapshot =
            await getDocs(
              roomsQuery
            );

          const roomsData =
            roomsSnapshot.docs
              .map((doc) => ({

                id: doc.id,

                ...doc.data(),

              }))

              .filter(
                (room: any) =>
                  room.archived !==
                  true
              );

          setRooms(
            roomsData
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchHotelData();

  }, [resolvedParams.id]);

  /* LOADING */

  if (
    loading ||
    !hotel
  ) {

    return (

      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border border-white/10 border-t-[#d4a574] rounded-full animate-spin mx-auto mb-6" />

          <p className="text-white/60">

            Loading Luxury Hotel...

          </p>

        </div>

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">

      {/* HERO */}

      <section className="relative h-[65vh] md:h-[90vh] overflow-hidden">

        <img
          src={
            hotel.image ||

            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2400&auto=format&fit=crop"
          }

          alt={hotel.name}

          className="absolute inset-0 w-full h-full object-cover scale-[1.03]"
        />

        {/* OVERLAYS */}

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)]" />

        {/* CONTENT */}

        <div className="absolute bottom-0 left-0 w-full px-6 md:px-10 pb-14">

          <div className="max-w-7xl mx-auto">

            <p className="uppercase tracking-[0.35em] text-[#d4a574] text-xs mb-5">

              Niels Privé Collection

            </p>

            <div className="flex flex-wrap items-end justify-between gap-8">

              <div>

                <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] max-w-5xl">

                  {hotel.name ||
                    "Luxury Hotel"}

                </h1>

                <div className="flex items-center gap-3 text-white/70 mt-6">

                  <MapPin size={18} />

                  <p className="text-sm md:text-base">

                    {hotel.city ||
                      "Niels Privé Collection"}

                  </p>

                </div>

              </div>

              {/* RATING */}

              <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[26px] px-6 py-5">

                <div className="flex items-center gap-3">

                  <Star
                    size={18}
                    className="text-[#d4a574] fill-[#d4a574]"
                  />

                  <div>

                    <p className="text-2xl font-semibold">

                      {hotel.rating ||
                        "4.9"}

                    </p>

                    <p className="text-white/50 text-sm">

                      Guest Rating

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* MAIN CONTENT */}

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">

        {/* DESCRIPTION */}

        <div className="mb-16">

          <p className="uppercase tracking-[0.25em] text-[#d4a574] text-xs mb-5">

            Hotel Experience

          </p>

          <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">

            Curated Luxury Hospitality

          </h2>

          <p className="text-white/60 leading-9 text-lg max-w-5xl">

            {hotel.description ||

              "Experience elevated hospitality crafted with cinematic luxury interiors, refined architecture, premium guest experiences, and world-class hospitality operations."}

          </p>

        </div>

        {/* HOTEL FEATURES */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">

          <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

            <BedDouble
              size={24}
              className="text-[#d4a574] mb-5"
            />

            <p className="text-white/45 text-sm mb-2">

              Room Types

            </p>

            <h3 className="text-3xl font-semibold">

              {rooms.length}

            </h3>

          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

            <Users
              size={24}
              className="text-[#d4a574] mb-5"
            />

            <p className="text-white/45 text-sm mb-2">

              Hospitality

            </p>

            <h3 className="text-2xl font-semibold">

              Premium

            </h3>

          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

            <Bath
              size={24}
              className="text-[#d4a574] mb-5"
            />

            <p className="text-white/45 text-sm mb-2">

              Experience

            </p>

            <h3 className="text-2xl font-semibold">

              Luxury

            </h3>

          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

            <Sparkles
              size={24}
              className="text-[#d4a574] mb-5"
            />

            <p className="text-white/45 text-sm mb-2">

              Status

            </p>

            <h3 className="text-xl font-semibold">

              Available

            </h3>

          </div>

        </div>

        {/* AMENITIES */}

        <div className="mb-20">

          <p className="uppercase tracking-[0.25em] text-[#d4a574] text-xs mb-5">

            Premium Amenities

          </p>

          <div className="flex flex-wrap gap-4">

            <div className="bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3">

              <Wifi
                size={18}
                className="text-[#d4a574]"
              />

              High-Speed Wifi

            </div>

            <div className="bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3">

              <Waves
                size={18}
                className="text-[#d4a574]"
              />

              Luxury Experiences

            </div>

            <div className="bg-white/[0.03] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3">

              <Sparkles
                size={18}
                className="text-[#d4a574]"
              />

              Premium Hospitality

            </div>

          </div>

        </div>

        {/* ROOM TYPES */}

        <div>

          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">

            <div>

              <p className="uppercase tracking-[0.25em] text-[#d4a574] text-xs mb-5">

                Room Collection

              </p>

              <h2 className="text-4xl md:text-5xl font-semibold leading-tight">

                Curated Room Experiences

              </h2>

            </div>

            <div>

              <p className="text-white/45">

                {rooms.length}
                {" "}
                Room Types Available

              </p>

            </div>

          </div>

          {/* EMPTY */}

          {rooms.length === 0 && (

            <div className="border border-dashed border-white/10 rounded-[38px] p-16 text-center bg-white/[0.02]">

              <h3 className="text-4xl font-semibold mb-5">

                No Rooms Yet

              </h3>

              <p className="text-white/45 max-w-2xl mx-auto leading-8">

                Room inventory for this property will appear here once added from the partner dashboard.

              </p>

            </div>

          )}

          {/* ROOM CARDS */}

          <div className="grid lg:grid-cols-2 gap-8">

            {rooms.map(
              (room: any) => (

                <div
                  key={room.id}
                  className="rounded-[34px] overflow-hidden border border-white/10 bg-white/[0.03]"
                >

                  {/* IMAGE */}

                  <div className="relative h-[320px] overflow-hidden">

                    <img
                      src={
                        room.image ||

                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2400&auto=format&fit=crop"
                      }

                      alt={room.roomName}

                      className="w-full h-full object-cover hover:scale-105 transition-all duration-[4000ms]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-7">

                      <p className="uppercase tracking-[0.25em] text-[#d4a574] text-xs mb-3">

                        Luxury Room

                      </p>

                      <h3 className="text-4xl font-semibold">

                        {room.roomName}

                      </h3>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-7">

                    <p className="text-white/55 leading-8 mb-8">

                      {room.description ||

                        "Luxury hospitality room experience crafted for premium modern travelers."}

                    </p>

                    {/* DETAILS */}

                    <div className="grid grid-cols-3 gap-4 mb-8">

                      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">

                        <p className="text-white/45 text-sm mb-2">

                          Guests

                        </p>

                        <h3 className="text-2xl font-semibold">

                          {room.guests || 2}

                        </h3>

                      </div>

                      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">

                        <p className="text-white/45 text-sm mb-2">

                          Beds

                        </p>

                        <h3 className="text-2xl font-semibold">

                          {room.bedType ||
                            "King"}

                        </h3>

                      </div>

                      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">

                        <p className="text-white/45 text-sm mb-2">

                          Baths

                        </p>

                        <h3 className="text-2xl font-semibold">

                          {room.bathrooms ||
                            1}

                        </h3>

                      </div>

                    </div>

                    {/* FOOTER */}

                    <div className="flex items-center justify-between gap-6 flex-wrap">

                      <div>

                        <p className="text-white/45 text-sm mb-2">

                          Starting From

                        </p>

                        <h3 className="text-4xl font-semibold">

                          ₹{room.price || 0}

                        </h3>

                      </div>

                      <Link
                        href={`/room/${room.id}`}
                        className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-7 py-4 rounded-2xl font-semibold flex items-center gap-3"
                      >

                        View Room

                        <ArrowRight
                          size={18}
                        />

                      </Link>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>

    </main>

  );

}
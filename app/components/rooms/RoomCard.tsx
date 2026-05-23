"use client";

import {
  BedDouble,
  Users,
  Bath,
  Expand,
  Pencil,
  ImagePlus,
  CalendarDays,
  IndianRupee,
  Eye,
  TrendingUp,
} from "lucide-react";

type RoomCardProps = {
  room: any;
  roomStatus: any;
  roomRevenue: number;
  roomBookings: number;

  updateRoomStatus: (
    roomId: string,
    status: string
  ) => void;

  setSelectedRoom: any;

  setShowDeleteModal: any;

  setGalleryPreview: any;

  router: any;
};

export default function RoomCard({
  room,
  roomStatus,
  roomRevenue,
  roomBookings,
  updateRoomStatus,
  setSelectedRoom,
  setShowDeleteModal,
  setGalleryPreview,
  router,
}: RoomCardProps) {

  return (

    <div className="rounded-[38px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl">

      {/* IMAGE */}

      <div className="relative">

        <img
          src={
            room.image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          }
          alt={room.roomName}
          className="w-full h-[340px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* STATUS */}

        <div
          className={`absolute top-6 right-6 px-5 py-3 rounded-2xl text-sm font-medium backdrop-blur-md ${roomStatus.styles}`}
        >

          {roomStatus.label}

        </div>

        {/* CONTENT */}

        <div className="absolute bottom-0 left-0 p-8">

          <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

            NIELS PRIVÉ COLLECTION

          </p>

          <h2 className="text-4xl font-semibold mb-4">

            {room.roomName}

          </h2>

          <p className="text-neutral-300 max-w-lg leading-8">

            {room.description ||
              "Premium luxury guest room experience crafted for elevated hospitality stays."}

          </p>

        </div>

      </div>

      {/* BODY */}

      <div className="p-8">

        {/* ROOM INFO */}

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

        {/* PERFORMANCE */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="rounded-2xl bg-[#d4a574]/10 border border-[#d4a574]/20 p-5">

            <IndianRupee
              size={22}
              className="text-[#d4a574] mb-4"
            />

            <p className="text-neutral-300 text-sm mb-2">

              Revenue

            </p>

            <h3 className="text-3xl font-semibold">

              ₹{roomRevenue}

            </h3>

          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">

            <CalendarDays
              size={22}
              className="text-[#d4a574] mb-4"
            />

            <p className="text-neutral-400 text-sm mb-2">

              Reservations

            </p>

            <h3 className="text-3xl font-semibold">

              {roomBookings}

            </h3>

          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">

            <TrendingUp
              size={22}
              className="text-[#d4a574] mb-4"
            />

            <p className="text-neutral-400 text-sm mb-2">

              Occupancy

            </p>

            <h3 className="text-3xl font-semibold">

              75%

            </h3>

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex items-center justify-between flex-wrap gap-6">

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

          <div className="flex flex-wrap items-center gap-3">

            {/* STATUS */}

            <button
              onClick={() =>
                updateRoomStatus(
                  room.id,
                  "available"
                )
              }
              className="px-4 py-3 rounded-2xl bg-green-900/40 border border-green-700/40 text-green-300 text-sm hover:bg-green-800/40 transition-all"
            >

              Available

            </button>

            <button
              onClick={() =>
                updateRoomStatus(
                  room.id,
                  "cleaning"
                )
              }
              className="px-4 py-3 rounded-2xl bg-yellow-900/40 border border-yellow-700/40 text-yellow-300 text-sm hover:bg-yellow-800/40 transition-all"
            >

              Cleaning

            </button>

            <button
              onClick={() =>
                updateRoomStatus(
                  room.id,
                  "maintenance"
                )
              }
              className="px-4 py-3 rounded-2xl bg-red-900/40 border border-red-700/40 text-red-300 text-sm hover:bg-red-800/40 transition-all"
            >

              Maintenance

            </button>

            {/* GALLERY */}

            <button
              onClick={() => {

                if (
                  room.gallery
                ) {

                  setGalleryPreview(
                    room.gallery
                  );

                } else {

                  setGalleryPreview(
                    room.image
                      ? [
                          room.image,
                        ]
                      : []
                  );

                }

              }}
              className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all flex items-center justify-center"
            >

              <ImagePlus
                size={20}
              />

            </button>

            {/* RESERVATIONS */}

            <button
              onClick={() =>
                router.push(
                  `/partner/dashboard/bookings`
                )
              }
              className="px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all flex items-center gap-3"
            >

              <Eye size={18} />

              Reservations

            </button>

            {/* DELETE */}

            <button
              onClick={() => {

                setSelectedRoom(
                  room
                );

                setShowDeleteModal(
                  true
                );

              }}
              className="px-5 py-4 rounded-2xl border border-red-700/40 bg-red-900/40 text-red-300 font-medium hover:bg-red-800/40 transition-all"
            >

              Archive

            </button>

            {/* EDIT */}

            <button
              onClick={() =>
                router.push(
                  `/partner/dashboard/rooms/edit/${room.id}`
                )
              }
              className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-6 py-4 rounded-2xl font-medium flex items-center gap-3"
            >

              <Pencil
                size={18}
              />

              Edit Room

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
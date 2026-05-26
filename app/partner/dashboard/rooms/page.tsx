"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import RoomCard from "@/app/components/rooms/RoomCard";

import RoomsHeader from "@/app/components/rooms/RoomsHeader";

import DeleteRoomModal from "@/app/components/rooms/DeleteRoomModal";

import RoomGalleryModal from "@/app/components/rooms/RoomGalleryModal";

import {
  getRoomStatus,
  getRoomRevenue,
  getRoomBookings,
} from "@/app/components/rooms/roomHelpers";

import {
  useDashboardData,
} from "@/app/components/dashboard/DashboardProvider";
import { useDashboardRoomBookings } from "@/lib/dashboard/useDashboardRoomBookings";
import {
  archiveRoom,
  updateRoomManualStatus,
  restoreRoom,
} from "@/lib/firestore/rooms";

import {
  Sparkles,
} from "lucide-react";

type DashboardRoom = Record<string, unknown> & {
  id: string;
  roomName?: string;
};

type DashboardBooking = Record<string, unknown> & {
  roomName?: string;
};

export default function RoomsPage() {

  const router = useRouter();

  const {
    partnerId,
    isLoading,
    patchRooms,
    syncAfterMutation,
  } = useDashboardData();

  const { rooms, bookings } =
    useDashboardRoomBookings() as {
      rooms: DashboardRoom[];
      bookings: DashboardBooking[];
    };

  const [search,
    setSearch,
  ] = useState("");

  const [showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [selectedRoom,
    setSelectedRoom,
  ] = useState<DashboardRoom | null>(null);

  const [galleryPreview,
    setGalleryPreview,
  ] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

  /* SEARCH */

  const filteredRooms =
    useMemo(() => {

      const roomsByTab = rooms.filter(
        (room) => activeTab === "archived" ? room.archived === true : room.archived !== true
      );

      return roomsByTab.filter(
        (room) =>

          room.roomName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

      );

    }, [rooms, search, activeTab]);

  /* UPDATE STATUS */

  const updateRoomStatus =
    async (
      roomId: string,
      status: string
    ) => {

      try {

        await updateRoomManualStatus(
          roomId,
          status,
          partnerId
        );

        patchRooms((currentRooms) =>
          currentRooms.map((room) =>
            room.id === roomId
              ? {
                  ...room,
                  manualStatus: status,
                }
              : room
          )
        );

        toast.success(
          "Room status updated"
        );

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

        console.log(error);

      }

    };

  /* DELETE */

  const deleteRoom =
    async () => {

      if (!selectedRoom)
        return;

      try {

        await archiveRoom(
          selectedRoom.id,
          partnerId
        );

        patchRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === selectedRoom.id
              ? { ...room, archived: true }
              : room
          )
        );

        await syncAfterMutation();

        toast.success(
          `${selectedRoom.roomName} archived`
        );

        setShowDeleteModal(
          false
        );

        setSelectedRoom(
          null
        );

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

        console.log(error);

      }

    };

  /* RESTORE */

  const restoreRoomHandler =
    async (room: DashboardRoom) => {

      try {

        await restoreRoom(
          room.id,
          partnerId
        );

        patchRooms((prevRooms) =>
          prevRooms.map((r) =>
            r.id === room.id
              ? { ...r, archived: false }
              : r
          )
        );

        await syncAfterMutation();

        toast.success(
          `${room.roomName} restored`
        );

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

        console.log(error);

      }

    };

  /* LOADING */

  if (isLoading) {

    return (

      <main className="min-h-screen bg-[#050505] text-white px-8 py-10">

        <div className="animate-pulse">

          <div className="h-16 w-72 rounded-2xl bg-white/[0.05] mb-14" />

          <div className="grid lg:grid-cols-2 gap-8">

            {[1, 2, 3, 4].map(
              (item) => (

              <div
                key={item}
                className="h-[620px] rounded-[35px] bg-white/[0.04]"
              />

            ))}

          </div>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 w-full h-[450px] bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.12),transparent_50%)] pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-10">

        {/* HEADER */}

        <div className="mb-14">
          <div className="flex items-center justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-5">
                ROOM MANAGEMENT
              </p>
              <button
                onClick={() =>
                  router.push(
                    "/partner/dashboard"
                  )
                }
                className="mb-7 px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all"
              >
                ← Back To Dashboard
              </button>
              <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] tracking-[-0.05em]">
                Hospitality
                <br />
                Inventory
              </h1>
              <p className="text-white/45 mt-6 leading-8 max-w-3xl text-lg">
                Manage room availability, hospitality operations, occupancy performance, and guest inventory experiences.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex bg-white/[0.04] border border-white/10 rounded-2xl p-1 gap-1">
                <button
                  onClick={() => setActiveTab("active")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "active" ? "bg-white/[0.12] text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab("archived")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "archived" ? "bg-white/[0.12] text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  Archived
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500">🔍</div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search rooms..."
                  className="bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none w-[280px]"
                />
              </div>
              {activeTab === "active" && (
                <button
                  onClick={() =>
                    router.push(
                      "/partner/dashboard/rooms/add"
                    )
                  }
                  className="bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black px-6 py-4 rounded-2xl font-medium flex items-center gap-3"
                >
                  <div>+</div>
                  Add New Room
                </button>
              )}
            </div>
          </div>
        </div>

        {/* EMPTY */}

        {!isLoading &&
          filteredRooms.length === 0 && (

          <div className="border border-dashed border-white/10 rounded-[40px] p-16 text-center bg-white/[0.02]">

            <div className="w-24 h-24 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-8">

              <Sparkles
                size={38}
                className="text-[#d4a574]"
              />

            </div>

            <h2 className="text-4xl font-semibold mb-5">
              {activeTab === "archived" ? "No Archived Rooms" : "No Active Inventory"}
            </h2>

            <p className="text-white/45 max-w-2xl mx-auto leading-8 mb-10 text-lg">
              {activeTab === "archived"
                ? "Archived rooms will appear here when you archive inventory from your active listings."
                : "Start building your hospitality inventory and premium room experiences for future guests."
              }
            </p>

          </div>

        )}

        {/* GRID */}

        <div className="grid lg:grid-cols-2 gap-8">

          {filteredRooms.map((room) => {

            const roomStatus =
              getRoomStatus(
                room,
                bookings
              );

            const roomRevenue =
              getRoomRevenue(
                room.roomName ?? "",
                bookings
              );

            const roomBookings =
              getRoomBookings(
                room.roomName ?? "",
                bookings
              );

            if (activeTab === "archived") {
              return (
                <div key={room.id} className="bg-white/[0.03] border border-white/10 rounded-[35px] p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">{room.roomName || "Room"}</h3>
                      <p className="text-white/40">Archived room</p>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-white/50 text-sm">
                      Archived
                    </div>
                  </div>
                  <button
                    onClick={() => restoreRoomHandler(room)}
                    className="w-full bg-[#d4a574]/20 hover:bg-[#d4a574]/30 text-[#d4a574] border border-[#d4a574]/30 rounded-2xl py-4 font-medium transition-all"
                  >
                    Restore Room
                  </button>
                </div>
              );
            }

            return (

              <RoomCard
                key={room.id}
                room={room}
                roomStatus={roomStatus}
                roomRevenue={roomRevenue}
                roomBookings={roomBookings}
                updateRoomStatus={updateRoomStatus}
                setSelectedRoom={setSelectedRoom}
                setShowDeleteModal={setShowDeleteModal}
                setGalleryPreview={setGalleryPreview}
                router={router}
              />

            );

          })}

        </div>

      </section>

      {/* MODALS */}

      <DeleteRoomModal
        showDeleteModal={showDeleteModal}
        selectedRoom={selectedRoom}
        setShowDeleteModal={setShowDeleteModal}
        setSelectedRoom={setSelectedRoom}
        deleteRoom={deleteRoom}
      />

      <RoomGalleryModal
        galleryPreview={galleryPreview}
        setGalleryPreview={setGalleryPreview}
      />

    </main>

  );

}
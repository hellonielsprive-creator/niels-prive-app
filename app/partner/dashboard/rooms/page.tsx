"use client";

import { useEffect, useMemo, useState } from "react";

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
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

import {
  db,
  auth,
} from "@/app/firebase/config";

import {
  Sparkles,
} from "lucide-react";

export default function RoomsPage() {

  const router = useRouter();

  const [rooms,
    setRooms,
  ] = useState<any[]>([]);

  const [bookings,
    setBookings,
  ] = useState<any[]>([]);

  const [loading,
    setLoading,
  ] = useState(true);

  const [search,
    setSearch,
  ] = useState("");

  const [showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [selectedRoom,
    setSelectedRoom,
  ] = useState<any>(null);

  const [galleryPreview,
    setGalleryPreview,
  ] = useState<string[]>([]);

  useEffect(() => {

    if (!auth.currentUser) {

      router.push("/signin");

      return;

    }

    const fetchRooms =
      async () => {

        try {

          const roomsQuery =
            query(
              collection(
                db,
                "rooms"
              ),
              where(
                "partnerId",
                "==",
                auth.currentUser?.uid
              )
            );

          const roomsSnapshot =
            await getDocs(
              roomsQuery
            );

          const roomsData =
            roomsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setRooms(
            roomsData
          );

          const bookingsSnapshot =
            await getDocs(
              collection(
                db,
                "bookings"
              )
            );

          const bookingsData =
            bookingsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          const partnerBookings =
            bookingsData.filter(
              (booking: any) =>

                roomsData.some(
                  (room: any) =>
                    room.roomName ===
                    booking.roomName
                )

            );

          setBookings(
            partnerBookings
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchRooms();

  }, []);

  /* SEARCH */

  const filteredRooms =
    useMemo(() => {

      return rooms.filter(
        (room) =>

          room.roomName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

      );

    }, [rooms, search]);

  /* UPDATE STATUS */

  const updateRoomStatus =
    async (
      roomId: string,
      status: string
    ) => {

      try {

        await updateDoc(
          doc(
            db,
            "rooms",
            roomId
          ),
          {
            manualStatus: status,
          }
        );

        setRooms(
          rooms.map((room) =>

            room.id === roomId
              ? {
                  ...room,
                  manualStatus:
                    status,
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

        await updateDoc(
          doc(
            db,
            "rooms",
            selectedRoom.id
          ),
          {
            archived: true,
          }
        );

        setRooms(
          (prevRooms) =>

            prevRooms.filter(
              (room) =>
                room.id !==
                selectedRoom.id
            )

        );

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

  /* LOADING */

  if (loading) {

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

        <RoomsHeader
          router={router}
          search={search}
          setSearch={setSearch}
        />

        {/* EMPTY */}

        {!loading &&
          filteredRooms.length === 0 && (

          <div className="border border-dashed border-white/10 rounded-[40px] p-16 text-center bg-white/[0.02]">

            <div className="w-24 h-24 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-8">

              <Sparkles
                size={38}
                className="text-[#d4a574]"
              />

            </div>

            <h2 className="text-4xl font-semibold mb-5">

              No Active Inventory

            </h2>

            <p className="text-white/45 max-w-2xl mx-auto leading-8 mb-10 text-lg">

              Start building your hospitality inventory and premium room experiences for future guests.

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
                room.roomName,
                bookings
              );

            const roomBookings =
              getRoomBookings(
                room.roomName,
                bookings
              );

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
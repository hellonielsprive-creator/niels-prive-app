"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

import {
  LayoutDashboard,
  Building2,
  BedDouble,
  Images,
  CalendarDays,
  Wallet,
  BarChart3,
  BadgeCheck,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Plus,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function PartnerDashboardPage() {

  const [partnerData, setPartnerData] =
    useState<any>(null);
    const [rooms, setRooms] =
    useState<any[]>([]);
    const [bookings, setBookings] =
  useState<any[]>([]);
    const [editingRoom, setEditingRoom] =
  useState<any>(null);

const [updatedPrice, setUpdatedPrice] =
  useState("");

  useEffect(() => {

    const fetchPartnerData =
      async () => {

        try {

          const querySnapshot =
            await getDocs(
              collection(db, "partners")
            );

          const data =
            querySnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          if (data.length > 0) {

            setPartnerData(data[0]);

          }

        } catch (error) {

          console.log(error);

        }

      };

    fetchPartnerData();

  }, []);
  useEffect(() => {

  const fetchRooms = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "rooms")
        );

      const roomData =
        querySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      setRooms(roomData);

    } catch (error) {

      console.log(error);

    }

  };

  fetchRooms();

}, []);
useEffect(() => {

  const fetchBookings = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "bookings")
        );

      const bookingData =
        querySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      setBookings(
  bookingData.filter(
    (booking: any) =>
      booking.bookingType === "hotel"
  )
);

    } catch (error) {

      console.log(error);

    }

  };

  fetchBookings();

}, []);

const updateBookingStatus =
  async (
    id: string,
    status: string
  ) => {

    try {

      await updateDoc(
        doc(db, "bookings", id),
        {
          status,
        }
      );

      setBookings(
        bookings.map((booking) =>

          booking.id === id
            ? {
                ...booking,
                status,
              }
            : booking

        )
      );

    } catch (error) {

      console.log(error);

    }

  };

const deleteRoom = async (id: string) => {

  try {

    await deleteDoc(doc(db, "rooms", id));

    setRooms(
      rooms.filter((room) => room.id !== id)
    );

  } catch (error) {

    console.log(error);

  }

};

  return (

    <main className="min-h-screen bg-[#050505] text-white flex overflow-hidden">

      {/* SIDEBAR */}

      <aside className="w-[290px] border-r border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 flex flex-col justify-between">

        <div>

          <div className="mb-14">

            <p className="tracking-[0.35em] text-[#d4a574] text-xs mb-4">

              NIELS PRIVÉ

            </p>

            <h1 className="text-3xl font-semibold leading-tight">

              Partner
              <br />
              Dashboard

            </h1>

          </div>

          <div className="space-y-3">

            <button className="w-full flex items-center gap-4 bg-[#d4a574] text-black px-5 py-4 rounded-2xl font-medium">

              <LayoutDashboard size={20} />

              Overview

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all">

              <Building2 size={20} />

              Property

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all">

              <BedDouble size={20} />

              Rooms

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all">

              <Images size={20} />

              Gallery

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all">

              <CalendarDays size={20} />

              Reservations

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all">

              <Wallet size={20} />

              Pricing

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all">

              <BarChart3 size={20} />

              Analytics

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all">

              <BadgeCheck size={20} />

              Verification

            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/[0.05] px-5 py-4 rounded-2xl transition-all">

              <Settings size={20} />

              Settings

            </button>

          </div>

        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">

          <p className="text-[#d4a574] text-sm mb-3">

            PROPERTY STATUS

          </p>

          <h3 className="text-2xl font-semibold mb-4">

            Verification
            <br />
            Pending

          </h3>

          <p className="text-neutral-400 leading-7 text-sm mb-6">

            Complete onboarding and verification
            to activate global visibility.

          </p>

          <button className="w-full bg-[#d4a574] text-black py-4 rounded-2xl font-medium">

            Continue Setup

          </button>

        </div>

      </aside>

      {/* MAIN */}

      <section className="flex-1 overflow-y-auto">

        {/* TOPBAR */}

        <div className="border-b border-white/10 px-10 py-6 flex items-center justify-between">

          <div>

            <p className="text-[#d4a574] tracking-[0.3em] text-xs mb-3">

              OVERVIEW

            </p>

            <h2 className="text-4xl font-semibold leading-tight">

              Welcome Back,
              <br />

              {partnerData?.propertyName ||
                "Luxury Partner"}

            </h2>

          </div>

          <div className="flex items-center gap-4">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                placeholder="Search dashboard..."
                className="bg-white/[0.04] border border-white/10 rounded-2xl pl-14 pr-5 py-4 outline-none w-[260px]"
              />

            </div>

            <button className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">

              <Bell size={20} />

            </button>

          </div>

        </div>

        {/* BODY */}

        <div className="p-10">

          {/* REAL PROPERTY CARD */}

          <div className="rounded-[35px] border border-[#d4a574]/20 bg-gradient-to-br from-[#1a1a1a] to-[#0b0b0b] p-10 mb-10">

            <div className="flex items-center justify-between mb-10">

              <div>

                <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-4">

                  LIVE PROPERTY DATA

                </p>

                <h2 className="text-5xl font-semibold">

                  {partnerData?.propertyName}

                </h2>

              </div>

              <div className="w-20 h-20 rounded-3xl bg-[#d4a574] text-black flex items-center justify-center">

                <Building2 size={38} />

              </div>

            </div>

            <div className="grid grid-cols-2 gap-6">

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                <div className="flex items-center gap-3 mb-4">

                  <BadgeCheck
                    size={20}
                    className="text-[#d4a574]"
                  />

                  <p className="text-neutral-400">

                    Property Type

                  </p>

                </div>

                <h3 className="text-2xl font-semibold">

                  {partnerData?.propertyType}

                </h3>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                <div className="flex items-center gap-3 mb-4">

                  <Globe
                    size={20}
                    className="text-[#d4a574]"
                  />

                  <p className="text-neutral-400">

                    Country

                  </p>

                </div>

                <h3 className="text-2xl font-semibold">

                  {partnerData?.country}

                </h3>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                <div className="flex items-center gap-3 mb-4">

                  <Mail
                    size={20}
                    className="text-[#d4a574]"
                  />

                  <p className="text-neutral-400">

                    Business Email

                  </p>

                </div>

                <h3 className="text-xl font-semibold break-all">

                  {partnerData?.businessEmail}

                </h3>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                <div className="flex items-center gap-3 mb-4">

                  <Phone
                    size={20}
                    className="text-[#d4a574]"
                  />

                  <p className="text-neutral-400">

                    Phone Number

                  </p>

                </div>

                <h3 className="text-2xl font-semibold">

                  {partnerData?.phoneNumber}

                </h3>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 col-span-2">

                <div className="flex items-center gap-3 mb-4">

                  <MapPin
                    size={20}
                    className="text-[#d4a574]"
                  />

                  <p className="text-neutral-400">

                    Full Address

                  </p>

                </div>

                <h3 className="text-xl font-semibold leading-10">

                  {partnerData?.address}

                </h3>

              </div>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-4 gap-6">

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

              <p className="text-neutral-400 mb-4">

                Total Rooms

              </p>

              <h3 className="text-5xl font-semibold mb-3">

                {rooms.length}

              </h3>

              <p className="text-green-400 text-sm">

                +18% this month

              </p>

            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

              <p className="text-neutral-400 mb-4">

                Monthly Revenue

              </p>

              <h3 className="text-5xl font-semibold mb-3">

                $48K

              </h3>

              <p className="text-green-400 text-sm">

                +12% growth

              </p>

            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

              <p className="text-neutral-400 mb-4">

                Occupancy Rate

              </p>

              <h3 className="text-5xl font-semibold mb-3">

                82%

              </h3>

              <p className="text-green-400 text-sm">

                High demand

              </p>

            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">

              <p className="text-neutral-400 mb-4">

                Property Status

              </p>

              <h3 className="text-5xl font-semibold mb-3">

                Live

              </h3>

              <p className="text-[#d4a574] text-sm">

                Global visibility active

              </p>

            </div>

          </div>

        </div>
        <div className="mt-12">

  <div className="flex items-center justify-between mb-8">

    <div>

      <p className="tracking-[0.3em] text-[#d4a574] text-xs mb-3">

        RESERVATIONS

      </p>

      <h2 className="text-4xl font-semibold">

        Upcoming Bookings

      </h2>

    </div>

  </div>

  <div className="grid grid-cols-2 gap-6">

    {bookings.map((booking) => (

      <div
        key={booking.id}
        className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7"
      >

        <div className="flex items-center justify-between mb-6">

          <div>

            <h3 className="text-2xl font-semibold mb-2">

              {booking.hotelName}

            </h3>

            <p className="text-neutral-400">

              {booking.roomName}

            </p>

          </div>

          <div className="bg-[#d4a574] text-black px-4 py-2 rounded-xl text-sm font-medium">

            {booking.status}
            <div className="flex gap-3 mt-5">

  <button
    onClick={() =>
      updateBookingStatus(
        booking.id,
        "confirmed"
      )
    }
    className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm"
  >

    Confirm

  </button>

  <button
    onClick={() =>
      updateBookingStatus(
        booking.id,
        "cancelled"
      )
    }
    className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm"
  >

    Cancel

  </button>

</div>

          </div>

        </div>

        <div className="space-y-3 text-sm">

          <p>

            Guest:
            <span className="text-white ml-2">

              {booking.guestName}

            </span>

          </p>

          <p>

            Check In:
            <span className="text-white ml-2">

              {booking.checkIn}

            </span>

          </p>

          <p>

            Check Out:
            <span className="text-white ml-2">

              {booking.CheckOut}

            </span>

          </p>

          <p>

            Guests:
            <span className="text-white ml-2">

              {booking.guests}

            </span>

          </p>

          <p>

            Total:
            <span className="text-[#d4a574] ml-2 font-semibold">

              ₹{booking.totalPrice}

            </span>

          </p>

        </div>

      </div>

    ))}

  </div>

</div>
<div className="mt-10 px-20">

  <h2 className="text-4xl font-semibold mb-8 mt-6 ml-6">

    Property Rooms

  </h2>

  <div className="grid grid-cols-3 gap-6 pl-2">

    {rooms.map((room) => (

      <div
        key={room.id}
        className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7 ml-6"
      >

        <h3 className="text-3xl font-semibold mb-4">

          {room.roomName}

        </h3>

        <p className="text-neutral-400 mb-4">

          {room.description}

        </p>

        <p className="mb-2">

          Guests: {room.guests}

        </p>

        <p className="text-[#d4a574]">

          ${room.price}

        </p>
        <div className="flex gap-3 mt-6">

  <button
    onClick={() => {
      setEditingRoom(room.id);
      setUpdatedPrice(room.price);
    }}
    className="bg-blue-500 text-white px-4 py-2 rounded-xl"
  >
    Edit
  </button>

  <button
    onClick={async () => {

      await deleteDoc(
        doc(db, "rooms", room.id)
      );

      setRooms(
        rooms.filter(
          (r) => r.id !== room.id
        )
      );

    }}
    className="bg-red-500 text-white px-4 py-2 rounded-xl"
  >
    Delete
  </button>

</div>

{
  editingRoom === room.id && (

    <div className="mt-5 space-y-3">

      <input
        value={updatedPrice}
        onChange={(e) =>
          setUpdatedPrice(e.target.value)
        }
        placeholder="Update price"
        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none"
      />

      <button
        onClick={async () => {

          await updateDoc(
            doc(db, "rooms", room.id),
            {
              price: updatedPrice,
            }
          );

          setRooms(
            rooms.map((r) =>
              r.id === room.id
                ? {
                    ...r,
                    price: updatedPrice,
                  }
                : r
            )
          );

          setEditingRoom(null);

        }}
        className="bg-[#d4a574] text-black px-5 py-3 rounded-xl font-medium"
      >
        Save Changes
      </button>

    </div>

  )
}

      </div>

    ))}

  </div>

</div>
      </section>
      

    </main>

  );

}
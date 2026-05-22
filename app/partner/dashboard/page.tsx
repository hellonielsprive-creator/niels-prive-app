"use client";

import { useEffect, useState } from "react";

import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/app/components/dashboard/DashboardTopbar";
import DashboardStats from "@/app/components/dashboard/DashboardStats";
import UpcomingBookings from "@/app/components/dashboard/UpcomingBookings";
import RoomsSection from "@/app/components/dashboard/RoomsSection";

import { useRouter } from "next/navigation";

import { auth } from "../../firebase/config";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

import {
  Building2,
  BadgeCheck,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function PartnerDashboardPage() {

  const router = useRouter();

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

    const unsubscribe =
      auth.onAuthStateChanged(
        (user) => {

          if (!user) {

            router.push("/signin");

          }

        }
      );

    return () => unsubscribe();

  }, [router]);

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

  return (

    <main className="min-h-screen bg-[#050505] text-white flex overflow-hidden">

      <DashboardSidebar />

      <section className="flex-1 overflow-y-auto">

        <DashboardTopbar />

        <div className="p-10">

          {/* PROPERTY CARD */}

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:col-span-2">

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

          <DashboardStats />

          <UpcomingBookings
            bookings={bookings}
            updateBookingStatus={updateBookingStatus}
          />

          <RoomsSection
            rooms={rooms}
            editingRoom={editingRoom}
            setEditingRoom={setEditingRoom}
            updatedPrice={updatedPrice}
            setUpdatedPrice={setUpdatedPrice}
            setRooms={setRooms}
          />

        </div>

      </section>

    </main>

  );

}
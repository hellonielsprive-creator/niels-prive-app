"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  listenToAllHotels,
  listenToAllBookings,
} from "@/lib/firestore/admin";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CreditCard,
  Activity,
} from "lucide-react";

export default function AdminXPartnerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const partnerId = params.id as string;

  const [partner, setPartner] = useState<any>(null);
  const [hotels, setHotels] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!partnerId) return;

    let unmounted = false;

    const fetchPartner = async () => {
      try {
        const docRef = doc(db, "partners", partnerId);
        const docSnap = await getDoc(docRef);

        if (unmounted) return;

        if (docSnap.exists()) {
          setPartner({ id: docSnap.id, ...docSnap.data() });
        } else {
          router.push("/adminx/partners");
        }
      } catch (error) {
        console.error("Error fetching partner:", error);
        router.push("/adminx/partners");
      } finally {
        if (unmounted) return;
        setLoading(false);
      }
    };

    const unsubHotels = listenToAllHotels((data) => {
      if (unmounted) return;
      const partnerHotels = data.filter((h: any) => h.partnerId === partnerId);
      setHotels(partnerHotels);
    });

    const unsubBookings = listenToAllBookings((data) => {
      if (unmounted) return;
      setBookings(data);
    });

    fetchPartner();

    return () => {
      unmounted = true;
      unsubHotels();
      unsubBookings();
    };
  }, [partnerId, router]);

  const partnerHotels = hotels.filter((h: any) => h.partnerId === partnerId);
  const partnerBookings = bookings.filter((b: any) =>
    partnerHotels.some((h: any) => h.id === b.hotelId)
  );
  const activeBookings = partnerBookings.filter((b: any) =>
    ["confirmed", "checked_in"].includes(b.status)
  );

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-white/50 text-lg">Loading partner...</p>
      </div>
    );
  }

  if (!partner) {
    return null;
  }

  return (
    <div className="p-10">
      {/* Back Button */}
      <button
        onClick={() => router.push("/adminx/partners")}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-all mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Partners</span>
      </button>

      {/* Partner Header */}
      <div className="mb-12">
        <p className="text-[#d4a574] tracking-[0.3em] text-xs mb-3">
          PARTNER PROFILE
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-3">
          {partner.name || partner.hotelName || partner.fullName || "Unnamed Partner"}
        </h2>
        <p className="text-white/50 text-lg">{partner.email || "No email"}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <div className="flex items-center gap-4 mb-3">
            <Building2 className="w-6 h-6 text-[#d4a574]" />
            <p className="text-white/45 text-sm">Properties</p>
          </div>
          <h3 className="text-4xl font-semibold">{partnerHotels.length}</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <div className="flex items-center gap-4 mb-3">
            <Calendar className="w-6 h-6 text-[#d4a574]" />
            <p className="text-white/45 text-sm">Active Bookings</p>
          </div>
          <h3 className="text-4xl font-semibold">{activeBookings.length}</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <div className="flex items-center gap-4 mb-3">
            <CreditCard className="w-6 h-6 text-[#d4a574]" />
            <p className="text-white/45 text-sm">Commission</p>
          </div>
          <h3 className="text-4xl font-semibold">{partner.commissionRate || 12}%</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <div className="flex items-center gap-4 mb-3">
            <Activity className="w-6 h-6 text-[#d4a574]" />
            <p className="text-white/45 text-sm">Status</p>
          </div>
          <h3 className="text-4xl font-semibold">
            {partner.status?.charAt(0).toUpperCase() + partner.status?.slice(1) || "Pending"}
          </h3>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Connected Hotels */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <h3 className="text-2xl font-semibold mb-6">Connected Hotels</h3>
          <div className="space-y-4">
            {partnerHotels.length > 0 ? (
              partnerHotels.map((hotel: any) => (
                <div
                  key={hotel.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                >
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">
                      {hotel.name || "Unnamed Property"}
                    </h4>
                    <p className="text-white/40 text-sm">{hotel.destination || "No destination"}</p>
                  </div>
                  <p className="text-sm text-[#d4a574]">
                    {hotel.featured ? "Featured" : "Standard"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white/40">No properties yet</p>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <h3 className="text-2xl font-semibold mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            {partnerBookings.slice(0, 5).length > 0 ? (
              partnerBookings.slice(0, 5).map((booking: any) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                >
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">
                      {booking.roomName || "Room"}
                    </h4>
                    <p className="text-white/40 text-sm">
                      {booking.checkIn || "No dates"}
                    </p>
                  </div>
                  <p className={`text-sm font-medium ${
                    booking.status === "confirmed" ? "text-green-400" :
                    booking.status === "checked_in" ? "text-blue-400" :
                    "text-white/40"
                  }`}>
                    {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "Pending"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white/40">No bookings yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

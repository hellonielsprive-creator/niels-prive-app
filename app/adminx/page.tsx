"use client";

import { useEffect, useState } from "react";
import {
  listenToAllHotels,
  listenToAllRooms,
  listenToAllBookings,
  listenToAllPartners,
  listenToAllUsers,
} from "@/lib/firestore/admin";

export default function AdminXPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("AdminX dashboard: Mounted, setting up listeners");
    
    let isMounted = true;

    try {
      const unsubHotels = listenToAllHotels((data) => {
        console.log("AdminX dashboard: Hotels data received", data?.length);
        if (isMounted) setHotels(data || []);
      });
      const unsubRooms = listenToAllRooms((data) => {
        console.log("AdminX dashboard: Rooms data received", data?.length);
        if (isMounted) setRooms(data || []);
      });
      const unsubBookings = listenToAllBookings((data) => {
        console.log("AdminX dashboard: Bookings data received", data?.length);
        if (isMounted) setBookings(data || []);
      });
      const unsubPartners = listenToAllPartners((data) => {
        console.log("AdminX dashboard: Partners data received", data?.length);
        if (isMounted) setPartners(data || []);
      });
      const unsubUsers = listenToAllUsers((data) => {
        console.log("AdminX dashboard: Users data received", data?.length);
        if (isMounted) setUsers(data || []);
      });

      // Set loading to false after a short delay to allow initial data
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          console.log("AdminX dashboard: Setting loading to false");
          setLoading(false);
        }
      }, 1500);

      return () => {
        console.log("AdminX dashboard: Unmounting, cleaning up");
        isMounted = false;
        clearTimeout(timeoutId);
        unsubHotels();
        unsubRooms();
        unsubBookings();
        unsubPartners();
        unsubUsers();
      };
    } catch (err) {
      console.error("AdminX dashboard: Error setting up listeners", err);
      if (isMounted) {
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    }
  }, []);

  const totalHotels = hotels?.length || 0;
  const totalRooms = rooms?.length || 0;
  const activeBookings = (bookings || []).filter((b) => b?.status === "confirmed" || b?.status === "checked_in").length;
  const activePartners = partners?.length || 0;
  const registeredUsers = users?.length || 0;
  const occupiedRooms = (rooms || []).filter((r) => r?.manualStatus === "Occupied").length;
  const occupancyPercentage = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const readyRooms = (rooms || []).filter((r) => r?.manualStatus === "Ready").length;
  const cleaningRooms = (rooms || []).filter((r) => r?.manualStatus === "Cleaning").length;
  const maintenanceRooms = (rooms || []).filter((r) => r?.manualStatus === "Maintenance").length;

  const recentActivity = [
    ...((bookings || []).slice(-5).map((b) => ({
      time: b?.createdAt?.toDate?.() 
        ? new Date(b.createdAt.toDate()).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        : new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      text: `Booking confirmed: ${b?.roomName || "Room"}`,
    }))),
    ...((rooms || []).slice(-3).map((r) => ({
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      text: `Room ${r?.name || "Unknown"}: ${r?.manualStatus || "Ready"}`,
    }))),
  ].slice(0, 5).reverse();

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-white/50 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">{error}</p>
          <p className="text-white/40 text-sm">Please refresh the page</p>
        </div>
      </div>
    );
  }

  console.log("AdminX dashboard: Rendering main content");
  return (
    <div className="p-10">
      {/* Top Bar */}
      <div className="mb-12">
        <p className="text-[#d4a574] tracking-[0.3em] text-xs mb-3">
          HOSPITALITY COMMAND CENTER
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          System Overview
        </h2>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <p className="text-white/45 text-sm mb-3">Total Hotels</p>
          <h3 className="text-4xl font-semibold">{totalHotels}</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <p className="text-white/45 text-sm mb-3">Active Partners</p>
          <h3 className="text-4xl font-semibold">{activePartners}</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <p className="text-white/45 text-sm mb-3">Occupancy</p>
          <h3 className="text-4xl font-semibold">{occupancyPercentage}%</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <p className="text-white/45 text-sm mb-3">Total Rooms</p>
          <h3 className="text-4xl font-semibold">{totalRooms}</h3>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Live Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold">Live Operations Feed</h3>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-white/40 text-sm">Live</p>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                  >
                    <p className="text-white/30 text-sm w-24">{item.time}</p>
                    <p className="text-white/70">{item.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-white/40">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Controls */}
        <div className="space-y-6">
          {/* Room States */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
            <h3 className="text-xl font-semibold mb-6">Room States</h3>
            <div className="space-y-3">
              {[
                { label: "Ready", count: readyRooms },
                { label: "Occupied", count: occupiedRooms },
                { label: "Cleaning", count: cleaningRooms },
                { label: "Maintenance", count: maintenanceRooms },
              ].map((state, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2"
                >
                  <p className="text-white/60">{state.label}</p>
                  <p className="text-white font-medium">{state.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Preview */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
            <h3 className="text-xl font-semibold mb-6">Partner Activity</h3>
            <div className="space-y-4">
              {partners.slice(0, 3).map((partner, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between"
                >
                  <p className="text-white/70">{partner.name || partner.hotelName || "Unnamed Partner"}</p>
                  <p className="text-sm text-[#d4a574]">
                    {partner.status || "Active"}
                  </p>
                </div>
              ))}
              {partners.length === 0 && (
                <p className="text-white/40">No partners yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

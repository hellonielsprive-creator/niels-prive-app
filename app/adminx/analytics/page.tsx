"use client";

import { useEffect, useState } from "react";
import {
  listenToAllHotels,
  listenToAllRooms,
  listenToAllBookings,
  listenToAllPartners,
  listenToAllUsers,
} from "@/lib/firestore/admin";

export default function AdminXAnalyticsPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubHotels = listenToAllHotels((data) => setHotels(data));
    const unsubRooms = listenToAllRooms((data) => setRooms(data));
    const unsubBookings = listenToAllBookings((data) => setBookings(data));
    const unsubPartners = listenToAllPartners((data) => setPartners(data));
    const unsubUsers = listenToAllUsers((data) => setUsers(data));

    setTimeout(() => setLoading(false), 1000);

    return () => {
      unsubHotels();
      unsubRooms();
      unsubBookings();
      unsubPartners();
      unsubUsers();
    };
  }, []);

  const totalHotels = hotels.length;
  const totalRooms = rooms.length;
  const totalBookings = bookings.length;
  const totalPartners = partners.length;
  const totalUsers = users.length;

  const occupiedRooms = rooms.filter((r) => r.manualStatus === "Occupied").length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "checked_in").length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-white/50 text-lg">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="mb-12">
        <p className="text-[#d4a574] tracking-[0.3em] text-xs mb-3">
          ADMINX
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Analytics
        </h2>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <p className="text-white/45 text-sm mb-3">Occupancy Rate</p>
          <h3 className="text-4xl font-semibold">{occupancyRate}%</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <p className="text-white/45 text-sm mb-3">Total Bookings</p>
          <h3 className="text-4xl font-semibold">{totalBookings}</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <p className="text-white/45 text-sm mb-3">Active Partners</p>
          <h3 className="text-4xl font-semibold">{totalPartners}</h3>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <p className="text-white/45 text-sm mb-3">Total Users</p>
          <h3 className="text-4xl font-semibold">{totalUsers}</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Ecosystem Health */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <h3 className="text-2xl font-semibold mb-6">Ecosystem Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <p className="text-white/60">Total Hotels</p>
              <p className="text-white font-medium">{totalHotels}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <p className="text-white/60">Total Rooms</p>
              <p className="text-white font-medium">{totalRooms}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <p className="text-white/60">Occupied Rooms</p>
              <p className="text-white font-medium">{occupiedRooms}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <p className="text-white/60">Confirmed Bookings</p>
              <p className="text-white font-medium">{confirmedBookings}</p>
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="text-white/60">Platform Revenue</p>
              <p className="text-white font-medium">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Operational Insights */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
          <h3 className="text-2xl font-semibold mb-6">Operational Insights</h3>
          <div className="space-y-4">
            {occupancyRate > 80 && (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-yellow-400 text-sm font-medium">High Occupancy Alert</p>
                <p className="text-white/60 text-xs mt-1">
                  Current occupancy at {occupancyRate}% - consider adding capacity
                </p>
              </div>
            )}
            {rooms.filter((r) => r.manualStatus === "Maintenance").length > 5 && (
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <p className="text-orange-400 text-sm font-medium">Maintenance Load</p>
                <p className="text-white/60 text-xs mt-1">
                  {rooms.filter((r) => r.manualStatus === "Maintenance").length} rooms in maintenance
                </p>
              </div>
            )}
            {totalPartners === 0 && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-400 text-sm font-medium">Partner Onboarding</p>
                <p className="text-white/60 text-xs mt-1">
                  No active partners yet - focus on partner acquisition
                </p>
              </div>
            )}
            {totalBookings === 0 && (
              <div className="p-4 rounded-xl bg-[#d4a574]/10 border border-[#d4a574]/20">
                <p className="text-[#d4a574] text-sm font-medium">Booking Activity</p>
                <p className="text-white/60 text-xs mt-1">
                  No bookings yet - optimize discovery and featured placements
                </p>
              </div>
            )}
            {!occupancyRate && !totalPartners && !totalBookings && (
              <p className="text-white/40">All systems operational</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

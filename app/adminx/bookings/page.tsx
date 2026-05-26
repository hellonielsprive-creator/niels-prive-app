"use client";

import { useEffect, useState } from "react";
import { listenToAllBookings } from "@/lib/firestore/admin";
import {
  updateBookingStatus,
  archiveBooking,
  restoreBooking,
} from "@/lib/firestore/admin-bookings";

export default function AdminXBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const unsub = listenToAllBookings((data) => {
      setBookings(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    await updateBookingStatus(id, status);
  };

  const handleArchive = async (id: string) => {
    await archiveBooking(id);
  };

  const handleRestore = async (id: string) => {
    await restoreBooking(id);
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "archived") return b.archived;
    return b.status === filterStatus && !b.archived;
  }).sort((a, b) => {
    const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
    const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
    return dateB - dateA;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "text-yellow-400",
      confirmed: "text-green-400",
      checked_in: "text-blue-400",
      checked_out: "text-neutral-400",
      cancelled: "text-red-400",
      refunded: "text-orange-400",
    };
    return colors[status] || "text-white/60";
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-white/50 text-lg">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex flex-wrap items-start justify-between gap-6 mb-12">
        <div>
          <p className="text-[#d4a574] tracking-[0.3em] text-xs mb-3">
            ADMINX
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Bookings
          </h2>
        </div>
        <div>
          <label className="text-xs text-white/40 mb-2 block">
            Filter by Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white outline-none text-sm"
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked_in">Checked In</option>
            <option value="checked_out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
        <h3 className="text-2xl font-semibold mb-6">Booking Operations</h3>
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className={`p-6 rounded-2xl border transition-all ${
                  booking.archived
                    ? "border-white/5 bg-white/[0.01]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-6 mb-4">
                  <div>
                    <h4 className="text-xl font-medium text-white mb-1">
                      {booking.roomName || booking.hotelName || "Room"} at{" "}
                      {booking.hotelName || booking.propertyName || "Property"}
                    </h4>
                    <p className="text-white/40 text-sm">
                      Guest: {booking.guestName || booking.name || "Unknown Guest"}
                    </p>
                    <p className="text-white/30 text-xs mt-1">
                      {booking.checkIn || "No dates"} → {booking.checkOut || "No dates"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`text-xs font-semibold tracking-wider uppercase ${getStatusColor(booking.status)}`}>
                      {booking.status || "Pending"}
                    </span>
                    <div className="flex items-center gap-3">
                      {booking.archived ? (
                        <button
                          onClick={() => booking.id && handleRestore(booking.id)}
                          className="px-4 py-2 rounded-xl border border-[#d4a574]/30 text-[#d4a574] hover:bg-[#d4a574]/10 transition-all text-sm"
                        >
                          Restore
                        </button>
                      ) : (
                        <button
                          onClick={() => booking.id && handleArchive(booking.id)}
                          className="px-4 py-2 rounded-xl border border-white/20 text-white/40 hover:border-white/40 hover:text-white/60 transition-all text-sm"
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {!booking.archived && (
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">
                        Update Status
                      </label>
                      <select
                        value={booking.status || "pending"}
                        onChange={(e) =>
                          booking.id && handleUpdateStatus(booking.id, e.target.value)
                        }
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white outline-none text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="checked_in">Check In</option>
                        <option value="checked_out">Check Out</option>
                        <option value="cancelled">Cancel</option>
                        <option value="refunded">Refund</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span>Created: {booking.createdAt?.toDate?.().toLocaleString() || "Unknown"}</span>
                        {booking.total && <span>• Total: ₹{booking.total}</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white/40">No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { listenToAllActivityLogs } from "@/lib/firestore/activity-logs";

export default function AdminXActivityPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const unsub = listenToAllActivityLogs((data) => {
      setLogs(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (filterType === "all") return true;
    return log.eventType?.includes(filterType);
  });

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      hotel: "text-blue-400",
      partner: "text-green-400",
      booking: "text-purple-400",
      room: "text-orange-400",
      platform: "text-[#d4a574]",
      notification: "text-yellow-400",
      admin: "text-white/60",
    };
    const key = type?.split("_")[0] || "admin";
    return colors[key] || "text-white/60";
  };

  const getEventTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      hotel_edited: "Hotel",
      hotel_featured: "Hotel",
      hotel_archived: "Hotel",
      hotel_restored: "Hotel",
      booking_cancelled: "Booking",
      booking_confirmed: "Booking",
      refund_approved: "Refund",
      partner_approved: "Partner",
      partner_suspended: "Partner",
      partner_archived: "Partner",
      platform_fee_changed: "Platform",
      room_status_updated: "Room",
      notification_broadcast: "Notification",
      admin_login: "Admin",
    };
    return labels[type] || "System";
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-white/50 text-lg">Loading activity...</p>
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
            Activity Log
          </h2>
        </div>
        <div>
          <label className="text-xs text-white/40 mb-2 block">
            Filter by Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-white outline-none text-sm"
          >
            <option value="all">All Activity</option>
            <option value="hotel">Hotels</option>
            <option value="partner">Partners</option>
            <option value="booking">Bookings</option>
            <option value="room">Rooms</option>
            <option value="platform">Platform</option>
            <option value="notification">Notifications</option>
          </select>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
        <h3 className="text-2xl font-semibold mb-6">Operational History</h3>
        <div className="space-y-4">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-6 mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className={`text-xs font-semibold tracking-wider uppercase ${getEventTypeColor(
                          log.eventType
                        )}`}
                      >
                        {getEventTypeLabel(log.eventType)}
                      </span>
                      {log.adminEmail && (
                        <span className="text-white/40 text-xs">
                          by {log.adminEmail}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-medium text-white">
                      {log.summary}
                    </h4>
                  </div>
                  <p className="text-white/30 text-xs shrink-0">
                    {log.createdAt?.toDate?.().toLocaleString() || "Unknown"}
                  </p>
                </div>
                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-white/30 text-xs">
                      Details: {JSON.stringify(log.metadata)}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white/40">No activity yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

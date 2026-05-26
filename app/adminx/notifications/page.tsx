"use client";

import { useEffect, useState } from "react";
import {
  listenToAllNotifications,
  markNotificationAsRead,
  createNotification,
  type NotificationData,
} from "@/lib/firestore/notifications";

export default function AdminXNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [sendingBroadcast, setSendingBroadcast] = useState(false);

  useEffect(() => {
    const unsub = listenToAllNotifications((data) => {
      const sorted = data.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      setNotifications(sorted);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    setSendingBroadcast(true);
    try {
      await createNotification({
        type: "broadcast",
        title: broadcastTitle,
        message: broadcastMessage,
        targetType: "all",
      });
      setBroadcastTitle("");
      setBroadcastMessage("");
    } catch (error) {
      console.error("Error sending broadcast:", error);
    } finally {
      setSendingBroadcast(false);
    }
  };

  const getNotificationLabel = (type: string) => {
    const labels: Record<string, string> = {
      booking_created: "Booking",
      booking_cancelled: "Cancellation",
      partner_application: "Partner",
      partner_approved: "Partner",
      room_status_update: "Room",
      operational_alert: "Alert",
      broadcast: "Broadcast",
      payment_issue: "Payment",
      system_notice: "System",
    };
    return labels[type] || "Notice";
  };

  const getNotificationColor = (type: string) => {
    const colors: Record<string, string> = {
      booking_created: "text-green-400",
      booking_cancelled: "text-red-400",
      operational_alert: "text-yellow-400",
      payment_issue: "text-orange-400",
      broadcast: "text-[#d4a574]",
    };
    return colors[type] || "text-white/60";
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-white/50 text-lg">Loading notifications...</p>
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
          Notifications
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Broadcast Form */}
        <div className="lg:col-span-1">
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
            <h3 className="text-2xl font-semibold mb-6">Send Broadcast</h3>
            <form onSubmit={handleSendBroadcast} className="space-y-5">
              <div>
                <label className="text-sm text-white/60 mb-3 block">
                  Title
                </label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-neutral-500 outline-none focus:border-[#d4a574]/50"
                  placeholder="Broadcast title"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-3 block">
                  Message
                </label>
                <textarea
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-neutral-500 outline-none focus:border-[#d4a574]/50 min-h-[120px]"
                  placeholder="Broadcast message"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sendingBroadcast}
                className="w-full h-14 rounded-2xl bg-[#d4a574] hover:bg-[#c3925c] transition-all text-black font-semibold"
              >
                {sendingBroadcast ? "Sending..." : "Send Broadcast"}
              </button>
            </form>
          </div>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-2">
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
            <h3 className="text-2xl font-semibold mb-6">Recent Notifications</h3>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      notification.read
                        ? "border-white/5 bg-transparent"
                        : "border-white/15 bg-white/[0.02]"
                    } hover:bg-white/[0.03]`}
                    onClick={() => notification.id && !notification.read && handleMarkAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-semibold tracking-wider uppercase ${getNotificationColor(notification.type)}`}>
                            {getNotificationLabel(notification.type)}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-[#d4a574]" />
                          )}
                        </div>
                        <h4 className="text-lg font-medium text-white mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-white/50 text-sm">
                          {notification.message}
                        </p>
                      </div>
                      <p className="text-white/30 text-xs shrink-0">
                        {notification.createdAt?.toDate?.().toLocaleString() || "Just now"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/40">No notifications yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

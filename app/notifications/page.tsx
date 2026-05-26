"use client";

import { useEffect, useState } from "react";
import { listenToAllNotifications, markNotificationAsRead, type NotificationData } from "@/lib/firestore/notifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);

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
      <main className="min-h-screen bg-[#0f0f11] pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[50vh]">
          <p className="text-white/50 text-lg">Loading notifications...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0f11] pt-24 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white mb-3">
            Notifications
          </h1>
          <p className="text-white/50">Stay updated with your Niels Privé experience</p>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 rounded-[32px] border transition-all cursor-pointer ${
                  notification.read
                    ? "border-white/5 bg-transparent"
                    : "border-white/15 bg-white/[0.02]"
                } hover:bg-white/[0.03]`}
                onClick={() => notification.id && !notification.read && markNotificationAsRead(notification.id)}
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
            <div className="text-center py-16">
              <p className="text-white/40">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { mapQueryDocs } from "./mappers";

export type NotificationType = 
  | "booking_created"
  | "booking_cancelled"
  | "partner_application"
  | "partner_approved"
  | "room_status_update"
  | "operational_alert"
  | "broadcast"
  | "payment_issue"
  | "system_notice";

export interface NotificationData {
  id?: string;
  type: NotificationType;
  title: string;
  message: string;
  targetType?: "all" | "partner" | "hotel";
  targetId?: string;
  read?: boolean;
  createdAt?: any;
}

export async function createNotification(data: Omit<NotificationData, "id" | "createdAt">) {
  const notificationData = {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, "notifications"), notificationData);
  return docRef.id;
}

export async function markNotificationAsRead(notificationId: string) {
  await updateDoc(doc(db, "notifications", notificationId), {
    read: true,
  });
}

export async function getAllNotifications() {
  const notificationsQuery = query(
    collection(db, "notifications")
  );
  const notificationsSnapshot = await getDocs(notificationsQuery);
  return mapQueryDocs(notificationsSnapshot);
}

export function listenToAllNotifications(callback: (data: any[]) => void) {
  const notificationsQuery = query(collection(db, "notifications"));
  return onSnapshot(notificationsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
    callback(mapQueryDocs(snapshot));
  });
}

export async function getUnreadNotificationsCount() {
  const notificationsQuery = query(
    collection(db, "notifications"),
    where("read", "==", false)
  );
  const notificationsSnapshot = await getDocs(notificationsQuery);
  return notificationsSnapshot.size;
}

export function listenToUnreadNotificationsCount(callback: (count: number) => void) {
  const notificationsQuery = query(
    collection(db, "notifications"),
    where("read", "==", false)
  );
  return onSnapshot(notificationsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
    callback(snapshot.size);
  });
}

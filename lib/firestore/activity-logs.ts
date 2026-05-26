import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { mapQueryDocs } from "./mappers";

export type ActivityEventType =
  | "hotel_edited"
  | "hotel_featured"
  | "hotel_archived"
  | "hotel_restored"
  | "booking_cancelled"
  | "booking_confirmed"
  | "refund_approved"
  | "partner_approved"
  | "partner_suspended"
  | "partner_archived"
  | "platform_fee_changed"
  | "room_status_updated"
  | "notification_broadcast"
  | "admin_login";

export interface ActivityLogData {
  id?: string;
  eventType: ActivityEventType;
  adminUserId: string;
  adminEmail?: string;
  entityType?: "hotel" | "partner" | "booking" | "room" | "user";
  entityId?: string;
  summary: string;
  metadata?: Record<string, any>;
  createdAt?: any;
}

export async function createActivityLog(data: Omit<ActivityLogData, "id" | "createdAt">) {
  const logData = {
    ...data,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, "activity_logs"), logData);
  return docRef.id;
}

export async function getAllActivityLogs() {
  const logsQuery = query(
    collection(db, "activity_logs"),
    orderBy("createdAt", "desc")
  );
  const logsSnapshot = await getDocs(logsQuery);
  return mapQueryDocs(logsSnapshot);
}

export function listenToAllActivityLogs(callback: (data: any[]) => void) {
  const logsQuery = query(
    collection(db, "activity_logs"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(logsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
    callback(mapQueryDocs(snapshot));
  });
}

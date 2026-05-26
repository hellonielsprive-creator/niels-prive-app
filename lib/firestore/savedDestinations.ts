import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface SavedDestination {
  id?: string;
  userId: string;
  hotelId?: string;
  hotelName?: string;
  hotelImage?: string;
  location?: string;
  type: "hotel" | "experience" | "destination";
  savedAt: Timestamp;
  notes?: string;
}

export async function saveDestination(
  userId: string,
  data: Omit<SavedDestination, "id" | "userId" | "savedAt">
): Promise<void> {
  try {
    const docRef = doc(collection(db, "savedDestinations"));
    await setDoc(docRef, {
      userId,
      savedAt: Timestamp.now(),
      ...data,
    });
  } catch (error) {
    console.error("Error saving destination:", error);
    throw error;
  }
}

export async function removeSavedDestination(docId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "savedDestinations", docId));
  } catch (error) {
    console.error("Error removing saved destination:", error);
    throw error;
  }
}

export async function getSavedDestinations(userId: string): Promise<SavedDestination[]> {
  try {
    const q = query(
      collection(db, "savedDestinations"),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SavedDestination[];
  } catch (error) {
    console.error("Error getting saved destinations:", error);
    throw error;
  }
}

export async function isDestinationSaved(
  userId: string,
  hotelId: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, "savedDestinations"),
      where("userId", "==", userId),
      where("hotelId", "==", hotelId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error("Error checking if destination is saved:", error);
    return false;
  }
}

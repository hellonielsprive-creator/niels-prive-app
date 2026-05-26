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
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { mapQueryDocs } from "./mappers";

export async function updateHotelStatus(hotelId: string, status: string) {
  await updateDoc(doc(db, "hotels", hotelId), {
    status,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateHotelFeatured(hotelId: string, featured: boolean) {
  await updateDoc(doc(db, "hotels", hotelId), {
    featured,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateHotelPriority(hotelId: string, priorityScore: number) {
  await updateDoc(doc(db, "hotels", hotelId), {
    priorityScore,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateHotelVisibility(hotelId: string, visibilityLevel: string) {
  await updateDoc(doc(db, "hotels", hotelId), {
    visibilityLevel,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateHotelCommission(hotelId: string, commissionRate: number) {
  await updateDoc(doc(db, "hotels", hotelId), {
    commissionRate,
    updatedAt: new Date().toISOString(),
  });
}

export async function archiveHotel(hotelId: string) {
  await updateDoc(doc(db, "hotels", hotelId), {
    archived: true,
    updatedAt: new Date().toISOString(),
  });
}

export async function restoreHotel(hotelId: string) {
  await updateDoc(doc(db, "hotels", hotelId), {
    archived: false,
    updatedAt: new Date().toISOString(),
  });
}

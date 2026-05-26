import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { mapQueryDocs } from "./mappers";

export async function getAllHotels() {
  const hotelsQuery = query(collection(db, "hotels"));
  const hotelsSnapshot = await getDocs(hotelsQuery);
  return mapQueryDocs(hotelsSnapshot);
}

export async function getAllRooms() {
  const roomsQuery = query(collection(db, "rooms"));
  const roomsSnapshot = await getDocs(roomsQuery);
  return mapQueryDocs(roomsSnapshot);
}

export async function getAllBookings() {
  const bookingsQuery = query(collection(db, "bookings"));
  const bookingsSnapshot = await getDocs(bookingsQuery);
  return mapQueryDocs(bookingsSnapshot);
}

export async function getAllPartners() {
  const partnersQuery = query(collection(db, "partners"));
  const partnersSnapshot = await getDocs(partnersQuery);
  return mapQueryDocs(partnersSnapshot);
}

export async function getAllUsers() {
  const usersQuery = query(collection(db, "users"));
  const usersSnapshot = await getDocs(usersQuery);
  return mapQueryDocs(usersSnapshot);
}

export function listenToAllHotels(callback: (data: any[]) => void) {
  const hotelsQuery = query(collection(db, "hotels"));
  return onSnapshot(hotelsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
    callback(mapQueryDocs(snapshot));
  });
}

export function listenToAllRooms(callback: (data: any[]) => void) {
  const roomsQuery = query(collection(db, "rooms"));
  return onSnapshot(roomsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
    callback(mapQueryDocs(snapshot));
  });
}

export function listenToAllBookings(callback: (data: any[]) => void) {
  const bookingsQuery = query(collection(db, "bookings"));
  return onSnapshot(bookingsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
    callback(mapQueryDocs(snapshot));
  });
}

export function listenToAllPartners(callback: (data: any[]) => void) {
  const partnersQuery = query(collection(db, "partners"));
  return onSnapshot(partnersQuery, (snapshot: QuerySnapshot<DocumentData>) => {
    callback(mapQueryDocs(snapshot));
  });
}

export function listenToAllUsers(callback: (data: any[]) => void) {
  const usersQuery = query(collection(db, "users"));
  return onSnapshot(usersQuery, (snapshot: QuerySnapshot<DocumentData>) => {
    callback(mapQueryDocs(snapshot));
  });
}

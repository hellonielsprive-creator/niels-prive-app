import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { mapQueryDocs } from "./mappers";

async function assertPartnerRoom(
  roomId: string,
  partnerId?: string | null
) {
  if (!partnerId) {
    return;
  }

  const roomSnapshot = await getDoc(
    doc(db, "rooms", roomId)
  );

  if (!roomSnapshot.exists()) {
    throw new Error("Room not found");
  }

  if (roomSnapshot.data().partnerId !== partnerId) {
    throw new Error("Room does not belong to this partner");
  }
}

export async function getRoomsByPartnerId(
  partnerId: string
) {
  const roomsQuery = query(
    collection(db, "rooms"),
    where("partnerId", "==", partnerId)
  );

  const roomsSnapshot = await getDocs(roomsQuery);

  return mapQueryDocs(roomsSnapshot);
}

export async function updateRoomPrice(
  roomId: string,
  price: number,
  partnerId?: string | null
) {
  await assertPartnerRoom(roomId, partnerId);

  await updateDoc(doc(db, "rooms", roomId), {
    price,
  });
}

export async function updateRoomManualStatus(
  roomId: string,
  status: string,
  partnerId?: string | null
) {
  await assertPartnerRoom(roomId, partnerId);

  await updateDoc(doc(db, "rooms", roomId), {
    manualStatus: status,
  });
}

export async function archiveRoom(
  roomId: string,
  partnerId?: string | null
) {
  await assertPartnerRoom(roomId, partnerId);

  await updateDoc(doc(db, "rooms", roomId), {
    archived: true,
  });
}

export async function restoreRoom(
  roomId: string,
  partnerId?: string | null
) {
  await assertPartnerRoom(roomId, partnerId);

  await updateDoc(doc(db, "rooms", roomId), {
    archived: false,
  });
}

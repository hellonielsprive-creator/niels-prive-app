import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/app/firebase/config";

import { mapQueryDocs } from "./mappers";

export async function getGalleryByPartnerId(
  partnerId: string
) {
  const galleryQuery = query(
    collection(db, "gallery"),
    where("partnerId", "==", partnerId)
  );

  const snapshot = await getDocs(galleryQuery);

  return mapQueryDocs(snapshot);
}

export async function createGalleryItem(
  partnerId: string,
  data: {
    title: string;
    category: string;
    image: string;
  }
) {
  const docRef = await addDoc(
    collection(db, "gallery"),
    {
      ...data,
      partnerId,
      createdAt: new Date(),
    }
  );

  return {
    id: docRef.id,
    ...data,
    partnerId,
  };
}

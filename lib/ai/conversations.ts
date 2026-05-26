import { db, auth } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import type { AiConversation, AiMessage, AiContext } from "@/types/ai";
import { sanitizeObject } from "./helpers";

const CONVERSATIONS_COLLECTION = "aiConversations";

export async function getOrCreateConversation(
  userId: string,
  userRole: "guest" | "partner",
  context: AiContext
): Promise<AiConversation> {
  const conversationsQuery = query(
    collection(db, CONVERSATIONS_COLLECTION),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc"),
    limit(1)
  );

  const snapshot = await getDocs(conversationsQuery);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as AiConversation;
  }

  const newConversation: Omit<AiConversation, "id"> = {
    userId,
    userRole,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    context: sanitizeObject({
      pathname: context.pathname,
      propertyId: context.propertyId,
      propertyName: context.propertyName,
      roomId: context.roomId,
      roomName: context.roomName,
      bookingId: context.bookingId,
      dashboardSection: context.dashboardSection,
    }),
  };

  const newDocRef = doc(collection(db, CONVERSATIONS_COLLECTION));
  await setDoc(newDocRef, sanitizeObject(newConversation));

  return {
    id: newDocRef.id,
    ...newConversation,
  };
}

export async function addMessageToConversation(
  conversationId: string,
  message: AiMessage
): Promise<void> {
  const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
  await updateDoc(conversationRef, {
    messages: arrayUnion(message),
    updatedAt: new Date(),
  });
}

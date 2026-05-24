import type {
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

export function mapQueryDocs<T extends DocumentData = DocumentData>(
  snapshot: QuerySnapshot<DocumentData>
): Array<T & { id: string }> {
  return snapshot.docs.map((docSnap) => ({
    ...docSnap.data(),
    id: docSnap.id,
  })) as Array<T & { id: string }>;
}

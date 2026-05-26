import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

const LEGACY_USER_ID_FIELDS = [
  "uid",
  "userId",
  "authUid",
  "partnerAuthId",
] as const;

const LEGACY_EMAIL_FIELDS = [
  "businessEmail",
  "email",
] as const;

export type PartnerRecord = Record<string, unknown> & {
  id: string;
};

export function getPartnerDocRef(userId: string) {
  return doc(db, "partners", userId);
}

function resolveAuthEmail(
  email?: string | null
) {
  return (
    email ?? auth.currentUser?.email ?? null
  );
}

function getCreatedAtMs(
  value: unknown
) {
  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds: unknown })
      .seconds === "number"
  ) {
    return (value as { seconds: number })
      .seconds;
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    const parsed = new Date(value).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

function stripPartnerPayload(
  data: Record<string, unknown>
) {
  const {
    id: _id,
    migratedTo: _migratedTo,
    migratedFrom: _migratedFrom,
    ...rest
  } = data;

  return rest;
}

function toPartnerRecord(
  id: string,
  data: DocumentData
): PartnerRecord {
  return {
    ...data,
    id,
  };
}

function isUsableLegacyDoc(
  snapshot: QueryDocumentSnapshot<DocumentData>,
  userId: string
) {
  const data = snapshot.data();
  const migratedTo = data.migratedTo;

  if (
    typeof migratedTo === "string" &&
    migratedTo.length > 0 &&
    migratedTo !== userId
  ) {
    return false;
  }

  return snapshot.id !== userId;
}

function pickBestLegacyDoc(
  docs: QueryDocumentSnapshot<DocumentData>[]
) {
  if (docs.length === 0) {
    return null;
  }

  if (docs.length === 1) {
    return docs[0];
  }

  return [...docs].sort(
    (a, b) =>
      getCreatedAtMs(b.data().createdAt) -
      getCreatedAtMs(a.data().createdAt)
  )[0];
}

async function findLegacyPartnerDoc(
  userId: string,
  email?: string | null
) {
  const matches = new Map<
    string,
    QueryDocumentSnapshot<DocumentData>
  >();

  for (const field of LEGACY_USER_ID_FIELDS) {
    const snapshot = await getDocs(
      query(
        collection(db, "partners"),
        where(field, "==", userId)
      )
    );

    for (const docSnap of snapshot.docs) {
      if (isUsableLegacyDoc(docSnap, userId)) {
        matches.set(docSnap.id, docSnap);
      }
    }
  }

  if (email) {
    for (const field of LEGACY_EMAIL_FIELDS) {
      const snapshot = await getDocs(
        query(
          collection(db, "partners"),
          where(field, "==", email)
        )
      );

      for (const docSnap of snapshot.docs) {
        if (isUsableLegacyDoc(docSnap, userId)) {
          matches.set(docSnap.id, docSnap);
        }
      }
    }
  }

  return pickBestLegacyDoc(
    Array.from(matches.values())
  );
}

async function migrateLegacyPartnerToCanonical(
  userId: string,
  legacyDoc: QueryDocumentSnapshot<DocumentData>
) {
  const canonicalRef =
    getPartnerDocRef(userId);
  const canonicalSnap = await getDoc(
    canonicalRef
  );

  if (canonicalSnap.exists()) {
    return toPartnerRecord(
      canonicalSnap.id,
      canonicalSnap.data()
    );
  }

  const legacyData = legacyDoc.data();
  const migratedAt =
    new Date().toISOString();
  const payload = stripPartnerPayload(
    legacyData
  );

  const batch = writeBatch(db);

  batch.set(
    canonicalRef,
    {
      ...payload,
      uid: userId,
      migratedFrom: legacyDoc.id,
      migratedAt,
    },
    { merge: true }
  );

  batch.set(
    doc(db, "partners", legacyDoc.id),
    {
      migratedTo: userId,
      migratedAt,
    },
    { merge: true }
  );

  await batch.commit();

  const migratedSnap = await getDoc(
    canonicalRef
  );

  if (!migratedSnap.exists()) {
    return null;
  }

  return toPartnerRecord(
    migratedSnap.id,
    migratedSnap.data()
  );
}

async function ensureCanonicalPartnerDoc(
  userId: string,
  email?: string | null
): Promise<PartnerRecord | null> {
  const canonicalRef =
    getPartnerDocRef(userId);
  const canonicalSnap = await getDoc(
    canonicalRef
  );

  if (canonicalSnap.exists()) {
    return toPartnerRecord(
      canonicalSnap.id,
      canonicalSnap.data()
    );
  }

  const legacyDoc = await findLegacyPartnerDoc(
    userId,
    resolveAuthEmail(email)
  );

  if (!legacyDoc) {
    return null;
  }

  return migrateLegacyPartnerToCanonical(
    userId,
    legacyDoc
  );
}

export async function getPartnerByUserId(
  userId: string,
  email?: string | null
) {
  return ensureCanonicalPartnerDoc(
    userId,
    email
  );
}

export async function updatePartnerProfile(
  userId: string,
  data: Record<string, unknown>,
  email?: string | null
) {
  const existing =
    await ensureCanonicalPartnerDoc(
      userId,
      email
    );

  const canonicalRef =
    getPartnerDocRef(userId);

  if (existing) {
    await updateDoc(canonicalRef, data);
    return;
  }

  await setDoc(
    canonicalRef,
    {
      ...data,
      uid: userId,
      createdAt:
        new Date().toISOString(),
    },
    { merge: true }
  );
}

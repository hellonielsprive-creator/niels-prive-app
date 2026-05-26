import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function updatePartnerStatus(partnerId: string, status: string) {
  await updateDoc(doc(db, "partners", partnerId), {
    status,
    updatedAt: new Date().toISOString(),
  });
}

export async function updatePartnerCommission(partnerId: string, commissionRate: number) {
  await updateDoc(doc(db, "partners", partnerId), {
    commissionRate,
    updatedAt: new Date().toISOString(),
  });
}

export async function archivePartner(partnerId: string) {
  await updateDoc(doc(db, "partners", partnerId), {
    archived: true,
    updatedAt: new Date().toISOString(),
  });
}

export async function restorePartner(partnerId: string) {
  await updateDoc(doc(db, "partners", partnerId), {
    archived: false,
    updatedAt: new Date().toISOString(),
  });
}

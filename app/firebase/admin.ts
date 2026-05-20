import { initializeApp, cert, getApps } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
  projectId: "niels-prive",
};

if (!getApps().length) {

  initializeApp({
    credential: cert(serviceAccount as any),
  });

}

export const adminDb = getFirestore();
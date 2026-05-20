

import { initializeApp, getApps } from "firebase/app";

import {
  getFirestore,
  addDoc,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAuFcSLHh7wW00f6_4JRL7IdCI5keDNIY",
  authDomain: "niels-prive.firebaseapp.com",
  projectId: "niels-prive",
  storageBucket: "niels-prive.firebasestorage.app",
  messagingSenderId: "117671092679",
  appId: "1:117671092679:web:4d120d91d445d2bb8479e2",
  measurementId: "G-E7Z7C7WJWY",
};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

const db = getFirestore(app);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const booking = await addDoc(
      collection(db, "bookings"),
      {
        ...body,
        createdAt: Date.now(),
      }
    );

    return Response.json({
      success: true,
      bookingId: booking.id,
    });

  } catch (error: any) {

    console.log(error);

    return Response.json({
      success: false,
      error: error.message,
    });

  }

}
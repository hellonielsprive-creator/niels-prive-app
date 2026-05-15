import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAuFcSLHh7wW00f6_4JRL7IdCI5keDNIY",
  authDomain: "niels-prive.firebaseapp.com",
  projectId: "niels-prive",
  storageBucket: "niels-prive.firebasestorage.app",
  messagingSenderId: "117671092679",
  appId: "1:117671092679:web:5b15136a2b54486a8479e2",
  measurementId: "G-F20218LTHG"
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAuFcSLHh7wW00f6_4JRL7IdCI5keDNIY",
  authDomain: "niels-prive.firebaseapp.com",
  projectId: "niels-prive",
  storageBucket: "niels-prive.firebasestorage.app",
  messagingSenderId: "117671092679",
  appId: "1:117671092679:web:4d120d91d445d2bb8479e2",
  measurementId: "G-E7Z7C7WJWY",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

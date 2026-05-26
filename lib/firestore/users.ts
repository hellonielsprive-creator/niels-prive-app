import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function syncUserToFirestore(user: any) {
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    
    const userData: any = {
      email: user.email,
      fullName: user.displayName || user.email?.split("@")[0] || "Guest User",
      emailVerified: user.emailVerified,
      lastLoginAt: new Date().toISOString(),
    };
    
    if (!userDoc.exists()) {
      userData.role = "guest";
      userData.createdAt = new Date().toISOString();
      await setDoc(userDocRef, userData);
    } else {
      const existingData = userDoc.data();
      if (!existingData.role) {
        userData.role = "guest";
      }
      if (!existingData.createdAt) {
        userData.createdAt = new Date().toISOString();
      }
      await setDoc(userDocRef, userData, { merge: true });
    }
    
    const finalUserDoc = await getDoc(userDocRef);
    return finalUserDoc.data();
  } catch (error) {
    console.error("Error syncing user to Firestore:", error);
    throw error;
  }
}

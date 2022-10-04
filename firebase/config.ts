import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const apiKey: string = process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string;
const authDomain: string = process.env
  .NEXT_PUBLIC_FIREBASE_AUTHDOMAIN as string;
const projectId: string = process.env.NEXT_PUBLIC_FIREBASE_PROJECTID as string;
const storageBucket: string = process.env
  .NEXT_PUBLIC_FIREBASE_STORAGEBUCKET as string;
const messagingSenderId: string = process.env
  .NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID as string;
const appId: string = process.env.NEXT_PUBLIC_FIREBASE_APPID as string;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

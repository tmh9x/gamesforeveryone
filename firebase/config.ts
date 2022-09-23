import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKgR6Ke9JMO61aRih5Z4O-xsp31IbW4Lo",
  authDomain: "games-for-every-one.firebaseapp.com",
  projectId: "games-for-every-one",
  storageBucket: "games-for-every-one.appspot.com",
  messagingSenderId: "50977796933",
  appId: "1:50977796933:web:da3818e24a5f8cb0fe842c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPEeqh2CGaTrZoJVXkNHYBBUcEgmfaBks",
  authDomain: "wocoapp-43186.firebaseapp.com",
  projectId: "wocoapp-43186",
  storageBucket: "wocoapp-43186.firebasestorage.app",
  messagingSenderId: "374785937977",
  appId: "1:374785937977:web:2ba1f4c373624ddd8af3e8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_-bwvuPyZv_3T6BLeLWhikH7tF8IVfNE",
  authDomain: "nasiq-system-beta.firebaseapp.com",
  projectId: "nasiq-system-beta",
  storageBucket: "nasiq-system-beta.firebasestorage.app",
  messagingSenderId: "657435092392",
  appId: "1:657435092392:web:526bfe992e4e70ee53a99d",
  measurementId: "G-GM5CEP0HRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };

import { getAuth, GoogleAuthProvider } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
import { initializeApp } from 'firebase/app';

// Firebase config object, replace with your actual config if needed
const firebaseConfig = {
  apiKey: "AIzaSyBoUx6duhSbMS64F-7ALQGhvgkRfGbmnLI",
  authDomain: "enviai1.firebaseapp.com",
  projectId: "enviai1",
  storageBucket: "enviai1.appspot.com",
  messagingSenderId: "427828144336",
  appId: "1:427828144336:web:71f0a492b6909ee6f716d5",
  measurementId: "G-LW2WN6P8JF"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

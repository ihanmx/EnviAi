import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCX3JI8qauSeuML3nALCNja7TmjRudxQso",
  authDomain: "enviai-d0e15.firebaseapp.com",
  projectId: "enviai-d0e15",
  storageBucket: "enviai-d0e15.firebasestorage.app",
  messagingSenderId: "1029651985672",
  appId: "1:1029651985672:web:176a592c4ab80c33f5e8bd",
  measurementId: "G-F3EGJ5Y1GY",
};
// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

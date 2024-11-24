import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsp5p4mrv0I0JB8p_wexidlaWguinzpms",
  authDomain: "enviai-e6bf3.firebaseapp.com",
  projectId: "enviai-e6bf3",
  storageBucket: "enviai-e6bf3.firebasestorage.app",
  messagingSenderId: "339518537712",
  appId: "1:339518537712:web:3f4739334e7294eb682735",
  measurementId: "G-QPTFQM1CN5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app); // Should log the app object
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

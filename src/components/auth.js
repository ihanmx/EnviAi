// firebase
import { auth as FirebaseAuth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// react
import { useState } from "react";

export const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const signIn = async () => {
    const { email, password } = loginData;

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(FirebaseAuth, email, password);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        alert("No user found with this email.");
      } else if (err.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else {
        alert(`Error during login: ${err.message}`);
      }
    }
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(FirebaseAuth);
    } catch (err) {
      console.error(err);
    }
  };
};

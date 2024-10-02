import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; 
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { Button, TextField, Stack } from "@mui/material";

export default function UserProfile() {
  const [user, setUser] = useState(null); 
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

 
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

 
  const saveUserData = async () => {
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
      });
      console.log("User data saved successfully!");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  
  const handleRegister = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(auth, userData.email, "user-password");
      console.log("User registered:", newUser.user.uid);

     
      await setDoc(doc(db, "users", newUser.user.uid), {
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
}

// react
import React, { useEffect, useState } from "react";

// components
import MainNav from "../Navs/MainNav";
import ProfileCard from "./ProfileCard";
import TimeZoneCard from "./TimeZoneCard";
import Mediaquery from "../../Mediaquery";
import UserProfile from "./userProfile";
import AccountInfoCard from "./AccountInfoCard";

// MUI
import { Stack, Button } from "@mui/material"; // Import Button from MUI

// firebase
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut
import { doc, getDoc } from "firebase/firestore";
export default function AccountPage() {
  const { isMedium } = Mediaquery();
  const [user, setUser] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchAccountInfo(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAccountInfo = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAccountInfo(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching account info:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      // Optionally redirect to login page or update state here
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <MainNav isDarkMode={false} />
      {/* page container */}
      <Stack
        direction={isMedium ? "column" : "row"}
        spacing={2}
        sx={{
          padding: "30px",
          height: isMedium ? "auto" : "85vh",
          maxWidth: "100vw",
          justifyContent: "center",
        }}
      >
        {/* Profile and timezone container*/}
        <Stack
          direction="column"
          spacing={2}
          sx={{ height: "80vh", width: "30%" }}
        >
          {/* Profile Card */}
          <ProfileCard user={user} />
          {/* Timezone Card */}
          <TimeZoneCard timezone={accountInfo?.timezone} />
          {/* Logout Button */}
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{ width: "100%", mt: "auto" }} // Add margin-top auto to push it to the bottom
          >
            Logout
          </Button>
        </Stack>

        {/* User Profile Information */}
        <Stack sx={{ width: "70%", height: "80vh" }}>
          <UserProfile /> {/* Add UserProfile component here */}
          {/* Account information section */}
          <AccountInfoCard accountInfo={accountInfo} />
        </Stack>
      </Stack>
    </>
  );
}

// AccountPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNav from "../Navs/MainNav";
import ProfileCard from "./ProfileCard";
import TimeZoneCard from "./TimeZoneCard";
import Mediaquery from "../../Mediaquery";
import UserProfile from "./userProfile";
import AccountInfoCard from "./AccountInfoCard";
import { Stack, Button } from "@mui/material";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AccountPage() {
  const { isMedium } = Mediaquery();
  const [user, setUser] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const navigate = useNavigate();

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
        setAccountInfo(docSnap.data()); // This now includes `username` as well
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
      navigate("/homepage");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <MainNav isDarkMode={false} />
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
        <Stack direction="column" spacing={2} sx={{ height: "80vh", width: "30%" }}>
          {/* Profile Card with username */}
          <ProfileCard user={user} username={accountInfo?.username} />
          <TimeZoneCard timezone={accountInfo?.timezone} />
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{ width: "100%", mt: "auto" }}
          >
            Logout
          </Button>
        </Stack>

        <Stack sx={{ width: "70%", height: "80vh" }}>
          <UserProfile />
          <AccountInfoCard accountInfo={accountInfo} />
        </Stack>
      </Stack>
    </>
  );
}

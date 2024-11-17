// MUI

import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// react
import { useContext, useEffect, useState } from "react";
// contexts
import { UserDataContext } from "../../Contexts/UserDataContext";
// firebase
import { db, auth } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const region = [
  { id: "0", value: "KSA", label: "Kingdom of Saudi Arabia" },
  { id: "1", value: "US", label: "United States" },
];

const language = [
  { id: "0", value: "AR", label: "Arabic" },
  { id: "1", value: "Eng", label: "English" },
];

export default function TimeZoneCard() {
  const { userData, setUserData } = useContext(UserDataContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No user data found, creating new profile.");
        setUserData({
          region: "",
          language: "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
    }
  };

  const handleInputsChange = async (event) => {
    const { name, value } = event.target;
    const updatedUserData = {
      ...userData,
      [name]: value,
    };

    setUserData(updatedUserData);

    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, updatedUserData, { merge: true });
        console.log("User data saved successfully!");
      } catch (error) {
        console.error("Error saving user data to Firestore:", error);
      }
    }
  };

  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          border: "0.5px solid #000",
          borderRadius: "8px",
          padding: "20px",
          height: "65%",
        }}
      >
        <h2>Language & TimeZone</h2>
        <form>
          <TextField
            id="regionFeild"
            select
            label="Region"
            value={userData.region || ""}
            helperText="Please select your country"
            fullWidth
            name="region"
            onChange={handleInputsChange}
          >
            {region.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="languageFeild"
            select
            label="Language"
            value={userData.language || ""}
            helperText="Please select your language"
            sx={{ display: "block" }}
            fullWidth
            name="language"
            onChange={handleInputsChange}
          >
            {language.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </Stack>
    </>
  );
}

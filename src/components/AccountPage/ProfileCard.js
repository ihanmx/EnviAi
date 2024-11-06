// ProfileCard.js

// MUI
import { Stack, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

// react
import React, { useState, useEffect, useContext } from "react";

// firebase
import { storage, db, auth } from "../../config/firebase";  // Import `db`
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// contexts
import { UserDataContext } from "../../Contexts/UserDataContext";

export default function ProfileCard({ username }) {
  const [image, setImage] = useState("");
  const [user, setUser] = useState(null);
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      uploadImageToStorage(file);
    }
  };

  const uploadImageToStorage = async (file) => {
    if (!user) return;

    const storageRef = ref(storage, `profilePhotos/${user.uid}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await setDoc(
        doc(db, "users", user.uid),
        { profilePhoto: downloadURL },
        { merge: true }
      );
      setUserData((prevData) => ({ ...prevData, profilePhoto: downloadURL }));
      console.log("Profile photo URL saved to Firestore!");
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        border: "0.5px solid #000",
        borderRadius: "8px",
        padding: "20px",
        alignItems: "center",
        height: "15%",
      }}
    >
      <img
        src={userData.profilePhoto || image || "/default-avatar.png"}
        alt="Profile"
        style={{ height: "100px", width: "100px", borderRadius: "50%" }}
      />
      <Stack direction="column" spacing={1}>
        <h2>{username || "User"}</h2>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" startIcon={<UploadIcon />}>
            Change Avatar
          </Button>
        </label>
      </Stack>
    </Stack>
  );
}

// MUI
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

// react
import { useState, useContext, useEffect } from "react";
// firebase
import { storage, db, auth } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// contexts
import { UserDataContext } from "../../Contexts/UserDataContext";

export default function ProfileCard() {
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
      console.log("File uploaded successfully!");

      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);

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
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          border: "0.5px solid #000",
          borderRadius: "8px",
          padding: "20px",
          height: "15%",
        }}
      >
        <img
          src={userData.profilePhoto || image}
          alt="Profile"
          style={{ height: "100px", width: "100px", borderRadius: "50%" }}
        />
        <Stack direction="column" spacing={2}>
          <h2>UserName</h2>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Change avatar <UploadIcon />
            </Button>
          </label>
        </Stack>
      </Stack>
    </>
  );
}

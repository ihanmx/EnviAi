import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { Stack, Button } from "@mui/material";
import { UserDataContext } from "../../Contexts/UserDataContext";
import { auth, db } from "../../config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default function AccountInfoCard() {
  const { userData, setUserData } = useContext(UserDataContext);
  const userId = auth.currentUser ? auth.currentUser.uid : null; 

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  async function fetchUserData() {
    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    if (userId) {

      await setDoc(doc(db, "users", userId), userData);
      alert("User data saved successfully!");
    } else {
      console.error("No user is signed in.");
    }
  }

  function handleInputsChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  return (
    <Stack
      sx={{
        height: "80vh",
        width: "70vw",
        border: "0.5px solid #000",
        borderRadius: "8px",
      }}
    >
      <form onSubmit={handleSave}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: "30px",
          }}
        >
          <Grid size={6}>
            <label style={{ display: "block" }}>UserName:</label>
            <TextField
              id="outlined-required"
              placeholder="Jack"
              fullWidth
              name="name"
              value={userData.name || ""}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid size={6}>
            <label style={{ display: "block" }}>Phone:</label>
            <TextField
              id="outlined-required"
              placeholder="+966 566 999 433"
              fullWidth
              name="phone"
              value={userData.phone || ""}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid size={6}>
            <label style={{ display: "block" }}>Email:</label>
            <TextField
              id="outlined-required"
              placeholder="example@gmail.com"
              fullWidth
              name="email"
              value={userData.email || ""}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid size={6}>
            <label style={{ display: "block" }}>Shipping address:</label>
            <TextField
              id="outlined-required"
              placeholder="street 5,building 401"
              fullWidth
              name="address"
              value={userData.address || ""}
              onChange={handleInputsChange}
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}

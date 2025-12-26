// Contexts

import { SelfProductTypeContext } from "../../Contexts/SelfProductTypeContext";
import { useContext, useEffect, useState } from "react";
// MUI
import Stack from "@mui/material/Stack";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// components
import MainNav from "../Navs/MainNav";

// theme
import theme from "../../theme";

// firebase
import { storage, db, auth } from "../../config/firebase"; // Import `db`
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function SubmitSelfDesign() {
  const { selfProductType, setSelfProductType } = useContext(
    SelfProductTypeContext
  );

  const [image, setImage] = useState("");
  const [user, setUser] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedSelfProductType = JSON.parse(
      localStorage.getItem("selfProductType")
    );
    if (savedSelfProductType) {
      setSelfProductType(savedSelfProductType);
    }
  }, []);

  useEffect(() => {
    console.log("Updated Design image:", selfProductType);
  }, [selfProductType]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Temporary preview
      uploadImageToStorage(file);
    }
  };

  const uploadImageToStorage = async (file) => {
    if (!user) return;

    const storageRef = ref(storage, `designs/${user.uid}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setImage(downloadURL); // Set image URL for use in the order
      console.log("Design image uploaded successfully:", downloadURL);
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  const handleSubmit = async () => {
    handleClickOpen();
    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    if (!image) {
      console.error("No design image uploaded.");
      return;
    }

    try {
      const orderRef = doc(db, "orders", user.uid);
      const orderData = {
        productName: selfProductType.type,
        productPrice: selfProductType.price,
        design: image,
      };

      await setDoc(orderRef, orderData, { merge: true });
      console.log("Order saved successfully:", orderData);
      alert("Order submitted successfully!");
    } catch (error) {
      console.error("Error submitting the order:", error);
      alert("Failed to submit the order. Please try again.");
    }
  };

  return (
    <>
      <MainNav isDarkMode={true} />
      <Stack
        style={{
          alignItems: "center",
          minHeight: "100vh",
          maxWidth: "100vw",
          backgroundColor: theme.palette.primary.main,
          padding: "20px",
        }}
      >
        <h1 style={{ color: "white" }}>Create order</h1>
        <div
          style={{
            width: "50%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        >
          <form
            style={{
              width: "80%",

              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h3 style={{ textAlign: "left" }}>Product Name</h3>
            <TextField
              fullWidth
              id="filled-read-only-input"
              label="Product Details"
              defaultValue={selfProductType.type}
              variant="filled"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <h3 style={{ textAlign: "left" }}>Product Price</h3>
            <TextField
              fullWidth
              id="filled-read-only-input"
              label="Product Price"
              defaultValue={selfProductType.price}
              variant="filled"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <h3 style={{ textAlign: "left" }}>Upload your design</h3>
            <input
              className="custom-file-input"
              type="file"
              accept="image/*"
              style={{ width: "99%", padding: "5px" }}
              onChange={handleFileChange}
            />
            <Button
              fullWidth
              variant="contained"
              style={{ padding: "10px 0" }}
              onClick={handleSubmit}
            >
              Send The order
            </Button>
          </form>
        </div>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "50vw",
            height: "55vh",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",

            gap: "20px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"  Your Order Created Successfully."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thank You For Using EnviAI
          </DialogContentText>

          <CheckCircleIcon
            sx={{
              color: "green",
              fontSize: "120px",
              textAlign: "center",
              marginLeft: "30px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

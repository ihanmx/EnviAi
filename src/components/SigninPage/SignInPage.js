// react
import React, { useState } from "react";
// components
import SigninLoginNav from "../Navs/SigninLoginNav";
// MUI
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
// assets
import SigninPageImg from "../../images/SigninPageImg.png";
// mediaQuery
import Mediaquery from "../../Mediaquery";
// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
// contexts
import { UserDataContext } from "../../Contexts/UserDataContext";

export default function SignInPage() {
  //Mediaquery
  const { isSmall } = Mediaquery();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  return (
    <>
      <Stack
        direction={isSmall ? "column" : "row"}
        spacing={2}
        sx={{ height: "100vh", width: "100vw" }}
      >
        {/* Image Section */}
        {!isSmall && (
          <Stack sx={{ width: "50vw", height: "100%" }}>
            <img
              src={SigninPageImg}
              alt="Login"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Stack>
        )}

        {/* Form Section */}
        <Stack
          direction="column"
          sx={{ width: isSmall ? "100vw" : "50vw", alignItems: "center" }}
        >
          <SigninLoginNav />
          <h1 style={{ margin: "0 0 10px 0" }}>Sign up</h1>
          <p>Create an account!</p>

          <form
            onSubmit={handleSignUp}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "rgba(172,216,178,50%)",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              padding: "20px",
              width: "80%",
              boxSizing: "border-box",
            }}
          >
            {/* Username */}
            <label>Username:</label>
            <TextField
              required
              fullWidth
              name="username"
              label="Username"
              placeholder="Jack"
              value={formData.username}
              onChange={handleInputChange}
              sx={{
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                },
              }}
            />
            {/* Email */}
            <label>Email</label>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              sx={{
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                },
              }}
            />
            {/* Password */}
            <label>Password</label>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              placeholder="*************"
              value={formData.password}
              onChange={handleInputChange}
              //MuiOutlinedInput-root is the main container
              sx={{
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                },
              }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* Display any errors */}
            <Button
              type="submit" // Submit the form
              variant="contained"
              sx={{
                width: "80%",
                height: "50px",
                fontSize: "16px",
                padding: "10px 20px",
                alignSelf: "center",
                borderRadius: "10px",
              }}
            >
              Sign Up
            </Button>
          </form>
        </Stack>
      </Stack>
    </>
  );
}

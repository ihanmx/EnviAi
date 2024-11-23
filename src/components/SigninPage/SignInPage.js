// React
import React, { useState } from "react";
// Components
import SigninLoginNav from "../Navs/SigninLoginNav";
// MUI
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// Assets
import SigninPageImg from "../../images/SigninPageImg.png";
// MediaQuery
import Mediaquery from "../../Mediaquery";
// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
// React Router
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";

// framer motion
import { motion } from "framer-motion";

export default function SignInPage() {
  // MediaQuery
  const { isSmall } = Mediaquery();
  const navigate = useNavigate(); // Initialize useNavigate
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

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password, username } = formData;

    // Validate password
    if (!isPasswordValid(password)) {
      setError("Password must be at least 8 characters long, contain at least one uppercase letter and one number.");
      return; // Exit the function if the password is invalid
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
      });

      // Create an initial document in the "products" subcollection
      const productsSubcollectionRef = doc(
        db,
        `users/${user.uid}/products`,
        "default"
      );
      await setDoc(productsSubcollectionRef, {
        productName: "Sample Product", // Example product name
        productDetails: "This is a sample product.", // Example product details
        productImg: "https://via.placeholder.com/150", // Placeholder image URL
        productId: "",
        price: 0, // Example price
        isInWishList: false, // Default value
        isInCart: false, // Default value
        isNewProduct: false, // Default value
      });

      navigate("/"); // Redirect to the home page after successful signup
    } catch (err) {
      console.error(err);
      setError(err.message); // Optionally handle error (e.g., set an error state)
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
              alt="Sign In"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Stack>
        )}

        {/* Form Section */}
        <Stack
          direction="column"
          sx={{
            width: isSmall ? "100vw" : "50vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <SigninLoginNav /> */}

          <motion.div
            className="w-20 h-20 bg-stone-100 rounded-lg"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{ textAlign: "center" }}
          >
            <h1 style={{ margin: "0 0 10px 0" }}>Sign up</h1>
            <p>Create an account!</p>
          </motion.div>

          <motion.div
            className="w-20 h-20 bg-stone-100 rounded-lg"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
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
            <form onSubmit={handleSignUp}>
              {/* Username */}
              <label style={{ padding: "20px 0 20px 0" }}>Username:</label>
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
              <label style={{ padding: "20px 0 20px 0" }}>Email</label>
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
              <label style={{ padding: "20px 0 20px 0" }}>Password</label>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                placeholder="*************"
                value={formData.password}
                onChange={handleInputChange}
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
              <p>
                Already have an account?
                <Link
                  to="/login"
                  style={{
                    color: "#1a73e8",
                    textDecoration: "underline",
                    marginLeft: "3px",
                  }}
                >
                  Login
                </Link>
              </p>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center", // Centers the button horizontally
                  width: "100%",
                }}
              >
                <Button
                  type="submit" // Submit the form
                  variant="contained"
                  sx={{
                    width: "80%",
                    height: "50px",
                    fontSize: "16px",
                    margin: "10px",
                    alignSelf: "center",
                    borderRadius: "10px",
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </form>
          </motion.div>
        </Stack>
      </Stack>
    </>
  );
}

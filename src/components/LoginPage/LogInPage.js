// components
import SigninLoginNav from "../Navs/SigninLoginNav";

// assets
import loginPageImg from "../../images/loginPageImg.png";
// MUI
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
// react
import { useState } from "react";
// mediaQuery
import Mediaquery from "../../Mediaquery";
// fireBase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as FirebaseAuth } from "../../config/firebase";

export default function LoginPage() {
  //Mediaquery
  const { isSmall } = Mediaquery();

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const signIn = async () => {
    const { email, password } = loginData;
    try {
      await signInWithEmailAndPassword(FirebaseAuth, email, password);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Error during login: " + err.message);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ height: "100vh", width: "100vw" }}
      >
        {/* Image Section */}
        {!isSmall && (
          <Stack sx={{ width: "50vw", height: "100%" }}>
            <img
              src={loginPageImg}
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
          <h1 style={{ margin: "0 0 10px 0" }}>Log in</h1>
          <p>Welcome back !!</p>

          <form
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
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <label>Email</label>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              placeholder="example@gmail.com"
              onChange={handleInputChange}
              value={loginData.email}
              sx={{
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                },
              }}
            />
            <label>Password</label>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              placeholder="*************"
              onChange={handleInputChange}
              value={loginData.password}
              sx={{
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                },
              }}
            />

            <Button
              variant="contained"
              sx={{
                width: "80%",
                height: "50px",
                fontSize: "16px",
                padding: "10px 20px",
                alignSelf: "center",
                borderRadius: "10px",
              }}
              onClick={signIn}
            >
              Login
            </Button>
          </form>
        </Stack>
      </Stack>
    </>
  );
}

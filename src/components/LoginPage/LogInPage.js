import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as FirebaseAuth } from "../../config/firebase";
import SigninLoginNav from "../Navs/SigninLoginNav";
import loginPageImg from "../../images/loginPageImg.png";
import TextField from "@mui/material/TextField";
import { Button, Alert } from "@mui/material";
import Stack from "@mui/material/Stack";
import Mediaquery from "../../Mediaquery";

export default function LoginPage() {
  const { isSmall } = Mediaquery();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Error state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const signIn = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    try {
      await signInWithEmailAndPassword(FirebaseAuth, email, password);
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError("Incorrect email or password. Please try again."); // Set error message
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ height: "100vh", width: "100vw" }}
      >
        {!isSmall && (
          <Stack sx={{ width: "50vw", height: "100%" }}>
            <img
              src={loginPageImg}
              alt="Login"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Stack>
        )}

        <Stack
          direction="column"
          sx={{ width: isSmall ? "100vw" : "50vw", alignItems: "center" }}
        >
          <SigninLoginNav />
          <h1 style={{ margin: "0 0 10px 0" }}>Log in</h1>
          <p>Welcome back !!</p>

          <form
            onSubmit={signIn}
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
              type="submit"
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
              Login
            </Button>

            {/* Display error message */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  width: "80%",
                  marginTop: "10px",
                  alignSelf: "center",
                }}
              >
                {error}
              </Alert>
            )}
          </form>
        </Stack>
      </Stack>
    </>
  );
}

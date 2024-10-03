import SigninLoginNav from "../Navs/SigninLoginNav";
import loginPageImg from "../../images/loginPageImg.png";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Mediaquery from "../../Mediaquery";

export default function LoginPage() {
  //Mediaquery
  const { isSmall } = Mediaquery();
  const [loginData, setloginData] = useState({ email: "", password: "" });

  function handleInputChange() {
    alert("hi");
  }

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
          >
            <label>Email</label>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Email"
              placeholder="example@gmail.com"
              sx={{
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                },
              }}
              onChange={handleInputChange}
            />
            <label>Password</label>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Password"
              placeholder="*************"
              sx={{
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                },
              }}
              onChange={handleInputChange}
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
            >
              Login
            </Button>
          </form>
        </Stack>
      </Stack>
    </>
  );
}

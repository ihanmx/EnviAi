import SigninLoginNav from "../Navs/SigninLoginNav";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import SigninPageImg from "../../images/SigninPageImg.png";
import Mediaquery from "../../Mediaquery";

export default function SignInPage() {
  //Mediaquery
  const { isSmall } = Mediaquery();
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
            <label>Username:</label>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Username"
              placeholder="Jack"
              sx={{
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "10px",
                },
              }}
            />
            <label>Email</label>
            <TextField
              required
              fullWidth
              label="Email"
              placeholder="example@gmail.com"
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
              id="outlined-required"
              label="Password"
              placeholder="*************"
              //MuiOutlinedInput-root is the main container
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
            >
              Sign up
            </Button>
          </form>
        </Stack>
      </Stack>
    </>
  );
}

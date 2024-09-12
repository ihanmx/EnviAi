import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";

import { useContext } from "react";
import { UserDataContext } from "../Contexts/UserDataContext";

export default function AccountInfoCard() {
  const { userData, setUserData } = useContext(UserDataContext);
  function handleInputsChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }
  return (
    <>
      <Stack
        sx={{
          height: "80 vh",
          width: "70 vw",
          border: "0.5px solid #000",
          borderRadius: "8px",
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
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
                value={userData.name}
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
                value={userData.phone}
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
                value={userData.email}
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
                value={userData.address}
                onChange={handleInputsChange}
              />
            </Grid>
            <Grid size={12}>
              <Button variant="contained">Save</Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </>
  );
}

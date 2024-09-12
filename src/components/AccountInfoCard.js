import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
export default function AccountInfoCard() {
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
        <form>
          <Grid
            container
            spacing={2}
            sx={{
              padding: "30px",
            }}
          >
            <Grid size={6}>
              <label style={{ display: "block" }}>UserName:</label>
              <TextField id="outlined-required" placeholder="Jack" fullWidth />
            </Grid>
            <Grid size={6}>
              <label style={{ display: "block" }}>Phone:</label>
              <TextField
                id="outlined-required"
                placeholder="+966 566 999 433"
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <label style={{ display: "block" }}>Email:</label>
              <TextField
                id="outlined-required"
                placeholder="example@gmail.com"
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <label style={{ display: "block" }}>Shipping address:</label>
              <TextField
                id="outlined-required"
                placeholder="street 5,building 401"
                fullWidth
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

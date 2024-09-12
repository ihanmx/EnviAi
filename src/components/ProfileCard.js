import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import userAvatar from "../images/userAvatar.png";
export default function ProfileCard() {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          border: "0.5px solid #000",
          borderRadius: "8px",
          padding: "20px",
          height: "15%",
        }}
      >
        <img src={userAvatar} style={{ height: "100px", width: "100px" }} />
        <Stack direction="column" spacing={2}>
          <h2>UserName</h2>
          <Button variant="contained">
            Change avatar <UploadIcon />
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

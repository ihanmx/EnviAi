import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import userAvatar from "../images/userAvatar.png";
import { useState } from "react";
export default function ProfileCard() {
  const [image, setImage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

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
        <img
          src={image}
          style={{ height: "100px", width: "100px", borderRadius: "50%" }}
        />
        <Stack direction="column" spacing={2}>
          <h2>UserName</h2>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Change avatar <UploadIcon />
            </Button>
          </label>
        </Stack>
      </Stack>
    </>
  );
}

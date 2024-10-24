// react
import { useState } from "react";
// MUI
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

export default function ImageUpload() {
  const [image, setImage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
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
      {image && <img src={image} alt="Avatar" width="100" />}
    </>
  );
}

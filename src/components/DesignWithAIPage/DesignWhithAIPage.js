import React, { useState } from "react";
import MainNav from "../Navs/MainNav";
import { Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AIRobot from "../../images/AIRobot.png";

export default function DesignWithAIPage() {
  const [userDescription, setUserDescription] = useState("");

  function handleInput(event) {
    setUserDescription(event.target.value);
  }
  return (
    <>
      <MainNav isDarkMode={true} />
      {/* Page Body container */}
      <Stack
        style={{ height: "100vh", width: "100vw", backgroundColor: "#077241" }}
      >
        <form
          style={{
            height: "40vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Describe your design to AI"
            fullWidth
            InputProps={{
              style: {
                padding: "10px",
                borderRadius: "50px",
                backgroundColor: "white",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => alert("Icon clicked!")}>
                    <ArrowForwardIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{
              width: "80vw",
              borderRadius: "50px",
            }}
            value={userDescription}
            onChange={handleInput}
          />
        </form>
        <div
          style={{
            height: "60vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={AIRobot} style={{ objectFit: "cover", height: "100%" }} />
        </div>

        <h1> </h1>
      </Stack>
    </>
  );
}

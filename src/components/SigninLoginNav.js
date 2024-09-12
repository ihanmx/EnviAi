import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Divider } from "@mui/material";
export default function SigninLoginNav() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.warn(value);
    setValue(newValue);
  };

  return (
    <>
      {/* Tabs Section */}

      <Tabs
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
        value={value}
        onChange={handleChange}
        centered
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab label="Home" />
        <Tab label="About" />
        <Tab label="Support" />
      </Tabs>
    </>
  );
}

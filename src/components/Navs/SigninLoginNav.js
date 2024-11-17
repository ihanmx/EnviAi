// assets
import headLogo from "../../images/headOnly.png";
// react
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function SigninLoginNav() {
  const [value, setValue] = useState(0);
  const location = useLocation();
  useEffect(() => {
    const pathMap = {
      "/homepage": 0,
      "/AboutPage": 1,
      "/login": 2,
    };
    setValue(pathMap[location.pathname] || 0);
  }, [location.pathname]);

  // Handle tab change
  const handleChange = (event, newValue) => {
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
        <Tab label="Home" component={Link} to="/homepage" />
        <Tab label="About" component={Link} to="/AboutPage" />
        <Tab label="Support" />
      </Tabs>
    </>
  );
}

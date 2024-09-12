import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import headLogo from "../images/headOnly.png";

function Nav() {
  const location = useLocation();
  const [value, setValue] = useState(0);

  // Dynamically set the active tab based on the current URL
  useEffect(() => {
    const pathMap = {
      "/homepage": 0,
      "/DesignWhithAI": 1,
      "/about": 2,
      "/support": 3,
    };
    setValue(pathMap[location.pathname] || 0);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        style={{ paddingTop: "10px", justifyContent: "space-around" }}
      >
        {/* Logo Section */}
        <Box marginRight={2}>
          <img src={headLogo} alt="Logo" style={{ height: "50px" }} />
        </Box>

        {/* Tabs Section */}
        <Tabs
          style={{
            display: "flex",
            justifyItems: "center",
            width: "60%",
          }}
          value={value}
          onChange={handleChange}
          centered
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Home" component={Link} to="/homepage" />
          <Tab label="Design now" component={Link} to="/DesignWhithAI" />
          <Tab label="About" component={Link} to="/about" />
          <Tab label="Support" component={Link} to="/support" />
        </Tabs>

        <Box>
          <Button
            variant="outlined"
            sx={{
              color: "#1b5e20",
              borderColor: "#1b5e20",
              borderRadius: "50px",
            }}
            component={Link}
            to="/signin"
          >
            Create account
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Nav;

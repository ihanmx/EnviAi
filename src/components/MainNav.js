import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import headLogo from "../images/headOnly.png";
import headLight from "../images/headLight.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

export default function MainNav({ isDarkMode }) {
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const pathMap = {
      "/homepage": 0,
      "/DesignWhithAI": 1,
      "/about": 2,
      "/support": 3,
    };
    setValue(pathMap[location.pathname]);
  }, [location.pathname]);

  const iconsStyle = {
    color: isDarkMode ? "white" : theme.palette.primary.main,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        alignItems="center"
        style={{
          paddingTop: "10px",
          justifyContent: "space-around",
          backgroundColor: isDarkMode ? "#077241" : "white",
        }}
      >
        {/* Logo Section */}
        <Box marginRight={2}>
          <img
            src={isDarkMode ? headLight : headLogo}
            alt="Logo"
            style={{ height: "50px" }}
          />
        </Box>

        {/* Tabs Section */}
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            display: "flex",
            justifyItems: "center",
            width: "60%",
            "& .MuiTab-root": {
              color: isDarkMode ? "white" : theme.palette.text.secondary,
            },
            "& .MuiTab-root.Mui-selected": {
              color: isDarkMode ? "#b0bec5" : theme.palette.primary.main, // Light gray for dark mode
            },
            "& .MuiTabs-indicator": {
              backgroundColor: isDarkMode
                ? "white"
                : theme.palette.secondary.main,
            },
          }}
        >
          <Tab label="Home" component={Link} to="/homepage" />
          <Tab label="Design now" component={Link} to="/DesignWhithAI" />
          <Tab label="About" component={Link} to="/about" />
          <Tab label="Support" component={Link} to="/support" />
        </Tabs>
        {/* Icons section */}
        <Box>
          <Stack direction="row" spacing={2}>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <FavoriteBorderIcon style={iconsStyle} />
            </Link>
            <Link to="/CheckoutPage" style={{ textDecoration: "none" }}>
              <ShoppingCartIcon style={iconsStyle} />
            </Link>
            <Link to="/AccountPage" style={{ textDecoration: "none" }}>
              <AccountCircleIcon style={iconsStyle} />
            </Link>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

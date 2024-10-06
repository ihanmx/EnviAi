import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Stack, IconButton, Divider } from "@mui/material";
import { Button } from "@mui/material"; // Import Button from MUI
import headLogo from "../../images/headOnly.png";
import headLight from "../../images/headLight.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import Mediaquery from "../../Mediaquery";
import { auth } from "../../config/firebase"; // Make sure to import auth
import { signOut } from "firebase/auth"; // Import signOut from Firebase

export default function MainNav({ isDarkMode }) {
  //media query

  const { isMedium } = Mediaquery();

  const iconsStyle = {
    color: isDarkMode ? "white" : theme.palette.primary.main,
  };
  //Location functionality
  const location = useLocation();
  const [value, setValue] = useState(0);

  //tabs function
  useEffect(() => {
    const pathMap = {
      "/homepage": 0,
      "/DesignWhithAI": 1,
      "/about": 2,
      "/support": 3,
    };
    setValue(pathMap[location.pathname]);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Handle Drawer open/close
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);

    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log("User signed out successfully");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          alignItems="center"
          style={{
            paddingTop: "10px",
            justifyContent: isMedium ? "space-between" : "space-around",
            backgroundColor: isDarkMode ? "#077241" : "white",
            padding: "10px",
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

          {/* Hamburger Menu for small screens */}
          {isMedium ? (
            <>
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={iconsStyle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <List>
                  <ListItem
                    component={Link}
                    to="/signin"
                    onClick={toggleDrawer(false)}
                  >
                    <Box>
                      <Stack direction="row" spacing={2}>
                        <Link to="/signin" style={{ textDecoration: "none" }}>
                          <FavoriteBorderIcon sx={iconsStyle} />
                        </Link>
                        <Link
                          to="/CheckoutPage"
                          style={{ textDecoration: "none" }}
                        >
                          <ShoppingCartIcon style={iconsStyle} />
                        </Link>
                        <Link
                          to="/AccountPage"
                          style={{ textDecoration: "none" }}
                        >
                          <AccountCircleIcon style={iconsStyle} />
                        </Link>
                      </Stack>
                    </Box>
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/homepage"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/DesignWhithAI"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Design now" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/about"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="About" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/support"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Support" />
                  </ListItem>
                </List>
                <Divider />
              </Drawer>
            </>
          ) : (
            <>
              {/* Tabs Section for larger screens */}
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
                  {/* Logout Button */}
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{
                      color: "white",
                      backgroundColor: isDarkMode ? "red" : "green",
                      "&:hover": {
                        backgroundColor: isDarkMode ? "darkred" : "darkgreen",
                      },
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </ThemeProvider>
    );
  };
}

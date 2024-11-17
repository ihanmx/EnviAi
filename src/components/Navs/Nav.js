// react
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

// assets
import headLogo from "../../images/headOnly.png";

// MediaQuery
import Mediaquery from "../../Mediaquery";

function Nav({ isLoggedIn }) {
  // Accept isLoggedIn as a prop
  const { isMedium } = Mediaquery();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Dynamically set the active tab based on the current URL
  useEffect(() => {
    const pathMap = {
      "/homepage": 0,
      "/login": 1,
      "/login": 2,
      "/AboutPage": 3,
    };
    setValue(pathMap[location.pathname] || 0);
  }, [location.pathname]);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle Drawer open/close
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      style={{
        padding: "10px",
        justifyContent: isMedium ? "space-between" : "space-around",
      }}
    >
      {/* Logo Section */}
      <Box marginRight={2}>
        <img src={headLogo} alt="Logo" style={{ height: "50px" }} />
      </Box>

      {/* Hamburger Menu for small screens */}
      {isMedium ? (
        <>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <List>
              {/* Create account button only visible if not logged in */}
              {!isLoggedIn && (
                <ListItem
                  button
                  component={Link}
                  to="/signin"
                  onClick={toggleDrawer(false)}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#1b5e20",
                      borderColor: "#1b5e20",
                      borderRadius: "50px",
                      margin: "10px",
                    }}
                  >
                    Create account
                  </Button>
                </ListItem>
              )}
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
                to="/login"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="Design now" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="PRE-MADE DESIGNS" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/AboutPage"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="About" />
              </ListItem>
            </List>
            <Divider />
          </Drawer>
        </>
      ) : (
        <>
          {/* Tabs Section for larger screens */}
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
            <Tab label="Design now" component={Link} to="/login" />
            <Tab label="PRE-MADE DESIGNS" component={Link} to="/login" />
            <Tab label="About" component={Link} to="/AboutPage" />
          </Tabs>

          {/* Create Account Button only visible if not logged in */}
          {!isLoggedIn && (
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
          )}
        </>
      )}
    </Box>
  );
}

export default Nav;

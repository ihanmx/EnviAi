import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
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
import headLogo from "../../images/headOnly.png";
import Box from "@mui/material/Box";
import Mediaquery from "../HomePage/Mediaquery";

function Nav() {
  //media query

  const { isMedium } = Mediaquery();

  //drawer functionality
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  //tabs function
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle Drawer open/close
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  return (
    <>
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

            {/* Create Account Button */}
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
          </>
        )}
      </Box>
    </>
  );
}

export default Nav;

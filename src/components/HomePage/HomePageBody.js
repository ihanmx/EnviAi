// assets
import homeImage from "../../images/RightImg.png";
import logoTitle from "../../images/logoTitle.png";
// MUI
import { Button } from "@mui/material";
// react
import { Link } from "react-router-dom";
// mediaQuery
import Mediaquery from "../../Mediaquery";

import { motion } from "framer-motion";

function HomePageBody() {
  const {
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    is2ExtraLarge,
    isUltraLarge,
  } = Mediaquery();
  return (
    <div
      className="homePageFlexContainer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100vw",
        paddingLeft: "10px",
        paddingRight: "10px",
        flexDirection: isMedium ? "column" : "row",
      }}
    >
      {/* HomeLeftDiv */}
      <motion.div
        className="w-20 h-20 bg-stone-100 rounded-lg"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        style={{ textAlign: "center" }}
      >
        <div
          style={{
            height: isMedium ? "40vh" : "90vh",
            width: isMedium ? "100vw" : "30vw",
            display: " flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img
              src={logoTitle}
              style={{
                objectFit: "contain",
                width: isMedium ? "180px" : "280px",
              }}
              alt="enviAi title"
            />
          </div>
          <div>
            {isMedium ? (
              <h3
                style={{
                  fontFamily: "Poppins",
                  margin: "5px",
                  marginBottom: "15px",
                }}
              >
                Environmental AI design factory
              </h3>
            ) : (
              <h2
                style={{
                  fontFamily: "Poppins",
                  margin: "10px",
                  marginBottom: "15px",
                }}
              >
                Environmental AI design factory
              </h2>
            )}
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              See more
            </Button>
            <br />
            <Link
              to={"/login"}
              style={{
                marginBottom: "10px",
              }}
            >
              <a
                href="https://www.w3schools.com"
                style={{
                  color: "#92A79E",
                  fontSize: "20px",
                }}
              >
                Log in
              </a>
            </Link>
          </div>
        </div>
      </motion.div>
      {/* HomeRightDiv */}

      <motion.div
        animate={{
          rotate: [0, 5, -5, 0], // Rotate slightly and return to the initial state
          scale: [1, 1.05, 1], // Scale up and return to normal size
        }}
        transition={{
          duration: 2, // Duration of the animation
          ease: "easeInOut", // Smooth easing
          repeat: 0, // Animation will not repeat
          repeatDelay: 0, // No repeat delay
        }}
        onAnimationComplete={() => {
          // This will reset the rotation and scale after the animation completes
          // Ensures no residual transformations remain
          document.getElementById("homeImage").style.transform =
            "rotate(0) scale(1)";
        }}
      >
        <div
          style={{
            width: "70vw",
            height: isMedium ? "50vh" : "90vh",
            padding: "10px",
          }}
        >
          <img
            id="homeImage" // Added an ID to the image for easy reference
            src={homeImage}
            alt="home page img"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default HomePageBody;

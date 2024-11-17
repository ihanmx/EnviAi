// components
import MainNav from "../Navs/MainNav";
import Footer from "../Footer";
// MUI
import { Stack } from "@mui/material";
// assets
import environmentImage from "../../images/EnvironmentImgCom.png";
import codingImg from "../../images/OurStoryImg.png";
import AboutImg from "../../images/AboutImg.png";
import whatWeImg from "../../images/WhatWeDOImg.png";

// MediaQuery
import Mediaquery from "../../Mediaquery";

// framer motion

import { motion } from "framer-motion";

export default function AboutPage() {
  const { isSmall, isMedium } = Mediaquery();
  return (
    <>
      <MainNav />
      {/* Main Container */}
      <Stack
        sx={{ padding: isSmall ? "10px" : "20px" }}
        spacing={isSmall ? 2 : 4}
      >
        {/* About Us Section */}
        <Stack
          direction={isSmall ? "column" : "row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          spacing={isSmall ? 2 : 4}
        >
          <Stack
            sx={{
              width: isSmall ? "100%" : "50%",
              padding: isSmall ? "10px" : "20px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isSmall ? "16px" : isMedium ? "24px" : "30px",
            }}
          >
            <motion.div
              className="w-20 h-20 bg-stone-100 rounded-lg"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <h2 style={{ fontFamily: "Poppins" }}>About Us</h2>
              <p style={{ fontFamily: "Roboto" }}>
                Welcome to EnviAI, where sustainability meets creativity. We
                believe in empowering you to make eco-conscious choices while
                expressing your unique style and ideas. Our mission is to
                transform everyday products into personalized, one-of-a-kind
                designs that are both practical and planet-friendly.
              </p>
            </motion.div>
          </Stack>
          <motion.div
            className="w-20 h-20 bg-stone-100 rounded-lg"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <img
              src={AboutImg}
              alt="Environment"
              style={{
                height: "auto",
                width: isSmall ? "100%" : "50vw",
                objectFit: "cover",
              }}
            />
          </motion.div>
        </Stack>

        {/* What We Do Section */}
        <Stack
          direction={isSmall ? "column" : "row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          spacing={isSmall ? 2 : 4}
        >
          {/* Conditional Rendering to Reverse Order */}
          {isSmall ? (
            <>
              <Stack
                sx={{
                  width: "100%",
                  padding: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                <motion.div
                  className="w-20 h-20 bg-stone-100 rounded-lg"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                  <h2 style={{ fontFamily: "Poppins" }}>What We Do</h2>
                  <p style={{ fontFamily: "Roboto" }}>
                    Using the power of AI, we generate custom designs that bring
                    your visions to life. Simply choose from our range of
                    eco-friendly products, type in your text or idea, and watch
                    as our AI creates stunning artwork that gets printed on your
                    favorite items.
                  </p>
                </motion.div>
              </Stack>

              <motion.div
                className="w-20 h-20 bg-stone-100 rounded-lg"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                <img
                  src={whatWeImg}
                  alt="What We Do"
                  style={{
                    height: "auto",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                className="w-20 h-20 bg-stone-100 rounded-lg"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                <img
                  src={whatWeImg}
                  alt="What We Do"
                  style={{
                    height: "auto",
                    width: "50vw",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
              <Stack
                sx={{
                  width: "50%",
                  padding: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMedium ? "24px" : "30px",
                }}
              >
                <motion.div
                  className="w-20 h-20 bg-stone-100 rounded-lg"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                  <h2 style={{ fontFamily: "Poppins" }}>What We Do</h2>
                  <p style={{ fontFamily: "Roboto", lineHeight: "1.5 " }}>
                    Using the power of AI, we generate custom designs that bring
                    your visions to life. Simply choose from our range of
                    eco-friendly products, type in your text or idea, and watch
                    as our AI creates stunning artwork that gets printed on your
                    favorite items.
                  </p>
                </motion.div>
              </Stack>
            </>
          )}
        </Stack>

        {/* Our Commitment to Sustainability Section */}
        <Stack
          direction={isSmall ? "column" : "row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          spacing={isSmall ? 2 : 4}
        >
          <Stack
            sx={{
              width: isSmall ? "100%" : "50%",
              padding: isSmall ? "10px" : "20px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isSmall ? "16px" : isMedium ? "24px" : "30px",
            }}
          >
            <motion.div
              className="w-20 h-20 bg-stone-100 rounded-lg"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <h2 style={{ fontFamily: "Poppins" }}>
                Our Commitment to Sustainability
              </h2>
              <p style={{ fontFamily: "Roboto", lineHeight: "1.5 " }}>
                We are dedicated to protecting the environment and promoting
                responsible consumption. All our products are made from
                sustainable materials, ensuring that every purchase you make is
                a step towards a greener future.
              </p>
            </motion.div>
          </Stack>

          <motion.div
            className="w-20 h-20 bg-stone-100 rounded-lg"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <img
              src={environmentImage}
              alt="Sustainability"
              style={{
                height: "auto",
                width: isSmall ? "100%" : "50vw",
                objectFit: "cover",
              }}
            />
          </motion.div>
        </Stack>

        {/* Our Story Section */}
        <Stack
          direction={isSmall ? "column" : "row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          spacing={isSmall ? 2 : 4}
        >
          {/* Conditional Rendering to Reverse Order */}
          {isSmall ? (
            <>
              <Stack
                sx={{
                  width: "100%",
                  padding: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                <motion.div
                  className="w-20 h-20 bg-stone-100 rounded-lg"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                  <h2 style={{ fontFamily: "Poppins" }}>Our Story</h2>
                  <p style={{ fontFamily: "Roboto", lineHeight: "1.5 " }}>
                    Made with passion and love by Hanan Biazid, Sara Taema, and
                    Shaykhah Aldosari to bring out their programming skills in
                    the form of a website that serves the community using modern
                    artificial intelligence technologies.
                  </p>
                </motion.div>
              </Stack>

              <motion.div
                className="w-20 h-20 bg-stone-100 rounded-lg"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                <img
                  src={codingImg}
                  alt="Our Story"
                  style={{
                    height: "auto",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                className="w-20 h-20 bg-stone-100 rounded-lg"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                <img
                  src={codingImg}
                  alt="Our Story"
                  style={{
                    height: "auto",
                    width: "50vw",
                    objectFit: "cover",
                  }}
                />
              </motion.div>

              <Stack
                sx={{
                  width: "50%",
                  padding: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMedium ? "24px" : "30px",
                }}
              >
                <motion.div
                  className="w-20 h-20 bg-stone-100 rounded-lg"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                  <h2 style={{ fontFamily: "Poppins" }}>Our Story</h2>
                  <p style={{ fontFamily: "Roboto", lineHeight: "1.5 " }}>
                    Made with passion and love by Hanan Biazid, Sara Taema, and
                    Shaykhah Aldosari to bring out their programming skills in
                    the form of a website that serves the community using modern
                    artificial intelligence technologies.
                  </p>
                </motion.div>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
      <Footer />
    </>
  );
}

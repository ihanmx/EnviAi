import MainNav from "../Navs/MainNav";
import ProductsCard from "./ProductsCard";

// assets
import FoodBoxType from "../../images/FoodBoxType.png";
import BagType from "../../images/BagType.png";
import CupsType from "../../images/CupsType.png";
import PhoneCaseType from "../../images/PhoneCaseType.png";
import NoteBookType from "../../images/NoteBookType.png";
import TshirtType from "../../images/TshirtType.png";

// MUI
import Grid from "@mui/material/Grid2";
import { ProductTypeContext } from "../../Contexts/ProductTypeContext";
import { Stack } from "@mui/material";

// hooks
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// framer motion
import { motion } from "framer-motion";

export default function ChooseProductPage() {
  const { productType, setProductType } = useContext(ProductTypeContext);

  const gridSquareVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // This makes each child animate sequentially
      },
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    const savedProductType = JSON.parse(localStorage.getItem("productType"));
    if (savedProductType) {
      setProductType(savedProductType);
    }
  }, []);

  function handleClick(value) {
    setProductType({ type: value.type, price: value.price });
    localStorage.setItem(
      "productType",
      JSON.stringify({ type: value.type, price: value.price })
    );
    navigate("/DesignWhithAI", {
      state: { productType: { type: value.type, price: value.price } },
    });
  }

  return (
    <>
      <MainNav isDarkMode={false} />
      <Stack
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate="show"
        >
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
              <ProductsCard
                img={FoodBoxType}
                title={"Lunch boxes"}
                value={{ type: "green silicone lunchbox with a divided interior", price: "15SR" }}
                clickEvent={handleClick}
                variants={gridSquareVariants} // Pass the animation variants
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
              <ProductsCard
                img={BagType}
                title={"Fabric shopping bags"}
                value={{ type: "white plain tote bag", price: "30SR" }}
                clickEvent={handleClick}
                variants={gridSquareVariants}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
              <ProductsCard
                img={TshirtType}
                title={"T-shirts"}
                value={{ type: "plain green t-shirt with short sleeves and a crew neck", price: "30SR" }}
                clickEvent={handleClick}
                variants={gridSquareVariants}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
              <ProductsCard
                img={NoteBookType}
                title={"Recycled notebooks"}
                value={{ type: "brown notebook with a spiral binding", price: "10SR" }}
                clickEvent={handleClick}
                variants={gridSquareVariants}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
              <ProductsCard
                img={PhoneCaseType}
                title={"Phone cases"}
                value={{ type: "black phone case for an iPhone 12", price: "10SR" }}
                clickEvent={handleClick}
                variants={gridSquareVariants}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
              <ProductsCard
                img={CupsType}
                title={"Heat preservation mugs"}
                value={{ type: "black stainless steel thermos", price: "30SR" }}
                clickEvent={handleClick}
                variants={gridSquareVariants}
              />
            </Grid>
          </Grid>
        </motion.div>
      </Stack>
    </>
  );
}

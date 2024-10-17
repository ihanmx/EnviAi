import MainNav from "../Navs/MainNav";
import ProductsCard from "./ProductsCard";
import FoodBoxType from "../../images/FoodBoxType.png";
import BagType from "../../images/BagType.png";
import CupsType from "../../images/CupsType.png";
import PhoneCaseType from "../../images/PhoneCaseType.png";
import NoteBookType from "../../images/NoteBookType.png";
import TshirtType from "../../images/TshirtType.png";
import Grid from "@mui/material/Grid2";
import { useContext } from "react";
import { ProductTypeContext } from "../../Contexts/ProductTypeContext";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export default function ChooseProductPage() {
  const { productType, setProductType } = useContext(ProductTypeContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  function handleClick(value) {
    setProductType({ type: value });
    navigate("/DesignWhithAI", { state: { productType: value } }); // Navigate and pass the product type
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
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
            <ProductsCard
              img={FoodBoxType}
              title={"Lunch boxes"}
              value="Lunch boxes"
              clickEvent={handleClick}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
            <ProductsCard
              img={BagType}
              title={"Shopping bags"}
              value="Shopping bags"
              clickEvent={handleClick}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
            <ProductsCard
              img={TshirtType}
              title={"T-shirts"}
              value="T-shirts"
              clickEvent={handleClick}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
            <ProductsCard
              img={NoteBookType}
              title={"Recycled notebooks"}
              value="Recycled notebooks"
              clickEvent={handleClick}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
            <ProductsCard
              img={PhoneCaseType}
              title={"Phone cases"}
              value="Phone cases"
              clickEvent={handleClick}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} align="center">
            <ProductsCard
              img={CupsType}
              title={"Heat preservation cup"}
              value="Heat preservation cup"
              clickEvent={handleClick}
            />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

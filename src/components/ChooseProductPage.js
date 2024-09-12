import MainNav from "./MainNav";
import ProductsCard from "./ProductsCard";
import FoodBoxType from "../images/FoodBoxType.png";
import BagType from "../images/BagType.png";
import CupsType from "../images/CupsType.png";
import PhoneCaseType from "../images/PhoneCaseType.png";
import NoteBookType from "../images/NoteBookType.png";
import TshirtType from "../images/TshirtType.png";

import Grid from "@mui/material/Grid2";

export default function ChooseProductPage() {
  return (
    <>
      <MainNav isDarkMode={false} />

      <Grid container spacing={1}>
        <Grid size={4}>
          <ProductsCard img={FoodBoxType} title={"Lunch boxes"} />
        </Grid>
        <Grid size={4}>
          <ProductsCard img={BagType} title={"Shopping bags"} />
        </Grid>
        <Grid size={4}>
          <ProductsCard img={TshirtType} title={"T-shirts"} />
        </Grid>
        <Grid size={4}>
          <ProductsCard img={NoteBookType} title={"Recycled notebooks"} />
        </Grid>
        <Grid size={4}>
          <ProductsCard img={PhoneCaseType} title={"Phone cases"} />
        </Grid>
        <Grid size={4}>
          <ProductsCard img={CupsType} title={"Heat preservation cup"} />
        </Grid>
      </Grid>
    </>
  );
}

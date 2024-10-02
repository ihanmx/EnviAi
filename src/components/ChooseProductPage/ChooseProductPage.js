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

export default function ChooseProductPage() {
  const { productType, setProductType } = useContext(ProductTypeContext);

  function handleClick(value) {
    setProductType({ type: value });
  }
  return (
    <>
      <MainNav isDarkMode={false} />

      <Grid container spacing={1}>
        <Grid size={4}>
          <ProductsCard
            img={FoodBoxType}
            title={"Lunch boxes"}
            value="Lunch boxes"
            clickEvent={handleClick}
          />
        </Grid>
        <Grid size={4}>
          <ProductsCard
            img={BagType}
            title={"Shopping bags"}
            value="Shopping bags"
            clickEvent={handleClick}
          />
        </Grid>
        <Grid size={4}>
          <ProductsCard
            img={TshirtType}
            title={"T-shirts"}
            value="T-shirts"
            clickEvent={handleClick}
          />
        </Grid>
        <Grid size={4}>
          <ProductsCard
            img={NoteBookType}
            title={"Recycled notebooks"}
            value="Recycled notebooks"
            clickEvent={handleClick}
          />
        </Grid>
        <Grid size={4}>
          <ProductsCard
            img={PhoneCaseType}
            title={"Phone cases"}
            value="Phone cases"
            clickEvent={handleClick}
          />
        </Grid>
        <Grid size={4}>
          <ProductsCard
            img={CupsType}
            title={"Heat preservation cup"}
            value="Heat preservation cup"
            clickEvent={handleClick}
          />
        </Grid>
      </Grid>
    </>
  );
}

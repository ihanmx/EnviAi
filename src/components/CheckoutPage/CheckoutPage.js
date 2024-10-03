import MainNav from "../Navs/MainNav";
import { Stack } from "@mui/material";
import CheckoutProductsList from "./CheckoutProductsList";
import { ProductPricesList } from "./ProductPricesList";
import { TotalPrice } from "./ProductPricesList";
import Divider from "@mui/material/Divider";
import Mediaquery from "../../Mediaquery";

export default function CheckoutPage() {
  //media query

  const { isMedium } = Mediaquery();

  return (
    <>
      <MainNav />
      {/* Page countainer */}
      <Stack
        direction={isMedium ? "column" : "row"}
        spacing={2}
        sx={{
          padding: "30px",
          alignItems: "center",
        }}
      >
        {/* Checkout Products section */}
        <Stack
          direction="column"
          spacing={2}
          sx={{
            height: "80vh",
            width: isMedium ? "80vw" : "60vw",
            border: "0.5px solid #000",
            borderRadius: "8px",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <CheckoutProductsList />
        </Stack>
        {/* Pricing Section */}
        <Stack
          direction="column"
          spacing={2}
          sx={{
            height: "80vh",
            width: isMedium ? "80vw" : "30vw",
            border: "0.5px solid #000",
            borderRadius: "8px",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <ProductPricesList />
          <Divider />
          <TotalPrice />
        </Stack>
      </Stack>
    </>
  );
}

import MainNav from "./MainNav";
import { Stack } from "@mui/material";
import CheckoutProductsList from "./CheckoutProductsList";
import { ProductPricesList } from "./ProductPricesList";
import { TotalPrice } from "./ProductPricesList";
import Divider from "@mui/material/Divider";
export default function CheckoutPage() {
  return (
    <>
      <MainNav />
      {/* Page countainer */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          padding: "30px",
        }}
      >
        {/* Checkout Products section */}
        <Stack
          direction="column"
          spacing={2}
          sx={{
            height: "80vh",
            width: "60vw",
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
            width: "30vw",
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

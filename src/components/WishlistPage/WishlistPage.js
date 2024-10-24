// components
import MainNav from "../Navs/MainNav";
import WishlistItem from "./WishlistItem";
// MUI
import { Stack } from "@mui/material";

// theme
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
// contexts
import { ProductsContext } from "../../Contexts/ProductsContext";

// react
import { useContext, useEffect } from "react";

export default function WishlistPage() {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    // Load products from localStorage when the component mounts
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    if (savedProducts) {
      setProducts(savedProducts);
    }
  }, [setProducts]);

  const wishListProducts = products.filter((product) => {
    return product.isInWishList;
  });

  const listItems = wishListProducts.map((product) => {
    return (
      <WishlistItem
        id={product.productId}
        img={product.productImg}
        title={product.productName}
        details={product.productDetails}
        isInCart={product.isInCart}
      />
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <MainNav isDarkMode={true} />
      {/* // Page Container */}
      <Stack
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center", // Center horizontally
          backgroundColor: theme.palette.primary.main,
          padding: "20px",
          overflow: "auto",
        }}
        spacing={3}
      >
        {listItems}
      </Stack>
    </ThemeProvider>
  );
}

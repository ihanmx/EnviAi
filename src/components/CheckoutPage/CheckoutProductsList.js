// MUI
import { Stack } from "@mui/material";
// react
import { useContext, useEffect } from "react";
// contexts
import { ProductsContext } from "../../Contexts/ProductsContext";
// components
import ProductContainer from "./ProductContainer";

export default function CheckoutProductsList() {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    // Load products from localStorage when the component mounts
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    if (savedProducts) {
      setProducts(savedProducts);
    }
  }, [setProducts]);

  // Filter products based on items in the cart (change 'isInWishList' to 'isInCart')
  const cartProducts = products.filter((product) => {
    return product.isInCart;
  });

  // Map over the filtered products and render ProductContainer
  const productsList = cartProducts.map((product) => (
    <ProductContainer
      key={product.productId}
      id={product.productId}
      name={product.productName}
      details={product.productDetails}
      img={product.productImg}
      price={product.price}
      isInWishList={product.isInWishList}
    />
  ));

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ height: "100%", width: "100%", overflow: "auto" }}
    >
      {productsList}
    </Stack>
  );
}

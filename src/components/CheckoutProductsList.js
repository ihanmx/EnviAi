import { Stack } from "@mui/material";
import { useContext } from "react";
import { CartProductsContext } from "../Contexts/CartProductsContext";

function ProductContainer({ name, details, img, key, price }) {
  return (
    <Stack direction="row" spacing={2}>
      {/* img part */}
      <img src={img} style={{ height: "100px", width: "100px" }}></img>

      {/* text part */}
      <Stack spacing={2}>
        <h3>{name} </h3>
        <p>{details}</p>
        <p>{price}</p>
      </Stack>
    </Stack>
  );
}
export default function CheckoutProductsList() {
  const { CartProducts, setCartProducts } = useContext(CartProductsContext);
  const cartProductsList = CartProducts.map((product) => {
    return (
      <ProductContainer
        name={product.productName}
        details={product.productDetails}
        img={product.productImg}
        key={product.productId}
        price={product.price}
      />
    );
  });
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ height: "80vh", width: "60vw", overflow: "auto" }}
    >
      {cartProductsList}
    </Stack>
  );
}

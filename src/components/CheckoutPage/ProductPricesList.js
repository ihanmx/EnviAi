import { useContext } from "react";
import { CartProductsContext } from "../../Contexts/CartProductsContext";
import { Stack } from "@mui/material";

function PricesContainer({ key, price }) {
  return (
    <Stack direction="row" spacing={2}>
      <h2>{price}</h2>
    </Stack>
  );
}

export function ProductPricesList() {
  const { CartProducts, setCartProducts } = useContext(CartProductsContext);
  const PricesList = CartProducts.map((product) => {
    return <PricesContainer key={product.productId} price={product.price} />;
  });

  return <>{PricesList}</>;
}

export function TotalPrice() {
  const { CartProducts } = useContext(CartProductsContext);

  const totalPrice = CartProducts.reduce((accumulator, product) => {
    return accumulator + parseInt(product.price, 10);
  }, 0);

  return <h2>Total: {totalPrice}</h2>;
}

// contexts
import { useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContext";
// MUI
import { Stack } from "@mui/material";

function PricesContainer({ key, price }) {
  return (
    <Stack direction="row" spacing={2}>
      <h3>{price}</h3>
    </Stack>
  );
}

export function ProductPricesList() {
  const { products, setProducts } = useContext(ProductsContext);
  const PricesList = products.map((product) => {
    return <PricesContainer key={product.productId} price={product.price} />;
  });

  return <>{PricesList}</>;
}

export function TotalPrice() {
  const { products } = useContext(ProductsContext);

  const totalPrice = products.reduce((accumulator, product) => {
    return accumulator + parseInt(product.price, 10);
  }, 0);

  return <h2>Total: {totalPrice}</h2>;
}

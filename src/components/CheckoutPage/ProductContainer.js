// MUI
import { Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
// react
import { useContext, useEffect } from "react";
import { useToast } from "../../Contexts/ToastProvider";
// contexts
import { ProductsContext } from "../../Contexts/ProductsContext";

export default function ProductContainer({
  name,
  details,
  img,
  price,
  id,
  isInWishList,
}) {
  useEffect(() => {
    // Load products from localStorage when the component mounts
    const savedProducts = JSON.parse(localStorage.getItem("products"));

    if (savedProducts) {
      setProducts(savedProducts);
    }
    console.log(products);
  }, []);

  const { products, setProducts } = useContext(ProductsContext);
  const { showHideToast } = useToast();

  function handleAddToWish(productId) {
    console.log("added to wishList" + productId);
    const updatedProducts = products.map((product) => {
      if (product.productId === productId) {
        const updatedProduct = {
          ...product,
          isInWishList: !product.isInWishList,
        };

        if (updatedProduct.isInWishList) {
          showHideToast("Product added to the wishlist successfully");
        } else {
          showHideToast("Product removed from the wishlist successfully");
        }
        return updatedProduct;
      } else return product;
    });

    setProducts(updatedProducts);

    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  function handleRemoveFromCart(productId) {
    console.log("removed from cart" + productId);
    const updatedProducts = products.map((product) => {
      if (product.productId === productId) {
        const updatedProduct = { ...product, isInCart: !product.isInCart };

        // Check if the product is now in the cart or removed from it

        showHideToast("Product removed from the cart successfully");

        return updatedProduct;
      } else return product;
    });

    setProducts(updatedProducts);

    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  return (
    <>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* image and titles */}
        <Stack direction="row" spacing={2}>
          {/* img part */}
          <img
            src={img}
            style={{ height: "100px", width: "100px" }}
            alt={name}
          />

          {/* text part */}
          <Stack spacing={2}>
            <h3>{name}</h3>
            <p>{details}</p>
            <p>{price}</p>
          </Stack>
        </Stack>

        {/* icons */}
        <Stack direction={"row"}>
          <ClearIcon
            style={{
              color: "#077241",
            }}
            onClick={() => {
              handleRemoveFromCart(id);
            }}
          />
          <FavoriteBorderIcon
            style={{
              color: isInWishList ? "red" : "#077241",
            }}
            onClick={() => {
              handleAddToWish(id);
            }}
          />
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}

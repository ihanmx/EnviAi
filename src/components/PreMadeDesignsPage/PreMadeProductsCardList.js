// MUI
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// contexts
import { ProductsContext } from "../../Contexts/ProductsContext";
import { useToast } from "../../Contexts/ToastProvider";

// react
import { useContext, useEffect } from "react";

export default function PreMadeProductsCardList() {
  const { products, setProducts } = useContext(ProductsContext);
  const { showHideToast } = useToast();

  useEffect(() => {
    // Load products from localStorage when the component mounts
    const savedProducts = JSON.parse(localStorage.getItem("products"));

    if (savedProducts) {
      setProducts(savedProducts);
    }
    console.log(products);
  }, []);

  function handleAddToCart(productId) {
    console.log("added to cart" + productId);

    const updatedProducts = products.map((product) => {
      if (product.productId === productId) {
        const updatedProduct = { ...product, isInCart: !product.isInCart };

        if (updatedProduct.isInCart) {
          showHideToast("Product added to the cart successfully");
        } else {
          showHideToast("Product removed from the cart successfully");
        }

        return updatedProduct;
      } else {
        return product;
      }
    });

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

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
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {products.map((product, index) => {
          return (
            <Grid size={4} key={index} sx={{ maxWidth: " 26% " }}>
              <Card key={product.productId}>
                <img
                  src={product.productImg}
                  key={product.productId}
                  alt={`Generated ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    padding: "10px",
                    borderRadius: "15px",
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {product.productName}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.productDetails}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Stack direction={"row"}>
                    <FavoriteBorderIcon
                      style={{
                        color: product.isInWishList ? "red" : "#077241",
                      }}
                      onClick={() => {
                        handleAddToWish(product.productId);
                      }}
                    />
                    <ShoppingCartIcon
                      style={{
                        color: product.isInCart ? "red" : "#077241",
                      }}
                      onClick={() => {
                        handleAddToCart(product.productId);
                      }}
                    />
                  </Stack>
                </CardActions>
              </Card>
              ;
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

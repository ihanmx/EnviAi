import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsContext"; // Import context
import { useToast } from "../../Contexts/ToastProvider";

export default function PreMadeProductsCardList() {
  const { products, setProducts } = useContext(ProductsContext); // Get products and setProducts from context
  const { showHideToast } = useToast();

  function handleAddToCart(productId) {
    console.log("added to cart " + productId);

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
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

    setProducts(updatedProducts); // Update state
  }

  function handleAddToWish(productId) {
    console.log("added to wishlist " + productId);

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
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

    setProducts(updatedProducts); // Update state
  }

  return (
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
      {products.map((product) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                image={product.productImg}
                alt={`Generated ${product.productName}`}
                sx={{
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
                      handleAddToWish(product.id);
                    }}
                  />
                  <ShoppingCartIcon
                    style={{
                      color: product.isInCart ? "red" : "#077241",
                    }}
                    onClick={() => {
                      handleAddToCart(product.id);
                    }}
                  />
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

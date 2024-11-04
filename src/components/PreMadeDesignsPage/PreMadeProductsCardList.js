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

//firebase
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function PreMadeProductsCardList() {
  const { products, setProducts } = useContext(ProductsContext);
  const { showHideToast } = useToast();
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productsCollectionRef);
        const productsArray = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray); // Set image URLs to the correct state
        console.log(productsArray); // Log the array of image URLs
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const handleAddToWish = async (firebaseId) => {
    console.log("Toggling wishlist for product ID:", firebaseId);

    // Update local state

    const updatedProducts = products.map((product) => {
      if (product.id === firebaseId) {
        return { ...product, isInWishList: !product.isInWishList };
      }
      return product;
    });

    setProducts(updatedProducts);
    // Update Firestore

    try {
      const productDocRef = doc(db, "products", firebaseId);

      await updateDoc(productDocRef, {
        isInWishList: updatedProducts.find((p) => p.id === firebaseId)
          .isInWishList,
      });

      showHideToast("Wishlist updated successfully!");
    } catch (error) {
      console.error("Error updating wishlist in Firestore:", error);
    }
  };

  const handleAddToCart = async (firebaseId) => {
    console.log("Toggling cart for product ID:", firebaseId);

    // Update local state

    const updatedProducts = products.map((product) => {
      if (product.id === firebaseId) {
        return { ...product, isInCart: !product.isInCart };
      }
      return product;
    });
    setProducts(updatedProducts);
    // Update Firestore
    try {
      const productsDocRef = doc(db, "products", firebaseId);

      await updateDoc(productsDocRef, {
        isInCart: updatedProducts.find((p) => p.id === firebaseId).isInCart,
      });

      showHideToast("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart in Firestore:", error);
    }
  };

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
              ;
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

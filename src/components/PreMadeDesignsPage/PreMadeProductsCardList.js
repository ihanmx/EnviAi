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
import { Products1Context } from "../../Contexts/Products1Context";

// react
import { useContext, useEffect, useState } from "react";

//firebase
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { auth } from "../../config/firebase";
import { setDoc, getDoc } from "firebase/firestore";

export default function PreMadeProductsCardList() {
  const { showHideToast } = useToast();
  const { products, setProducts } = useContext(ProductsContext);
  const { products1, setProducts1 } = useContext(Products1Context);

  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const productsCollectionRef = collection(db, `users/${userId}/products`);
  const products1CollectionRef = collection(db, "products");

  useEffect(() => {
    if (!userId) {
      console.log("User ID not provided");
      return;
    }

    const fetchAndMergeProducts = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        // Fetch existing user products
        const querySnapshot = await getDocs(productsCollectionRef);
        const existingProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Get the document ID
          ...doc.data(), // Get the document data
        }));

        // Fetch products1
        const querySnapshot1 = await getDocs(products1CollectionRef);
        const products1List = querySnapshot1.docs.map((doc) => ({
          id: doc.id, // Get the document ID
          ...doc.data(), // Get the document data
        }));

        const updatePromises = querySnapshot1.docs.map((doc) =>
          updateDoc(doc.ref, { isInCart: false, isInWishList: false })
        );

        await Promise.all(updatePromises);

        // Merge products1 into products (avoid duplicates)
        const mergedProducts = [...existingProducts];
        for (const product of products1List) {
          if (!existingProducts.find((p) => p.id === product.id)) {
            mergedProducts.push(product);

            // Add the new product to Firestore
            await setDoc(doc(productsCollectionRef, product.id), product);
          }
        }

        // Update state
        setProducts(mergedProducts);
        setProducts1(products1List);

        console.log("Merged user products:", mergedProducts);
        console.log("Fetched products1:", products1List);
      } catch (err) {
        console.error("Error merging products:", err);
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    fetchAndMergeProducts();
  }, [userId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error("User is not authenticated");
      }
    });

    return unsubscribe;
  }, []);

  // Handlers
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
      const productDocRef = doc(productsCollectionRef, firebaseId);
      const updatedProduct = updatedProducts.find((p) => p.id === firebaseId);
      await updateDoc(productDocRef, {
        isInWishList: updatedProduct.isInWishList,
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
      const productDocRef = doc(productsCollectionRef, firebaseId);
      const updatedProduct = updatedProducts.find((p) => p.id === firebaseId);
      await updateDoc(productDocRef, { isInCart: updatedProduct.isInCart });
      showHideToast("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart in Firestore:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Typography variant="h4" align="center" sx={{ color: "white" }}>
          Loading...
        </Typography>
      ) : (
        <Grid
          container
          spacing={4}
          sx={{
            minWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {products1.map((product1, index) => {
            // Find the corresponding product from the `products` array
            const matchedProduct = products.find((p) => p.id === product1.id);

            // Determine the wishlist and cart status
            const isInWishList = matchedProduct?.isInWishList || false;
            const isInCart = matchedProduct?.isInCart || false;

            return (
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={index}>
                <Card key={product1.productId}>
                  <img
                    src={product1.productImg}
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
                      {product1.productName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {product1.productDetails}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Stack direction={"row"}>
                      <FavoriteBorderIcon
                        style={{
                          color: isInWishList ? "red" : "#077241",
                        }}
                        onClick={() => {
                          handleAddToWish(product1.id);
                        }}
                      />
                      <ShoppingCartIcon
                        style={{
                          color: isInCart ? "red" : "#077241",
                        }}
                        onClick={() => {
                          handleAddToCart(product1.id);
                        }}
                      />
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}

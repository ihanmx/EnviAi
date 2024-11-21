// react
import React, { Component, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access passed state

// AI backend
import axios from "axios"; // To handle requests to the backend

// MUI

import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

// theme

import theme from "../../theme";

// Component
import MainNav from "../Navs/MainNav";
import Button from "@mui/material/Button";

// assets
import AIRobot from "../../images/AIRobot.png";

// context
import { ProductsContext } from "../../Contexts/ProductsContext";
import { ProductTypeContext } from "../../Contexts/ProductTypeContext";
import { useToast } from "../../Contexts/ToastProvider";

// external
import { v4 as uuidv4 } from "uuid";

// framer motion
import { motion } from "framer-motion";

//firebase
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const DesignWithAIPage = () => {
  const location = useLocation(); // Get the location object
  const { productType } = useContext(ProductTypeContext);
  const { products, setProducts } = useContext(ProductsContext);
  const [prompt, setPrompt] = useState(""); // To store the user input
  const [imageUrls, setImageUrls] = useState([]); // To store the generated image URLs
  const [loading, setLoading] = useState(false); // To show a loader when image is generating
  const [error, setError] = useState(""); // To show any errors
  const productsCollectionRef = collection(db, "products");
  const { showHideToast } = useToast();

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

  // handlers

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

  // Function to handle image generation
  const handleGenerateImages = async () => {
    if (!prompt) {
      setError("Prompt cannot be empty!");
      return;
    }
    if (!productType?.type) {
      setError("You should choose the product type first!");
      return;
    }

    // Reset newProducts false

    setLoading(true);
    setError("");

    try {
      const updateIsNewInFirestore = async () => {
        const productsSnapshot = await getDocs(productsCollectionRef);
        const updatePromises = productsSnapshot.docs.map((doc) =>
          updateDoc(doc.ref, { isNewProduct: false })
        );
        await Promise.all(updatePromises);
      };

      await updateIsNewInFirestore();

      // Update local state to set isNewProduct to false for all products
      setProducts((prevProducts) =>
        prevProducts.map((product) => ({ ...product, isNewProduct: false }))
      );

      const response = await axios.post(
        "http://localhost:4000/generate-images",
        {
          prompt: `Create a front view of a ${productType.type} featuring a high-quality print of '${prompt}' on its surface. The design should be vibrant and visually appealing, showcasing the colors and details clearly.`,
        }
      );

      if (response.data.imageUrls) {
        setImageUrls(response.data.imageUrls); // Update imageUrls state
        const generatedProducts = response.data.imageUrls.map((URL) => {
          return {
            productName: productType.type,
            productDetails: prompt,
            productImg: URL,
            productId: uuidv4(), // Generate unique ID for each product
            price: productType.price,
            isInWishList: false,
            isInCart: false,
            isNewProduct: true,
          };
        });

        const addProductsToDatabase = async () => {
          for (let product of generatedProducts) {
            await addDoc(productsCollectionRef, product); // Add to main products collection
          }
        };

        await addProductsToDatabase();

        // Now update the products context after generating products

        setProducts((prevProducts) => {
          const updatedProducts = [...prevProducts, ...generatedProducts];

          return updatedProducts;
        });
      }
    } catch (err) {
      setError("Error generating images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainNav isDarkMode={true} />
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          height: "auto",
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <h1 style={{ color: "white" }}>
          Generate special designs using the AI !!
        </h1>
        {/* Input field for the prompt */}
        <input
          type="text"
          placeholder="Enter a description..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            padding: "20px",
            width: "80%",
            marginBottom: "10px",
            borderRadius: "50px",
            border: "none",
          }}
        />
        <br />

        {/* Button to generate the image */}
        <Button
          color={"light"}
          variant="contained"
          onClick={handleGenerateImages}
          disabled={loading}
          style={{
            padding: "10px 20px",
            margin: "20px",
            backgroundColor: theme.palette.light.main,
            color: theme.palette.primary.main,
          }}
        >
          {loading ? "Generating..." : "Generate Images"}
        </Button>

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Display the generated images or the AI robot image */}
        {products.filter((product) => product.isNewProduct).length > 0 ? (
          <div>
            <h3 style={{ color: "white" }}>Generated Images:</h3>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              {products
                .filter((product) => product.isNewProduct)
                .map((product, index) => (
                  <Grid key={product.productId} size={3}>
                    <Card sx={{ padding: "10px" }}>
                      <img
                        src={product.productImg}
                        alt={`Generated ${index + 1}`}
                        style={{ maxWidth: "100%" }}
                      />
                      {/* Card actions */}
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
                ))}
            </Grid>
          </div>
        ) : (
          <div>
            <motion.div
              className="w-20 h-20 bg-stone-100 rounded-lg"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              style={{ textAlign: "center" }}
            >
              <img
                src={AIRobot}
                alt="AI Robot Placeholder"
                style={{ maxWidth: "30%", marginTop: "20px" }}
              />
              <p style={{ color: "white" }}>
                No images generated yet. Start by entering a description!
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default DesignWithAIPage;

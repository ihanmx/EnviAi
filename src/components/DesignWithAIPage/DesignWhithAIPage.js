// react
import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom"; 

// AI backend
import axios from "axios"; 

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

// Firestore service
import { fetchProducts, updateProduct, addProduct } from "../../services/firestoreService"; 

const DesignWithAIPage = () => {
  const location = useLocation(); 
  const { productType } = useContext(ProductTypeContext);
  const [newProducts, setNewProducts] = useState([]); 
  const { products, setProducts } = useContext(ProductsContext);
  const [prompt, setPrompt] = useState(""); 
  const [imageUrls, setImageUrls] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const { showHideToast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts(); // Fetch products from Firestore
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  // handlers
  const handleAddToWish = async (productId) => {
    console.log("added to wishList" + productId);
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, isInWishList: !product.isInWishList };
      } else return product;
    });

    setProducts(updatedProducts);

    // Update Firestore
    const productToUpdate = updatedProducts.find((product) => product.id === productId);
    await updateProduct(productId, productToUpdate);

    if (productToUpdate.isInWishList) {
      showHideToast("Product added to the wishlist successfully");
    } else {
      showHideToast("Product removed from the wishlist successfully");
    }
  };

  const handleAddToCart = async (productId) => {
    console.log("added to cart" + productId);
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const updatedProduct = { ...product, isInCart: !product.isInCart };

        if (updatedProduct.isInCart) {
          showHideToast("Product added to the cart successfully");
        } else {
          showHideToast("Product removed from the cart successfully");
        }

        return updatedProduct;
      } else return product;
    });

    setProducts(updatedProducts);

    // Update Firestore
    const productToUpdate = updatedProducts.find((product) => product.id === productId);
    await updateProduct(productId, productToUpdate);
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

    // Reset newProducts array to empty before next generation
    setNewProducts([]);

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/generate-images",
        {
          prompt: `A ${productType.type} with the '${prompt}' printed on it.`,
        }
      );

      if (response.data.imageUrls) {
        setImageUrls(response.data.imageUrls); // Update imageUrls state
        const generatedProducts = response.data.imageUrls.map((URL) => ({
          productName: productType.type,
          productDetails: prompt,
          productImg: URL,
          productId: uuidv4(), // Generate unique ID for each product
          price: productType.price,
          isInWishList: false,
          isInCart: false,
        }));

        // Now update the products context after generating products
        const newProductIds = await Promise.all(
          generatedProducts.map(async (product) => {
            const id = await addProduct(product, 'newProducts'); // Add product to Firestore under newProducts
            return { ...product, id }; // Return the product with Firestore ID
          })
        );

        setProducts((prevProducts) => [...prevProducts, ...newProductIds]);
        setNewProducts(newProductIds);
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
            marginBottom: "10px",
            backgroundColor: theme.palette.light.main,
            color: theme.palette.primary.main,
          }}
        >
          {loading ? "Generating..." : "Generate Images"}
        </Button>

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Display the generated images or the AI robot image */}
        {imageUrls.length > 0 ? (
          // Results container
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h3 style={{ color: "white" }}>Generated Images:</h3>

            <Grid container spacing={2} sx={{ width: "100%" }}>
              {newProducts.map((product, index) => (
                <Grid
                  key={product.productId}
                  size={3}
                  sx={{ height: "30%", width: "30%" }}
                >
                  <Card
                    sx={{
                      height: "90%",
                      width: "90%",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      key={product.productId}
                      src={product.productImg}
                      alt={`Generated ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        padding: "10px",
                        borderRadius: "15px",
                      }}
                    />

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
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <img
              src={AIRobot}
              alt="AI Robot Placeholder"
              style={{ maxWidth: "30%", height: "auto", margin: "10px" }}
            />
            <p style={{ color: "white" }}>
              No images generated yet. Start by entering a description!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DesignWithAIPage;

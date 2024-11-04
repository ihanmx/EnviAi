// components
import MainNav from "../Navs/MainNav";
import WishlistItem from "./WishlistItem";
// MUI
import { Stack } from "@mui/material";

// theme
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
// contexts
import { ProductsContext } from "../../Contexts/ProductsContext";

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
export default function WishlistPage() {
  const { products, setProducts } = useContext(ProductsContext);

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

  const wishListProducts = products.filter((product) => {
    return product.isInWishList;
  });

  const listItems = wishListProducts.map((product) => {
    return (
      <WishlistItem
        id={product.id}
        img={product.productImg}
        title={product.productName}
        details={product.productDetails}
        isInCart={product.isInCart}
      />
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <MainNav isDarkMode={true} />
      {/* // Page Container */}
      <Stack
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center", // Center horizontally
          backgroundColor: theme.palette.primary.main,
          padding: "20px",
          overflow: "auto",
        }}
        spacing={3}
      >
        {listItems}
      </Stack>
    </ThemeProvider>
  );
}

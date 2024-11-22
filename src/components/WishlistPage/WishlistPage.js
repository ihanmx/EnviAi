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

export default function WishlistPage() {
  const { products, setProducts } = useContext(ProductsContext);
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [user, setUser] = useState(null);
  const productsCollectionRef = collection(db, `users/${userId}/products`);

  useEffect(() => {
    if (!userId) {
      console.log("user ID not provided");
    }

    async function fetchUserData() {
      const userDoc = doc(db, "users", userId);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productsCollectionRef);

        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Get the document ID
          ...doc.data(), // Get the document data
        }));

        setProducts(productsList);

        console.log("the user products:", products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
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
        {listItems.length > 0 ? (
          listItems
        ) : (
          <h1 style={{ color: "white" }}>Your Wishlist is empty!</h1>
        )}
        {/* {listItems} */}
      </Stack>
    </ThemeProvider>
  );
}

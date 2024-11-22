// MUI
import { Stack } from "@mui/material";
// react
import { useContext, useEffect, useState } from "react";
// contexts
import { ProductsContext } from "../../Contexts/ProductsContext";
// components
import ProductContainer from "./ProductContainer";
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

export default function CheckoutProductsList() {
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

  // Filter products based on items in the cart (change 'isInWishList' to 'isInCart')
  const cartProducts = products.filter((product) => {
    return product.isInCart;
  });

  // Map over the filtered products and render ProductContainer
  const productsList = cartProducts.map((product) => (
    <ProductContainer
      key={product.productId}
      id={product.id}
      name={product.productName}
      details={product.productDetails}
      img={product.productImg}
      price={product.price}
      isInWishList={product.isInWishList}
    />
  ));

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ height: "100%", width: "100%", overflow: "auto" }}
    >
      {productsList.length > 0 ? productsList : <h1>Your Cart is empty!</h1>}
    </Stack>
  );
}

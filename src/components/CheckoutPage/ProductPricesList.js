// contexts
import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../Contexts/ProductsContext";
// MUI
import { Stack } from "@mui/material";
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

function PricesContainer({ key, price }) {
  return (
    <Stack direction="row" spacing={2}>
      <h3>{price}</h3>
    </Stack>
  );
}

export function ProductPricesList() {
  const { products, setProducts } = useContext(ProductsContext);
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [user, setUser] = useState(null);
  const productsCollectionRef = collection(db, `users/${userId}/products`);

  useEffect(() => {
    if (!userId) {
      console.log("user ID not provided");
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
  const PricesList = products
    .filter((product) => product.isInCart) // Filter products that are in the cart
    .map((product) => (
      <PricesContainer key={product.productId} price={product.price} />
    ));
  return <>{PricesList}</>;
}

export function TotalPrice() {
  const { products, setProducts } = useContext(ProductsContext);
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [user, setUser] = useState(null);
  const productsCollectionRef = collection(db, `users/${userId}/products`);

  useEffect(() => {
    if (!userId) {
      console.log("user ID not provided");
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
  // console.log("the products", totalPrice);
  const totalPrice = products.reduce((accumulator, product) => {
    // Only add the price if the product is in the cart
    if (product.isInCart) {
      return accumulator + parseInt(product.price, 10);
    }
    return accumulator; // Return the accumulator as is if the product is not in the cart
  }, 0);

  console.log("the total", totalPrice);

  return <h2>Total: {totalPrice}</h2>;
}

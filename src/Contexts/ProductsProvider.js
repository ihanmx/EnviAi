import React, { createContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

// Create the context
export const ProductsContext = createContext();

// Define the provider component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, "products");
        const products1CollectionRef = collection(db, "products1");

        const productsData = await getDocs(productsCollectionRef);
        const products1Data = await getDocs(products1CollectionRef);

        setProducts(
          productsData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );

        setProducts1(
          products1Data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Provide the context value
  return (
    <ProductsContext.Provider
      value={{ products, setProducts, products1, setProducts1 }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

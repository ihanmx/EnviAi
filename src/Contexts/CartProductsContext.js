import { createContext, useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase"; // Adjust this path as needed

export const CartProductsContext = createContext([]);

export function CartProductsProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Fetch products where `isInCart` is true
    const fetchCartProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("isInCart", "==", true));
        const querySnapshot = await getDocs(q);

        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products from Firestore: ", error);
      }
    };

    fetchCartProducts();
  }, []);

  return (
    <CartProductsContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartProductsContext.Provider>
  );
}

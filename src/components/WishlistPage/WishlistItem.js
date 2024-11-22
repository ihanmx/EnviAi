// MUI
import { Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// react
import { useContext, useEffect, useState } from "react";

// contexts
import { ProductsContext } from "../../Contexts/ProductsContext";
import { useToast } from "../../Contexts/ToastProvider";

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

export default function WishlistItem({ img, title, details, id, isInCart }) {
  const { products, setProducts } = useContext(ProductsContext);
  const { showHideToast } = useToast();

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
    fetchUserData();

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

  const handleAddToCart = async (firebaseId) => {
    console.log("Toggling wishlist for product ID:", firebaseId);

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
      const productDocRef = doc(db, `users/${userId}/products`, firebaseId); // Reference to the specific document
      const updatedProduct = updatedProducts.find((p) => p.id === firebaseId);
      await updateDoc(productDocRef, {
        isInCart: updatedProduct.isInCart,
      });

      showHideToast("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating the cart in Firestore:", error);
    }
  };

  // //////////////////////Remove from wish//////////////////////////////////////////////////////////
  const handleRemoveFromWish = async (firebaseId) => {
    console.log("Toggling wishlist for product ID:", firebaseId);

    // Update local state
    const updatedProducts = products.map((product) => {
      if (product.id === firebaseId) {
        return { ...product, isInWishList: false };
      }
      return product;
    });
    setProducts(updatedProducts);

    // Update Firestore
    try {
      const productDocRef = doc(db, `users/${userId}/products`, firebaseId); // Reference to the specific document
      const updatedProduct = updatedProducts.find((p) => p.id === firebaseId);
      await updateDoc(productDocRef, {
        isInWishList: false,
      });

      showHideToast("Wishlist updated successfully!");
    } catch (error) {
      console.error("Error updating wishlist in Firestore:", error);
    }
  };
  return (
    <>
      <Stack
        direction={"row"}
        spacing={3}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderRadius: "20px",
          width: "80%",
          height: "100px",
          padding: "20px",
          paddingLeft: "40px",
        }}
      >
        {/* img and titles */}
        <Stack
          direction={"row"}
          spacing={3}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={img} style={{ height: "100px", width: "100px" }} />
          <Stack>
            <h2>{title}</h2>
            <h4>{details}</h4>
          </Stack>
        </Stack>

        {/* icons */}
        <Stack direction={"row"}>
          <ClearIcon
            style={{
              color: "#077241",
            }}
            onClick={() => {
              handleRemoveFromWish(id);
            }}
          />
          <ShoppingCartIcon
            style={{
              color: isInCart ? "red" : "#077241",
            }}
            onClick={() => {
              handleAddToCart(id);
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}

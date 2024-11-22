// MUI
import { Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
// react
import { useContext, useEffect, useState } from "react";
import { useToast } from "../../Contexts/ToastProvider";
// contexts
import { ProductsContext } from "../../Contexts/ProductsContext";
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
export default function ProductContainer({
  name,
  details,
  img,
  price,
  id,
  isInWishList,
}) {
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

  // /////////////Remove from Cart////////////////////

  const handleRemoveFromCart = async (firebaseId) => {
    console.log("Toggling wishlist for product ID:", firebaseId);

    // Update local state
    const updatedProducts = products.map((product) => {
      if (product.id === firebaseId) {
        return { ...product, isInCart: false };
      }
      return product;
    });
    setProducts(updatedProducts);

    // Update Firestore
    try {
      const productDocRef = doc(db, `users/${userId}/products`, firebaseId); // Reference to the specific document
      const updatedProduct = updatedProducts.find((p) => p.id === firebaseId);
      await updateDoc(productDocRef, {
        isInCart: false,
      });

      showHideToast("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating the cart in Firestore:", error);
    }
  };

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
      const productDocRef = doc(db, `users/${userId}/products`, firebaseId); // Reference to the specific document
      const updatedProduct = updatedProducts.find((p) => p.id === firebaseId);
      await updateDoc(productDocRef, {
        isInWishList: updatedProduct.isInWishList,
      });

      showHideToast("Wishlist updated successfully!");
    } catch (error) {
      console.error("Error updating wishlist in Firestore:", error);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* image and titles */}
        <Stack direction="row" spacing={2}>
          {/* img part */}
          <img
            src={img}
            style={{ height: "100px", width: "100px" }}
            alt={name}
          />

          {/* text part */}
          <Stack spacing={2}>
            <h3>{name}</h3>
            <p>{details}</p>
            <p>{price}</p>
          </Stack>
        </Stack>

        {/* icons */}
        <Stack direction={"row"}>
          <ClearIcon
            style={{
              color: "#077241",
            }}
            onClick={() => {
              handleRemoveFromCart(id);
            }}
          />
          <FavoriteBorderIcon
            style={{
              color: isInWishList ? "red" : "#077241",
            }}
            onClick={() => {
              handleAddToWish(id);
            }}
          />
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}

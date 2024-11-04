// MUI
import { Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
// react
import { useContext, useEffect } from "react";
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

  const handleRemoveFromCart = async (firebaseId) => {
    console.log("Toggling cart for product ID:", firebaseId);

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
      const productsDocRef = doc(db, "products", firebaseId);

      await updateDoc(productsDocRef, {
        isInCart: false, // No need to find again since we already know the value is false
      });

      showHideToast("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart in Firestore:", error);
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

// MUI
import { Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// react
import { useContext, useEffect } from "react";

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

export default function WishlistItem({ img, title, details, id, isInCart }) {
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
  const handleAddToCart = async (firebaseId) => {
    console.log("Toggling cart for product ID:", firebaseId);

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
      const productsDocRef = doc(db, "products", firebaseId);

      await updateDoc(productsDocRef, {
        isInCart: updatedProducts.find((p) => p.id === firebaseId).isInCart,
      });

      showHideToast("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart in Firestore:", error);
    }
  };

  const handleRemoveFromWish = async (firebaseId) => {
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

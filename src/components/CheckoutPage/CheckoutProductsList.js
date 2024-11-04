// MUI
import { Stack } from "@mui/material";
// react
import { useContext, useEffect } from "react";
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

export default function CheckoutProductsList() {
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
      {productsList}
    </Stack>
  );
}

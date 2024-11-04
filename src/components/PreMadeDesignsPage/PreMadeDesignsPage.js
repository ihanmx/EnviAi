import Stack from "@mui/material/Stack";
import { useEffect, useContext } from "react"; // Import useContext
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase"; 
import MainNav from "../Navs/MainNav";
import PreMadeProductsCardList from "./PreMadeProductsCardList";
import { ProductsContext } from "../../Contexts/ProductsContext"; // Import the context
import theme from "../../theme";

export default function PreMadeDesignsPage() {
  const { setProducts } = useContext(ProductsContext); // Access setProducts from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList); // Set products using context
      } catch (error) {
        console.error("Error fetching products from Firestore: ", error);
      }
    };

    fetchProducts();
  }, [setProducts]); // Include setProducts in the dependency array

  return (
    <>
      <MainNav isDarkMode={true} />
      <Stack
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <PreMadeProductsCardList /> {/* Pass products directly from context */}
      </Stack>
    </>
  );
}

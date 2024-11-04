// CSS file
import "./App.css";

// Components
import Homepage from "./components/HomePage/Homepage";
import LoginPage from "./components/LoginPage/LogInPage";
import SignInPage from "./components/SigninPage/SignInPage";
import DesignWhithAIPage from "./components/DesignWithAIPage/DesignWhithAIPage";
import ChooseProductPage from "./components/ChooseProductPage/ChooseProductPage";
import AccountPage from "./components/AccountPage/AccountPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import WishlistPage from "./components/WishlistPage/WishlistPage";
import PreMadeDesignsPage from "./components/PreMadeDesignsPage/PreMadeDesignsPage";

// React and Router
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// Contexts
import { CartProductsContext } from "./Contexts/CartProductsContext";
import { ProductsContext } from "./Contexts/ProductsContext";
import { UserDataContext } from "./Contexts/UserDataContext";
import { ProductTypeContext } from "./Contexts/ProductTypeContext";
import { ToastProvider } from "./Contexts/ToastProvider";

// Firebase and Services
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { initializeProductTypes, initializeProducts } from './services/firestoreService';

// Theme
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

// Backend
import { AuthComponent } from "./components/auth";

function App() {
  // Initial states for contexts
  const [CartProducts, setCartProducts] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    language: "",
  });
  const [productType, setProductType] = useState({ type: "", price: "" });
  const [products, setProducts] = useState([]);

  // Firestore reference
  const productCollectionRef = collection(db, "products");

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      await initializeProducts(); // Initialize products if not already present
      await initializeProductTypes(); // Initialize product types if necessary
    };
  
    initializeData();
  }, []);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getDocs(productCollectionRef);
        const productsList = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <ProductsContext.Provider value={{ products, setProducts }}>
            <ProductTypeContext.Provider value={{ productType, setProductType }}>
              <CartProductsContext.Provider value={{ CartProducts, setCartProducts }}>
                <div>
                  <AuthComponent />

                  {/* Routes */}
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/Homepage" element={<Homepage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/DesignWhithAI" element={<DesignWhithAIPage />} />
                    <Route path="/ChooseProductPage" element={<ChooseProductPage />} />
                    <Route path="/AccountPage" element={<AccountPage />} />
                    <Route path="/CheckoutPage" element={<CheckoutPage />} />
                    <Route path="/WishlistPage" element={<WishlistPage />} />
                    <Route path="/PreMadeDesignsPage" element={<PreMadeDesignsPage />} />
                  </Routes>
                </div>
              </CartProductsContext.Provider>
            </ProductTypeContext.Provider>
          </ProductsContext.Provider>
        </UserDataContext.Provider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

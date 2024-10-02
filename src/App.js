import "./App.css";
import Homepage from "./components/HomePage/Homepage";
import LoginPage from "./components/LoginPage/LogInPage";
import SignInPage from "./components/SigninPage/SignInPage";
import DesignWhithAIPage from "./components/DesignWithAIPage/DesignWhithAIPage";
import ChooseProductPage from "./components/ChooseProductPage/ChooseProductPage";
import AccountPage from "./components/AccountPage/AccountPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartProductsContext } from "./Contexts/CartProductsContext";
import { UserDataContext } from "./Contexts/UserDataContext";
import { ProductTypeContext } from "./Contexts/ProductTypeContext";
import { AuthComponent } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const cartProductsinitial = [
    // ... (your initial products)
  ];

  const [CartProducts, setCartProducts] = useState(cartProductsinitial);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    language: "",
  });
  const [productType, setProductType] = useState({ type: "" });
  const [products, setProducts] = useState([]);

  const productCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getProducts();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <ProductTypeContext.Provider value={{ productType, setProductType }}>
        <CartProductsContext.Provider value={{ CartProducts, setCartProducts }}>
          <div>
            <AuthComponent />
            <input placeholder="search" type="text" />
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
            </Routes>
          </div>
        </CartProductsContext.Provider>
      </ProductTypeContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;

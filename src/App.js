import "./App.css";
import Homepage from "./components/HomePage/Homepage";
import LoginPage from "./components/LoginPage/LogInPage";
import SignInPage from "./components/SigninPage/SignInPage";
import DesignWhithAIPage from "./components/DesignWithAIPage/DesignWhithAIPage";
import ChooseProductPage from "./components/ChooseProductPage/ChooseProductPage";
import AccountPage from "./components/AccountPage/AccountPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { CartProductsContext } from "./Contexts/CartProductsContext";
import { UserDataContext } from "./Contexts/UserDataContext";
import { ProductTypeContext } from "./Contexts/ProductTypeContext";
import WishlistPage from "./components/WishlistPage/WishlistPage";
//
function App() {
  const cartProductsinitial = [
    {
      productName: "Wireless Headphones",
      productDetails:
        "Over-ear, noise-canceling, Bluetooth 5.0, 20 hours battery life",
      productImg: "https://example.com/images/wireless-headphones.jpg",
      productId: "WH12345",
      price: "10 SR",
    },
    {
      productName: "Smart Watch",
      productDetails:
        "1.5-inch AMOLED display, GPS, heart-rate monitor, waterproof",
      productImg: "https://example.com/images/smart-watch.jpg",
      productId: "SW67890",
      price: "10 SR",
    },
    {
      productName: "Laptop Backpack",
      productDetails:
        "Water-resistant, fits up to 15.6-inch laptops, multiple compartments",
      productImg: "https://example.com/images/laptop-backpack.jpg",
      productId: "LB11223",
      price: "10 SR",
    },
    {
      productName: "Gaming Mouse",
      productDetails:
        "RGB lighting, 16000 DPI, ergonomic design, 8 programmable buttons",
      productImg: "https://example.com/images/gaming-mouse.jpg",
      productId: "GM44556",
      price: "10 SR",
    },
    {
      productName: "Portable Charger",
      productDetails: "10000mAh, fast charging, dual USB ports, slim design",
      productImg: "https://example.com/images/portable-charger.jpg",
      productId: "PC78901",
      price: "10 SR",
    },
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
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <ProductTypeContext.Provider value={{ productType, setProductType }}>
        <CartProductsContext.Provider value={{ CartProducts, setCartProducts }}>
          <div>
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/Homepage" element={<Homepage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/signin" element={<SignInPage />}></Route>
              <Route
                path="/DesignWhithAI"
                element={<DesignWhithAIPage />}
              ></Route>
              <Route
                path="/ChooseProductPage"
                element={<ChooseProductPage />}
              ></Route>
              <Route path="/AccountPage" element={<AccountPage />}></Route>
              <Route path="/CheckoutPage" element={<CheckoutPage />}></Route>
              <Route path="/WishlistPage" element={<WishlistPage />}></Route>
            </Routes>
          </div>
        </CartProductsContext.Provider>
      </ProductTypeContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;

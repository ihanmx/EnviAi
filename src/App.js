// css file
import "./App.css";

// components
import Homepage from "./components/HomePage/Homepage";
import LoginPage from "./components/LoginPage/LogInPage";
import SignInPage from "./components/SigninPage/SignInPage";
import DesignWhithAIPage from "./components/DesignWithAIPage/DesignWhithAIPage";
import ChooseProductPage from "./components/ChooseProductPage/ChooseProductPage";
import AccountPage from "./components/AccountPage/AccountPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import WishlistPage from "./components/WishlistPage/WishlistPage";
import PreMadeDesignsPage from "./components/PreMadeDesignsPage/PreMadeDesignsPage";
import AboutPage from "./components/AboutPage/AboutPage.js";
import SelfT from "./components/SelfDesignPage/SelfT.js";
import SelfB from "./components/SelfDesignPage/SelfB.js";
import SelfC from "./components/SelfDesignPage/SelfC.js";
import SelfN from "./components/SelfDesignPage/SelfN.js";
import SelfM from "./components/SelfDesignPage/SelfM.js";
import SelfF from "./components/SelfDesignPage/SelfF.js";
import SelfDesignChooseProducts from "./components/SelfDesignPage/SelfDesignChooseProduct.js";
import SubmitSelfDesign from "./components/SelfDesignPage/SubmitSelfDesign.js";
// react
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// contexts
import { CartProductsContext } from "./Contexts/CartProductsContext";
import { ProductsContext } from "./Contexts/ProductsContext.js";
import { UserDataContext } from "./Contexts/UserDataContext";
import { ProductTypeContext } from "./Contexts/ProductTypeContext";
import { ToastProvider } from "./Contexts/ToastProvider.js";
import { Products1Context } from "./Contexts/Products1Context.js";
import { SelfProductTypeContext } from "./Contexts/SelfProductTypeContext.js";
import { ProductsProvider } from "./Contexts/ProductsProvider";

// Backend
import { AuthComponent } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

//theme
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const cartProductsinitial = [
    {
      productName: "Wireless Headphones",
      productDetails:
        "Over-ear, noise-canceling, Bluetooth 5.0, 20 hours battery life",
      productImg: "https://example.com/images/wireless-headphones.jpg",
      productId: "WH12345",
      price: "10 SR",
      isInWishList: false,
      isInCart: false,
    },
    {
      productName: "Portable Charger",
      productDetails: "10000mAh, fast charging, dual USB ports, slim design",
      productImg: "https://example.com/images/portable-charger.jpg",
      productId: "PC78901",
      price: "10 SR",
      isInWishList: false,
      isInCart: false,
    },
  ];

  const productsinitial = [];
  const products1initial = [];

  const [CartProducts, setCartProducts] = useState(cartProductsinitial);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    language: "",
  });
  const [productType, setProductType] = useState({ type: "", price: "" });
  const [selfProductType, setSelfProductType] = useState({
    type: "",
    price: "",
  });

  const [products, setProducts] = useState(productsinitial);

  const [products1, setProducts1] = useState(products1initial);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <Products1Context.Provider value={{ products1, setProducts1 }}>
            <ProductsContext.Provider value={{ products, setProducts }}>
              <ProductTypeContext.Provider
                value={{ productType, setProductType }}
              >
                <SelfProductTypeContext.Provider
                  value={{ selfProductType, setSelfProductType }}
                >
                  <CartProductsContext.Provider
                    value={{ CartProducts, setCartProducts }}
                  >
                    <ProductsProvider>
                      <div>
                        <AuthComponent />
                        {/* <input placeholder="search" type="text" /> */}

                        {/* Routes */}
                        <Routes>
                          <Route path="/" element={<Homepage />}></Route>
                          <Route
                            path="/Homepage"
                            element={<Homepage />}
                          ></Route>
                          <Route path="/login" element={<LoginPage />}></Route>
                          <Route
                            path="/signin"
                            element={<SignInPage />}
                          ></Route>
                          <Route
                            path="/DesignWhithAI"
                            element={<DesignWhithAIPage />}
                          ></Route>
                          <Route
                            path="/ChooseProductPage"
                            element={<ChooseProductPage />}
                          ></Route>
                          <Route
                            path="/AccountPage"
                            element={<AccountPage />}
                          ></Route>
                          <Route
                            path="/CheckoutPage"
                            element={<CheckoutPage />}
                          ></Route>
                          <Route
                            path="/WishlistPage"
                            element={<WishlistPage />}
                          ></Route>
                          <Route
                            path="/PreMadeDesignsPage"
                            element={<PreMadeDesignsPage />}
                          ></Route>
                          <Route
                            path="/AboutPage"
                            element={<AboutPage />}
                          ></Route>

                          <Route
                            path="/SelfDesignTShirt"
                            element={<SelfT />}
                          ></Route>

                          <Route
                            path="/SelfDesignToteBag"
                            element={<SelfB />}
                          ></Route>

                          <Route
                            path="/SelfDesignMobileCover"
                            element={<SelfC />}
                          ></Route>

                          <Route
                            path="/SelfDesignNoteBook"
                            element={<SelfN />}
                          ></Route>

                          <Route
                            path="/SelfDesignMug"
                            element={<SelfM />}
                          ></Route>

                          <Route
                            path="/SelfDesignLunchBox"
                            element={<SelfF />}
                          ></Route>

                          <Route
                            path="/SelfDesignChooseProductsPage"
                            element={<SelfDesignChooseProducts />}
                          ></Route>

                          <Route
                            path="/SubmitSelfDesignPage"
                            element={<SubmitSelfDesign />}
                          ></Route>
                        </Routes>
                      </div>
                    </ProductsProvider>
                  </CartProductsContext.Provider>
                </SelfProductTypeContext.Provider>
              </ProductTypeContext.Provider>
            </ProductsContext.Provider>
          </Products1Context.Provider>
        </UserDataContext.Provider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

// Components
import Nav from "../Navs/Nav";
import HomePageBody from "./HomePageBody";
import FeaturesPage from "./FeaturesPage";
import FeatureCards from "./FeatureCards";
import Footer from "../Footer";
import MainNav from "../Navs/MainNav";

// React and Firebase
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Contexts/UserDataContext";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase"; // Ensure auth and db are correctly imported

export default function Homepage() {
  const { setUserData } = useContext(UserDataContext);
  const [userExists, setUserExists] = useState(false); // Track if user data exists

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", user.uid); // `users` collection with `uid` as the document ID
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setUserExists(true); // User data found
        } else {
          console.error("No user data found in Firestore.");
          setUserExists(false); // User data not found
        }
      } else {
        setUserExists(false); // User is not logged in
        setUserData({}); // Reset user data if logged out
      }
    });

    return () => unsubscribe();
  }, [setUserData]);

  return (
    <div
      className="HomepageContainer"
      style={{
        maxWidth: "100vw",
        overflowX: "hidden",
        textAlign: "center",
      }}
    >
      {userExists ? <MainNav /> : <Nav />} {/* Conditional Navbar */}

      <HomePageBody />
      <FeaturesPage />
      <FeatureCards />
      <Footer />
    </div>
  );
}

// components
import Nav from "../Navs/Nav";
import HomePageBody from "./HomePageBody";
import FeaturesPage from "./FeaturesPage";
import FeatureCards from "./FeatureCards";
import Footer from "../Footer";
import MainNav from "../Navs/MainNav";

export default function Homepage() {
  return (
    <>
      <div
        className="HomepageContainer"
        style={{
          maxWidth: "100vw",
          overflowX: "hidden",
          textAlign: "center",
        }}
      >
        {/*  !!!!!!!!!!!!!if the user logged in or registered then you must return <MainNav/> insted of nav */}
        <Nav />
        <HomePageBody />
        <FeaturesPage />
        <FeatureCards />
        <Footer />
      </div>
    </>
  );
}

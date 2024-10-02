import Nav from "../Navs/Nav";
import HomePageBody from "./HomePageBody";
import FeaturesPage from "./FeaturesPage";
import FeatureCards from "./FeatureCards";
import Footer from "../Footer";

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
        <Nav />
        <HomePageBody />
        <FeaturesPage />
        <FeatureCards />
        <Footer />
      </div>
    </>
  );
}

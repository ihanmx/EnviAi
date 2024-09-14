import Nav from "../Navs/Nav";
import HomePageBody from "./HomePageBody";
import FeaturesPage from "./FeaturesPage";
import FeatureCards from "./FeatureCards";
import Footer from "../Footer";
export default function Homepage() {
  return (
    <>
      <div
        className="App"
        style={{
          maxWidth: "100vw",
          overflowX: "hidden",
          margin: "0",
          padding: "0",
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

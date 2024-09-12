import FeaturesBG from "../images/FeaturesBG.png";

function FeaturesPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${FeaturesBG})`,
        backgroundSize: "cover",
        backgroundPosition: " center",
        backgroundRepeat: " no-repeat ",
        width: " 100vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100vw",
      }}
    >
      <h1>
        Get a unique product design experience with image-generating
        <br /> AI and support environmental protection
      </h1>
    </div>
  );
}

export default FeaturesPage;

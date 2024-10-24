// assets
import FeaturesBG from "../../images/FeaturesBG.png";
// mediaQuery
import Mediaquery from "../../Mediaquery";

function FeaturesPage() {
  const {
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    is2ExtraLarge,
    isUltraLarge,
  } = Mediaquery();
  return (
    <div
      style={{
        backgroundImage: `url(${FeaturesBG})`,
        backgroundSize: isMedium ? "contain" : "cover",
        backgroundPosition: " center",
        backgroundRepeat: " no-repeat ",
        width: " 100vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100vw",
        padding: "0 20px 0 20px",
      }}
    >
      {isSmall ? (
        <h2>
          Get a unique product design {isSmall && <br />}experience with
          image-generating
          <br /> AI and support environmental protection
        </h2>
      ) : (
        <h1>
          Get a unique product design experience with image-generating
          <br /> AI and support environmental protection
        </h1>
      )}
    </div>
  );
}

export default FeaturesPage;

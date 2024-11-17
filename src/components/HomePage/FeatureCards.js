// MUI
import { Stack } from "@mui/material";

// assets
import CardImg from "./CardImg";
import card1Img from "../../images/card1.png";
import card2Img from "../../images/card2.png";
import card3Img from "../../images/card3.png";
import card4Img from "../../images/card4.png";
import card5Img from "../../images/card5.png";

// mediaQuery
import Mediaquery from "../../Mediaquery";

export default function FeatureCards() {
  const {
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    is2ExtraLarge,
    isUltraLarge,
  } = Mediaquery();
  return (
    <div>
      <Stack
        className="featuresCardCountainer"
        direction={isMedium ? "column" : "row"}
        spacing={2}
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          overflowX: "hidden",
          margin: "10px",
        }}
      >
        <CardImg
          height={isMedium ? "60vh" : "50vh"}
          img={card1Img}
          title={""}
          button={false}
          greenBg={true}
          downTxt="Personalized Designs: Create products that truly reflect your personality."
        />
        <CardImg
          height={isMedium ? "60vh" : "60vh"}
          img={card2Img}
          title={`Buy eco-freindly products
          `}
          button={false}
          greenBg={false}
        />
        <CardImg
          height={isMedium ? "55vh" : "75vh"}
          img={card3Img}
          title={`Generate your favourite designs
          using image-generator AI
           `}
          button={false}
          greenBg={false}
        />
        <CardImg
          height={isMedium ? "60vh" : "60vh"}
          img={card4Img}
          title={`create stunning artwork that gets printed on your
                  favorite items.`}
          button={false}
          greenBg={false}
        />
        <CardImg
          height={isMedium ? "60vh" : "50vh"}
          img={card5Img}
          title={""}
          button={false}
          greenBg={true}
          downTxt="AI-Driven Creativity: Cutting-edge technology that makes your design dreams come true."
        />
      </Stack>
    </div>
  );
}

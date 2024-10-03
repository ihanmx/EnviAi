import homeImage from "../../images/RightImg.png";
import logoTitle from "../../images/logoTitle.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Mediaquery from "../../Mediaquery";

function HomePageBody() {
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
      className="homePageFlexContainer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100vw",
        paddingLeft: "10px",
        paddingRight: "10px",
        flexDirection: isMedium ? "column" : "row",
      }}
    >
      {/* HomeLeftDiv */}
      <div
        style={{
          height: isMedium ? "40vh" : "90vh",
          width: isMedium ? "100vw" : "30vw",
          display: " flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <img
            src={logoTitle}
            style={{
              objectFit: "contain",
              width: isSmall ? "200px" : "300px",
            }}
            alt="enviAi title"
          />
        </div>
        <div>
          {isSmall ? (
            <h2>Environmental AI design factory</h2>
          ) : (
            <h1>Environmental AI design factory</h1>
          )}
          <Button variant="contained" style={{ backgroundColor: "green" }}>
            See more
          </Button>
          <br />
          <Link to={"/login"}>
            <a href="https://www.w3schools.com" style={{ color: "#92A79E" }}>
              Log in
            </a>
          </Link>
        </div>
      </div>
      {/* HomeRightDiv */}
      <div
        style={{
          width: "70vw",
          height: isMedium ? "50vh" : "90vh",
          padding: "10px",
        }}
      >
        <img
          src={homeImage}
          alt="home page img"
          style={{ width: "100%", height: " 100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

export default HomePageBody;

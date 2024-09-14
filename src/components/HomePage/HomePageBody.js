import homeImage from "../../images/RightImg.png";
import logoTitle from "../../images/logoTitle.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function HomePageBody() {
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
      }}
    >
      <div
        className="HomeLeftDiv"
        style={{
          height: "90vh",
          width: "30vw",

          flexGrow: "1",
          display: " flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <img
            src={logoTitle}
            style={{ objectFit: "cover", width: "50vh" }}
            alt="enviAi title"
          />
        </div>
        <div>
          <h1>Environmental AI design factory</h1>
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

      <div
        className="HomeRightDiv"
        style={{
          width: "70vw",
          height: "90vh",
          padding: "10px",

          flexGrow: "1",
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

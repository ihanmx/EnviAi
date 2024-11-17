// MUI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// mediaQuery
import Mediaquery from "../../Mediaquery";
import { Padding } from "@mui/icons-material";

export default function CardImg({
  height,
  title,
  img,
  button,
  greenBg,
  btnText,
  downTxt,
}) {
  const {
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    is2ExtraLarge,
    isUltraLarge,
  } = Mediaquery();

  function checkButton() {
    if (button) {
      return (
        <CardActions
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="medium"
            style={{
              backgroundColor: "white",
              borderRadius: "50px",
              color: "#077241",
            }}
          >
            {btnText}
          </Button>
        </CardActions>
      );
    }
    return null;
  }

  return (
    <Card
      sx={{
        minHeight: isMedium ? "80vh" : height,
        height: height,
        backgroundImage: !greenBg ? `url(${img})` : "none",
        backgroundSize: !greenBg ? "contain" : "auto",
        backgroundPosition: !greenBg ? "center" : "initial",
        backgroundRepeat: !greenBg ? "no-repeat" : "repeat",
        backgroundColor: greenBg ? "#077241" : "none",
        borderRadius: "50px",
        width: isMedium ? "80vw" : "18vw",
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          component="div"
          sx={{
            fontSize: isMedium ? "18px" : "20px",
            color: !greenBg ? "black" : "white",
            paddingTop: "20px",
            fontFamily: "Poppins",
          }}
        >
          {title}
        </Typography>
        {greenBg && (
          <img
            src={img}
            alt={title}
            style={{
              width: isMedium ? "60%" : "80%",
              height: "auto",
              marginBottom: "0",
            }}
          />
        )}
        <Typography
          gutterBottom
          component="div"
          sx={{
            fontSize: isMedium ? "18px" : "20px",
            color: !greenBg ? "black" : "white",

            fontFamily: "Poppins",
          }}
        >
          {downTxt}
        </Typography>
      </CardContent>

      {checkButton()}
    </Card>
  );
}

// h1: '6rem',
// h2: '3.75rem',
// h3: '3rem',
// h4: '2.125rem',
// h5: '1.5rem',

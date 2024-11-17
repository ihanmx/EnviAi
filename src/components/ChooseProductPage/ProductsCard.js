// MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

// framer motion
import { motion } from "framer-motion";

export default function ProductsCard({
  img,
  title,
  clickEvent,
  value,
  variants,
}) {
  return (
    // Wrap the entire Card with motion.div for animation
    <motion.div variants={variants}>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea
          onClick={() => {
            clickEvent(value);
          }}
        >
          <CardMedia
            component="img"
            height="160"
            image={img}
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function productsCard({ img, title, clickEvent, value }) {
  return (
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
  );
}

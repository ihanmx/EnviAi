import { Stack } from "@mui/material";

export default function WishlistItem({ img, title }) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: "20px",
        width: "80%",
        height: "auto",
      }}
    >
      <img src={img} />

      <h2>{title}</h2>
    </Stack>
  );
}

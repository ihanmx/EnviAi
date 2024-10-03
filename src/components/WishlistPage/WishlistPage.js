import MainNav from "../Navs/MainNav";
import { Stack } from "@mui/material";
import WishlistItem from "./WishlistItem";

export default function WishlistPage() {
  return (
    // Page Container
    <Stack sx={{ alignContent: "center", justifyContent: "center" }}>
      <MainNav isDarkMode={true} />

      <WishlistItem
        img="https://example.com/images/wireless-headphones.jpg"
        title="sssssss"
      />
    </Stack>
  );
}

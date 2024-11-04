// MUI
import Stack from "@mui/material/Stack";

// components
import MainNav from "../Navs/MainNav";
import PreMadeProductsCardList from "./PreMadeProductsCardList";

// theme
import theme from "../../theme";

export default function PreMadeDesignsPage() {
  return (
    <>
      <MainNav isDarkMode={true} />
      <Stack
        style={{
          justifyContent: "center",
          alignItems: "center",
          minWidthwidth: "100vw",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <PreMadeProductsCardList />
      </Stack>
      ;
    </>
  );
}

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b5e20", // Custom color
    },
    secondary: {
      main: "#1b5e20", // If you want to override 'secondary' too
    },
    Light: {
      default: "#ffffff", // White background color
    },
  },
});

export default theme;

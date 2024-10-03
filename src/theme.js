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
    light: {
      main: "#ffffff", // White background color
    },
  },
  breakpoints: {
    values: {
      xs: 0, // default xs
      sm: 600, // custom small devices
      md: 900, // custom medium devices
      lg: 1200, // custom large devices
      xl: 1200, // custom extra large devices
      xxl: 1536, // custom ultra large devices
    },
  },
});

export default theme;

// const theme = useTheme();
// const isExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
// const isSmall = useMediaQuery(theme.breakpoints.between("sm", "md"));
// const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
// const isLarge = useMediaQuery(theme.breakpoints.between("lg", "xl"));
// const isExtraLarge = useMediaQuery(theme.breakpoints.between("xl", "xxl"));
// const isUltraLarge = useMediaQuery(theme.breakpoints.up("xxl"));

/* Extra small devices (phones, less than 576px) */
// @media (max-width: 575.98px) {
// }

// /* Small devices (phones, 576px and up) */
// @media (min-width: 576px) and (max-width: 767.98px) {
//   /* Your styles for larger phones here */
// }

// /* Medium devices (tablets, 768px and up) */
// @media (min-width: 768px) and (max-width: 991.98px) {
//   /* Your styles for tablets here */
// }

// /* Large devices (desktops, 992px and up) */
// @media (min-width: 992px) and (max-width: 1199.98px) {
//   /* Your styles for small desktops here */
// }

// /* Extra large devices (large desktops, 1200px and up) */
// @media (min-width: 1200px) and (max-width: 1399.98px) {
//   /* Your styles for large desktops here */
// }

// /* Ultra large devices (very large screens, 1400px and up) */
// @media (min-width: 1400px) {
//   /* Your styles for ultra large screens here */
// }

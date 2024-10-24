// MUI
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Mediaquery() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const isExtraLarge = useMediaQuery(theme.breakpoints.down("xl"));
  const is2ExtraLarge = useMediaQuery(theme.breakpoints.down("xxl"));
  const isUltraLarge = useMediaQuery(theme.breakpoints.up("xxl"));

  return {
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    is2ExtraLarge,
    isUltraLarge,
  };
}

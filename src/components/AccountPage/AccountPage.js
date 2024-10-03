import MainNav from "../Navs/MainNav";
import { Stack } from "@mui/material";
import ProfileCard from "./ProfileCard";
import TimeZoneCard from "./TimeZoneCard";
import AccountInfoCard from "./AccountInfoCard";
import Mediaquery from "../../Mediaquery";

export default function AccountPage() {
  const { isMedium } = Mediaquery();
  return (
    <>
      <MainNav isDarkMode={false} />
      {/* page container */}
      <Stack
        direction={isMedium ? "column" : "row"}
        spacing={2}
        sx={{
          padding: "30px",
          height: isMedium ? "auto" : "85vh",
          maxWidth: "100vw",
          justifyContent: "center",
        }}
      >
        {/* Profile and timezone container*/}
        <Stack
          direction="column"
          spacing={2}
          sx={{ height: "100vh", width: "30 vw" }}
        >
          {/* profile */}
          <ProfileCard />
          {/* timezone */}

          <TimeZoneCard />
        </Stack>
        {/* Account information section */}
        <AccountInfoCard />
      </Stack>
    </>
  );
}

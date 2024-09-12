import MainNav from "./MainNav";
import { Stack } from "@mui/material";
import ProfileCard from "./ProfileCard";
import TimeZoneCard from "./TimeZoneCard";
import AccountInfoCard from "./AccountInfoCard";
export default function AccountPage() {
  return (
    <>
      <MainNav isDarkMode={false} />
      {/* page container */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          padding: "30px",
          height: "85vh",
          maxWidth: "100vw",
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

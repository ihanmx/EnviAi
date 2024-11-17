// MUI
import Stack from "@mui/material/Stack";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
// assets
import footerLogo from "../images/card5.png";

export default function Footer() {
  const iconsStyle = { color: "white" };
  return (
    <footer style={{ backgroundColor: "#077241", padding: "20px" }}>
      <Stack spacing={2}>
        <div
          className="logoFooter"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src={footerLogo} style={{ height: "60px" }} />
        </div>
        <div
          className="socialMediaFooter"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Stack direction="row" spacing={2}>
            <LinkedInIcon style={iconsStyle} />
            <XIcon style={iconsStyle} />
            <FacebookIcon style={iconsStyle} />
            <InstagramIcon style={iconsStyle} />
            <EmailIcon style={iconsStyle} />
          </Stack>
        </div>
        <div className="navigationFooter" style={{ color: "white" }}>
          <Stack
            direction="row"
            spacing={2}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <a>© 2025 EnviAi</a>
            <a>Privacy</a>
            <a>Term of use</a>
          </Stack>
        </div>
      </Stack>
    </footer>
  );
}

import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
const region = [
  {
    value: "KSA",
    label: "Kingdom of Saudi Arabia",
  },
  {
    value: "US",
    label: "united States",
  },
];

const language = [
  {
    value: "AR",
    label: "Arabic",
  },
  {
    value: "Eng",
    label: "English",
  },
];

export default function TimeZoneCard() {
  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          border: "0.5px solid #000",
          borderRadius: "8px",
          padding: "20px",
          height: "60%",
        }}
      >
        <h2>Language & TimeZone</h2>
        <form>
          <TextField
            id="regionFeild"
            select
            label="Region"
            defaultValue="KSA"
            helperText="Please select your country"
            fullWidth
          >
            {region.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="languageFeild"
            select
            label="Language"
            defaultValue="AR"
            helperText="Please select your language"
            sx={{ display: "block" }}
            fullWidth
          >
            {language.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </Stack>
    </>
  );
}

import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { UserDataContext } from "../Contexts/UserDataContext";

const region = [
  { id: "0", value: "KSA", label: "Kingdom of Saudi Arabia" },
  {
    id: "1",
    value: "US",
    label: "united States",
  },
];

const language = [
  {
    id: "0",
    value: "AR",
    label: "Arabic",
  },
  {
    id: "1",
    value: "Eng",
    label: "English",
  },
];

export default function TimeZoneCard() {
  const { userData, setUserData } = useContext(UserDataContext);
  function handleInputsChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }
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
            value={userData.region}
            helperText="Please select your country"
            fullWidth
            name="region"
            onChange={handleInputsChange}
          >
            {region.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="languageFeild"
            select
            label="Language"
            value={userData.language}
            helperText="Please select your language"
            sx={{ display: "block" }}
            fullWidth
            name="language"
            onChange={handleInputsChange}
          >
            {language.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </Stack>
    </>
  );
}

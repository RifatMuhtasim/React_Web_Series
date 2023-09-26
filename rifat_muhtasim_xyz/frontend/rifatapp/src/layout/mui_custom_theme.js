import { createTheme } from "@mui/material";


export const Mui_custom_theme = createTheme({
  palette: {
    mode: 'light',
    background_color : "#141e30",
    background_color_dark: "#000000",
    rprimary: "rgba(49,214,230,255)",
    rprimary_hover: "rgba(49,214,230,0.60)",
    cprimary: "#171616",
    cprimary_hover: "#333131",
  },

  typography: {
    fontFamily: "'Nunito', sans-serif",
  }

})
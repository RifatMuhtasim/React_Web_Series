import { createTheme } from "@mui/material";


export const Mui_custom_theme = createTheme({
  palette: {
    mode: 'dark',
    background_color : "#141e30",
    background_color_dark: "#000000",
    rprimary: "rgba(49,214,230,255)",
    rprimary_hover: "rgba(49,214,230,0.60)",
    cprimary: "rgba(255, 255, 255,1)",
    cprimary_hover: "rgba(255, 255, 255,0.6)",
  },

  typography: {
    fontFamily: "'Ubuntu', sans-serif",
  }

})
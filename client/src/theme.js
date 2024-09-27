// src/theme.js
import { createTheme } from "@mui/material/styles";

// Create a theme instance
const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
    h1: {
      fontFamily: '"Noto Sans", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Noto Sans", sans-serif',
      fontWeight: 700,
    },
    body1: {
      fontFamily: '"Noto Sans", sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Noto Sans", sans-serif',
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: '"Noto Sans Thai", sans-serif',
    },
    subtitle2: {
      fontFamily: '"Noto Sans Thai", sans-serif',
    },
  },
  palette: {
    primary: {
      main: "#F7EED3",
    },
    secondary: {
      main: "#FFF8E8",
    },
    text: {
      primary: "#674636",
    },
  },
});

export default theme;

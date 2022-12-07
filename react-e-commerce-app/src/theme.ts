import { createTheme } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xs350: true;
    sm700: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      xs350: 350,
      sm: 600,
      sm700: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;

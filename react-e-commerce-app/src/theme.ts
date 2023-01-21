import { createTheme } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    xs350: true;
    sm: true;
    sm700: true;
    sm768: true;
    md: true;
    md1000: true;
    lg: true;
    lg1300: true;
    xl: true;
  }

  interface Theme {
    padding?: {
      pagePaddingXS?: number;
      pagePaddingLG?: number;
      pagePaddingXL?: number;
    };
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
  }

  interface ThemeOptions {
    padding?: {
      pagePaddingXS?: number;
      pagePaddingLG?: number;
      pagePaddingXL?: number;
    };
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
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
      sm768: 768,
      md: 900,
      md1000: 1000,
      lg: 1200,
      lg1300: 1300,
      xl: 1536,
    },
  },
  padding: {
    pagePaddingXS: 16,
    pagePaddingLG: 50,
    pagePaddingXL: 80,
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
});

export default theme;

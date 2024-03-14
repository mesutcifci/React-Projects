import { CSSObject, Theme } from "@mui/material";

const openedMixin = (theme: Theme): CSSObject => ({
  width: "100%",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  top: "0rem",
  bottom: "0rem",
  border: "0.0625rem solid rgba(0, 0, 0, 0.12)",
  borderLeft: "0rem",
  [theme.breakpoints.up("lg")]: {
    position: "static",
    width: "280px",
    height: "31.25rem",
  },
});

export default openedMixin;

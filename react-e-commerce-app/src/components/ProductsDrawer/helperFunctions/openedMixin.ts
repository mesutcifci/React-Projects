import { CSSObject, Theme } from "@mui/material";

const openedMixin = (theme: Theme): CSSObject => ({
  width: "100%",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  top: "0px",
  bottom: "0px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderLeft: "0px",
  [theme.breakpoints.up("lg")]: {
    position: "static",
    width: "280px",
    height: "500px",
  },
});

export default openedMixin;

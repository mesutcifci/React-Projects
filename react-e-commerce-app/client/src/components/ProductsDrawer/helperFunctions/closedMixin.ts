import { CSSObject, Theme } from "@mui/material";

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
  [theme.breakpoints.up("xs")]: {
    width: "50px",
    backgroundColor: "#FBB03B",
    height: "50px",
    left: "0.31rem",
    borderRadius: "50px",
  },
  [theme.breakpoints.up("md")]: {
    width: "280px",
    backgroundColor: "#FFFFFF",
    height: "31.25rem",
    left: "0rem",
    borderRadius: "0rem",
    position: "static",
    border: "none !important",
    "& hr": { display: "none" },
  },
  top: "70px",
});

export default closedMixin;

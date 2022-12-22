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
    left: "5px",
    borderRadius: "50px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "310px",
    backgroundColor: "#FFFFFF",
    height: "500px",
    left: "0px",
    borderRadius: "0px",
    position: "static",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderLeft: "0px",
  },
  top: "100px",
});

export default closedMixin;

import { styled, Drawer as MuiDrawer } from "@mui/material";
import openedMixin from "../helperFunctions/openedMixin";
import closedMixin from "../helperFunctions/closedMixin";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default Drawer;

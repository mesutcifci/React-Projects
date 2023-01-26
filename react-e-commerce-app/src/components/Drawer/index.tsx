// Styles
import { Drawer as MuiDrawer } from "@mui/material";
import { styled } from "@mui/material/styles";

// Helpers
import openedMixin from "../ProductsDrawer/helperFunctions/openedMixin";
import closedMixin from "../ProductsDrawer/helperFunctions/closedMixin";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  [theme.breakpoints.up("md")]: {
    "& .MuiDrawer-paperAnchorDockedLeft": {
      overflowY: "auto !important",
    },
  },
  ...(open && {
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default Drawer;

import { SxProps, Theme } from "@mui/material";
import theme from "../theme";

export const sharableInputLabelStyles: SxProps<Theme> = {
  "& .MuiFormLabel-root:not(.Mui-focused, .MuiInputLabel-shrink)": {
    color: "#808080",
    fontSize: "0.81rem",
    fontWeight: theme.fontWeight.regular,
    top: "0.31rem",
  },
};

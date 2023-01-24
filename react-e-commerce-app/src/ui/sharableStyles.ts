import { SxProps, Theme } from "@mui/material";
import theme from "../theme";

export const sharableInputLabelStyles: SxProps<Theme> = {
  "& .MuiFormLabel-root:not(.Mui-focused, .MuiInputLabel-shrink)": {
    color: "#808080",
    fontSize: "13px",
    fontWeight: theme.fontWeight.regular,
    top: "5px",
  },
};

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { IAccordionProps } from "../../types/accordion";
import ColorPalette from "../ColorPalette";
import theme from "../../theme";

const colors = [
  "#000000",
  "#6F3E18",
  "#D4BE8D",
  "#838383",
  "#FFFFFF",
  "#0F73AD",
];

const ColorAccordion = ({ accordionStyles }: IAccordionProps) => {
  return (
    <Accordion sx={{ ...accordionStyles }} disableGutters>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography
          sx={{ fontSize: "12px", fontWeight: theme.fontWeight.semiBold }}
        >
          COLOR
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ColorPalette colors={colors} />
      </AccordionDetails>
    </Accordion>
  );
};

export default ColorAccordion;

// Styles
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import theme from "../../theme";

// Data
import { IAccordionProps } from "../../types/accordion";

// Components
import ColorPalette from "../ColorPalette";

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

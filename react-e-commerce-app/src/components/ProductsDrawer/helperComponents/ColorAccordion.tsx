import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { IAccordionProps } from "../../../types/accordion";

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
        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
          COLOR
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {colors.map((color, index) => (
          <Box
            key={color}
            sx={{
              border: "1px solid #D4D4D4",
              borderRight: `${index + 1 !== colors.length && "0px"}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "42px",
              width: "42px",
            }}
          >
            <Box
              sx={{
                width: "25px",
                height: "25px",
                backgroundColor: color,
                border: `${color === "#FFFFFF" && "1px solid #E6E6E6"}`,
              }}
            ></Box>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default ColorAccordion;

// Styles
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import theme from "../../theme";

// Data
import { IAccordionProps } from "../../types/accordion";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const SizeAccordion = ({ accordionStyles }: IAccordionProps) => {
  return (
    <Accordion sx={{ ...accordionStyles }} disableGutters>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography
          sx={{ fontSize: "0.75rem", fontWeight: theme.fontWeight.semiBold }}
        >
          SIZE
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {sizes.map((size, index) => (
          <Box
            key={size}
            sx={{
              border: "0.0625rem solid #D4D4D4",
              borderRight: `${index + 1 !== sizes.length && "0rem"}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "42px",
              width: "42px",
            }}
          >
            <Typography
              sx={{ fontSize: "0.81rem", fontWeight: theme.fontWeight.regular }}
            >
              {size}
            </Typography>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default SizeAccordion;

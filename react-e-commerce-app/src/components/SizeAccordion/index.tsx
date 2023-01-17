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
          sx={{ fontSize: "12px", fontWeight: theme.fontWeight.semiBold }}
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
              border: "1px solid #D4D4D4",
              borderRight: `${index + 1 !== sizes.length && "0px"}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "42px",
              width: "42px",
            }}
          >
            <Typography
              sx={{ fontSize: "13px", fontWeight: theme.fontWeight.regular }}
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

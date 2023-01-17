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

const CollectionAccordion = ({ accordionStyles }: IAccordionProps) => {
  return (
    <Accordion sx={{ ...accordionStyles }} disableGutters>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography
          sx={{ fontSize: "12px", fontWeight: theme.fontWeight.semiBold }}
        >
          COLLECTION
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {[0, 1, 2].map((index) => (
          <Typography
            key={index}
            sx={{
              cursor: "pointer",
              "&:hover": { color: "#FBB03B" },
              fontSize: "14px",
              fontWeight: theme.fontWeight.regular,
              paddingLeft: "14px",
            }}
          >{`Collection - ${index + 1}`}</Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default CollectionAccordion;

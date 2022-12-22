import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

const CollectionAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
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
              fontSize: "16px",
              paddingLeft: "14px",
            }}
          >{`Collection - ${index + 1}`}</Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default CollectionAccordion;

import { useState } from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import theme from "../../theme";

import { IAccordionProps } from "../../types/accordion";

const minDistance = 100;

const PriceAccordion = ({ accordionStyles }: IAccordionProps) => {
  const [sliderValue, setSliderValue] = useState<number[]>([0, 500]);
  const handleChangeSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setSliderValue([
        Math.min(newValue[0], sliderValue[1] - minDistance),
        sliderValue[1],
      ]);
    } else {
      setSliderValue([
        sliderValue[0],
        Math.max(newValue[1], sliderValue[0] + minDistance),
      ]);
    }
  };
  return (
    <Accordion sx={{ ...accordionStyles }} disableGutters>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography
          sx={{ fontSize: "12px", fontWeight: theme.fontWeight.semiBold }}
        >
          PRICE
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Stack alignItems="center">
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "251px" }}
          >
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: theme.fontWeight.regular,
                width: "67px",
                height: "24px",
                background: "#F4F4F4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {`${sliderValue[0]} USD`}
            </Typography>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: theme.fontWeight.regular,
                width: "67px",
                height: "24px",
                background: "#F4F4F4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {`${sliderValue[1]} USD`}
            </Typography>
          </Stack>
          <Slider
            value={sliderValue}
            onChange={handleChangeSlider}
            valueLabelDisplay="off"
            disableSwap
            sx={{
              width: "211px",
              color: "#000000",
              "& .MuiSlider-thumb": { background: "#ffffff" },
            }}
            max={500}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default PriceAccordion;

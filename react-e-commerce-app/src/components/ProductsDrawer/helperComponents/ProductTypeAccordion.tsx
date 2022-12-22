import { useEffect } from "react";
import useGetMappedCategories from "../../../hooks/useGetMappedCategories";
import useGetSearchParameters from "../../../hooks/useGetSearchParameters";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import { Category, ExpandMore } from "@mui/icons-material";
import { ITertiaryCategory } from "../../../types/categories";

const ProductTypeAccordion = () => {
  const { mapCategoriesWithSearchParameters, mappedCategories } =
    useGetMappedCategories();
  const { parameters } = useGetSearchParameters();

  useEffect(() => {
    mapCategoriesWithSearchParameters(parameters);
  }, [parameters]);

  const renderTertiaryCategories = (
    tertiaryCategories: ITertiaryCategory[]
  ) => {
    return tertiaryCategories.map((category) => (
      <Stack direction="row" alignItems="center" key={category.name}>
        <Checkbox sx={{ height: "30px", width: "30px" }} />

        <Typography
          sx={{
            cursor: "pointer",
            "&:hover": { color: "#FBB03B" },
            fontSize: "14px",
          }}
        >
          {category.name}
        </Typography>
        <Typography
          sx={{
            cursor: "pointer",
            fontSize: "14px",
            color: "#C4C4C4",
          }}
        >
          (16)
        </Typography>
      </Stack>
    ));
  };

  return (
    <Accordion sx={{ padding: "0" }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
          PRODUCT TYPE
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0" }}>
        {mappedCategories.secondaryCategories.map((secondaryCategory) => (
          <Accordion
            key={secondaryCategory.name}
            disableGutters
            sx={{ boxShadow: "none", paddingLeft: "20px" }}
          >
            <Stack direction="row" alignItems="center">
              <Checkbox sx={{ height: "30px", width: "30px" }} />

              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  boxShadow: "none",
                  paddingLeft: "5px",
                  height: "30px",
                  width: "calc(100% - 30px)",
                }}
              >
                <Typography>{secondaryCategory.name}</Typography>
              </AccordionSummary>
            </Stack>
            <AccordionDetails sx={{ paddingLeft: "31px", paddingRight: "0px" }}>
              {renderTertiaryCategories(secondaryCategory.tertiaryCategories)}
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductTypeAccordion;

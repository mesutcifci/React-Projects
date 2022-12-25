import { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import {
  ISecondaryCategory,
  ITertiaryCategory,
} from "../../../types/categories";
import { IAccordionProps } from "../../../types/accordion";
import { useGetMappedCategories, useSearchParameters } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const ProductTypeAccordion = ({ accordionStyles }: IAccordionProps) => {
  const { mapCategoriesWithSearchParameters, mappedCategories } =
    useGetMappedCategories();
  const { modifiedParameters } = useSearchParameters();
  const navigate = useNavigate();

  useEffect(() => {
    mapCategoriesWithSearchParameters(modifiedParameters);
  }, [modifiedParameters]);

  const renderTertiaryCategories = (
    tertiaryCategories: ITertiaryCategory[],
    secondaryCategoryId: string
  ) => {
    return tertiaryCategories.map((category) => (
      <Stack direction="row" alignItems="center" key={category.name}>
        <Checkbox
          sx={{ height: "30px", width: "30px" }}
          checked={category.isSelected}
        />

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

  const handleClickCategoryCheckbox = ({
    id: secondaryCategoryId,
    tertiaryCategories,
    isSelected,
  }: ISecondaryCategory) => {
    const { primary, secondary } = modifiedParameters;
    let parameterString = "?secondary=";

    secondary.forEach((item, index) => {
      parameterString = `${parameterString}${item}`;
      if (index + 1 < secondary.length) {
        parameterString += ",";
      }
    });

    parameterString += "," + secondaryCategoryId;

    parameterString += "&tertiary=";

    tertiaryCategories.forEach((tertiaryCategory, index) => {
      parameterString += tertiaryCategory.id + ":" + secondaryCategoryId;
      if (index + 1 < tertiaryCategories.length) {
        parameterString += ",";
      }
    });

    navigate({ pathname: "/" + primary, search: parameterString });
  };

  return (
    <Accordion
      sx={{ padding: "0", ...accordionStyles }}
      disableGutters
      defaultExpanded={true}
    >
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
            sx={{
              boxShadow: "none",
              paddingLeft: "20px",
              "&.MuiAccordion-root::before": { opacity: "1 !important" },
            }}
          >
            <Stack direction="row" alignItems="center">
              <Checkbox
                sx={{ height: "30px", width: "30px" }}
                checked={secondaryCategory.isSelected}
                onClick={() => handleClickCategoryCheckbox(secondaryCategory)}
              />

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
              {renderTertiaryCategories(
                secondaryCategory.tertiaryCategories,
                secondaryCategory.id
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductTypeAccordion;

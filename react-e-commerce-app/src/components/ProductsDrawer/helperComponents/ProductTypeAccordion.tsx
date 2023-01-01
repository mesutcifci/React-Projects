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
import {
  useFetchProducts,
  useGetMappedCategories,
  useSearchParameters,
} from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { IParameter } from "../../../types/parameters";

const ProductTypeAccordion = ({ accordionStyles }: IAccordionProps) => {
  const { mapCategoriesWithSearchParameters, mappedCategories } =
    useGetMappedCategories();
  const { getProductsFromFirebase } = useFetchProducts();
  const { modifiedParameters } = useSearchParameters();
  const navigate = useNavigate();

  useEffect(() => {
    mapCategoriesWithSearchParameters(modifiedParameters);
  }, [modifiedParameters]);

  useEffect(() => {
    getProductsFromFirebase(modifiedParameters);
  }, [modifiedParameters]);

  const removeUnselectedCategories = (
    { primary, secondary, tertiary }: IParameter,
    categoryId: string,
    isSecondaryCategoryPreviouslySelected: boolean
  ) => {
    // if secondary category already selected, it's mean user unselected the checkbox
    // in this case we should remove this secondary category and its tertiary categories from url
    if (isSecondaryCategoryPreviouslySelected) {
      secondary = secondary.filter((item) => item !== categoryId);
      tertiary = tertiary.filter((item) => !item[categoryId]);
    }

    return { primary, secondary, tertiary };
  };

  const createParameterStringWithSecondaryCategories = (
    secondary: string[],
    isSecondaryCategoryPreviouslySelected: boolean,
    secondaryCategoryId: string
  ) => {
    // if there is not length of secondary array and user unchecked a checkbox
    // it is mean the user unchecked the last selected secondary category
    // in this case we should remove all secondary and tertiary categories from url
    if (!secondary.length && isSecondaryCategoryPreviouslySelected) {
      return "";
    }

    let searchParameterString = "?secondary=";
    secondary.forEach((item, index) => {
      searchParameterString = `${searchParameterString}${item}`;
      // Do not add comma after last item
      if (index + 1 < secondary.length) {
        searchParameterString += ",";
      }
    });

    // if the user selected a secondary category and secondary categories are all unselected before
    // we should not add comma because it will visible like that ?secondary=,clo
    if (!isSecondaryCategoryPreviouslySelected && !secondary.length) {
      searchParameterString += secondaryCategoryId;
    } else if (!isSecondaryCategoryPreviouslySelected && secondary.length) {
      searchParameterString += "," + secondaryCategoryId;
    }

    return searchParameterString;
  };

  const handleClickSecondaryCategoryCheckbox = ({
    id: secondaryCategoryId,
    tertiaryCategories,
    isSelected: isSecondaryCategoryPreviouslySelected,
  }: ISecondaryCategory) => {
    let { primary, secondary, tertiary } = removeUnselectedCategories(
      { ...modifiedParameters },
      secondaryCategoryId,
      isSecondaryCategoryPreviouslySelected
    );
    let searchParameterString: string;

    searchParameterString = createParameterStringWithSecondaryCategories(
      secondary,
      isSecondaryCategoryPreviouslySelected,
      secondaryCategoryId
    );

    if (searchParameterString.length > 0) {
      searchParameterString += "&tertiary=";

      // if length of parameter string bigger than zero it's mean there are selected secondary category/ies
      // so we should keep these
      tertiary.forEach((item, index) => {
        // ["clo", "jy"]
        const [key, value] = Object.entries(item).flat();
        searchParameterString += value + ":" + key;
        if (index + 1 < tertiary.length) {
          searchParameterString += ",";
        }
      });

      // if user select a secondary category we should select all of its tertiary categories
      if (!isSecondaryCategoryPreviouslySelected) {
        searchParameterString += ",";

        tertiaryCategories.forEach((tertiaryCategory, index) => {
          searchParameterString +=
            tertiaryCategory.id + ":" + secondaryCategoryId;
          if (index + 1 < tertiaryCategories.length) {
            searchParameterString += ",";
          }
        });
      }
    }

    navigate({ pathname: `/${primary}`, search: searchParameterString });
  };

  const handleClickTertiaryCategory = (
    { id: secondaryCategoryId }: ISecondaryCategory,
    {
      id: tertiaryCategoryId,
      isSelected: isTertiaryCategoryPreviouslySelected,
    }: ITertiaryCategory
  ) => {
    let { primary, secondary, tertiary } = { ...modifiedParameters };
    let searchParameterString = "";

    // if there are only one selected category and the user unselected it then search parameters should be empty
    if (
      secondary.length === 1 &&
      tertiary.length === 1 &&
      isTertiaryCategoryPreviouslySelected
    ) {
      navigate({ pathname: `/${primary}`, search: searchParameterString });
      return;
    }

    // if there aren't any selected secondary category and the user selected a tertiary category
    // should parent secondary category of selected tertiary category also selected
    if (!secondary.length && !isTertiaryCategoryPreviouslySelected) {
      searchParameterString += `?secondary=${secondaryCategoryId}&tertiary=${tertiaryCategoryId}:${secondaryCategoryId}`;
      navigate({ pathname: `/${primary}`, search: searchParameterString });
      return;
    }

    // remove unselected tertiary category
    if (isTertiaryCategoryPreviouslySelected) {
      tertiary = tertiary = tertiary.filter(
        (item) => item[secondaryCategoryId] !== tertiaryCategoryId
      );
    }

    searchParameterString += `?secondary=`;

    secondary.forEach((item, index) => {
      searchParameterString = `${searchParameterString}${item}`;
      // Do not add comma after last item
      if (index + 1 < secondary.length) {
        searchParameterString += ",";
      }
    });

    if (!secondary.length) {
      searchParameterString += secondaryCategoryId;
    } else {
      searchParameterString += "," + secondaryCategoryId;
    }

    searchParameterString += "&tertiary=";
    tertiary.forEach((item, index) => {
      // ["clo", "jy"]
      const [key, value] = Object.entries(item).flat();
      searchParameterString += value + ":" + key;
      if (index + 1 < tertiary.length) {
        searchParameterString += ",";
      }
    });

    if (
      searchParameterString.length > 0 &&
      !isTertiaryCategoryPreviouslySelected
    ) {
      searchParameterString += `,${tertiaryCategoryId}:${secondaryCategoryId}`;
    } else if (!isTertiaryCategoryPreviouslySelected) {
      searchParameterString += `${tertiaryCategoryId}:${secondaryCategoryId}`;
    }
    navigate({ pathname: `/${primary}`, search: searchParameterString });
  };

  const renderTertiaryCategories = (secondaryCategory: ISecondaryCategory) => {
    const { tertiaryCategories } = secondaryCategory;
    return tertiaryCategories.map((category) => (
      <Stack direction="row" alignItems="center" key={category.name}>
        <Checkbox
          sx={{ height: "30px", width: "30px" }}
          checked={category.isSelected}
          onClick={() =>
            handleClickTertiaryCategory(secondaryCategory, category)
          }
        />

        <Typography
          sx={{
            cursor: "pointer",
            "&:hover": { color: "#FBB03B" },
            fontSize: "14px",
          }}
          onClick={() =>
            handleClickTertiaryCategory(secondaryCategory, category)
          }
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
                onClick={() =>
                  handleClickSecondaryCategoryCheckbox({ ...secondaryCategory })
                }
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
              {renderTertiaryCategories(secondaryCategory)}
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductTypeAccordion;

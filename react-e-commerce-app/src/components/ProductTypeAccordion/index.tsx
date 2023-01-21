import { useEffect } from "react";

// Styles
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import theme from "../../theme";

// Data
import { IAccordionProps } from "../../types/accordion";
import { ISecondaryCategory, ITertiaryCategory } from "../../types/categories";
import { IParameter, ITertiaryParameter } from "../../types/parameters";

// Hooks
import { useNavigate } from "react-router-dom";
import { useGetMappedCategories } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ProductTypeAccordion = ({ accordionStyles }: IAccordionProps) => {
  const { categorySearchParameters } = useSelector((state: RootState) => state);
  const { mapCategoriesWithSearchParameters, mappedCategories } =
    useGetMappedCategories();
  const navigate = useNavigate();

  useEffect(() => {
    mapCategoriesWithSearchParameters(categorySearchParameters);
  }, [categorySearchParameters]);

  const addCategoriesToParameterString = (
    searchParameterString: string,
    objectType: string,
    categoryObject: string[] | ITertiaryParameter[] | ITertiaryCategory[],
    secondaryCategoryId?: string
  ) => {
    switch (objectType) {
      case "secondary":
        categoryObject.forEach((item, index) => {
          searchParameterString = `${searchParameterString}${item}`;
          // Do not add comma after last item
          if (index + 1 < categoryObject.length) {
            searchParameterString += ",";
          }
        });
        return searchParameterString;
      case "tertiary":
        categoryObject.forEach((item, index) => {
          // ["clo", "jy"]
          const [key, value] = Object.entries(item).flat();
          searchParameterString += value + ":" + key;
          if (index + 1 < categoryObject.length) {
            searchParameterString += ",";
          }
        });
        return searchParameterString;
      case "tertiaryCategory":
        categoryObject.forEach((item, index) => {
          item = item as ITertiaryCategory;
          searchParameterString += item.id + ":" + secondaryCategoryId;
          if (index + 1 < categoryObject.length) {
            searchParameterString += ",";
          }
        });
        return searchParameterString;
      default:
        return searchParameterString;
    }
  };

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

  const configureParameterStringBySecondaryCategories = (
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
    searchParameterString = addCategoriesToParameterString(
      searchParameterString,
      "secondary",
      secondary
    );

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
      { ...categorySearchParameters },
      secondaryCategoryId,
      isSecondaryCategoryPreviouslySelected
    );
    let searchParameterString: string;

    searchParameterString = configureParameterStringBySecondaryCategories(
      secondary,
      isSecondaryCategoryPreviouslySelected,
      secondaryCategoryId
    );

    // if length of parameter string bigger than zero it's mean there are selected secondary category/ies
    // so we should keep these
    if (searchParameterString.length > 0) {
      searchParameterString += "&tertiary=";

      searchParameterString = addCategoriesToParameterString(
        searchParameterString,
        "tertiary",
        tertiary
      );

      // if user select a secondary category we should select all of its tertiary categories
      if (!isSecondaryCategoryPreviouslySelected) {
        // add comma only if there are previously selected tertiary categories
        if (tertiary.length) {
          searchParameterString += ",";
        }

        searchParameterString = addCategoriesToParameterString(
          searchParameterString,
          "tertiaryCategory",
          tertiaryCategories,
          secondaryCategoryId
        );
      }
    }

    navigate({ pathname: `/${primary}`, search: searchParameterString });
  };

  const handleClickTertiaryCategory = (
    {
      id: secondaryCategoryId,
      isSelected: isSecondaryCategoryPreviouslySelected,
    }: ISecondaryCategory,
    {
      id: tertiaryCategoryId,
      isSelected: isTertiaryCategoryPreviouslySelected,
    }: ITertiaryCategory
  ) => {
    let { primary, secondary, tertiary } = { ...categorySearchParameters };
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

    // if the secondary category didn't selected and the user selected a tertiary category
    //  parent secondary category of selected tertiary category must also be selected
    if (
      !isSecondaryCategoryPreviouslySelected &&
      !isTertiaryCategoryPreviouslySelected
    ) {
      searchParameterString = "?secondary=";
      searchParameterString = addCategoriesToParameterString(
        searchParameterString,
        "secondary",
        secondary
      );

      if (secondary.length) {
        searchParameterString += ",";
      }

      searchParameterString += secondaryCategoryId;

      searchParameterString += "&tertiary=";

      searchParameterString = addCategoriesToParameterString(
        searchParameterString,
        "tertiary",
        tertiary
      );

      if (tertiary.length) {
        searchParameterString += ",";
      }

      searchParameterString =
        searchParameterString += `${tertiaryCategoryId}:${secondaryCategoryId}`;
      navigate({ pathname: `/${primary}`, search: searchParameterString });
      return;
    }

    // remove unselected tertiary category
    if (isTertiaryCategoryPreviouslySelected) {
      tertiary = tertiary.filter(
        (item) => item[secondaryCategoryId] !== tertiaryCategoryId
      );
    }

    searchParameterString += `?secondary=`;

    searchParameterString = addCategoriesToParameterString(
      searchParameterString,
      "secondary",
      secondary
    );

    searchParameterString += "&tertiary=";

    searchParameterString = addCategoriesToParameterString(
      searchParameterString,
      "tertiary",
      tertiary
    );

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
            fontWeight: theme.fontWeight.regular,
          }}
          onClick={() =>
            handleClickTertiaryCategory(secondaryCategory, category)
          }
        >
          {category.name}
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
        <Typography
          sx={{ fontSize: "12px", fontWeight: theme.fontWeight.semiBold }}
        >
          PRODUCT TYPE
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0" }}>
        {mappedCategories?.secondaryCategories.map((secondaryCategory) => (
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
                  handleClickSecondaryCategoryCheckbox({
                    ...secondaryCategory,
                  })
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
                <Typography
                  fontSize="12px"
                  fontWeight={theme.fontWeight.semiBold}
                >
                  {secondaryCategory.name}
                </Typography>
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

import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavbarMobileMenu from "../index";
import categories from "../../../constants/categories.json";

const primaryCategoryNames = categories.map((category) => category.name);
const findElementsGetByText = (data: string[]) => {
  data.forEach((item) => {
    expect(screen.getByText(item)).toBeInTheDocument();
  });
};

describe("NavbarMobile", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavbarMobileMenu isDrawerOpened={true} setIsDrawerOpened={() => {}} />
      </BrowserRouter>
    );
  });

  test("Should render primary categories on first render", () => {
    findElementsGetByText(primaryCategoryNames);
  });

  test("Should render correct secondary categories and tertiary categories after click primary and secondary categories", () => {
    primaryCategoryNames.forEach((primaryCategoryName) => {
      // find current primary category
      const filteredPrimaryCategory = categories.find(
        (category) => category.name === primaryCategoryName
      );

      // get name of secondary categories of current primary category
      let secondaryCategoryNames =
        filteredPrimaryCategory?.secondaryCategories.map(
          (category) => category.name
        );

      // get primaryCategoryElement with current primaryCategoryName
      const primaryCategoryElement = screen.getByText(primaryCategoryName);

      // open second level of drawer a.k.a secondary categories screen
      fireEvent.click(primaryCategoryElement);
      findElementsGetByText(secondaryCategoryNames!);

      const arrowBackElement = screen.getByTestId("ArrowBackIcon");

      // test tertiary categories
      secondaryCategoryNames?.forEach((secondaryCategoryName) => {
        // find current secondary category
        const filteredSecondaryCategory =
          filteredPrimaryCategory?.secondaryCategories.find(
            (category) => category.name === secondaryCategoryName
          );

        // get display name of tertiary categories of current secondary category
        const tertiaryCategoryNames =
          filteredSecondaryCategory?.tertiaryCategories.map(
            (category) => category.name
          );

        // get secondaryCategoryElement with current secondaryCategoryName
        const secondaryCategoryElement = screen.getByText(
          secondaryCategoryName
        );

        // open the third level of drawer a.k.a tertiary categories screen
        fireEvent.click(secondaryCategoryElement);

        findElementsGetByText(tertiaryCategoryNames!);

        // Need to open secondary categories again to can click other secondary categories
        // Also we check is arrowBackElement if is in document and if is works
        fireEvent.click(arrowBackElement);
      });

      // Need to open primary categories again to can click other primary categories
      // Also we check is arrowBackElement if is in document and if is works
      fireEvent.click(arrowBackElement);
    });
  });
});

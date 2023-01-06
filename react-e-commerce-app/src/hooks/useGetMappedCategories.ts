import { useState } from "react";
import categories from "../constants/categories.json";
import { IParameter } from "../types/parameters";
import { ICategory } from "../types/categories";

const useGetMappedCategories = () => {
  const [mappedCategories, setMappedCategories] = useState<ICategory>({
    ...categories[0],
  });

  const mapCategoriesWithSearchParameters = (parameters: IParameter) => {
    const { primary, secondary, tertiary } = parameters;

    if (!primary.length) {
      return { mappedCategories, mapCategoriesWithSearchParameters };
    }

    const filteredCategory = categories.filter(
      (category) => category.id.toLowerCase() === primary.toLowerCase()
    )[0];

    if (filteredCategory?.id === primary) {
      filteredCategory.isSelected = true;

      filteredCategory.secondaryCategories.forEach((secondaryCategory) => {
        const isSecondaryCategorySelected = secondary.includes(
          secondaryCategory.id
        );

        if (isSecondaryCategorySelected) {
          secondaryCategory.isSelected = true;

          secondaryCategory.tertiaryCategories.forEach((tertiaryCategory) => {
            //  tertiary [{sho: "ls"}, ...]
            //  sho is the id of parent secondary category of the tertiary category, ls is the id of tertiary category
            //  if secondaryCategory.id === "sho" it returns "ls" otherwise undefined
            const isTertiaryCategorySelected = tertiary.find(
              (item) => item[secondaryCategory.id] === tertiaryCategory.id
            );

            if (isTertiaryCategorySelected) {
              tertiaryCategory.isSelected = true;
            } else {
              tertiaryCategory.isSelected = false;
            }
          });
        } else {
          secondaryCategory.isSelected = false;
          secondaryCategory.tertiaryCategories.forEach(
            (tertiaryCategory) => (tertiaryCategory.isSelected = false)
          );
        }
      });
    }

    setMappedCategories(JSON.parse(JSON.stringify(filteredCategory)));
  };

  return { mappedCategories, mapCategoriesWithSearchParameters };
};

export default useGetMappedCategories;

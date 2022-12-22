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

    const filteredCategory = categories.find(
      (category) => category.id === primary
    );

    if (filteredCategory) {
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
            }
          });
        }
      });
      setMappedCategories(filteredCategory);
    }
  };

  return { mappedCategories, mapCategoriesWithSearchParameters };
};

export default useGetMappedCategories;

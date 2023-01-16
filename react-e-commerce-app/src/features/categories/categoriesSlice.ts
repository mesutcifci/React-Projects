import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

import categories from "../../constants/categories.json";
import { ICategory } from "../../types/categories";
import { IParameter } from "../../types/parameters";

interface ICategoriesState {
  value: ICategory;
}

const initialState: ICategoriesState = {
  value: JSON.parse(JSON.stringify(categories[0])),
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateSelectedCategories: (state, action: PayloadAction<IParameter>) => {
      const { primary, secondary, tertiary } = action.payload;

      let filteredCategory = categories.filter(
        (category) => category.id.toLowerCase() === primary.toLowerCase()
      )[0];

      filteredCategory = JSON.parse(JSON.stringify({ ...filteredCategory }));

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

      if (filteredCategory) {
        state.value = filteredCategory;
      }
    },
  },
});

export const { updateSelectedCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;

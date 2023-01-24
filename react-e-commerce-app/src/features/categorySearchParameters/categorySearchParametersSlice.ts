import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IParameter } from "../../types/parameters";

const initialState: IParameter = {
  primary: "",
  secondary: [],
  tertiary: [],
};

const categorySearchParametersSlice = createSlice({
  name: "categorySearchParametersSlice",
  initialState,
  reducers: {
    setCategorySearchParameters(state, action: PayloadAction<IParameter>) {
      const { primary, secondary, tertiary } = action.payload;

      state.primary = primary;
      state.secondary = secondary;
      state.tertiary = tertiary;
    },
  },
});

export default categorySearchParametersSlice.reducer;
export const { setCategorySearchParameters } =
  categorySearchParametersSlice.actions;

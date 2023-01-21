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
    setCategorySearchParameters(
      state,
      action: PayloadAction<{ searchParams: URLSearchParams; pathname: string }>
    ) {
      const primary = action.payload.pathname.substring(1);
      let secondary = action.payload.searchParams.get("secondary")?.split(",");
      const tertiary = action.payload.searchParams
        .get("tertiary")
        ?.split(",")
        .map((item) => {
          // ["ls", "sho"];
          const [tertiaryCategoryId, secondaryCategoryId] = item.split(":");
          return { [secondaryCategoryId]: tertiaryCategoryId };
        });
      state.primary = primary;
      state.secondary = secondary || [];
      state.tertiary = tertiary || [];
    },
  },
});

export default categorySearchParametersSlice.reducer;
export const { setCategorySearchParameters } =
  categorySearchParametersSlice.actions;

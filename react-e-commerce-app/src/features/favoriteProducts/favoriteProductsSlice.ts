import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product";

interface IinitialState {
  favoriteProducts: IProduct[] | null;
}

const initialState: IinitialState = {
  favoriteProducts: null,
};

export const favoriteProductsSlice = createSlice({
  name: "favoriteProductsSlice",
  initialState,
  reducers: {},
});

export default favoriteProductsSlice.reducer;
export const {} = favoriteProductsSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product";
import { products } from "../../constants/products";

interface IState {
  products: IProduct[];
}

const initialState: IState = { products: [...products] };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product";
import { products } from "../../constants/products";

interface IState {
  products: IProduct[];
  selectedProducts: IProduct[];
}

const initialState: IState = { products: [...products], selectedProducts: [] };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // setSelectedProduct
  },
});

export default productsSlice.reducer;

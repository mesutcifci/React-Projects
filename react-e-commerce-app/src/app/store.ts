import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import cartProductsReducer from "../features/cartProducts/cartProductsSlice";
import productsReducer from "../features/products/productsSlice";
import productReducer from "../features/product/productSlice";
import categorySearchParametersReducer from "../features/categorySearchParameters/categorySearchParametersSlice";

import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    currentUser: currentUserReducer,
    cartProducts: cartProductsReducer,
    products: productsReducer,
    product: productReducer,
    categorySearchParameters: categorySearchParametersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export

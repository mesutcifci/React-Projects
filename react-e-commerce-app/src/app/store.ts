import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import productsReducer from "../features/products/productsSlice";
import productReducer from "../features/product/productSlice";
import categorySearchParametersReducer from "../features/categorySearchParameters/categorySearchParametersSlice";

import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  user: userReducer,
  currentUser: currentUserReducer,
  products: productsReducer,
  product: productReducer,
  categorySearchParameters: categorySearchParametersReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch; // Export

import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { RootState } from "../app/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

// As a basic setup, import your same slice reducers
import userReducer from "../features/user/userSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import cartProductsReducer from "../features/cartProducts/cartProductsSlice";
import productsReducer from "../features/products/productsSlice";
import productReducer from "../features/product/productSlice";
import categorySearchParametersReducer from "../features/categorySearchParameters/categorySearchParametersSlice";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  store?: ToolkitStore<RootState, AnyAction>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        user: userReducer,
        cartProducts: cartProductsReducer,
        currentUser: currentUserReducer,
        products: productsReducer,
        product: productReducer,
        categorySearchParameters: categorySearchParametersReducer,
      },
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

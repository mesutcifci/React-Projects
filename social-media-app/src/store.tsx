import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { usersApi } from "./services/api";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
});

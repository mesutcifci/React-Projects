import { configureStore, createSlice } from "@reduxjs/toolkit";
import { usersApi } from "./services/api";

const modalInitialState = { isVisible: false };

const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitialState,
  reducers: {
    showModal(state) {
      state.isVisible = true;
    },
    hideModal(state) {
      state.isVisible = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    modal: modalSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
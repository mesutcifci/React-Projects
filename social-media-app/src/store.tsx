import { configureStore, createSlice } from "@reduxjs/toolkit";
import { usersApi } from "./services/api";

// Initial state
const modalInitialState = { isVisible: false };
const usersInitialState = { users: [] };

// Slice
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

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },

});

// Action
export const modalActions = modalSlice.actions;
export const usersActions = usersSlice.actions;

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    modal: modalSlice.reducer,
    usersSlice: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
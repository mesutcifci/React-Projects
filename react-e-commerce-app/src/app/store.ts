import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";

import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    currentUser: currentUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export

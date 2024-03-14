import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUser } from "../../types/auth";

interface ICurrentUserState {
  currentUser: ICurrentUser | null;
  loading: boolean;
}

const initialState: ICurrentUserState = {
  currentUser: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, actions: PayloadAction<ICurrentUser | null>) {
      state.currentUser = actions.payload;
    },
    setCurrentUserLoading(state, actions: PayloadAction<boolean>) {
      state.loading = actions.payload;
    },
  },
});

export default authSlice.reducer;
export const { setCurrentUser, setCurrentUserLoading } = authSlice.actions;

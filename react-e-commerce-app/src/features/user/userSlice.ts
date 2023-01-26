import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";

type IUserState = {
  user: IUser | null;
  loading: boolean;
};

const initialState: IUserState = {
  user: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoading(state, actions: PayloadAction<boolean>) {
      state.loading = actions.payload;
    },
    setUser(state, actions: PayloadAction<IUser | null>) {
      state.user = actions.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setUserLoading } = userSlice.actions;

import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, IUserProduct } from "../../types/user";
import {
  arrayUnion,
  doc,
  getDocFromServer,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { checkIfProductExist } from "./helpers";

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
    setUser(state, actions: PayloadAction<IUser>) {
      state.user = actions.payload;
    },
    setUserProduct(state, actions: PayloadAction<IUserProduct[]>) {
      if (state.user) {
        state.user.productsForUser = actions.payload;
      }
    },
  },
});

export const addUserProduct = createAsyncThunk(
  "user/addUserProduct",
  async (
    {
      productId,
      amount,
      userId,
    }: { productId: string; amount: number; userId: string },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setUserLoading(true));
    const userRef = doc(db, "users", userId);
    let docData = await getDocFromServer(userRef);

    if (docData.exists()) {
      const { productsInCart } = docData.data() as IUser;
      const isProductExist = checkIfProductExist(productId, productsInCart);

      if (isProductExist) {
        productsInCart.forEach((product) => {
          if (product.id === productId) {
            product.amount = amount;
          }
        });
        await updateDoc(userRef, { productsInCart });
      } else {
        await updateDoc(userRef, {
          productsInCart: arrayUnion({ id: productId, amount }),
        });
      }

      docData = await getDocFromServer(userRef);
      if (docData.exists()) {
        const userData = docData.data() as IUser;
        const userProduct = userData.productsForUser;
        thunkAPI.dispatch(setUserProduct(userProduct));
      }
    }
    thunkAPI.dispatch(setUserLoading(false));
  }
);

export default userSlice.reducer;
export const { setUser, setUserLoading, setUserProduct } = userSlice.actions;

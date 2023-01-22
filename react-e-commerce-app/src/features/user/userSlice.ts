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
    setUserProductsInCart(state, actions: PayloadAction<IUserProduct[]>) {
      if (state.user) {
        state.user.userProductsInCart = actions.payload;
      }
    },
  },
});

export const addUserProductsInCart = createAsyncThunk(
  "user/addUserProductsInCart",
  async (
    { productId, amount }: { productId: string; amount: number },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setUserLoading(true));
    let state = thunkAPI.getState() as IUser;
    const userRef = doc(db, "users", state.id);
    let docData = await getDocFromServer(userRef);

    if (docData.exists()) {
      const { userProductsInCart } = docData.data() as IUser;
      const isProductExist = checkIfProductExist(productId, userProductsInCart);

      if (isProductExist) {
        userProductsInCart.forEach((product) => {
          if (product.id === productId) {
            product.amount = amount;
          }
        });
        await updateDoc(userRef, { userProductsInCart });
      } else {
        await updateDoc(userRef, {
          userProductsInCart: arrayUnion({ id: productId, amount }),
        });
      }

      docData = await getDocFromServer(userRef);
      if (docData.exists()) {
        const userData = docData.data() as IUser;
        const userProductsInCart = userData.userProductsInCart;
        thunkAPI.dispatch(setUserProductsInCart(userProductsInCart));
      }
    }
    thunkAPI.dispatch(setUserLoading(false));
  }
);

export const addProductIdToUserFavoriteProducts = createAsyncThunk(
  "user/addProductIdToUserFavoriteProducts",
  (productId) => {}
);

export default userSlice.reducer;
export const { setUser, setUserLoading, setUserProductsInCart } =
  userSlice.actions;

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product";
import {
  collection,
  doc,
  getDocFromServer,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { filterByIds } from "./helpers";

interface IinitialState {
  productsByIds: IProduct[] | null;
  productsByCategory: IProduct[] | null;
  loading: boolean;
}

const initialState: IinitialState = {
  productsByIds: null,
  productsByCategory: null,
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsLoading(state, actions: PayloadAction<boolean>) {
      state.loading = actions.payload;
    },
    setProductsByIds(state, actions: PayloadAction<IProduct[]>) {
      state.productsByIds = actions.payload;
    },
  },
});

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (productIds: string[], thunkAPI) => {
    thunkAPI.dispatch(setProductsLoading(true));

    let q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    let data: IProduct[] = [];

    data = querySnapshot.docs.map((doc) => {
      let docData = doc.data() as IProduct;
      docData.id = doc.id;
      return docData;
    });

    const filteredProducts = filterByIds(data, productIds);
    thunkAPI.dispatch(setProductsByIds(filteredProducts));
    thunkAPI.dispatch(setProductsLoading(false));
  }
);

export default productsSlice.reducer;
export const { setProductsLoading, setProductsByIds } = productsSlice.actions;

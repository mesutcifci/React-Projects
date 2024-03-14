import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product";
import { doc, getDocFromServer } from "firebase/firestore";
import { db } from "../../firebase";

interface IinitialState {
  product: IProduct | null;
  loading: boolean;
}

const initialState: IinitialState = {
  product: null,
  loading: false,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      });
  },
});

interface IFetchProductPayload {
  productId: string;
  favoriteProductIds: string[] | undefined;
}

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({ productId, favoriteProductIds }: IFetchProductPayload, thunkAPI) => {
    const docRef = doc(db, "products", productId);
    const docData = await getDocFromServer(docRef);
    if (docData.exists()) {
      let fetchedProduct = docData.data() as IProduct;
      fetchedProduct.id = docData.id;

      if (favoriteProductIds) {
        const isFavorite = favoriteProductIds.some((id) => id === productId);
        fetchedProduct.isFavorite = isFavorite;
      }
      return fetchedProduct;
    } else {
      return null;
    }
  }
);

export default productSlice.reducer;
export const {} = productSlice.actions;

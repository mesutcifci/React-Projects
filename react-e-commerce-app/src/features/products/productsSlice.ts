import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product";
import {
  collection,
  doc,
  getDocFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { filterByIds, filterBySearchParameters } from "./helpers";
import { IParameter } from "../../types/parameters";

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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.productsByIds = action.payload;
        }
      )
      .addCase(fetProductsByPrimaryCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetProductsByPrimaryCategories.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.productsByCategory = action.payload;
        }
      );
  },
});

export const fetchAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (productIds: string[], thunkAPI) => {
    let q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    let data: IProduct[] = [];

    data = querySnapshot.docs.map((doc) => {
      let docData = doc.data() as IProduct;
      docData.id = doc.id;
      return docData;
    });

    const filteredProducts = filterByIds(data, productIds);
    return filteredProducts;
  }
);

export const fetProductsByPrimaryCategories = createAsyncThunk(
  "products/fetchProductsByPrimaryCategories",
  async (searchParameters: IParameter, thunkAPI) => {
    const { primary, secondary, tertiary } = searchParameters;

    const q = query(
      collection(db, "products"),
      where("primaryCategories", "array-contains-any", [primary])
    );

    const querySnapshot = await getDocs(q);
    const data: IProduct[] = [];
    querySnapshot.forEach((doc) => {
      let docData = doc.data() as IProduct;
      docData.id = doc.id;
      data.push(docData);
    });

    if (secondary.length) {
      const tertiaryIds = tertiary.flatMap((item) => Object.values(item));
      const filteredProducts = filterBySearchParameters(
        tertiaryIds,
        data,
        searchParameters
      );
      return filteredProducts;
    } else {
      return data;
    }
  }
);

export default productsSlice.reducer;
export const {} = productsSlice.actions;

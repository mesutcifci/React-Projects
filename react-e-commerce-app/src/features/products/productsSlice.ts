import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import {
  filterByIds,
  filterByTertiaryCategory,
  getCachedProductsByPrimaryCategories,
  getCachedProductsByPrimaryCategory,
  mapWithFavoriteProductIds,
  sliceProductsAndAddToLocalStorage,
} from "./helpers";
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
      .addCase(fetchProductsByCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProductsByCategories.fulfilled,
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
    let data: IProduct[] | null = getCachedProductsByPrimaryCategories();

    if (!data || !data.length) {
      data = querySnapshot.docs.map((doc) => {
        let docData = doc.data() as IProduct;
        docData.id = doc.id;
        return docData;
      });
      sliceProductsAndAddToLocalStorage(data);
    }

    const filteredProducts = filterByIds(data, productIds);
    return filteredProducts;
  }
);

export const fetchProductsByCategories = createAsyncThunk(
  "products/fetchProductsByCategories",
  async (
    {
      searchParameters,
      favoriteProductIds,
    }: {
      searchParameters: IParameter;
      favoriteProductIds: string[] | undefined;
    },
    thunkAPI
  ) => {
    const { primary, secondary, tertiary } = searchParameters;

    let data: IProduct[] = getCachedProductsByPrimaryCategory(primary);

    // if products didn't cached before get products from server and cache
    if (!data || data.length === 0) {
      data = [];
      let q = query(
        collection(db, "products"),
        where("primaryCategory", "==", primary)
      );
      let querySnapshot = await getDocs(q);

      querySnapshot.docs.forEach((doc) => {
        let docData = doc.data() as IProduct;
        docData.id = doc.id;
        data.push(docData);
      });
      localStorage.setItem(primary, JSON.stringify(data));
    }

    if (secondary.length) {
      const tertiaryIds = tertiary.flatMap((item) => Object.values(item));
      let filteredProducts = filterByTertiaryCategory(tertiaryIds, data);
      filteredProducts = mapWithFavoriteProductIds(
        filteredProducts,
        favoriteProductIds
      );
      return filteredProducts;
    } else {
      let filteredProducts = mapWithFavoriteProductIds(
        data,
        favoriteProductIds
      );
      return filteredProducts;
    }
  }
);

export default productsSlice.reducer;
export const {} = productsSlice.actions;

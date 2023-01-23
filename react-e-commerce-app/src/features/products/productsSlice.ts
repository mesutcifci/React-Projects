import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product";
import {
  collection,
  getDocs,
  getDocsFromCache,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  filterByIds,
  filterByTertiaryCategory,
  mapWithFavoriteProductIds,
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
      .addCase(fetProductsByCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetProductsByCategories.fulfilled,
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

export const fetProductsByCategories = createAsyncThunk(
  "products/fetProductsByCategories",
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
    let q;
    console.log(secondary);

    if (primary && !secondary.length) {
      q = query(
        collection(db, "products"),
        where("primaryCategory", "==", primary)
      );
    } else {
      q = query(
        collection(db, "products"),
        where("primaryCategory", "==", primary),
        where("secondaryCategory", "in", [...secondary])
      );
    }

    let querySnapshot = await getDocs(q);
    const data: IProduct[] = [];

    querySnapshot.forEach((doc) => {
      let docData = doc.data() as IProduct;
      docData.id = doc.id;
      data.push(docData);
    });

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

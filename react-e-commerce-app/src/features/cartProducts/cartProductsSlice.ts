import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IModifiedProduct, IProduct } from "../../types/product";
import { IUserProduct } from "../../types/user";

interface IinitialState {
  products: IModifiedProduct[] | null;
  totalCost: number;
}

const initialState: IinitialState = {
  products: null,
  totalCost: 0,
};

const cartProductsSlice = createSlice({
  name: "cartProductsSlice",
  initialState,
  reducers: {
    setCartProducts(
      state,
      actions: PayloadAction<{
        products: IProduct[];
        productsInCart: IUserProduct[];
      }>
    ) {
      const mappedProducts: IModifiedProduct[] = [];

      actions.payload.products.forEach((product) => {
        const matchedProductInCart = actions.payload.productsInCart.find(
          (item) => item.id === product.id
        );

        if (!!matchedProductInCart) {
          mappedProducts.push({
            ...product,
            amount: matchedProductInCart.amount,
            price: matchedProductInCart.amount * product.price,
          });
        }
      });
    },
    setCartTotalCost(state) {
      if (state.products?.length) {
        let total = state.products.reduce(
          (previousValue, currentValue) => previousValue + currentValue.price,
          0
        );
        total = parseFloat(total.toFixed(4));
        state.totalCost = total;
      } else {
        state.totalCost = 0;
      }
    },
  },
});

export default cartProductsSlice.reducer;
export const { setCartProducts, setCartTotalCost } = cartProductsSlice.actions;

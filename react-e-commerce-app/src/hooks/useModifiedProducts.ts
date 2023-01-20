import { useEffect, useState } from "react";
import { IModifiedProduct, IProduct } from "../types/product";
import { IUser } from "../types/user";
import { useFetchProductsByIds } from ".";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const useModifiedProducts = () => {
  const user = useSelector((state: RootState) => state.user);
  const {
    getProductsByIds,
    products,
    isLoading: loadingForProducts,
  } = useFetchProductsByIds();

  const [modifiedProducts, setModifiedProducts] =
    useState<IModifiedProduct[]>();
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (user?.user?.productsInCart.length) {
      const productIds = user.user.productsInCart.map((product) => product.id);
      getProductsByIds(productIds);
    } else {
      setModifiedProducts([]);
      setTotalCost(0);
    }
  }, [user]);

  useEffect(() => {
    if (products && user?.user) {
      modifyProducts(products, user.user);
    }
  }, [products, user]);

  useEffect(() => {
    if (modifiedProducts) {
      let total = modifiedProducts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.price,
        0
      );
      total = parseFloat(total.toFixed(4));
      setTotalCost(total);
    }
  }, [modifiedProducts]);

  const modifyProducts = (products: IProduct[], user: IUser) => {
    if (products?.length && user?.productsInCart.length) {
      let copyProducts = [...products];
      let { productsInCart } = user;
      const mappedProducts: IModifiedProduct[] = [];

      copyProducts.forEach((copyProduct) => {
        const matchedProductInCart = productsInCart.find(
          (item) => item.id === copyProduct.id
        );

        if (!!matchedProductInCart) {
          mappedProducts.push({
            ...copyProduct,
            amount: matchedProductInCart.amount,
            price: matchedProductInCart.amount * copyProduct.price,
          });
        }
      });
      setModifiedProducts(mappedProducts);
    }
  };

  return {
    modifiedProducts,
    totalCost,
    isLoading: loadingForProducts || user.loading,
  };
};

export default useModifiedProducts;

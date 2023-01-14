import { useEffect, useState } from "react";
import { IModifiedProduct, IProduct } from "../types/product";
import { IUser } from "../types/user";
import useUser from "./useUser";
import { useFetchProductsByIds } from ".";

const useModifiedProducts = () => {
  const {
    currentUser,
    addProductToCart,
    user,
    isLoading: loadingForUser,
  } = useUser();
  const {
    getProductsByIds,
    products,
    isLoading: loadingForProducts,
  } = useFetchProductsByIds();

  const [modifiedProducts, setModifiedProducts] =
    useState<IModifiedProduct[]>();
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (user?.productsInCart.length) {
      const productIds = user.productsInCart.map((product) => product.id);
      getProductsByIds(productIds);
    }
  }, [user]);

  useEffect(() => {
    if (products && user) {
      modifyProducts(products, user);
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
      const mappedProducts: IModifiedProduct[] = copyProducts.map(
        (copyProduct) => {
          const matchedProductInCart = productsInCart.find(
            (item) => item.id === copyProduct.id
          );

          return {
            ...copyProduct,
            amount: matchedProductInCart!.amount,
            price: matchedProductInCart!.amount * copyProduct.price,
          };
        }
      );

      setModifiedProducts(mappedProducts);
    }
  };

  return {
    modifiedProducts,
    totalCost,
    isLoading: loadingForProducts || loadingForUser,
  };
};

export default useModifiedProducts;

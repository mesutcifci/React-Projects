import { IUserProduct } from "../../types/user";

export const checkIfProductExist = (
  productId: string,
  userProductsInCart: IUserProduct[]
) => {
  const isProductExist = userProductsInCart.some(
    (product) => product.id === productId
  );

  return isProductExist;
};

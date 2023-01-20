import { IUserProduct } from "../../types/user";

export const checkIfProductExist = (
  productId: string,
  productsInCart: IUserProduct[]
) => {
  const isProductExist = productsInCart.some(
    (product) => product.id === productId
  );

  return isProductExist;
};

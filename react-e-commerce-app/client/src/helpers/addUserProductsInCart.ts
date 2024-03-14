import {
  arrayUnion,
  doc,
  getDocFromServer,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import { IUser, IUserProduct } from "../types/user";

export const checkIfProductExist = (
  productId: string,
  userProductsInCart: IUserProduct[]
) => {
  const isProductExist = userProductsInCart.some(
    (product) => product.id === productId
  );

  return isProductExist;
};

export const addUserProductsInCart = async ({
  productId,
  amount,
  userId,
}: {
  productId: string;
  amount: number;
  userId: string;
}) => {
  const userRef = doc(db, "users", userId);
  let docData = await getDocFromServer(userRef);

  if (docData.exists()) {
    const { userProductsInCart } = docData.data() as IUser;
    const isProductExist = checkIfProductExist(productId, userProductsInCart);

    if (isProductExist) {
      userProductsInCart.forEach((product) => {
        if (product.id === productId) {
          product.amount = amount;
        }
      });
      // if product exist update amount of selected product
      const promise = await updateDoc(userRef, { userProductsInCart });
      return promise;
    } else {
      // add new product
      const promise = await updateDoc(userRef, {
        userProductsInCart: arrayUnion({ id: productId, amount }),
      });
      return promise;
    }
  }
};

import {
  arrayUnion,
  doc,
  getDocFromServer,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";
import { IUser, IUserProduct } from "../types/user";

const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>();

  const fetchUser = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setUser(doc.data() as IUser);
      });
    }
  };

  const checkIfProductExist = (
    productId: string,
    productsInCart: IUserProduct[]
  ) => {
    const isProductExist = productsInCart.some(
      (product) => product.id === productId
    );

    return isProductExist;
  };

  const addProductToCart = async (productId: string, amount: number) => {
    setIsLoading(true);
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      let docData = await getDocFromServer(userRef);

      if (docData.exists()) {
        const { productsInCart } = docData.data() as IUser;
        const isProductExist = checkIfProductExist(productId, productsInCart);

        if (isProductExist) {
          productsInCart.forEach((product) => {
            if (product.id === productId && amount > product.amount) {
              product.amount = amount;
            }
          });
          await updateDoc(userRef, { productsInCart });
        } else {
          await updateDoc(userRef, {
            productsInCart: arrayUnion({ id: productId, amount }),
          });
        }

        docData = await getDocFromServer(userRef);
        docData.exists() && setUser(docData.data() as IUser);
      }
    }
    setIsLoading(false);
  };

  return { addProductToCart, isLoading, user, fetchUser };
};

export default useUser;

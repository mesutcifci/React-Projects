import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";

const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addProductToCart = async (productId: string, amount: number) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        productsInCart: arrayUnion(),
      });
    }
  };

  return { addProductToCart, isLoading };
};

export default useUser;

import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const addProductIdIntoUserFavoriteProducts = async ({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    favoriteProductIds: arrayUnion(productId),
  });
};

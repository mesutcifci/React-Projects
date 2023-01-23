import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface IParams {
  productId: string;
  userId: string;
}

export const removeProductIdFromUserFavoriteProducts = async ({
  productId,
  userId,
}: IParams) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    favoriteProductIds: arrayRemove(productId),
  });
};

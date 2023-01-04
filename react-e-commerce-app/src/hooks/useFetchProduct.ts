import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IProduct } from "../types/product";
import { doc, getDocFromCache, getDocFromServer } from "firebase/firestore";
import { db } from "../firebase";

const useFetchProduct = (productId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    getProductFromFirebase();
  }, [productId]);

  const getProductFromFirebase = async () => {
    setIsLoading(true);

    const docRef = doc(db, "products", productId);
    const docData = await getDocFromServer(docRef);
    if (docData.exists()) {
      let fetchedProduct = docData.data() as IProduct;
      fetchedProduct.id = docData.data().id;
      setProduct(fetchedProduct);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    product,
  };
};

export default useFetchProduct;

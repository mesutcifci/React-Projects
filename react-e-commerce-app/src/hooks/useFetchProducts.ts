import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { IProduct } from "../types/product";
import { IParameter, ITertiaryParameter } from "../types/parameters";

const useFetchProducts = () => {
  const [productsData, setProductsData] = useState<IProduct[]>();

  const getProductsFromFirebase = async ({
    primary,
    secondary,
    tertiary,
  }: IParameter) => {
    let q;

    q = query(
      collection(db, "products"),
      where("primaryCategory", "array-contains-any", [primary])
    );

    const querySnapshot = await getDocs(q);
    const data: IProduct[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as IProduct);
    });

    setProductsData(JSON.parse(JSON.stringify(data)));
  };

  return {
    productsData,
    getProductsFromFirebase,
  };
};

export default useFetchProducts;

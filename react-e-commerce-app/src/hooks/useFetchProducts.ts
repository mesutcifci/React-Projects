import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { IProduct } from "../types/product";
import { IParameter, ITertiaryParameter } from "../types/parameters";

const useFetchProducts = () => {
  const [productsData, setProductsData] = useState<IProduct[]>();

  const filterBySearchParameters = (
    secondary: string[],
    tertiaryIds: string[],
    data: IProduct[]
  ) => {
    let filteredData: IProduct[] = [];

    filteredData = data.filter(
      (item) =>
        secondary.includes(item.secondaryCategory) &&
        tertiaryIds.includes(item.tertiaryCategory)
    );

    setProductsData(JSON.parse(JSON.stringify(data)));
  };

  const getProductsFromFirebase = async ({
    primary,
    secondary,
    tertiary,
  }: IParameter) => {
    let q;

    q = query(
      collection(db, "products"),
      where("primaryCategories", "array-contains-any", [primary])
    );

    const querySnapshot = await getDocs(q);
    const data: IProduct[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as IProduct);
    });

    if (secondary.length) {
      const tertiaryIds = tertiary.flatMap((item) => Object.values(item));

      filterBySearchParameters(secondary, tertiaryIds, data);
    } else {
      setProductsData(JSON.parse(JSON.stringify(data)));
    }
  };

  return {
    productsData,
    getProductsFromFirebase,
  };
};

export default useFetchProducts;

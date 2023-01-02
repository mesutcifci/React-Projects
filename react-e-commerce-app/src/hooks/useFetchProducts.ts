import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { IProduct } from "../types/product";
import { IParameter } from "../types/parameters";

const useFetchProducts = (parameters: IParameter) => {
  const [productsData, setProductsData] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProductsFromFirebase();
  }, [parameters]);

  const filterBySearchParameters = (
    tertiaryIds: string[],
    data: IProduct[]
  ) => {
    let filteredData: IProduct[] = [];

    filteredData = data.filter(
      (item) =>
        parameters.secondary.includes(item.secondaryCategory) &&
        tertiaryIds.includes(item.tertiaryCategory)
    );

    setProductsData(JSON.parse(JSON.stringify(filteredData)));
  };

  const getProductsFromFirebase = async () => {
    setIsLoading(true);
    const { primary, secondary, tertiary } = parameters;

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

    // TODO find a workaround for firebase limitations
    if (secondary.length) {
      const tertiaryIds = tertiary.flatMap((item) => Object.values(item));
      filterBySearchParameters(tertiaryIds, data);
    } else {
      setProductsData(JSON.parse(JSON.stringify(data)));
    }
    setIsLoading(false);
  };

  return {
    productsData,
    isLoading,
  };
};

export default useFetchProducts;

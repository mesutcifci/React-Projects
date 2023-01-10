import { useEffect, useState } from "react";
import { IProduct } from "../types/product";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

const useFetchProductsById = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>();

  const filterByIds = (data: IProduct[], productIds: string[]) => {
    const filteredData = data.filter((item) => productIds.includes(item.id));
    return filteredData;
  };

  const getProductsByIds = async (productIds: string[]) => {
    setIsLoading(true);
    /*
     * Because firebase queries is not flexible eg:
       - array-contains-any method is only support up to ten parameters
       - it is not possible to set conditions like "if product.id === id"
     * we should fetch all products and then filter by Ids  
    */

    let q;
    q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    let data: IProduct[] = [];
    querySnapshot.forEach((doc) => {
      let docData = doc.data() as IProduct;
      docData.id = doc.id;
      data.push(docData);
    });

    data = filterByIds(data, productIds);
    setProducts(data);

    setIsLoading(false);
  };

  return {
    isLoading,
    products,
    getProductsByIds,
  };
};

export default useFetchProductsById;

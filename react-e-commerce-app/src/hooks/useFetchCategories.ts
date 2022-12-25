import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { ICategory } from "../types/categories";

const useFetchCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>();

  const handleFetchCategories = async () => {
    const categoriesRef = collection(db, "categories");
    const querySnapshot = await getDocs(
      query(categoriesRef, orderBy("orderId", "asc"))
    );
    const categoryArray: ICategory[] = [];
    querySnapshot.forEach((doc) => {
      categoryArray.push(doc.data() as ICategory);
    });
    setCategories(categoryArray);
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  return { categories };
};

export default useFetchCategories;

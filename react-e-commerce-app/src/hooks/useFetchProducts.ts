import { useState } from "react";

const useFetchProducts = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState();

  return {
    loading,
    setLoading,
    data,
  };
};

export default useFetchProducts;

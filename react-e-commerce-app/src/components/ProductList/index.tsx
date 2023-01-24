import { Box } from "@mui/material";

import ProductCard from "../ProductCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { useEffect } from "react";
import { fetchProductsByCategories } from "../../features/products/productsSlice";

const ProductList = () => {
  const {
    categorySearchParameters,
    user: { user },
    products: { productsByCategory },
  } = useSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categorySearchParameters.primary) {
      dispatch(
        fetchProductsByCategories({
          searchParameters: categorySearchParameters,
          favoriteProductIds: user?.favoriteProductIds,
        })
      );
    }
  }, [categorySearchParameters, user]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
          columnGap: {
            xs: "13px",
            md: "25px",
          },
          rowGap: {
            xs: "35px",
            md: "70px",
          },
          minHeight: "500px",
          width: { xs: "100%", lg: "calc(100% - 280px)" },
          maxWidth: "944px",
        }}
      >
        {productsByCategory?.length &&
          productsByCategory.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
      </Box>
    </>
  );
};

export default ProductList;

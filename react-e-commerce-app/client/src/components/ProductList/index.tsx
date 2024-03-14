import { Box } from "@mui/material";

import ProductCard from "../ProductCard";
import { useEffect } from "react";
import { fetchProductsByCategories } from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const ProductList = () => {
  const {
    categorySearchParameters,
    user: { user },
    products: { productsByCategory },
  } = useAppSelector((state) => state);

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
            xs: "0.81rem",
            md: "1.56rem",
          },
          rowGap: {
            xs: "2.18rem",
            md: "70px",
          },
          minHeight: "31.25rem",
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

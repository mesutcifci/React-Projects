import { Box, Typography } from "@mui/material";

import Loading from "../Loading";
import ProductCard from "../ProductCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { useEffect } from "react";
import { fetchProductsByCategories } from "../../features/products/productsSlice";

const ProductList = () => {
  const {
    categorySearchParameters,
    user: { user },
    currentUser: { currentUser },
  } = useSelector((state: RootState) => state);
  const { loading, productsByCategory } = useSelector(
    (state: RootState) => state.products
  );
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
      <Loading isLoading={loading} />
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
          width: { xs: "100%", lg: "calc(100% - 310px)" },
          maxWidth: "944px",
        }}
      >
        {productsByCategory?.length
          ? productsByCategory.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          : !loading && (
              <Typography>No products available for your selection</Typography>
            )}
      </Box>
    </>
  );
};

export default ProductList;

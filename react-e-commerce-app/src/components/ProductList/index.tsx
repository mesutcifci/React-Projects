import { Box, Typography } from "@mui/material";

import {
  useFetchProductsBySearchParameters,
  useSearchParameters,
} from "../../hooks";

import Loading from "../Loading";
import ProductCard from "../ProductCard";

const ProductList = () => {
  const { modifiedParameters } = useSearchParameters();
  const { productsData, isLoading } =
    useFetchProductsBySearchParameters(modifiedParameters);

  return (
    <>
      <Loading isLoading={isLoading} />
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
        {productsData?.length
          ? productsData.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          : !isLoading && (
              <Typography>No products available for your selection</Typography>
            )}
      </Box>
    </>
  );
};

export default ProductList;

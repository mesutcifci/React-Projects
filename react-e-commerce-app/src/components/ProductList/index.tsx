import { Box, Typography } from "@mui/material";
import { useFetchProducts, useSearchParameters } from "../../hooks";
import Loading from "../Loading";
import ProductCard from "../ProductCard";

const ProductList = () => {
  const { modifiedParameters } = useSearchParameters();
  const { productsData, isLoading } = useFetchProducts(modifiedParameters);

  return (
    <>
      <Loading isLoading={isLoading} />
      <Box
        sx={{
          border: "1px solid ",
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

import { Box } from "@mui/material";
import { useFetchProducts, useSearchParameters } from "../../hooks";
import Loading from "../Loading";

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
      ></Box>
    </>
  );
};

export default ProductList;

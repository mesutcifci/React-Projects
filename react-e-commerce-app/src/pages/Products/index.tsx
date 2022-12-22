import { Box } from "@mui/material";
import { ProductsDrawer } from "../../components";
import useGetSearchParameters from "../../hooks/useGetSearchParameters";

const Products = () => {
  const {} = useGetSearchParameters();

  return (
    <Box>
      <ProductsDrawer />
    </Box>
  );
};

export default Products;

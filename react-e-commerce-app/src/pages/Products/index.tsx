import { Box } from "@mui/material";
import { ProductsDrawer } from "../../components";
import useGetSearchParameters from "../../hooks/useGetSearchParameters";

const Products = () => {
  const {} = useGetSearchParameters();

  return (
    <Box sx={{ marginTop: "83px", paddingLeft: "184px" }}>
      <ProductsDrawer />
    </Box>
  );
};

export default Products;

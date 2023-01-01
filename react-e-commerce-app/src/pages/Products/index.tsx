import { Box } from "@mui/material";
import { ProductsDrawer } from "../../components";
import { useFetchProducts } from "../../hooks";
import { useEffect } from "react";

const Products = () => {
  const { productsData } = useFetchProducts();

  return (
    <Box sx={{ marginTop: "83px", paddingLeft: "184px" }}>
      <ProductsDrawer />
    </Box>
  );
};

export default Products;

import { Box } from "@mui/material";
import { ProductList, ProductsDrawer } from "../../components";

const Products = () => {
  return (
    <Box
      sx={{
        marginTop: "83px",
        display: "flex",
        paddingLeft: { xs: "16px", lg: "160px" },
        paddingRight: { xs: "16px", lg: "160px" },
        columnGap: { md: "14px", lg: "34px" },
      }}
    >
      <ProductsDrawer />
      <ProductList />
    </Box>
  );
};

export default Products;

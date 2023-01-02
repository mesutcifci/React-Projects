import { Box, Stack } from "@mui/material";
import {
  ProductBreadcrumbs,
  ProductList,
  ProductsDrawer,
} from "../../components";

const Products = () => {
  return (
    <Box
      sx={{
        marginTop: { xs: "83px", md: "29px" },
        paddingLeft: { xs: "16px", lg: "184px" },
        paddingRight: { xs: "16px", lg: "184px" },
      }}
    >
      <ProductBreadcrumbs
        sx={{
          display: { xs: "none", md: "block" },
          marginBottom: "35px",
          width: "max-content",
        }}
      />
      <Stack direction="row" sx={{ columnGap: { md: "14px", lg: "34px" } }}>
        <ProductsDrawer />
        <ProductList />
      </Stack>
    </Box>
  );
};

export default Products;

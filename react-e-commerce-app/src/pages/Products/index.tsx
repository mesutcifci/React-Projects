// Styles
import { Box, Stack } from "@mui/material";
import theme from "../../theme";

// Components
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
        paddingLeft: {
          xs: theme.padding?.pagePaddingXS + "px",
          lg: theme.padding?.pagePaddingLG + "px",
          xl: theme.padding?.pagePaddingXL + "px",
        },
        paddingRight: {
          xs: theme.padding?.pagePaddingXS + "px",
          lg: theme.padding?.pagePaddingLG + "px",
          xl: theme.padding?.pagePaddingXL + "px",
        },
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

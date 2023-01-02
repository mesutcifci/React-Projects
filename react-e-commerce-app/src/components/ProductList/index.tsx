import { Box } from "@mui/material";

const ProductList = () => {
  return (
    <Box
      sx={{
        border: "1px solid ",
        minHeight: "500px",
        width: { xs: "100%", lg: "calc(100% - 310px)" },
      }}
    ></Box>
  );
};

export default ProductList;

import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { IProduct } from "../../types/product";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  console.log(product.imageUrl);
  return (
    <Stack>
      <Box sx={{ position: "relative" }}>
        <img src={product.imageUrl} />
        <Box
          sx={{
            border: "1px solid #9e9e9e",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: "23px",
            top: "19px",
            height: "38px",
            width: "38px",
          }}
        >
          <FavoriteBorderOutlined />
        </Box>
      </Box>
      <Stack>
        <Typography fontSize="13px" fontWeight="400">
          {product.name}
        </Typography>
        <Typography>${product.price}</Typography>
      </Stack>
    </Stack>
  );
};

export default ProductCard;

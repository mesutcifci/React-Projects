import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { IProduct } from "../../types/product";
import { useNavigate } from "react-router-dom";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const navigate = useNavigate();

  const handleClickFavorite = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  const handleClickCard = () => {
    navigate({
      pathname: `/product-detail`,
      search: `?name=${product.name.toLowerCase()}&id=${product.id}`,
    });
  };

  return (
    <Stack
      sx={{
        width: "272px",
        height: "337px",
        borderRadius: "8px",
        border: "1px solid #e6e6e6",
        cursor: "pointer",
        boxShadow: "none",
        transition: "box-shadow 0.2s linear",
        "&:hover": {
          boxShadow: "1px 5px 7px 0px rgba(175,171,171,.7)",
        },
      }}
      onClick={handleClickCard}
    >
      <Box
        sx={{
          position: "relative",
          "& .product-image": {
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            height: "272px",
            width: "100%",
            objectFit: "cover",
          },
          width: "100%",
        }}
      >
        <img className="product-image" src={product.imageUrl} />
        <Box
          sx={{
            backgroundColor: "#ffffff",
            border: "1px solid #9e9e9e",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: "23px",
            top: "19px",
            height: "38px",
            width: "38px",
            "&:hover svg": {
              fill: "#FBB03B",
              transition: "fill 0.2s linear",
            },
          }}
          onClick={handleClickFavorite}
        >
          <FavoriteBorderOutlined />
        </Box>
      </Box>
      <Stack sx={{ paddingLeft: "5px", paddingRight: "5px" }}>
        <Typography fontSize="13px" fontWeight="400">
          {product.name}
        </Typography>
        <Typography>${product.price}</Typography>
      </Stack>
    </Stack>
  );
};

export default ProductCard;

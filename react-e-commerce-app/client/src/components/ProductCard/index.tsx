import { useNavigate } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";
import theme from "../../theme";

import { IProduct } from "../../types/product";

import FavoriteButton from "../FavoriteButton";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate({
      pathname: `/product-detail`,
      search: `?id=${product.id}`,
    });
  };

  return (
    <Stack
      sx={{
        width: "272px",
        height: "350px",
        borderRadius: "8px",
        border: "0.0625rem solid #e6e6e6",
        cursor: "pointer",
        boxShadow: "none",
        transition: "box-shadow 0.2s linear",
        "&:hover": {
          boxShadow: "0.0625rem 5px 7px 0px rgba(175,171,171,.7)",
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
        <img
          className="product-image"
          src={product.imageUrl}
          loading="lazy"
          alt={product.name}
        />
        <FavoriteButton
          productId={product.id}
          isFavorite={product.isFavorite}
        />
      </Box>
      <Stack sx={{ paddingLeft: "0.31rem", paddingRight: "0.31rem" }}>
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: { xs: "0.75rem", sm768: "0.81rem" },
            fontWeight: theme.fontWeight.light,
            width: "100%",
            height: "2.5rem",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.75rem", sm768: "1rem" },
            fontWeight: theme.fontWeight.regular,
          }}
        >
          ${product.price}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProductCard;

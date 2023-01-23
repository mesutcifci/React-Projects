// Styles
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, SxProps, Theme } from "@mui/material";
import { addProductIdIntoUserFavoriteProducts } from "../../helpers/addProductIdIntoUserFavoriteProducts";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { removeProductIdFromUserFavoriteProducts } from "../../helpers/removeProductIdFromUserFavoriteProducts";

interface IProps {
  position?: "absolute" | "static";
  sx?: SxProps<Theme>;
  productId: string;
  isFavorite: boolean;
}

const FavoriteButton = ({
  position = "absolute",
  sx,
  productId,
  isFavorite,
}: IProps) => {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const handleClickFavoriteButton = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (currentUser && !isFavorite) {
      addProductIdIntoUserFavoriteProducts({
        productId,
        userId: currentUser.uid,
      });
    } else {
      if (currentUser) {
        removeProductIdFromUserFavoriteProducts({
          productId,
          userId: currentUser.uid,
        });
      }
    }
  };
  return (
    <Box
      onClick={handleClickFavoriteButton}
      sx={{
        backgroundColor: `${isFavorite ? "#FBB03B" : "#ffffff"}`,
        border: "1px solid #9e9e9e",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "38px",
        width: "38px",
        "&:hover svg": {
          fill: `${isFavorite ? "#ffffff" : "#FBB03B"}`,
          transition: "fill 0.2s linear",
        },
        position: position,
        right: "23px",
        top: "19px",
        ...sx,
      }}
    >
      <FavoriteBorderOutlined />
    </Box>
  );
};

export default FavoriteButton;

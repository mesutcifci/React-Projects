// Styles
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, SxProps, Theme } from "@mui/material";

// Helpers
import { addProductIdIntoUserFavoriteProducts } from "../../helpers/addProductIdIntoUserFavoriteProducts";
import { removeProductIdFromUserFavoriteProducts } from "../../helpers/removeProductIdFromUserFavoriteProducts";

// Hooks
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

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
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const handleClickFavoriteButton = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (currentUser && !isFavorite) {
      addProductIdIntoUserFavoriteProducts({
        productId,
        userId: currentUser.uid,
      });
    } else if (currentUser && isFavorite) {
      removeProductIdFromUserFavoriteProducts({
        productId,
        userId: currentUser.uid,
      });
    } else if (!currentUser) {
      navigate("/auth/login");
    }
  };
  return (
    <Box
      onClick={handleClickFavoriteButton}
      sx={{
        backgroundColor: `${isFavorite ? "#FBB03B" : "#ffffff"}`,
        border: "0.0625rem solid #9e9e9e",
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
        top: "1.18rem",
        ...sx,
      }}
    >
      <FavoriteBorderOutlined />
    </Box>
  );
};

export default FavoriteButton;

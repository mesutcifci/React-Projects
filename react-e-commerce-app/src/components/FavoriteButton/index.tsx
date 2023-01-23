// Styles
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, SxProps, Theme } from "@mui/material";
import { addProductIdIntoUserFavoriteProducts } from "../../helpers/addProductIdIntoUserFavoriteProducts";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IProps {
  position?: "absolute" | "static";
  sx?: SxProps<Theme>;
  productId: string;
}

const FavoriteButton = ({ position = "absolute", sx, productId }: IProps) => {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const handleClickFavoriteButton = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (currentUser) {
      addProductIdIntoUserFavoriteProducts({
        productId,
        userId: currentUser.uid,
      });
    }
  };
  return (
    <Box
      onClick={handleClickFavoriteButton}
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #9e9e9e",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "38px",
        width: "38px",
        "&:hover svg": {
          fill: "#FBB03B",
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

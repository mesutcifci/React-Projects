// Styles
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, SxProps, Theme } from "@mui/material";

interface IProps {
  position?: "absolute" | "static";
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const FavoriteButton = ({ position = "absolute", sx, onClick }: IProps) => {
  return (
    <Box
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

import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { ICardData } from "../../types/deliveryCard";

interface IProps {
  cardData: ICardData;
  icon: JSX.Element;
  sx?: SxProps<Theme>;
  onClick: () => void;
}

const DeliveryCard = ({ cardData, icon, sx, onClick }: IProps) => {
  return (
    <Stack
      sx={{
        ...sx,
        alignItems: "center",
        borderRadius: "10px",
        cursor: "pointer",
        padding: "25px 15px 24px 15px",
        height: "188px",
        width: "143px",
      }}
      onClick={onClick}
    >
      <Box sx={{ marginBottom: "31px" }}>{icon}</Box>
      <Typography
        sx={{ marginBottom: "14px" }}
      >{`$${cardData.price}`}</Typography>
      <Typography
        sx={{
          color: "#A1A1A1",
          fontSize: "13px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {cardData.description}
      </Typography>
    </Stack>
  );
};

export default DeliveryCard;

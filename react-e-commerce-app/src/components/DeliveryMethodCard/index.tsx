// Styles
import { Box, Button, Stack, SxProps, Theme, Typography } from "@mui/material";
import { ICardData } from "../../types/deliveryCard";
import theme from "../../theme";

interface IProps {
  cardData: ICardData;
  icon: JSX.Element;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  isShowChangeButton?: boolean;
  handleClickChangeButton?: () => void;
}

const DeliveryMethodCard = ({
  cardData,
  icon,
  sx,
  onClick,
  isShowChangeButton = false,
  handleClickChangeButton,
}: IProps) => {
  return (
    <Stack
      sx={{
        ...sx,
        alignItems: "center",
        borderRadius: "10px",
        padding: "25px 15px 24px 15px",
        height: "198px",
        width: "143px",
        transition: "scale 200ms linear",
        "&:hover": { scale: `1.05` },
        position: "relative",
      }}
      onClick={onClick}
      data-testid={cardData.id}
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
      {isShowChangeButton && (
        <Button
          sx={{
            backgroundColor: "#FBB03B",
            borderRadius: "56px",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            fontWeight: theme.fontWeight.medium,
            position: "absolute",
            bottom: "-17px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            height: "31px",
            width: "98px",
            "&:hover": {
              backgroundColor: "#ffb53d",
            },
          }}
          onClick={handleClickChangeButton}
        >
          CHANGE
        </Button>
      )}
    </Stack>
  );
};

export default DeliveryMethodCard;

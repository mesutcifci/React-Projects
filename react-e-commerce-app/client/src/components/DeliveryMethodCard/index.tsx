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
        borderRadius: "0.625rem",
        padding: "1.5625rem .9375rem 1.5rem .9375rem",
        height: "12.375rem",
        width: "9rem",
        transition: "scale 200ms linear",
        "&:hover": { scale: `1.05` },
        position: "relative",
      }}
      onClick={onClick}
      data-testid={cardData.id}
    >
      <Box sx={{ marginBottom: "2rem" }}>{icon}</Box>
      <Typography
        sx={{ marginBottom: "0.875rem" }}
      >{`$${cardData.price}`}</Typography>
      <Typography
        sx={{
          color: "#A1A1A1",
          fontSize: "0.81rem",
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
            borderRadius: "3.5rem",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            fontSize: "0.75rem",
            fontWeight: theme.fontWeight.medium,
            position: "absolute",
            bottom: "-17px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            height: "2rem",
            width: "6.125rem",
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

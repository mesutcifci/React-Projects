// Styles
import { Stack } from "@mui/material";

interface IProps {
  icon: JSX.Element;
  isSelected: boolean;
  onClick: () => void;
}

const PaymentMethodCard = ({ icon, isSelected, onClick }: IProps) => {
  return (
    <Stack
      onClick={onClick}
      sx={{
        border: `1px solid ${isSelected ? "#FBB03B" : "#D8D8D8"}`,
        borderRadius: "22px",
        cursor: "pointer",
        opacity: `${isSelected ? 1 : 0.5}`,
        height: "54px",
        width: "130px",
        transition: "scale 200ms linear",
        "&:hover": {
          scale: "1.05",
        },
      }}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      {icon}
    </Stack>
  );
};

export default PaymentMethodCard;

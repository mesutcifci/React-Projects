// Styles
import { Stack } from "@mui/material";

interface IProps {
  icon: JSX.Element;
  isSelected: boolean;
  onClick: () => void;
  methodName: string;
}

const PaymentMethodCard = ({
  icon,
  isSelected,
  onClick,
  methodName,
}: IProps) => {
  return (
    <Stack
      onClick={onClick}
      sx={{
        border: `1px solid ${isSelected ? "#FBB03B" : "#D8D8D8"}`,
        borderRadius: "1.375rem",
        cursor: "pointer",
        opacity: `${isSelected ? 1 : 0.5}`,
        height: "3.37rem",
        width: "8.125rem",
        transition: "scale 200ms linear",
        "&:hover": {
          scale: "1.05",
        },
      }}
      direction="row"
      alignItems="center"
      justifyContent="center"
      data-testid={methodName}
    >
      {icon}
    </Stack>
  );
};

export default PaymentMethodCard;

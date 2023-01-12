import { Stack } from "@mui/material";

interface IProps {
  methodName: string;
  icon: JSX.Element;
  isSelected: boolean;
  onClick: () => void;
}

const PaymentMethodCard = ({
  methodName,
  icon,
  isSelected,
  onClick,
}: IProps) => {
  return (
    <Stack
      onClick={onClick}
      sx={{ width: "130px", height: "54px" }}
      direction="row"
      alignItems="center"
      justifyContent="center"
    ></Stack>
  );
};

export default PaymentMethodCard;

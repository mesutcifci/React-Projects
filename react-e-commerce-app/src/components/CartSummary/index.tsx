import { Grid, Stack } from "@mui/material";
import { PaymentMethodsRenderer } from "..";

const CartSummary = () => {
  return (
    <Stack>
      <PaymentMethodsRenderer />
    </Stack>
  );
};

export default CartSummary;

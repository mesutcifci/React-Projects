import { Box, Stack, Typography } from "@mui/material";
import { PaymentMethodsRenderer } from "..";
import theme from "../../theme";

const CartSummary = () => {
  return (
    <Stack>
      <Box sx={{ width: "100%" }}>
        <Typography
          fontSize="14px"
          fontWeight={theme.fontWeight.semiBold}
          marginBottom="19px"
        >
          Payment method
        </Typography>
        <PaymentMethodsRenderer />
      </Box>
    </Stack>
  );
};

export default CartSummary;

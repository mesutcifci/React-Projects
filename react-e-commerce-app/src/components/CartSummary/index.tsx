import { Box, Stack, Typography } from "@mui/material";
import { PaymentMethodsRenderer } from "..";
import theme from "../../theme";
import { useEffect, useState } from "react";
import { ICartAddressData, ISelectedCard } from "../../types/cartTypes";
import { IProduct } from "../../types/product";

interface ICartSummaryData {
  addressData: ICartAddressData;
  selectedCart: ISelectedCard;
  modifiedProducts: IProduct[];
}

const CartSummary = () => {
  const [cartSummaryData, setCartSummaryData] = useState<ICartSummaryData>();

  useEffect(() => {}, []);

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

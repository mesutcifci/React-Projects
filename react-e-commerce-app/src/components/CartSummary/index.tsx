import { Box, Stack, Typography } from "@mui/material";
import { Loading, PaymentMethodsRenderer } from "..";
import theme from "../../theme";
import { useEffect, useState } from "react";
import {
  ICartAddressData,
  ISelectedDeliveryMethod,
} from "../../types/cartTypes";
import { IProduct } from "../../types/product";
import { useModifiedProducts } from "../../hooks";

interface ICartSummaryData {
  addressData: ICartAddressData;
  selectedDeliveryMethod: ISelectedDeliveryMethod;
  modifiedProducts: IProduct[];
  totalCost: number;
}

const CartSummary = () => {
  const [cartSummaryData, setCartSummaryData] = useState<ICartSummaryData>();
  const { modifiedProducts, totalCost, isLoading } = useModifiedProducts();

  useEffect(() => {
    if (modifiedProducts) {
      let addressData = localStorage.getItem("addressData");
      let selectedDeliveryMethod = localStorage.getItem(
        "selectedDeliveryMethod"
      );

      if (addressData && selectedDeliveryMethod) {
        setCartSummaryData({
          addressData: JSON.parse(addressData),
          selectedDeliveryMethod: JSON.parse(selectedDeliveryMethod),
          modifiedProducts,
          totalCost,
        });
      }
    }
  }, [modifiedProducts]);

  return (
    <>
      <Loading isLoading={isLoading} />
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
        {cartSummaryData?.selectedDeliveryMethod && (
          <Box>
            <Typography
              fontSize="14px"
              fontWeight={theme.fontWeight.semiBold}
              marginBottom="19px"
            >
              Delivery method
            </Typography>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default CartSummary;

import { Avatar, Box, Button, Icon, Stack, Typography } from "@mui/material";
import { DeliveryMethodCard, Loading, PaymentMethodsRenderer } from "..";
import theme from "../../theme";
import { useEffect, useState } from "react";
import {
  ICartAddressData,
  ISelectedDeliveryMethod,
} from "../../types/cartTypes";
import { IProduct } from "../../types/product";
import { useModifiedProducts } from "../../hooks";
import { DeliveryIconDHL, DeliveryIconDPD, DeliveryIconInPost } from "../../ui";
interface IProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
interface ICartSummaryData {
  addressData: ICartAddressData;
  selectedDeliveryMethod: ISelectedDeliveryMethod;
}

const CartSummary = ({ setActiveStep }: IProps) => {
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
        });
      }
    }
  }, []);

  const setAndReturnCardIcon = (iconName: string) => {
    switch (iconName) {
      case "inPost":
        return <DeliveryIconInPost />;
      case "dhl":
        return <DeliveryIconDHL />;
      case "dpd":
        return <DeliveryIconDPD />;
    }
  };

  const renderDeliveryMethodCard = () => {
    if (cartSummaryData?.selectedDeliveryMethod) {
      const icon = setAndReturnCardIcon(
        cartSummaryData.selectedDeliveryMethod.iconName
      );
      return (
        <DeliveryMethodCard
          cardData={cartSummaryData.selectedDeliveryMethod}
          icon={icon!}
          sx={{ border: "1px solid #FBB03B" }}
          isShowChangeButton={true}
          handleClickChangeButton={() =>
            setActiveStep((previousState) => previousState - 1)
          }
        />
      );
    }
  };

  const handleClickChangeAddressButton = () => {
    setActiveStep((previousState) => previousState - 1);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Stack rowGap="60px" alignItems="center">
        <Box sx={{ width: "max-content", maxWidth: "100%" }}>
          <Typography
            fontWeight={theme.fontWeight.semiBold}
            marginBottom="29px"
            textAlign="center"
          >
            Payment method
          </Typography>
          <PaymentMethodsRenderer />
        </Box>
        {cartSummaryData?.selectedDeliveryMethod && (
          <Box sx={{ width: "max-content", maxWidth: "100%" }}>
            <Typography
              fontWeight={theme.fontWeight.semiBold}
              marginBottom="29px"
              textAlign="center"
            >
              Delivery method
            </Typography>
            {renderDeliveryMethodCard()}
          </Box>
        )}

        {cartSummaryData?.addressData && (
          <Box sx={{ width: "max-content", maxWidth: "100%" }}>
            <Typography
              fontWeight={theme.fontWeight.semiBold}
              marginBottom="29px"
              textAlign="center"
            >
              Address delivery
            </Typography>

            <Stack
              sx={{
                "& p": {
                  fontSize: "14px",
                  fontWeight: theme.fontWeight.regular,
                },
              }}
              rowGap="5px"
            >
              <Typography>{`${cartSummaryData.addressData.firstName} ${cartSummaryData.addressData.lastName}`}</Typography>
              <Typography>{`${cartSummaryData.addressData.address}. ${cartSummaryData.addressData.city}, ${cartSummaryData.addressData.postalCode}`}</Typography>
              <Typography>{`${cartSummaryData.addressData.country.label}`}</Typography>
              <Typography>{`${cartSummaryData.addressData.phone}`}</Typography>
              <Typography>{`${cartSummaryData.addressData.email}`}</Typography>
            </Stack>

            <Button
              sx={{
                border: "1px solid #D8D8D8",
                borderRadius: "49px",
                color: "#000000",
                fontSize: "13px",
                fontWeight: theme.fontWeight.semiBold,
                marginTop: "20px",
                textAlign: "center",
                height: "49px",
                width: "183px",
              }}
              onClick={handleClickChangeAddressButton}
            >
              CHANGE ADDRESS
            </Button>
          </Box>
        )}

        {modifiedProducts && totalCost && (
          <Stack
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              fontWeight={theme.fontWeight.semiBold}
              marginBottom="29px"
              textAlign="center"
            >
              Your cart
            </Typography>

            <Stack
              sx={{ width: "100%", maxWidth: { xs: "570px" } }}
              alignItems="center"
              justifyContent="center"
              rowGap="40px"
              columnGap="40px"
            >
              <Stack
                rowGap="30px"
                columnGap="10px"
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
              >
                {modifiedProducts.map((product) => (
                  <Stack
                    rowGap="20px"
                    direction="row"
                    flexWrap="wrap"
                    columnGap="20px"
                    alignItems="center"
                    width="279px"
                  >
                    <Avatar
                      src={product.imageUrl}
                      sx={{ width: "70px", height: "70px" }}
                      alt={product.name}
                    />
                    <Stack>
                      <Typography
                        fontSize="14px"
                        fontWeight={theme.fontWeight.semiBold}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        fontSize="14px"
                        fontWeight={theme.fontWeight.regular}
                      >
                        White
                      </Typography>
                      <Typography
                        fontSize="14px"
                        fontWeight={theme.fontWeight.regular}
                      >
                        XL
                      </Typography>
                      <Stack direction="row" columnGap="10px">
                        <Typography
                          fontSize="14px"
                          fontWeight={theme.fontWeight.semiBold}
                        >
                          {product.price}
                        </Typography>
                        <Typography
                          fontSize="14px"
                          fontWeight={theme.fontWeight.regular}
                        >
                          x{product.amount}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>

              <Stack direction="row">
                <Typography>Total cost:</Typography>
                <Typography>${totalCost}</Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default CartSummary;

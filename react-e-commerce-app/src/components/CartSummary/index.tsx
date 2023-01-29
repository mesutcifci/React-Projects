import { useEffect, useState } from "react";

// Styles
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { DeliveryMethodCard, PaymentMethodsRenderer } from "..";
import theme from "../../theme";

// Data
import {
  ICartAddressData,
  ISelectedDeliveryMethod,
} from "../../types/cartTypes";

// Components
import { DeliveryIconDHL, DeliveryIconDPD, DeliveryIconInPost } from "../../ui";
import { ICountry } from "../../types/country";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
interface IProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
interface ICartSummaryData {
  addressData: ICartAddressData;
  selectedDeliveryMethod: ISelectedDeliveryMethod;
  selectedCountry: ICountry;
  phone: string;
}

const CartSummary = ({ setActiveStep }: IProps) => {
  const [cartSummaryData, setCartSummaryData] = useState<ICartSummaryData>();
  const {
    products: { cartProducts },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    let addressData = JSON.parse(localStorage.getItem("addressData") as string);
    let selectedDeliveryMethod = JSON.parse(
      localStorage.getItem("selectedDeliveryMethod") as string
    );
    let selectedCountry = JSON.parse(
      localStorage.getItem("selectedCountry") as string
    );
    let phone = localStorage.getItem("phone") as string;
    if (addressData && selectedDeliveryMethod && selectedCountry && phone) {
      setCartSummaryData({
        addressData,
        selectedDeliveryMethod,
        selectedCountry,
        phone,
      });
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
      {cartSummaryData && cartProducts.products && (
        <Stack
          rowGap="60px"
          columnGap="40px"
          flexWrap="wrap"
          sx={{
            flexDirection: { md: "row" },
            justifyContent: { xs: "center", md1000: "space-between" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Stack
            rowGap="60px"
            columnGap="40px"
            sx={{
              flexDirection: { md: "row" },
              flexWrap: "wrap",
              justifyContent: { xs: "center", md1000: "space-between" },
              alignItems: { xs: "center", md: "flex-start" },
              width: "100%",
              maxWidth: { md: "1400px" },
            }}
          >
            <Box sx={{ width: "max-content", maxWidth: "100%" }}>
              <Typography
                fontSize="14px"
                fontWeight={theme.fontWeight.semiBold}
                marginBottom="29px"
                sx={{ textAlign: { xs: "center", lg: "start" } }}
              >
                Payment method
              </Typography>
              <PaymentMethodsRenderer />
            </Box>

            <Stack
              direction="row"
              flexWrap="wrap"
              gap="40px"
              sx={{
                flexGrow: { md1000: 1 },
                justifyContent: "center",
              }}
            >
              <Stack
                alignItems="center"
                sx={{
                  width: "max-content",
                  maxWidth: "100%",
                  flexGrow: { md1000: 1 },
                }}
              >
                <Box width="143px">
                  <Typography
                    fontSize="14px"
                    fontWeight={theme.fontWeight.semiBold}
                    marginBottom="29px"
                    sx={{ textAlign: { xs: "center", lg: "start" } }}
                  >
                    Delivery method
                  </Typography>
                  {renderDeliveryMethodCard()}
                </Box>
              </Stack>

              <Stack
                sx={{
                  alignItems: { xs: "center", lg: "flex-start" },
                  width: { xs: "max-content", lg: "350px" },
                  maxWidth: "100%",
                  "& p": {
                    textAlign: { xs: "center", lg: "start" },
                    fontSize: "14px",
                    fontWeight: theme.fontWeight.regular,
                  },
                }}
              >
                <Typography
                  marginBottom="29px"
                  sx={{ fontWeight: `${theme.fontWeight.semiBold}!important` }}
                >
                  Address delivery
                </Typography>

                <Stack rowGap="5px" maxWidth="300px">
                  <Typography>{`${cartSummaryData.addressData.firstName} ${cartSummaryData.addressData.lastName}`}</Typography>
                  <Typography>{`${cartSummaryData.addressData.address}. ${cartSummaryData.addressData.city}, ${cartSummaryData.addressData.postalCode}`}</Typography>
                  <Typography>{`${cartSummaryData.selectedCountry.label}`}</Typography>
                  <Typography>{`${cartSummaryData.phone}`}</Typography>
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
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              fontSize="14px"
              fontWeight={theme.fontWeight.semiBold}
              marginBottom="29px"
              sx={{ textAlign: { xs: "center", md: "start" } }}
            >
              Your cart
            </Typography>

            <Stack
              rowGap="40px"
              columnGap="10px"
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              sx={{
                width: "100%",
                maxWidth: { xs: "570px", md: "1400px" },
                justifyContent: { xs: "center", lg: "space-between" },
              }}
            >
              <Stack
                rowGap="30px"
                columnGap="10px"
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                sx={{
                  justifyContent: { xs: "center", sm: "space-between" },
                  width: { xs: "100%", lg: "801px" },
                }}
              >
                {cartProducts.products.map((product) => (
                  <Stack
                    key={product.id}
                    rowGap="20px"
                    direction="row"
                    columnGap="20px"
                    alignItems="center"
                    sx={{ width: { xs: "279px", md: "100%" } }}
                  >
                    <Avatar
                      src={product.imageUrl}
                      sx={{ width: "70px", height: "70px" }}
                      alt={product.name}
                    />
                    <Stack
                      sx={{
                        flexDirection: { md: "row" },
                        justifyContent: { md: "space-between" },
                        width: { md: "100%" },
                      }}
                    >
                      <Typography
                        fontSize="14px"
                        fontWeight={theme.fontWeight.semiBold}
                        width="200px"
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        fontSize="14px"
                        fontWeight={theme.fontWeight.regular}
                        width="60px"
                      >
                        White
                      </Typography>
                      <Typography
                        fontSize="14px"
                        fontWeight={theme.fontWeight.regular}
                        width="60px"
                      >
                        XL
                      </Typography>
                      <Stack
                        direction="row"
                        columnGap="10px"
                        sx={{ justifyContent: { md: "space-between" } }}
                        width="100px"
                      >
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

              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                  width: { lg1300: "350px" },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  columnGap="33px"
                  width="244px"
                  height="49px"
                  sx={{ backgroundColor: "#F1F1F1", borderRadius: "49px" }}
                >
                  <Typography
                    fontWeight={theme.fontWeight.light}
                    fontSize="16px"
                  >
                    Total cost:
                  </Typography>
                  <Typography
                    fontWeight={theme.fontWeight.semiBold}
                    fontSize="16px"
                  >
                    ${cartProducts.totalCost}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default CartSummary;

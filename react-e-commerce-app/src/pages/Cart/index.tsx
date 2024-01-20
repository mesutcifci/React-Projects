import { useEffect, useState } from "react";

// Styles
import {
  LocalShippingOutlined,
  PaymentOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  CircularProgress,
  Stack,
  Step,
  Stepper,
  Typography,
} from "@mui/material";
import theme from "../../theme";

// Components
import {
  AddressAndDelivery,
  CartFooter,
  CartProductsRenderer,
  CartSummary,
  ScrollToTop,
} from "../../components";

// Hooks
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Cart = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { user, loading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ pathname: "/auth/login" });
    }
  }, [user, loading]);

  const steps = [
    "Shopping Cart",
    "Address data and type of delivery",
    "Summary",
  ];

  const handleClickStepIcon = (index: number) => {
    const isAddressDataAvailable = !!localStorage.getItem("addressData");
    const isCurrentStepAddress = index + 1 === steps.length;
    if (isCurrentStepAddress && isAddressDataAvailable) {
      setActiveStep(index);
    } else if (!isCurrentStepAddress) {
      setActiveStep(index);
    }
  };

  const renderPageContent = () => {
    switch (activeStep) {
      case 0:
        return <CartProductsRenderer />;
      case 1:
        return <AddressAndDelivery setActiveStep={setActiveStep} />;
      case 2:
        return <CartSummary setActiveStep={setActiveStep} />;
    }
  };

  const renderStepperIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ShoppingCartOutlined />;
      case 1:
        return <LocalShippingOutlined />;
      case 2:
        return <PaymentOutlined />;
    }
  };

  const handleClickBackButton = () => {
    setActiveStep((previousState) => previousState - 1);
  };

  const handleClickNextStepButton = () => {
    setActiveStep((previousState) => previousState + 1);
  };

  if (!loading && !user) {
    return <CircularProgress />;
  }

  return (
    <>
      <ScrollToTop params={activeStep} />
      <Stack
        sx={{
          paddingLeft: {
            xs: theme.padding?.pagePaddingXS + "px",
            lg: theme.padding?.pagePaddingLG + "px",
            xl: theme.padding?.pagePaddingXL + "px",
          },
          paddingRight: {
            xs: theme.padding?.pagePaddingXS + "px",
            lg: theme.padding?.pagePaddingLG + "px",
            xl: theme.padding?.pagePaddingXL + "px",
          },
        }}
        rowGap="63px"
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          columnGap="0.625rem"
          sx={{ justifyContent: { xs: "center", sm768: "space-between" } }}
        >
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm768: "initial" },
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontWeight: theme.fontWeight.semiBold,
              maxWidth: { sm768: "18.75rem", md: "350px" },
              width: "100%",
              height: "3.75rem",
              textAlign: { xs: "center", sm768: "initial" },
            }}
          >
            {steps[activeStep]}
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{
              minWidth: "288px",
              maxWidth: { xs: "450px", sm768: "320px" },
              height: "3.75rem",
              width: "100%",
            }}
          >
            {steps.map((label, index) => {
              return (
                <Step
                  key={label}
                  onClick={() => handleClickStepIcon(index)}
                  sx={{
                    height: "2.25rem",
                    width: "2.25rem",
                    backgroundColor: `${
                      index < activeStep
                        ? "#ffffff"
                        : index === activeStep
                        ? "#FBB03B"
                        : "unset"
                    }`,
                    border: `${
                      index > activeStep ? "none" : "0.0625rem solid #FBB03B"
                    }`,
                    borderRadius: "100%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "& svg": {
                      color: `${
                        index < activeStep
                          ? "#FBB03B"
                          : index === activeStep
                          ? "#ffffff"
                          : "#D8D8D8"
                      }`,
                    },
                  }}
                >
                  {renderStepperIcon(index)}
                </Step>
              );
            })}
          </Stepper>
        </Stack>
        {renderPageContent()}
        <CartFooter
          steps={steps}
          activeStep={activeStep}
          handleClickBackButton={handleClickBackButton}
          handleClickNextStepButton={handleClickNextStepButton}
        />
      </Stack>
    </>
  );
};

export default Cart;

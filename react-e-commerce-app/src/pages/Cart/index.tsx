import { useState } from "react";

import {
  LocalShippingOutlined,
  PaymentOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Stack, Step, Stepper, Typography } from "@mui/material";

import {
  AddressAndDelivery,
  CartProductsRenderer,
  CartSummary,
} from "../../components";
import { auth } from "../../firebase";

const Cart = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Shopping Cart",
    "Address data and type of delivery",
    "Summary",
  ];

  const handleClickStepIcon = (index: number) => {
    setActiveStep(index);
  };

  const renderPageContent = () => {
    switch (activeStep) {
      case 0:
        return <CartProductsRenderer />;
      case 1:
        return <AddressAndDelivery />;
      case 2:
        return <CartSummary />;
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

  return (
    <Stack
      sx={{
        paddingLeft: { xs: "16px", lg: "116px" },
        paddingRight: { xs: "16px", lg: "116px" },
      }}
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        columnGap="10px"
        sx={{ justifyContent: { xs: "center", sm768: "space-between" } }}
      >
        <Typography
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: { xs: "center", sm768: "initial" },
            fontSize: "20px",
            fontWeight: "500",
            maxWidth: { sm768: "288px" },
            width: "100%",
            height: "60px",
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
            height: "60px",
            width: "100%",
          }}
        >
          {steps.map((label, index) => {
            return (
              <Step
                key={label}
                onClick={() => handleClickStepIcon(index)}
                sx={{
                  height: "36px",
                  width: "36px",
                  backgroundColor: `${
                    index < activeStep
                      ? "#ffffff"
                      : index === activeStep
                      ? "#FBB03B"
                      : "unset"
                  }`,
                  border: `${
                    index > activeStep ? "none" : "1px solid #FBB03B"
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
    </Stack>
  );
};

export default Cart;

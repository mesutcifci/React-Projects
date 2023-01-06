import { ShoppingCart } from "@mui/icons-material";
import { Step, Stepper } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

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

  const renderPageContent = () => {};

  return (
    <Stack>
      <Stack>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label} onClick={() => handleClickStepIcon(index)}>
                <ShoppingCart />
              </Step>
            );
          })}
        </Stepper>
      </Stack>
    </Stack>
  );
};

export default Cart;

import React, { useState } from "react";

import { Stack } from "@mui/material";

import {
  DiscoverIcon,
  IdealIcon,
  MaestroIcon,
  MastercardIcon,
  PayPalIcon,
  VISAIcon,
} from "../../ui";
import PaymentMethodCard from "../PaymentMethodCard";

import paymentMethodNames from "../../constants/paymentMethodNames.json";

const PaymentMethodsRenderer = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethodNames[0]
  );

  const handleClickPaymentCard = (methodName: string) => {
    setSelectedPaymentMethod(methodName);
  };

  const findAndReturnPaymentIcon = (methodName: string) => {
    switch (methodName) {
      case "paypal":
        return <PayPalIcon id={methodName} />;
      case "visa":
        return <VISAIcon id={methodName} />;
      case "mastercard":
        return <MastercardIcon id={methodName} />;
      case "maestro":
        return <MaestroIcon id={methodName} />;
      case "discover":
        return <DiscoverIcon id={methodName} />;
      case "ideal":
        return <IdealIcon id={methodName} />;
    }
  };

  const renderMethods = () => {
    return paymentMethodNames.map((methodName) => {
      const icon = findAndReturnPaymentIcon(methodName);
      return (
        <React.Fragment key={methodName}>
          <PaymentMethodCard
            icon={icon!}
            isSelected={methodName === selectedPaymentMethod}
            onClick={() => {
              handleClickPaymentCard(methodName);
            }}
            methodName={methodName}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      gap="10px"
      sx={{ maxWidth: "410px" }}
    >
      {renderMethods()}
    </Stack>
  );
};

export default PaymentMethodsRenderer;

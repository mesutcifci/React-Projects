import {
  FinestQualityIcon,
  MoneyBackIcon,
  PaymentIcon,
  ShippingIcon,
} from "../../ui";

import listData from "./listData.json";

/* Material UI */
import { Stack, Box, Typography } from "@mui/material";

const WhyChooseUs = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "shipping":
        return <ShippingIcon id={iconName} />;
      case "payments":
        return <PaymentIcon id={iconName} />;
      case "money":
        return <MoneyBackIcon id={iconName} />;
      case "quality":
        return <FinestQualityIcon id={iconName} />;
    }
  };

  const renderList = () => {
    return listData.map((item) => (
      <Stack key={item.id} sx={{ width: "244px" }}>
        {renderIcon(item.id)}
        <Typography
          component="h3"
          sx={{
            marginTop: "43px",
            marginBottom: "20px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {item.title}
        </Typography>
        <Typography>{item.description}</Typography>
      </Stack>
    ));
  };

  return (
    <Stack
      component="section"
      sx={{
        alignItems: "center",
        rowGap: { xs: "30px" },
        marginTop: { xs: "30px" },
      }}
    >
      <Box component="header" sx={{ width: "100%" }}>
        <Typography
          align="center"
          component="h2"
          sx={{
            fontSize: { xs: "21px" },
            fontWeight: "lighter",
          }}
        >
          Why should you choose us?
        </Typography>
      </Box>
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "93px",
          rowGap: "50px",
        }}
      >
        {renderList()}
      </Stack>
    </Stack>
  );
};

export default WhyChooseUs;

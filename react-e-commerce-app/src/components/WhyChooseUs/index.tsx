// Styles
import { Stack, Box, Typography } from "@mui/material";
import theme from "../../theme";

// Components
import {
  FinestQualityIcon,
  MoneyBackIcon,
  PaymentIcon,
  ShippingIcon,
} from "../../ui";

// Data
import listData from "./listData.json";

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
            marginTop: { xs: "1.375rem", sm: "43px" },
            marginBottom: "1.25rem",
            fontSize: "1rem",
            fontWeight: theme.fontWeight.semiBold,
          }}
        >
          {item.title}
        </Typography>
        <Typography
          sx={{
            color: "#808080",
            height: "96px",
            fontWeight: theme.fontWeight.regular,
            fontSize: "0.81rem",
          }}
        >
          {item.description}
        </Typography>
      </Stack>
    ));
  };

  return (
    <Stack
      component="section"
      sx={{
        alignItems: "center",
        rowGap: "1.875rem",
        marginTop: "1.875rem",
      }}
    >
      <Box component="header" sx={{ width: "100%" }}>
        <Typography
          align="center"
          component="h2"
          sx={{
            fontSize: { xs: "21px", lg: "29px" },
            fontWeight: theme.fontWeight.light,
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
          columnGap: { xs: "1.25rem", sm: "2.5rem", lg: "50px", xl: "93px" },
          rowGap: "50px",
          maxWidth: { xs: "700px", lg: "initial" },
          padding: { xs: "1.25rem", lg: "1.875rem" },
        }}
      >
        {renderList()}
      </Stack>
    </Stack>
  );
};

export default WhyChooseUs;

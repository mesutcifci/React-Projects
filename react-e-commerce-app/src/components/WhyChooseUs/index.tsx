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
            marginTop: { xs: "22px", sm: "43px" },
            marginBottom: "20px",
            fontSize: "16px",
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
            fontSize: "13px",
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
        rowGap: "30px",
        marginTop: "30px",
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
          columnGap: { xs: "20px", sm: "40px", lg: "50px", xl: "93px" },
          rowGap: "50px",
          maxWidth: { xs: "700px", lg: "initial" },
          padding: { xs: "20px", lg: "30px" },
        }}
      >
        {renderList()}
      </Stack>
    </Stack>
  );
};

export default WhyChooseUs;

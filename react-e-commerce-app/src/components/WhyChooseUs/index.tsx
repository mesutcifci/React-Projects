import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FinestQualityIcon from "../../ui/FinestQualityIcon";
import MoneyBackIcon from "../../ui/MoneyBackIcon";
import PaymentIcon from "../../ui/PaymentIcon";
import ShippingIcon from "../../ui/ShippingIcon";

const listData = [
  {
    id: "shipping",
    title: "Free Shipping",
    description:
      "All purchases over $99 are eligible for free shipping via USPS First Class Mail.",
  },
  {
    id: "payments",
    title: "Easy Payments",
    description:
      "All payments are processed instantly  over a secure payment protocol.",
  },
  {
    id: "money",
    title: "Money-Back Guarantee",
    description:
      "If an item arrived damaged or you've changed your mind, you can send it back for a full refund.",
  },
  {
    id: "quality",
    title: "Finest Quality",
    description:
      "Designed to last, each of our products has been crafted with the finest materials.",
  },
];

const WhyChooseUs = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "shipping":
        return <ShippingIcon />;
      case "payments":
        return <PaymentIcon />;
      case "money":
        return <MoneyBackIcon />;
      case "quality":
        return <FinestQualityIcon />;
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
        fontFamily: "Poppins, sans-serif",
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

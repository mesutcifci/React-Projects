// Styles
import {
  ArrowBack as ArrowBackIcon,
  LocalShippingOutlined,
  Navigation as NavigationIcon,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import theme from "../../theme";

// Hooks
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface IProps {
  steps: string[];
  activeStep: number;
  handleClickBackButton: () => void;
  handleClickNextStepButton: () => void;
}

const stepperButtonStyles: SxProps<Theme> = {
  backgroundColor: "#FBB03B",
  borderRadius: "3.125rem",
  color: "#000000",
  fontSize: "0.81rem",
  fontWeight: theme.fontWeight.semiBold,
  textAlign: "center",
  height: "3.125rem",
  width: "203px",
  "&:hover": {
    backgroundColor: "#ffb53d",
  },
};

const CartFooter = ({
  steps,
  activeStep,
  handleClickBackButton,
  handleClickNextStepButton,
}: IProps) => {
  const navigate = useNavigate();
  const totalCost = useAppSelector(
    (state) => state.products.cartProducts.totalCost
  );

  const handleClickContinueShoppingButton = () => {
    navigate({ pathname: "/" });
  };

  const renderStepperButton = () => {
    switch (activeStep) {
      case 0:
        return (
          <Button
            sx={{
              ...stepperButtonStyles,
            }}
            onClick={(event) => {
              event.preventDefault();
              handleClickNextStepButton();
            }}
          >
            NEXT STEP
          </Button>
        );
      case 1:
        return (
          <Button
            type="submit"
            form="addressAndDeliveryForm"
            sx={{
              ...stepperButtonStyles,
            }}
          >
            NEXT STEP
          </Button>
        );
      case 2:
        return (
          <Button
            sx={{
              ...stepperButtonStyles,
            }}
          >
            PROCEED TO PAYMENT
          </Button>
        );
    }
  };

  return (
    <Stack
      rowGap="1.25rem"
      columnGap="1.25rem"
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      sx={{
        justifyContent: {
          xs: `${activeStep === 1 ? "space-between" : "center"}`,
          md: `${activeStep === 0 ? "center" : "space-between"}`,
          lg: "space-between",
        },
      }}
    >
      {activeStep === 0 ? (
        <TextField
          label="Promo Code"
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "3.5rem",
              width: "100%",
              maxWidth: "21rem",
            },

            "& .MuiInputBase-input": {
              fontSize: "0.81rem",
              fontWeight: theme.fontWeight.regular,
              paddingLeft: "1.5rem",
            },
            "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
              fontSize: "0.81rem",
              fontWeight: theme.fontWeight.regular,
              marginLeft: "0.625rem",
              marginTop: "3px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  cursor: "pointer",
                  paddingRight: { sm: "1rem" },
                  paddingTop: "0.125rem",
                }}
              >
                <NavigationIcon
                  sx={{
                    transform: "rotate(90deg)",
                    fill: "#B5B5B5",
                    height: "1.25rem",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <IconButton
          sx={{
            backgroundColor: "white",
            borderRadius: "0",
            color: "black",
            display: "flex",
            alignItem: "center",
            columnGap: { xs: "0.75rem", lg: "1.5rem" },
            width: "max-content",
            "&:hover": { color: "black", backgroundColor: "white" },
          }}
          component="button"
          onClick={handleClickBackButton}
        >
          <ArrowBackIcon />
          <Typography
            fontSize="0.875rem"
            fontWeight={theme.fontWeight.semiBold}
          >
            Back
          </Typography>
        </IconButton>
      )}

      {activeStep === 0 && (
        <Stack
          direction="row"
          sx={{ columnGap: { xs: "0.625rem", lg: "2.06rem" } }}
        >
          <Typography fontSize="1rem" fontWeight={theme.fontWeight.light}>
            Total Cost:
          </Typography>
          <Typography fontSize="1rem" fontWeight={theme.fontWeight.semiBold}>
            ${totalCost.toFixed(2)}
          </Typography>
        </Stack>
      )}

      {activeStep + 1 === steps.length && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{ columnGap: { xs: "0.625rem", lg: "1rem" } }}
        >
          <LocalShippingOutlined />
          <Typography
            fontWeight={theme.fontWeight.light}
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              display: "flex",
              alignItems: "center",
              maxWidth: "18rem",
              width: "max-content",
            }}
          >
            You are
            <Typography
              component="span"
              sx={{
                display: "inline-block",
                marginLeft: "0.25rem",
                marginRight: "0.25rem",
                fontSize: { xs: "0.75rem", lg: "0.875rem" },
              }}
              fontWeight={theme.fontWeight.semiBold}
            >
              $30,02
            </Typography>
            missing for free shipping
          </Typography>
        </Stack>
      )}

      <Stack
        direction="row"
        width="max-content"
        maxWidth="100%"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        rowGap="1.25rem"
        sx={{ columnGap: { xs: "0.625rem", lg: "26px" } }}
      >
        <Button
          sx={{
            border: "0.0625rem solid #D8D8D8",
            borderRadius: "3.125rem",
            color: "#000000",
            fontSize: "0.81rem",
            fontWeight: theme.fontWeight.semiBold,
            textAlign: "center",
            height: "3.125rem",
            width: "203px",
          }}
          onClick={handleClickContinueShoppingButton}
        >
          CONTINUE SHOPPING
        </Button>
        {renderStepperButton()}
      </Stack>
    </Stack>
  );
};

export default CartFooter;

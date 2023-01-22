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
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IProps {
  steps: string[];
  activeStep: number;
  handleClickBackButton: () => void;
  handleClickNextStepButton: () => void;
}

const stepperButtonStyles: SxProps<Theme> = {
  backgroundColor: "#FBB03B",
  borderRadius: "49px",
  color: "#000000",
  fontSize: "13px",
  fontWeight: theme.fontWeight.semiBold,
  textAlign: "center",
  height: "49px",
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
  const totalCost = useSelector(
    (state: RootState) => state.cartProducts.totalCost
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
      rowGap="20px"
      columnGap="20px"
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
              borderRadius: "56px",
              width: "100%",
              maxWidth: "336px",
            },

            "& .MuiInputBase-input": {
              fontSize: "13px",
              fontWeight: theme.fontWeight.regular,
              paddingLeft: "24px",
            },
            "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
              fontSize: "13px",
              fontWeight: theme.fontWeight.regular,
              marginLeft: "10px",
              marginTop: "3px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  cursor: "pointer",
                  paddingRight: { sm: "17px" },
                  paddingTop: "2px",
                }}
              >
                <NavigationIcon
                  sx={{
                    transform: "rotate(90deg)",
                    fill: "#B5B5B5",
                    height: "20px",
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
            columnGap: { xs: "12px", lg: "24px" },
            width: "max-content",
            "&:hover": { color: "black", backgroundColor: "white" },
          }}
          component="button"
          onClick={handleClickBackButton}
        >
          <ArrowBackIcon />
          <Typography fontSize="14px" fontWeight={theme.fontWeight.semiBold}>
            Back
          </Typography>
        </IconButton>
      )}

      {activeStep === 0 && (
        <Stack direction="row" sx={{ columnGap: { xs: "10px", lg: "33px" } }}>
          <Typography fontSize="16px" fontWeight={theme.fontWeight.light}>
            Total Cost:
          </Typography>
          <Typography fontSize="16px" fontWeight={theme.fontWeight.semiBold}>
            ${totalCost}
          </Typography>
        </Stack>
      )}

      {activeStep + 1 === steps.length && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{ columnGap: { xs: "10px", lg: "16px" } }}
        >
          <LocalShippingOutlined />
          <Typography
            fontWeight={theme.fontWeight.light}
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              display: "flex",
              alignItems: "center",
              maxWidth: "285px",
              width: "max-content",
            }}
          >
            You are
            <Typography
              component="span"
              sx={{
                display: "inline-block",
                marginLeft: "4px",
                marginRight: "4px",
                fontSize: { xs: "12px", lg: "14px" },
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
        rowGap="20px"
        sx={{ columnGap: { xs: "10px", lg: "26px" } }}
      >
        <Button
          sx={{
            border: "1px solid #D8D8D8",
            borderRadius: "49px",
            color: "#000000",
            fontSize: "13px",
            fontWeight: theme.fontWeight.semiBold,
            textAlign: "center",
            height: "49px",
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

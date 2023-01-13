import {
  ArrowBack as ArrowBackIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../../theme";

interface IProps {
  steps: string[];
  activeStep: number;
  totalCost: number;
  handleClickBackButton: () => void;
}

const CartFooter = ({
  steps,
  activeStep,
  totalCost,
  handleClickBackButton,
}: IProps) => {
  return (
    <Stack>
      {activeStep === 0 ? (
        <TextField label="Promo Code" />
      ) : (
        <IconButton
          sx={{
            backgroundColor: "white",
            borderRadius: "0",
            color: "black",
            display: "flex",
            alignItem: "center",
            columnGap: "24px",
            marginRight: "5px",
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
        <Stack direction="row" columnGap="33px">
          <Typography fontSize="16px" fontWeight={theme.fontWeight.light}>
            Total Cost:
          </Typography>
          <Typography fontSize="16px" fontWeight={theme.fontWeight.semiBold}>
            ${totalCost}
          </Typography>
        </Stack>
      )}

      {activeStep === steps.length && (
        <Stack direction="row" columnGap="16px" alignItems="center">
          <LocalShippingIcon sx={{ width: "20px", height: "12.56px" }} />
          <Typography fontSize="16px" fontWeight={theme.fontWeight.light}>
            You are <Typography>$30,02</Typography> missing for free shipping
          </Typography>
        </Stack>
      )}

      <Stack direction="row" width="max-content" columnGap="26px">
        <Button
          sx={{
            border: `1px solid "#D8D8D8"`,
            borderRadius: "49px",
            color: "#000000",
            fontSize: "13px",
            fontWeight: theme.fontWeight.semiBold,
            textAlign: "center",
            height: "49px",
            width: "203px",
          }}
        >
          CONTINUE SHOPPING
        </Button>
        <Button
          sx={{
            backgroundColor: "#FBB03B",
            borderRadius: "56px",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            fontSize: "13px",
            fontWeight: theme.fontWeight.semiBold,
            textAlign: "center",
            height: "49px",
            width: "116px",
            "&:hover": {
              backgroundColor: "#ffb53d",
            },
          }}
        >
          NEXT STEP
        </Button>
      </Stack>
    </Stack>
  );
};

export default CartFooter;

// Styles
import { IconButton, Stack, SxProps, Theme, Typography } from "@mui/material";
import {
  Add as IncreaseButtonIcon,
  Remove as DecreaseButtonIcon,
} from "@mui/icons-material";
import theme from "../../theme";

interface IProps {
  counterValue: number;
  handleClickDecreaseButton: () => void;
  handleClickIncreaseButton: () => void;
  maxValue: number;
  sx?: SxProps<Theme>;
}

const Counter = ({
  counterValue,
  maxValue,
  handleClickDecreaseButton,
  handleClickIncreaseButton,
  sx,
}: IProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      columnGap="21px"
      sx={{
        border: "1px solid #D8D8D8",
        borderRadius: "49px",
        padding: "15px",
        height: "49px",
        width: "189px",
        ...sx,
      }}
    >
      <IconButton
        component="button"
        sx={{
          color: `${counterValue > 1 ? "#000000" : "#D8D8D8"}`,
        }}
        {...(counterValue === 1 && { disabled: true })}
        onClick={handleClickDecreaseButton}
      >
        <DecreaseButtonIcon />
      </IconButton>
      <Typography
        color="#000000"
        fontSize="16px"
        fontWeight={theme.fontWeight.semiBold}
        textAlign="center"
        sx={{ width: "10px" }}
      >
        {counterValue}
      </Typography>
      <IconButton
        component="button"
        sx={{
          color: `${counterValue >= maxValue ? "#D8D8D8" : "#000000"}`,
        }}
        {...(counterValue >= maxValue && {
          disabled: true,
        })}
        onClick={handleClickIncreaseButton}
      >
        <IncreaseButtonIcon />
      </IconButton>
    </Stack>
  );
};

export default Counter;

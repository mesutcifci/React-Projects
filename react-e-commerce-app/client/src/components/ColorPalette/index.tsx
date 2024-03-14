// Styles
import { Stack, Box, SxProps } from "@mui/material";

interface IProps {
  colors: string[];
  sx?: SxProps;
}

const ColorPalette = ({ colors, sx }: IProps) => {
  return (
    <Stack direction="row" sx={sx}>
      {colors.map((color, index) => (
        <Box
          className="colorBox"
          key={color}
          sx={{
            border: "0.0625rem solid #D4D4D4",
            borderRight: `${index + 1 !== colors.length && "0rem"}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "42px",
            width: "42px",
          }}
        >
          <Box
            className="colorBox"
            sx={{
              width: "1.56rem",
              height: "1.56rem",
              backgroundColor: color,
              border: `${color === "#FFFFFF" && "0.0625rem solid #E6E6E6"}`,
            }}
          ></Box>
        </Box>
      ))}
    </Stack>
  );
};

export default ColorPalette;

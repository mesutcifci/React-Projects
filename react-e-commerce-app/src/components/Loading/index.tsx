// Styles
import { Backdrop, CircularProgress } from "@mui/material";

interface IProps {
  isLoading: boolean;
}

const Loading = ({ isLoading }: IProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;

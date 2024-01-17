// Styles
import { Backdrop, CircularProgress } from "@mui/material";

// Hooks
import { useAppSelector } from "../../app/hooks";

const Loading = () => {
  const {
    user: { loading: userLoading },
    currentUser: { loading: currentUserLoading },
    product: { loading: productLoading },
    products: { loading: productsLoading },
  } = useAppSelector((state) => state);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={
        userLoading || currentUserLoading || productLoading || productsLoading
      }
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;

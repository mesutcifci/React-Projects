// Styles
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Loading = () => {
  const {
    user: { loading: userLoading },
    currentUser: { loading: currentUserLoading },
    product: { loading: productLoading },
    products: { loading: productsLoading },
  } = useSelector((state: RootState) => state);

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

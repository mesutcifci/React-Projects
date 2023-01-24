import { useParams, useNavigate } from "react-router-dom";

// Components
import { Login, Register, ForgotPassword } from "../../components";

// Styles
import { Box, Typography } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import theme from "../../theme";
import { useEffect } from "react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const Auth = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { currentUser, loading: currentUserLoading } = useSelector(
    (state: RootState) => state.currentUser
  );

  useEffect(() => {
    if (!currentUserLoading && !!currentUser) {
      navigate({ pathname: "/" });
    }
  }, [currentUser, currentUserLoading]);

  useEffect(() => {
    const validKeys = ["login", "register", "forgot-password"];
    const isParamKeyValid = validKeys.some((key) => key === params?.key);
    if (params?.key && !isParamKeyValid) {
      navigate({ pathname: `/auth/login` });
    }
  }, [params]);

  const handleClick = () => {
    navigate("/");
  };

  const renderAuthComponent = () => {
    switch (params.key) {
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "forgot-password":
        return <ForgotPassword />;
    }
  };
  return (
    <Box sx={{ marginTop: "15px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "max-content",
          paddingLeft: {
            xs: theme.padding?.pagePaddingXS + "px",
            lg: theme.padding?.pagePaddingLG + "px",
            xl: theme.padding?.pagePaddingXL + "px",
          },
          paddingRight: {
            xs: theme.padding?.pagePaddingXS + "px",
            lg: theme.padding?.pagePaddingLG + "px",
            xl: theme.padding?.pagePaddingXL + "px",
          },
          marginBottom: "27px",
        }}
        onClick={handleClick}
      >
        <ArrowBackIcon sx={{ cursor: "pointer" }} />
        <Typography
          sx={{
            cursor: "pointer",
            marginLeft: "24px",
            fontSize: "14px",
            fontWeight: theme.fontWeight.semiBold,
          }}
        >
          Back to store
        </Typography>
      </Box>
      {renderAuthComponent()}
    </Box>
  );
};

export default Auth;

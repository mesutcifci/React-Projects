import { Login, Register, ForgotPassword } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import theme from "../../theme";

const Auth = () => {
  const params = useParams();
  const navigate = useNavigate();

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
      default:
        return <p>Page not found</p>;
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

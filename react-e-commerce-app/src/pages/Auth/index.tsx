import { Login, Register, ForgotPassword } from "../../components";
import { useParams } from "react-router-dom";

const Auth = () => {
  const params = useParams();
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

export default Auth;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Data
import { auth, db, provider } from "../../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { IUser } from "../../types/user";

// styles
import {
  Stack,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  InputAdornment,
} from "@mui/material";

import {
  Facebook as FacebookIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import theme from "../../theme";

import { GmailIcon } from "../../ui/";
import { sharableInputLabelStyles } from "../../ui/sharableStyles";

// formik
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const initialValues = { email: "", password: "", confirmPassword: "" };

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickPasswordIcon = () => {
    setIsPasswordShown((previousState) => !previousState);
  };

  const checkUserExistInDB = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const user = await getDoc(docRef);
    return user.exists();
  };

  const loginWithGmail = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, provider);
      const isUserExistInDB = await checkUserExistInDB(user.uid);
      if (!isUserExistInDB) {
        const userData: IUser = {
          id: user.uid,
          email: user.email || "",
          fullName: user.displayName || "",
          favoriteProductIds: [],
          userProductsInCart: [],
        };
        await setDoc(doc(db, "users", user.uid), userData);
      }
      navigate("/");
    } catch (error) {
      let typedError = error as AuthError;
      setErrorMessage(typedError.message);
    }
    setLoading(false);
  };

  const loginWithEmail = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      let typedError = error as AuthError;
      switch (typedError.code) {
        case "auth/user-not-found":
          setErrorMessage("User not found");
          break;
        case "auth/wrong-password":
          setErrorMessage("Wrong password");
          break;
      }
    }
    setLoading(false);
  };

  const handleClickForgotPassword = () => {
    navigate({ pathname: "/auth/forgot-password" });
  };

  const handleClickSignUp = () => {
    navigate({ pathname: "/auth/register" });
  };

  const handleChangeInput = () => {
    setErrorMessage("");
  };

  return (
    <Stack
      alignItems="center"
      sx={{
        padding: "1rem",
        "& form": {
          display: "flex",
          flexDirection: "column",
          rowGap: "0.93rem",
          width: "100%",
          maxWidth: "448px",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "3.5rem",
          borderColor: "#D8D8D8",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "1.375rem",
          fontWeight: theme.fontWeight.semiBold,
          marginBottom: "1.5rem",
        }}
      >
        Login
      </Typography>
      <Typography
        sx={{
          color: "#7D7D7D",
          fontSize: "0.81rem",
          fontWeight: theme.fontWeight.regular,
          lineHeight: "1.56rem",
          maxWidth: "358px",
          textAlign: "center",
          marginBottom: "2.5rem",
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={loginWithEmail}
      >
        {({ errors }) => (
          <Form id="loginForm" noValidate onChange={handleChangeInput}>
            <Field
              disabled={loading}
              component={TextField}
              type="email"
              name="email"
              label="Email"
              sx={{ ...sharableInputLabelStyles }}
            />
            <Field
              disabled={loading}
              component={TextField}
              type={isPasswordShown ? "text" : "password"}
              name="password"
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleClickPasswordIcon}
                    sx={{ cursor: "pointer" }}
                  >
                    {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
              sx={{
                ...sharableInputLabelStyles,
                "& .MuiFormHelperText-root": {
                  color: "#d32f2f",
                },
              }}
              helperText={
                errors.password
                  ? errors.password
                  : errorMessage
                  ? errorMessage
                  : ""
              }
            />
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                "& label": { width: "max-content", marginRight: "0" },
              }}
            >
              <Field
                component={FormControlLabel}
                control={<Checkbox />}
                label="Keep me signed in"
                sx={{
                  "& span": {
                    fontSize: "0.81rem",
                    fontWeight: theme.fontWeight.regular,
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.81rem",
                  width: "max-content",
                  fontWeight: theme.fontWeight.regular,
                  color: "#808080",
                  cursor: "pointer",
                }}
                onClick={handleClickForgotPassword}
              >
                Forgot password?
              </Typography>
            </FormGroup>
          </Form>
        )}
      </Formik>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1.25rem",
          width: "100%",
          marginTop: "32px",
        }}
      >
        <Button
          disabled={true}
          variant="contained"
          sx={{
            width: { xs: "100%", sm: "214px" },
            maxWidth: { xs: "400px" },
            height: "3.5rem",
            borderRadius: "3.5rem",
            display: "flex",
            alignItems: "center",
            columnGap: "22.6px",
            backgroundColor: "#3B5998",
          }}
        >
          <FacebookIcon />
          <Typography
            sx={{
              textTransform: "capitalize",
              fontWeight: theme.fontWeight.semiBold,
              fontSize: "0.81rem",
            }}
          >
            Facebook
          </Typography>
        </Button>
        <Button
          disabled={loading}
          onClick={loginWithGmail}
          variant="contained"
          sx={{
            width: { xs: "100%", sm: "214px" },
            maxWidth: { xs: "400px" },
            height: "3.5rem",
            borderRadius: "3.5rem",
            display: "flex",
            alignItems: "center",
            columnGap: "22.6px",
            backgroundColor: "#fdfdfd",
            borderColor: "#F1584D",
            "&:hover": {
              backgroundColor: "#ffffff",
              borderColor: "#F1584D",
            },
          }}
        >
          <GmailIcon
            id="gmailIcon"
            sx={{ marginBottom: "-7px", marginLeft: "-24px" }}
          />
          <Typography
            sx={{
              textTransform: "capitalize",
              color: "#000000",
              fontWeight: theme.fontWeight.semiBold,
              fontSize: "0.81rem",
            }}
          >
            Gmail
          </Typography>
        </Button>
      </Box>
      <Button
        variant="contained"
        form="loginForm"
        type="submit"
        sx={{
          backgroundColor: "#FBB03B",
          borderRadius: "3.5rem",
          display: "flex",
          alignItems: "center",
          fontSize: "0.81rem",
          fontWeight: theme.fontWeight.semiBold,
          marginTop: "1.25rem",
          maxWidth: { xs: "400px", sm: "448px" },
          textAlign: "center",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#ffb53d",
          },
          height: "3.5rem",
          width: "100%",
        }}
      >
        Sign in
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "1.875rem",
          marginTop: "1.375rem",
        }}
      >
        <Typography
          sx={{ fontSize: "0.875rem", fontWeight: theme.fontWeight.regular }}
        >
          Not a member yet?
        </Typography>
        <Typography
          sx={{ fontSize: "0.875rem", fontWeight: "500", cursor: "pointer" }}
          onClick={handleClickSignUp}
        >
          Sign up
        </Typography>
      </Box>
    </Stack>
  );
};

export default Login;

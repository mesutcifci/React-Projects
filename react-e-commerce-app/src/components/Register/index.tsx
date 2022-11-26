import { useState } from "react";

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

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "First name cannot contain a number")
    .min(2, "First name should be of minimum 2 characters length")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Last name cannot contain a number")
    .min(2, "First name should be of minimum 2 characters length")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isPasswordShown, setIsPasswordShown] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleClickPasswordIcon = (key: string) => {
    if (key === "password") {
      setIsPasswordShown((state) => ({ ...state, password: !state.password }));
    } else if (key === "confirmPassword") {
      setIsPasswordShown((state) => ({
        ...state,
        confirmPassword: !state.confirmPassword,
      }));
    }
  };

  return (
    <Stack
      alignItems="center"
      sx={{
        padding: "16px",
        "& form": {
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
          width: "100%",
          maxWidth: "448px",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "56px",
          borderColor: "#D8D8D8",
        },
      }}
    >
      <Typography
        sx={{ fontSize: "22px", fontWeight: "500", marginBottom: "24px" }}
      >
        Create an account and discover the benefits
      </Typography>

      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: "200",
          lineHeight: "25px",
          maxWidth: "358px",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form>
            <Field
              component={TextField}
              type="text"
              name="firstName"
              label="First Name"
            />
            <Field
              component={TextField}
              type="text"
              name="lastName"
              label="Last Name"
            />
            <Field
              component={TextField}
              type="email"
              name="email"
              label="Email"
            />
            <Field
              component={TextField}
              type={isPasswordShown ? "text" : "password"}
              name="password"
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => handleClickPasswordIcon("password")}
                    sx={{ cursor: "pointer" }}
                  >
                    {isPasswordShown.password ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Field
              component={TextField}
              type={isPasswordShown ? "text" : "password"}
              name="confirmPassword"
              label="Confirm Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => handleClickPasswordIcon("confirmPassword")}
                    sx={{ cursor: "pointer" }}
                  >
                    {isPasswordShown.confirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </InputAdornment>
                ),
              }}
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
                label="I agree to the Google Terms of Service and Privacy Policy"
                sx={{ "& span": { fontSize: "13px", fontWeight: "300" } }}
              />
            </FormGroup>
          </Form>
        )}
      </Formik>

      <Button
        variant="contained"
        sx={{
          width: "100%",
          maxWidth: { xs: "400px", sm: "448px" },
          height: "56px",
          borderRadius: "56px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#FBB03B",
          marginTop: "20px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#ffb53d",
          },
          fontSize: "13px",
        }}
      >
        Sign up
      </Button>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "30px",
          marginTop: "22px",
        }}
      >
        <Typography
          sx={{ fontSize: "14px", fontWeight: "500", cursor: "pointer" }}
        >
          Sign up
        </Typography>
        <Typography
          sx={{ fontSize: "14px", fontWeight: "300", cursor: "pointer" }}
        >
          Not a member yet?
        </Typography>
      </Box>
    </Stack>
  );
};

export default Register;

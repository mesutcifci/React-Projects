import { useState } from "react";

import { Stack, Divider, Typography, Button } from "@mui/material";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { MuiTelInput } from "mui-tel-input";

import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email"),
});

const initialValues = { email: "" };

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");

  const handleChangePhoneNumber = (newPhone: string) => {
    console.log(newPhone);
    setPhone(newPhone);
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
        Forgot your password?
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
        Enter your email or phone number and recover your account
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
              type="email"
              name="email"
              label="Email"
            />
            <Divider
              sx={{
                "&:before, &:after": {
                  borderColor: "#D8D8D8",
                  maxWidth: "150px",
                },
                "&:before": {
                  marginRight: "auto",
                },
                "&:after": {
                  marginLeft: "auto",
                },
              }}
            >
              <Typography
                sx={{ fontSize: "13px", fontWeight: "400", color: "#BEBEBE" }}
              >
                OR
              </Typography>
            </Divider>
            <MuiTelInput
              defaultCountry="US"
              value={phone}
              onChange={handleChangePhoneNumber}
            />
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
        Reset password
      </Button>
    </Stack>
  );
};

export default ForgotPassword;

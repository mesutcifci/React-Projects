import { useState } from "react";

// Styles
import { Stack, Divider, Typography, Button } from "@mui/material";
import theme from "../../theme";
import { sharableInputLabelStyles } from "../../ui/sharableStyles";

// Formik
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
    setPhone(newPhone);
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
        Forgot your password?
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
        Enter your email or phone number and recover your account
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {() => (
          <Form>
            <Field
              component={TextField}
              type="email"
              name="email"
              label="Email"
              sx={{ ...sharableInputLabelStyles }}
            />
            <Divider
              sx={{
                "&:before, &:after": {
                  borderColor: "#D8D8D8",
                  maxWidth: "9.375rem",
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
                sx={{
                  fontSize: "0.81rem",
                  fontWeight: theme.fontWeight.regular,
                  color: "#BEBEBE",
                }}
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
          height: "3.5rem",
          borderRadius: "3.5rem",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#FBB03B",
          marginTop: "1.25rem",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#ffb53d",
          },
          fontSize: "0.81rem",
          fontWeight: theme.fontWeight.semiBold,
        }}
      >
        Reset password
      </Button>
    </Stack>
  );
};

export default ForgotPassword;

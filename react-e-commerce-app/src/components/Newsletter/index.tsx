// Styles
import { Box, Button, Stack, Typography } from "@mui/material";
import theme from "../../theme";

// Formik
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email"),
});

const initialValues = { email: "" };

const Newsletter = () => {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/react-e-commerce-f354a.appspot.com/o/common%2Fnewsletter.webp?alt=media&token=2e8c04dc-c700-4d7a-85bf-22e78ebea64f)",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        gap: "20px 46px",
        height: "262px",
        marginTop: { xs: "40px", md: "90px" },
        marginBottom: { xs: "40px", md: "90px" },
        padding: "16px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "20px", sm: "25px" },
          fontWeight: theme.fontWeight.regular,
          maxWidth: { xs: "350px", sm: "420px", lg: "505px" },
          width: "100%",
        }}
        color="#ffffff"
      >
        Subscribe to our newsletter and receive exclusive offers every week
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ errors }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                columnGap: "20px",
                rowGap: "21px",
                maxWidth: { xs: "350px", sm: "470px" },
                width: "100%",
              }}
            >
              <Field
                component={TextField}
                type="email"
                name="email"
                placeholder="Enter your email"
                sx={{
                  "& .MuiInputBase-root": {
                    border: "0px",
                  },
                  "& .MuiOutlinedInput-input": {
                    backgroundColor: "#ffffff",
                    borderRadius: "48px",
                    boxSizing: "border-box",
                    height: "48px",
                    maxWidth: "315px",
                    width: "100%",
                    ...(errors.email && { color: "#FF6666 !important" }),
                  },
                  "& .MuiFormHelperText-root": {
                    display: "none",
                  },
                  "& *": {
                    border: "0px !important",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#808080",
                    fontSize: "13px",
                    fontWeight: theme.fontWeight.regular,
                  },
                }}
              />
              <Button
                sx={{
                  backgroundColor: "#FBB03B",
                  borderRadius: "56px",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "13px",
                  fontWeight: theme.fontWeight.semiBold,
                  height: "48px",
                  maxWidth: { xs: "400px", sm: "448px" },
                  padding: "15px 24px 14px 25px",
                  textAlign: "center",
                  textTransform: "none",
                  width: "119px",
                  "&:hover": {
                    backgroundColor: "#ffb53d",
                  },
                }}
              >
                SUBSCRIBE
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default Newsletter;

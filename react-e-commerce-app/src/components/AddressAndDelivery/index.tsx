import { useEffect, useState } from "react";
import * as yup from "yup";

import {
  Box,
  InputLabel,
  Stack,
  SxProps,
  Theme,
  TextField as MuiTextField,
  InputAdornment,
  Autocomplete as MuiAutocomplete,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { TextField } from "formik-mui";

import { ICountry } from "../../types/country";
import { ICardData } from "../../types/deliveryCard";
import countries from "../../constants/countries.json";
import delivery from "../../constants/delivery.json";

import { DeliveryIconDHL, DeliveryIconDPD, DeliveryIconInPost } from "../../ui";
import DeliveryCard from "../DeliveryCard";
import theme from "../../theme";

interface IProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
interface IinitialFormValues {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  country: ICountry;
  email: string;
}

const inputContainerStyles: SxProps<Theme> = {
  height: "130px",
};

const inputLabelStyles: SxProps<Theme> = {
  color: "#000000",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: theme.fontWeight.semiBold,
  marginBottom: "12px",
};

const inputStyles: SxProps<Theme> = {
  "& .MuiInputBase-root": {
    borderRadius: "56px",
    width: "100%",
    maxWidth: "336px",
    minWidth: { sm: "336px" },
  },

  "& .MuiFormHelperText-root": {
    margin: "5px 0px 0px 5px",
    width: "300px",
  },

  "& .MuiInputBase-input": {
    fontSize: { sm: "13px" },
    fontWeight: { sm: theme.fontWeight.regular },
  },
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .matches(/^[\p{L}\p{M}-]+$/u, "First name cannot contain a number")
    .min(2, "First name should be of minimum 2 characters length")
    .required("First name is required"),
  lastName: yup
    .string()
    .trim()
    .matches(/^[\p{L}\p{M}-]+$/u, "Last name cannot contain a number")
    .min(2, "Last name should be of minimum 2 characters length")
    .required("Last name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  phone: yup
    .string()
    .min(3, "Enter a valid phone number!")
    .required("Phone number is required"),
  postalCode: yup.string().required("Postal code is required"),
  country: yup.object({ label: yup.string().required("Country is required") }),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const AddressAndDelivery = ({ setActiveStep }: IProps) => {
  const [selectedCard, setSelectedCard] = useState(delivery[0]);
  const [initialFormValues, setFormInitialValues] =
    useState<IinitialFormValues>({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "+1",
      country: countries[230],
      email: "",
    });

  useEffect(() => {
    let formValueLocalStorage = localStorage.getItem("addressData") || "";

    if (formValueLocalStorage) {
      setFormInitialValues(JSON.parse(formValueLocalStorage));
    }
  }, []);

  const setAndReturnCardIcon = (iconName: string) => {
    switch (iconName) {
      case "inPost":
        return <DeliveryIconInPost />;
      case "dhl":
        return <DeliveryIconDHL />;
      case "dpd":
        return <DeliveryIconDPD />;
    }
  };

  const handleSelectCard = (item: ICardData) => {
    setSelectedCard(item);
  };

  const renderDeliveryCards = () => {
    return delivery.map((item) => {
      const icon = setAndReturnCardIcon(item.iconName);
      return (
        <DeliveryCard
          key={item.id}
          cardData={item}
          icon={icon!}
          sx={{
            border: `1px solid ${
              selectedCard.id === item.id ? "#FBB03B" : "#D8D8D8"
            }`,
            opacity: selectedCard.id === item.id ? 1 : 0.5,
            transition: "scale 200ms linear",
            "&:hover": { scale: `1.05` },
          }}
          onClick={() => handleSelectCard(item)}
        />
      );
    });
  };

  const handleSubmitForm = (values: IinitialFormValues) => {
    if (matchIsValidTel(values.phone)) {
      localStorage.setItem(
        "addressData",
        JSON.stringify({ ...values, selectedCard })
      );
      setActiveStep((previousState) => previousState + 1);
    }
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="flex-start"
      rowGap="60px"
      sx={{
        justifyContent: { xs: "center", lg1300: "space-between" },
        columnGap: { xs: "10px", lg: "25px", xl: "54px" },
      }}
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        sx={{ width: "100%", maxWidth: { xs: "705px", xl: "760px" } }}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={handleSubmitForm}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ errors, setFieldValue, values, status, setStatus }) => {
            return (
              <Form id="addressAndDeliveryForm" noValidate>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  justifyContent="center"
                  sx={{ gap: { xs: "10px 25px", xl: "15px 87px" } }}
                >
                  {/* FIRST NAME */}
                  <Box sx={{ ...inputContainerStyles }}>
                    <InputLabel
                      htmlFor="firstName"
                      sx={{ ...inputLabelStyles }}
                    >
                      First Name
                    </InputLabel>
                    <Field
                      component={TextField}
                      type="text"
                      name="firstName"
                      id="firstName"
                      sx={{ ...inputStyles }}
                      disabled={false}
                    />
                  </Box>

                  {/* LAST NAME */}
                  <Box sx={{ ...inputContainerStyles }}>
                    <InputLabel htmlFor="lastName" sx={{ ...inputLabelStyles }}>
                      Last Name
                    </InputLabel>
                    <Field
                      component={TextField}
                      type="text"
                      name="lastName"
                      id="lastName"
                      sx={{ ...inputStyles }}
                      disabled={false}
                    />
                  </Box>

                  {/* ADDRESS */}
                  <Box sx={{ ...inputContainerStyles }}>
                    <InputLabel htmlFor="address" sx={{ ...inputLabelStyles }}>
                      Address
                    </InputLabel>
                    <Field
                      component={TextField}
                      type="text"
                      name="address"
                      id="address"
                      sx={{ ...inputStyles }}
                      disabled={false}
                    />
                  </Box>

                  {/* CITY */}
                  <Box sx={{ ...inputContainerStyles }}>
                    <InputLabel htmlFor="city" sx={{ ...inputLabelStyles }}>
                      City
                    </InputLabel>
                    <Field
                      component={TextField}
                      type="text"
                      name="city"
                      id="city"
                      sx={{ ...inputStyles }}
                      disabled={false}
                    />
                  </Box>

                  {/*  Postal Code / ZIP */}
                  <Box sx={{ ...inputContainerStyles }}>
                    <InputLabel
                      htmlFor="postalCode"
                      sx={{ ...inputLabelStyles }}
                    >
                      Postal Code / ZIP
                    </InputLabel>
                    <Field
                      component={TextField}
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      sx={{ ...inputStyles }}
                      disabled={false}
                    />
                  </Box>

                  {/*  Phone number */}
                  <Box sx={{ ...inputContainerStyles }}>
                    <InputLabel htmlFor="phone" sx={{ ...inputLabelStyles }}>
                      Phone number
                    </InputLabel>
                    <Field
                      component={MuiTelInput}
                      name="phone"
                      id="phone"
                      focusOnSelectCountry
                      defaultCountry="US"
                      value={values.phone}
                      onChange={(newPhone: string) => {
                        setFieldValue("phone", newPhone);
                        if (
                          newPhone.length !== 0 &&
                          !matchIsValidTel(newPhone)
                        ) {
                          setStatus({ phone: "Enter a valid phone number" });
                        } else {
                          setStatus({ phone: "" });
                        }
                      }}
                      sx={{
                        ...inputStyles,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: `${status?.phone && "#d32f2f"}`,
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#d32f2f",
                        },
                      }}
                      helperText={errors.phone || status?.phone}
                    />
                  </Box>

                  {/*  Country */}
                  <Box
                    sx={{
                      ...inputContainerStyles,
                      width: "100%",
                      maxWidth: "336px",
                    }}
                  >
                    <InputLabel htmlFor="country" sx={{ ...inputLabelStyles }}>
                      Country
                    </InputLabel>
                    <MuiAutocomplete
                      disabled={false}
                      sx={{
                        ...inputStyles,
                        "& .MuiInputAdornment-root ": { paddingLeft: "14.2px" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: `${errors.country?.label && "#d32f2f"}`,
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#d32f2f",
                        },
                      }}
                      defaultValue={countries[230]}
                      onChange={(_, value) => {
                        if (value) {
                          setFieldValue("country", value);
                        } else {
                          setFieldValue("country", {
                            code: "",
                            label: "",
                            phone: "",
                          });
                        }
                      }}
                      options={countries}
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.label} ({option.code}) +{option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: values?.country?.label && (
                              <InputAdornment position="start">
                                <img
                                  loading="lazy"
                                  width="30"
                                  src={`https://flagcdn.com/w20/${values.country.code.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${values.country.code.toLowerCase()}.png 2x`}
                                  alt={values.country.label}
                                />
                              </InputAdornment>
                            ),
                          }}
                          {...(errors.country && {
                            helperText: errors.country,
                          })}
                          helperText={
                            errors.country?.label && errors.country.label
                          }
                        />
                      )}
                    />
                  </Box>

                  {/*  Email */}
                  <Box sx={{ ...inputContainerStyles }}>
                    <InputLabel htmlFor="email" sx={{ ...inputLabelStyles }}>
                      Email
                    </InputLabel>
                    <Field
                      component={TextField}
                      type="text"
                      name="email"
                      id="email"
                      sx={{ ...inputStyles }}
                      disabled={false}
                    />
                  </Box>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: "470px",
          rowGap: "16px",
          columnGap: "19px",
          marginTop: { lg: "33px" },
        }}
      >
        {renderDeliveryCards()}
      </Stack>
    </Stack>
  );
};

export default AddressAndDelivery;

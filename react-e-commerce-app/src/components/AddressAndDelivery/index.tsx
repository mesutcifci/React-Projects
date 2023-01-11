import { useState } from "react";
import countries from "../../constants/countries.json";

import {
  AutocompleteRenderInputParams,
  Box,
  InputLabel,
  Stack,
  SxProps,
  Theme,
  TextField as MuiTextField,
  AutocompleteRenderOptionState,
  InputAdornment,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { Field, Form, Formik } from "formik";
import { Autocomplete, TextField } from "formik-mui";
import { ICountry } from "../../types/country";
import { DeliveryIconDHL, DeliveryIconDPD, DeliveryIconInPost } from "../../ui";

interface IinitialValues {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
}

const initialValues: IinitialValues = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  email: "",
};

const inputContainerStyles: SxProps<Theme> = {
  marginBottom: "27px",
};

const inputLabelStyles: SxProps<Theme> = {
  color: "#000000",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "12px",
};

const inputStyles: SxProps<Theme> = {
  "& .MuiInputBase-root": {
    borderRadius: "56px",
    width: "100%",
    maxWidth: "336px",
  },
};

const AddressAndDelivery = () => {
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[230]);
  const [openAutoComplete, setOpenAutoComplete] = useState(false);

  const handleChangePhoneNumber = (newPhone: string) => {
    setPhone(newPhone);
  };
  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        sx={{ width: "100%", maxWidth: "760px" }}
      >
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {() => (
            <Form id="addressAndDeliveryForm" noValidate>
              <Stack direction="row" flexWrap="wrap" justifyContent="center">
                {/* FIRST NAME */}
                <Box sx={{ ...inputContainerStyles }}>
                  <InputLabel htmlFor="firstName" sx={{ ...inputLabelStyles }}>
                    First Name
                  </InputLabel>
                  <Field
                    component={TextField}
                    type="text"
                    name="firstName"
                    id="firstName"
                    sx={{ ...inputStyles }}
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
                  />
                </Box>

                {/*  Postal Code / ZIP */}
                <Box sx={{ ...inputContainerStyles }}>
                  <InputLabel htmlFor="postalCode" sx={{ ...inputLabelStyles }}>
                    Postal Code / ZIP
                  </InputLabel>
                  <Field
                    component={TextField}
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    sx={{ ...inputStyles }}
                  />
                </Box>

                {/*  Phone number */}
                <Box sx={{ ...inputContainerStyles }}>
                  <InputLabel
                    htmlFor="phoneNumber"
                    sx={{ ...inputLabelStyles }}
                  >
                    Phone number
                  </InputLabel>
                  <MuiTelInput
                    defaultCountry="US"
                    value={phone}
                    onChange={handleChangePhoneNumber}
                    sx={{ ...inputStyles }}
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
                  <Field
                    component={Autocomplete}
                    name="country"
                    id="country"
                    options={countries}
                    getOptionLabel={(option: ICountry) =>
                      option?.label || countries[230].label
                    }
                    sx={{
                      ...inputStyles,
                      "& .MuiInputAdornment-root ": { paddingLeft: "14.2px" },
                    }}
                    open={openAutoComplete}
                    onOpen={() => setOpenAutoComplete(true)}
                    onClose={() => setOpenAutoComplete(false)}
                    value={selectedCountry.label}
                    onChange={(event: any, newValue: ICountry) => {
                      setSelectedCountry(newValue);
                    }}
                    renderOption={(
                      props: AutocompleteRenderOptionState,
                      option: ICountry
                    ) => (
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
                          alt={option.label}
                        />
                        {option.label} ({option.code}) +{option.phone}
                      </Box>
                    )}
                    renderInput={(params: AutocompleteRenderInputParams) => {
                      return (
                        <MuiTextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: selectedCountry ? (
                              <InputAdornment
                                position="start"
                                onClick={() => setOpenAutoComplete(true)}
                              >
                                <img
                                  loading="lazy"
                                  width="30"
                                  src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                                  alt={selectedCountry.label}
                                />
                              </InputAdornment>
                            ) : null,
                          }}
                        />
                      );
                    }}
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
                  />
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default AddressAndDelivery;

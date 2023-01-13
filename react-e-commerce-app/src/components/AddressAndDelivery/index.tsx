import { useEffect, useState } from "react";

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
import countries from "../../constants/countries.json";
import delivery from "../../constants/delivery.json";
import { DeliveryIconDHL, DeliveryIconDPD, DeliveryIconInPost } from "../../ui";
import DeliveryCard from "../DeliveryCard";
import { ICardData } from "../../types/deliveryCard";
import theme from "../../theme";

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

const inputContainerStyles: SxProps<Theme> = {};

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

  "& .MuiInputBase-input": {
    fontSize: { sm: "13px" },
    fontWeight: { sm: theme.fontWeight.regular },
  },
};

const AddressAndDelivery = () => {
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[230]);
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(delivery[0]);

  const handleChangePhoneNumber = (newPhone: string) => {
    setPhone(newPhone);
  };

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

  const handleSubmitForm = (values: IinitialValues) => {
    const addressData = {
      ...values,
      selectedCountry,
      phone,
    };

    localStorage.setItem("addressData", JSON.stringify(addressData));
    localStorage.setItem("selectedDeliveryCard", JSON.stringify(selectedCard));
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
        <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
          {() => (
            <Form id="addressAndDeliveryForm" noValidate>
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                sx={{ gap: { xs: "25px", xl: "25px 87px" } }}
              >
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

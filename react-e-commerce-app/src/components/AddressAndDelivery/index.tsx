import { useEffect, useState } from "react";
import * as yup from "yup";

// Styles
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
import theme from "../../theme";

// Formik
import { Field, Form, Formik, setNestedObjectValues } from "formik";
import { TextField } from "formik-mui";

// Data
import { ICardData } from "../../types/deliveryCard";
import countries from "../../constants/countries.json";
import delivery from "../../constants/delivery.json";
import {
  ICartAddressData,
  IPhone,
  ISelectedCountry,
} from "../../types/cartTypes";
import { ICountry } from "../../types/country";

// Components
import { DeliveryIconDHL, DeliveryIconDPD, DeliveryIconInPost } from "../../ui";
import { DeliveryMethodCard } from "../";

interface IProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
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
  postalCode: yup.string().required("Postal code is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const AddressAndDelivery = ({ setActiveStep }: IProps) => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    delivery[0]
  );
  const [selectedCountry, setSelectedCountry] =
    useState<ISelectedCountry | null>({
      value: JSON.parse(localStorage.getItem("selectedCountry") as string),
      error: "",
    });
  const [phone, setPhone] = useState<IPhone>({ value: "", error: "" });
  const [initialFormValues, setInitialFormValues] = useState<ICartAddressData>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    email: "",
  });

  useEffect(() => {
    let selectedDeliveryMethodLocalStorage = JSON.parse(
      localStorage.getItem("selectedDeliveryMethod") as string
    );
    if (selectedDeliveryMethodLocalStorage) {
      setSelectedDeliveryMethod(selectedDeliveryMethodLocalStorage);
    }

    let formValueLocalStorage = JSON.parse(
      localStorage.getItem("addressData") as string
    );
    if (formValueLocalStorage) {
      setInitialFormValues(formValueLocalStorage);
    }

    let selectedCountryLocalStorage = JSON.parse(
      localStorage.getItem("selectedCountry") as string
    );
    if (selectedCountryLocalStorage) {
      setSelectedCountry({
        value: { ...selectedCountryLocalStorage },
        error: "",
      });
    }

    let phoneLocalStorage = localStorage.getItem("phone") as string;
    if (phoneLocalStorage) {
      setPhone({ value: phoneLocalStorage, error: "" });
    }
  }, []);

  const returnCardIcon = (iconName: string) => {
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
    setSelectedDeliveryMethod(item);
    localStorage.setItem("selectedDeliveryMethod", JSON.stringify(item));
  };

  const renderDeliveryMethodCards = () => {
    return delivery.map((item) => {
      const icon = returnCardIcon(item.iconName);
      return (
        <DeliveryMethodCard
          key={item.id}
          cardData={item}
          icon={icon!}
          sx={{
            border: `1px solid ${
              selectedDeliveryMethod.id === item.id ? "#FBB03B" : "#D8D8D8"
            }`,
            cursor: "pointer",
            opacity: selectedDeliveryMethod.id === item.id ? 1 : 0.5,
            transition: "scale 200ms linear",
            "&:hover": { scale: `1.05` },
          }}
          onClick={() => handleSelectCard(item)}
        />
      );
    });
  };

  const returnErrorMessage = (
    fieldName: string,
    value: string | ICountry | null | undefined
  ) => {
    let errorMessage = "";
    if (fieldName === "phone") {
      if (!value) {
        errorMessage = "Phone number is required";
      } else if (!matchIsValidTel(value as string)) {
        errorMessage = "Enter a valid phone number";
      }
    } else if (fieldName === "country") {
      if (!value) {
        errorMessage = "Country is required";
      }
    }
    return errorMessage;
  };

  const validateField = (
    fieldName: string,
    value: string | ICountry | null | undefined,
    callback: (error: string) => void
  ) => {
    let isValid = true;
    const error = returnErrorMessage(fieldName, value);
    if (error) {
      callback(error);
      isValid = false;
    }

    return isValid;
  };

  const handleChangeSelectedCountry = (
    event: React.SyntheticEvent<Element, Event>,
    value: ICountry | null
  ) => {
    const error = returnErrorMessage("country", value);
    setSelectedCountry({ value, error });
  };

  const handleChangePhone = (value: string) => {
    const error = returnErrorMessage("phone", value);
    setPhone({ value, error });
  };

  const handleSubmitForm = (values: ICartAddressData) => {
    localStorage.setItem("addressData", JSON.stringify({ ...values }));
    localStorage.setItem(
      "selectedDeliveryMethod",
      JSON.stringify(selectedDeliveryMethod)
    );
    localStorage.setItem(
      "selectedCountry",
      JSON.stringify(selectedCountry?.value)
    );
    localStorage.setItem("phone", phone.value);
    setActiveStep((previousState) => previousState + 1);
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
          onSubmit={() => {}}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ values, validateForm, setTouched }) => {
            return (
              <Form
                id="addressAndDeliveryForm"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  validateForm(values).then((error) => {
                    // validate not formik fields
                    const isPhoneValid = validateField(
                      "phone",
                      phone.value,
                      (error) => {
                        setPhone((previousState) => ({
                          ...previousState,
                          error,
                        }));
                      }
                    );
                    const isCountryValid = validateField(
                      "country",
                      selectedCountry?.value,
                      (error) => {
                        setSelectedCountry((previousState) => ({
                          ...(previousState as ISelectedCountry),
                          error,
                        }));
                      }
                    );

                    if (
                      Object.keys(error).length > 0 ||
                      !isPhoneValid ||
                      !isCountryValid
                    ) {
                      // show all errors
                      setTouched(setNestedObjectValues(error, true));
                    } else {
                      handleSubmitForm(values);
                    }
                  });
                }}
              >
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
                      Phone Number
                    </InputLabel>
                    <Field
                      component={MuiTelInput}
                      name="phone"
                      id="phone"
                      focusOnSelectCountry
                      value={phone.value}
                      onChange={handleChangePhone}
                      onBlur={() =>
                        validateField("phone", phone.value, (error) => {
                          setPhone((previousState) => ({
                            ...previousState,
                            error,
                          }));
                        })
                      }
                      sx={{
                        ...inputStyles,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: `${phone.error && "#d32f2f"}`,
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#d32f2f",
                        },
                      }}
                      helperText={phone.error && phone.error}
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
                      id="country"
                      disabled={false}
                      sx={{
                        ...inputStyles,
                        "& .MuiInputAdornment-root ": { paddingLeft: "14.2px" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: `${selectedCountry?.error && "#d32f2f"}`,
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#d32f2f",
                        },
                      }}
                      value={selectedCountry?.value}
                      isOptionEqualToValue={() => true}
                      onChange={handleChangeSelectedCountry}
                      onBlur={() =>
                        validateField(
                          "country",
                          selectedCountry?.value,
                          (error) => {
                            setSelectedCountry((previousState) => ({
                              ...(previousState as ISelectedCountry),
                              error,
                            }));
                          }
                        )
                      }
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
                            startAdornment: selectedCountry &&
                              selectedCountry?.value && (
                                <InputAdornment position="start">
                                  <img
                                    loading="lazy"
                                    width="30"
                                    src={`https://flagcdn.com/w20/${selectedCountry.value.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${selectedCountry.value.code.toLowerCase()}.png 2x`}
                                    alt={selectedCountry.value.label}
                                  />
                                </InputAdornment>
                              ),
                          }}
                          helperText={
                            selectedCountry?.error && selectedCountry.error
                          }
                          data-testid="countryInput"
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
        {renderDeliveryMethodCards()}
      </Stack>
    </Stack>
  );
};

export default AddressAndDelivery;

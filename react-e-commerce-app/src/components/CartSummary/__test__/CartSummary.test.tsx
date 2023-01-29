import { screen } from "@testing-library/react";
import CartSummary from "..";
import { renderWithProviders } from "../../../utils/test-utils";
import { ICartAddressData } from "../../../types/cartTypes";
import { ICountry } from "../../../types/country";

const setActiveStep = jest.fn();

const localStorageData = [
  {
    key: "addressData",
    value: {
      firstName: "John",
      lastName: "Doe",
      address: "address",
      city: "City",
      postalCode: "06600",
      email: "example@gmail.com",
    },
  },
  {
    key: "selectedDeliveryMethod",
    value: {
      id: "inPost1",
      price: "15.00",
      description: "Payment in advance",
      iconName: "inPost",
    },
  },
  {
    key: "selectedCountry",
    value: { code: "AL", label: "Albania", phone: "355" },
  },
  { key: "phone", value: "+90 539 999 99 99" },
];

const titles = [
  "Payment method",
  "Delivery method",
  "Address delivery",
  "Your cart",
];

const addressData = localStorageData[0].value as ICartAddressData;

describe("CartSummary", () => {
  beforeAll(() => {
    localStorageData.forEach((data) => {
      if (data.key === "phone") {
        localStorage.setItem(data.key, data.value as string);
      } else {
        localStorage.setItem(data.key, JSON.stringify(data.value));
      }
    });
  });

  beforeEach(() => {
    renderWithProviders(<CartSummary setActiveStep={setActiveStep} />, {
      preloadedState: {
        products: {
          products: null,
          productsByIds: null,
          productsByCategory: null,
          cartProducts: {
            products: [
              {
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/react-e-commerce-f354a.appspot.com/o/products%2Foxford-shirt.webp?alt=media&token=5d5c6d7e-5b7e-4aa9-aff6-88ffcd9ac846",
                primaryCategory: "men",
                price: 239.97,
                description: {
                  details:
                    "This classic Oxford shirt is a wardrobe staple that every man should own. Made with soft and durable cotton, it's comfortable to wear all day long. The button-down collar adds a touch of sophistication, while the slim fit design flatters the figure. It's a versatile piece that can be dressed up or down, making it perfect for any occasion.",
                  materials: ["Cotton"],
                },
                secondaryCategory: "clo",
                sizes: ["sm", "md", "l", "xl", "xxl"],
                colors: ["#6F3E18", "#0F73AD"],
                collections: ["cl2"],
                isFavorite: false,
                id: "GryNuyQRSAGOCrsjZkoG",
                name: "Oxford Shirt",
                stockAmount: 10,
                tertiaryCategory: "sh",
                discountRate: 0,
                amount: 3,
              },
            ],
            totalCost: 239.97,
          },
          favoriteProducts: null,
          loading: false,
        },
      },
    });
  });

  test("Should render PaymentMethodsRenderer component", () => {
    const paymentMethodCards = screen.getAllByTestId("paypal");
    // PaymentMethodsRenderer component renders inside of two separate component.
    // It's mean we should two copy of each PaymentMethodCards
    expect(paymentMethodCards.length).toBe(2);
  });

  test("Should render all titles", () => {
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("Should render delivery method card", () => {
    expect(screen.getByText("CHANGE")).toBeInTheDocument();
  });

  test("Should render fullName", () => {
    const fullName = `${addressData.firstName} ${addressData.lastName}`;
    expect(screen.getByText(fullName)).toBeInTheDocument();
  });

  test("Should render address, city and postal code", () => {
    const address = `${addressData.address}. ${addressData.city}, ${addressData.postalCode}`;
    expect(screen.getByText(address)).toBeInTheDocument();
  });

  test("Should render country", () => {
    const countryData = localStorageData[2].value as ICountry;
    expect(screen.getByText(countryData.label)).toBeInTheDocument();
  });

  test("Should render phone", () => {
    const phone = localStorageData[3].value as string;
    expect(screen.getByText(phone)).toBeInTheDocument();
  });

  test("Should render CHANGE ADDRESS button", () => {
    expect(screen.getByText("CHANGE ADDRESS")).toBeInTheDocument();
  });

  test("Should render Total  cost label", () => {
    expect(screen.getByText("Total cost:")).toBeInTheDocument();
  });

  test("Should render Total cost value", () => {
    expect(screen.getByText("$239.97")).toBeInTheDocument();
  });

  test("Should render product image", () => {
    expect(screen.getByAltText("Oxford Shirt")).toBeInTheDocument();
  });

  test("Should render product name", () => {
    expect(screen.getByText("Oxford Shirt")).toBeInTheDocument();
  });

  test("Should render product color", () => {
    expect(screen.getByText("White")).toBeInTheDocument();
  });

  test("Should render product size", () => {
    expect(screen.getByText("XL")).toBeInTheDocument();
  });

  test("Should render product price", () => {
    expect(screen.getByText("239.97")).toBeInTheDocument();
  });

  test("Should render product amount", () => {
    expect(screen.getByText("x3")).toBeInTheDocument();
  });
});

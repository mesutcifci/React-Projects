import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddressDataAndDelivery from "../index";
import deliveryMethods from "../../../constants/delivery.json";

const inputLabelTexts = [
  "First Name",
  "Last Name",
  "Address",
  "City",
  "Postal Code / ZIP",
  "Phone Number",
  "Country",
  "Email",
];

describe("AddressDataAndDelivery test", () => {
  beforeEach(() => {
    render(<AddressDataAndDelivery setActiveStep={() => {}} />);
  });

  test("Input labels should be visible", () => {
    inputLabelTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test("Inputs should be visible", () => {
    inputLabelTexts.forEach((text) => {
      expect(screen.getByLabelText(text)).toBeInTheDocument();
    });
  });

  test("Delivery method cards should be visible", () => {
    deliveryMethods.forEach((method) => {
      expect(screen.getByTestId(method.id)).toBeInTheDocument();
    });
  });

  test("Should be able to type in inputs", () => {
    inputLabelTexts.forEach(async (text) => {
      const inputElement: HTMLInputElement = screen.getByLabelText(text);
      if (text === "Phone Number") {
        fireEvent.change(inputElement, {
          target: { value: `+90 534 404 44 44` },
        });
        expect(inputElement.value).toBe(`+90 534 404 44 44`);
      } else if (text === "Country") {
        fireEvent.focus(inputElement);
        fireEvent.change(inputElement, {
          target: { value: `Tur` },
        });
        // wait for the options to appear
        const option = await waitFor(() => screen.getByText("Turkey"));
        fireEvent.click(option);
        expect(inputElement.value).toBe("Turkey");
        expect(screen.getByText("Turkey")).toBeInTheDocument();
        // Check input adornment
        expect(screen.getAllByAltText("Turkey")).toBeInTheDocument();
      } else {
        fireEvent.change(inputElement, { target: { value: `Test ${text}` } });
        expect(inputElement.value).toBe(`Test ${text}`);
      }
    });
  });

  // TODO test input error messages
});

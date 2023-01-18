import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddressDataAndDelivery from "../index";
import deliveryMethods from "../../../constants/delivery.json";

const inputData = [
  { label: "First Name", error: "First name is required" },
  { label: "Last Name", error: "Last name is required" },
  { label: "Address", error: "Address is required" },
  { label: "City", error: "City name is required" },
  { label: "Postal Code / ZIP", error: "Postal code is required" },
  { label: "Phone Number", error: "Phone number is required" },
  { label: "Country", error: "Country is required" },
  { label: "Email", error: "Email is required" },
];

describe("AddressDataAndDelivery test", () => {
  beforeEach(() => {
    render(<AddressDataAndDelivery setActiveStep={() => {}} />);
  });

  test("Input labels should be visible", () => {
    inputData.forEach((data) => {
      expect(screen.getByText(data.label)).toBeInTheDocument();
    });
  });

  test("Inputs should be visible", () => {
    inputData.forEach((data) => {
      expect(screen.getByLabelText(data.label)).toBeInTheDocument();
    });
  });

  test("Delivery method cards should be visible", () => {
    deliveryMethods.forEach((method) => {
      expect(screen.getByTestId(method.id)).toBeInTheDocument();
    });
  });

  test("Should be able to type in inputs", () => {
    inputData.forEach(async (data) => {
      const inputElement: HTMLInputElement = screen.getByLabelText(data.label);
      if (data.label === "Phone Number") {
        fireEvent.change(inputElement, {
          target: { value: `+90 534 404 44 44` },
        });
        expect(inputElement.value).toBe(`+90 534 404 44 44`);
      } else if (data.label === "Country") {
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
        fireEvent.change(inputElement, {
          target: { value: `Test ${data.label}` },
        });
        expect(inputElement.value).toBe(`Test ${data.label}`);
      }
    });
  });

  test("Should not visible error messages on first render", () => {
    inputData.forEach((data) => {
      expect(screen.queryByText(data.error)).not.toBeInTheDocument();
    });
  });

  test("Should error messages visible after onBlur state when fields are empty", () => {
    inputData.forEach(async (data) => {
      const inputElement = screen.getByLabelText(data.label);
      fireEvent.focus(inputElement);
      fireEvent.blur(inputElement);
      const label = await waitFor(() => screen.getByText(data.error));
      expect(label).toBeInTheDocument();
    });
  });
});

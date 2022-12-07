import { render, screen, fireEvent } from "@testing-library/react";
import Newsletter from "..";
import Navbar from "../../Navbar";

describe("Newsletter", () => {
  beforeEach(() => render(<Newsletter />));
  test("should render the correct text and number of elements", () => {
    const textElement = screen.getByText(
      "Subscribe to our newsletter and receive exclusive offers every week"
    );
    expect(textElement).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Enter your email");
    expect(emailInput).toBeInTheDocument();

    const button = screen.getByText("SUBSCRIBE");
    expect(button).toBeInTheDocument();
  });
});

import { screen, render } from "@testing-library/react";
import CartFooter from "..";
import { renderWithProviders } from "../../../utils/test-utils";

const steps = ["Shopping Cart", "Address data and type of delivery", "Summary"];

const props = {
  steps,
  handleClickBackButton: jest.fn(),
  handleClickNextStepButton: jest.fn(),
};

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("CartFooter", () => {
  test("Back button should not be visible when active step index is 0", () => {
    renderWithProviders(<CartFooter {...props} activeStep={0} />);
    const backButton = screen.queryByText("Back");
    expect(backButton).not.toBeInTheDocument();
  });

  test("Back button should be visible when active step index is not 0", () => {
    renderWithProviders(<CartFooter {...props} activeStep={1} />);
    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();
  });

  test("Promo code input should be visible when active step index is 0", () => {
    renderWithProviders(<CartFooter {...props} activeStep={0} />);
    const promoCodeInputElement = screen.getByLabelText("Promo Code");
    expect(promoCodeInputElement).toBeInTheDocument();
  });

  test("Promo code input should not be visible when active step index is not 0", () => {
    renderWithProviders(<CartFooter {...props} activeStep={1} />);
    const promoCodeInputElement = screen.queryByLabelText("Promo Code");
    expect(promoCodeInputElement).not.toBeInTheDocument();
  });

  test("Total cost element should be visible when active step index is 0", () => {
    renderWithProviders(<CartFooter {...props} activeStep={0} />);
    const totalCostElement = screen.getByText("Total Cost:");
    expect(totalCostElement).toBeInTheDocument();
  });

  test("Total cost element should not be visible when active step index is not 0", () => {
    renderWithProviders(<CartFooter {...props} activeStep={1} />);
    const totalCostElement = screen.queryByText("Total Cost:");
    expect(totalCostElement).not.toBeInTheDocument();
  });

  test("Next step button should  be visible when active step index is not 2", () => {
    renderWithProviders(<CartFooter {...props} activeStep={0} />);
    const nextStepButton = screen.getByText("NEXT STEP");
    expect(nextStepButton).toBeInTheDocument();
  });

  test("Next step button should not be visible when active step is 2", () => {
    renderWithProviders(<CartFooter {...props} activeStep={2} />);
    const nextStepButton = screen.queryByText("NEXT STEP");
    expect(nextStepButton).not.toBeInTheDocument();
  });

  test("Continue shopping button should be visible", () => {
    renderWithProviders(<CartFooter {...props} activeStep={0} />);
    const continueShoppingButton = screen.getByText("CONTINUE SHOPPING");
    expect(continueShoppingButton).toBeInTheDocument();
  });

  test("Proceed to payment button should  be visible when active step index  2", () => {
    renderWithProviders(<CartFooter {...props} activeStep={2} />);
    const proceedToPaymentButton = screen.getByText("PROCEED TO PAYMENT");
    expect(proceedToPaymentButton).toBeInTheDocument();
  });

  test("Proceed to payment button should not be visible when active step is not 2", () => {
    renderWithProviders(<CartFooter {...props} activeStep={0} />);
    const proceedToPaymentButton = screen.queryByText("PROCEED TO PAYMENT");
    expect(proceedToPaymentButton).not.toBeInTheDocument();
  });

  test("Local shipping icon should  be visible when active step index  2", () => {
    renderWithProviders(<CartFooter {...props} activeStep={2} />);
    const localShippingIcon = screen.getByTestId("LocalShippingOutlinedIcon");
    expect(localShippingIcon).toBeInTheDocument();
  });

  test("Local shipping icon should not be visible when active step is not 2", () => {
    renderWithProviders(<CartFooter {...props} activeStep={0} />);
    const localShippingIcon = screen.queryByTestId("LocalShippingOutlinedIcon");
    expect(localShippingIcon).not.toBeInTheDocument();
  });
});

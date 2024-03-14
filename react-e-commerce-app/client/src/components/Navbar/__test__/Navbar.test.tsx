import Navbar from "../index";
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import { BrowserRouter } from "react-router-dom";

const testIds = [
  "productLogo",
  "SearchIcon",
  "ShoppingCartOutlinedIcon",
  "hamburgerMenu",
  "PersonOutlinedIcon",
];

describe("Navbar", () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });
  test("Should Navbar elements render correctly", () => {
    testIds.forEach((id) => {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    });
  });
});

describe("Navbar and NavbarMobileMenu common tests", () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  test("Should drawer open when click hamburger menu", () => {
    const hamburgerMenu = screen.getByTestId("hamburgerMenu");
    fireEvent.click(hamburgerMenu);
    const menuDrawer = screen.getByTestId("mobileMenu");
    expect(menuDrawer).toBeInTheDocument();
  });

  test("Should close button be visible when drawer opened", () => {
    const hamburgerMenuButton = screen.getByTestId("hamburgerMenu");
    fireEvent.click(hamburgerMenuButton);
    const closeButton = screen.getByTestId("CloseIcon");
    expect(closeButton).toBeInTheDocument();
  });

  test("Should drawer be closed when click close button", async () => {
    const hamburgerMenuButton = screen.getByTestId("hamburgerMenu");
    fireEvent.click(hamburgerMenuButton);

    const mobileMenu = screen.getByTestId("mobileMenu");
    const closeButton = screen.getByTestId("CloseIcon");

    fireEvent.click(closeButton);
    await waitForElementToBeRemoved(mobileMenu);
    expect(mobileMenu).not.toBeInTheDocument();
  });
});

import Navbar from "../index";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
  beforeEach(() => {
    render(<Navbar />);
  });
  test("main heading element should visible", () => {
    expect(screen.getByTestId("productLogo")).toBeInTheDocument();
  });

  test("search icon should be visible", () => {
    expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
  });

  test("shopping cart icon should be visible", () => {
    expect(screen.getByTestId("ShoppingCartOutlinedIcon"));
  });

  test("menu icon should be visible", () => {
    expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
  });
});

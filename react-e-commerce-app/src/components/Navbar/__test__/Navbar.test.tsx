import Navbar from "../index";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
  beforeEach(() => {
    render(<Navbar />);
  });
  test("main heading element should visible", () => {
    const productLogo = screen.getByTestId("productLogo");
    expect(productLogo).toBeInTheDocument();
  });

  test("search icon should be visible", () => {
    const searchIcon = screen.getByTestId("SearchIcon");
    expect(searchIcon).toBeInTheDocument();
  });

  test("shopping cart icon should be visible", () => {
    const shoppingCartIcon = screen.getByTestId("ShoppingCartOutlinedIcon");
    expect(shoppingCartIcon);
  });

  test("menu icon should be visible", () => {
    const menuIcon = screen.getByTestId("MenuIcon");
    expect(menuIcon).toBeInTheDocument()
  });
});

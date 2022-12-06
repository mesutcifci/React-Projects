import Navbar from "../index";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Navbar", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
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

import Header from "../index";
import { render, screen } from "@testing-library/react";

test("main heading element should visible", () => {
  render(<Header />);
  expect(screen.getByRole("heading")).toBeInTheDocument();
});

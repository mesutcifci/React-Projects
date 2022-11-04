import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../../store/ThemeContext";
import TodoInput from "../index";

describe("TodoInput", () => {
  render(<TodoInput />);
  test("input should be rendered", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

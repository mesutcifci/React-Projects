import ThemeSwitcher from "../index";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../../store/ThemeContext";

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );
  });

  test("the moon icon should be visible in first render", () => {
    expect(screen.getByAltText(/moon icon/i)).toBeInTheDocument();
  });

  test("the sun icon should not be visible in first render", () => {
    expect(screen.queryByAltText(/sun icon/i)).not.toBeInTheDocument();
  });

  test("the sun icon should be visible when user click the moon icon", () => {
    fireEvent.click(screen.getByAltText(/moon icon/i));
    const sunIcon = screen.getByAltText("sun icon");
    expect(sunIcon).toBeInTheDocument();
  });

  test("the moon icon should be visible when user click the sun icon", () => {
    let moonIcon = screen.getByAltText(/moon icon/i);
    fireEvent.click(moonIcon);
    let sunIcon = screen.getByAltText("sun icon");

    fireEvent.click(sunIcon);
    moonIcon = screen.getByAltText(/moon icon/i);
    expect(moonIcon).toBeInTheDocument();
  });
});

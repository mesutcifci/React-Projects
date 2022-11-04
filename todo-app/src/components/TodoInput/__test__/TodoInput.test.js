import { render, screen, fireEvent } from "@testing-library/react";
import { TodoProvider } from "../../../store/TodoContext";
import TodoInput from "../index";

describe("TodoInput", () => {
  beforeEach(() => {
    render(
      <TodoProvider>
        <TodoInput />
      </TodoProvider>
    );
  });
  test("input should be rendered", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("should be able to type in input", () => {
    const inputElement = screen.getByPlaceholderText("Add todo");
    fireEvent.change(inputElement, { target: { value: "Lorem ipsum" } });
    expect(inputElement.value).toBe("Lorem ipsum");
  });

  test("should add todo button be disabled when input is empty", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });

  test("should add todo button not to be disabled when input is not empty", () => {
    const inputElement = screen.getByPlaceholderText("Add todo");
    fireEvent.change(inputElement, { target: { value: "Lorem ipsum" } });

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).not.toBeDisabled();
  });
});

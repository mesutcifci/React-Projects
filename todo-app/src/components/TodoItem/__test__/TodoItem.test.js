import { screen, render, fireEvent } from "@testing-library/react";
import TodoItem from "../index";
import { TodoProvider } from "../../../store/TodoContext";

const mockTodoData = {
  id: 1,
  date: new Date(),
  text: "lorem ipsum",
  isCompleted: false,
};

const MockTodoItem = ({ data }) => {
  return (
    <TodoProvider>
      <TodoItem data={data} />
    </TodoProvider>
  );
};

describe("TodoItem first render", () => {
  beforeEach(() => {
    render(<MockTodoItem data={mockTodoData} />);
  });

  test("should the complete todo icon be visible in the first render", () => {
    const completeIcon = screen.getByTestId("completeIcon");
    expect(completeIcon).toBeInTheDocument();
  });

  test("should the edit todo icon be visible in the first render", () => {
    const editIcon = screen.getByTestId("editIcon");
    expect(editIcon).toBeInTheDocument();
  });

  test("should the delete todo icon be visible in the first render", () => {
    const deleteIcon = screen.getByTestId("deleteIcon");
    expect(deleteIcon).toBeInTheDocument();
  });

  test("should todo span element be visible in the first render", () => {
    const todoSpan = screen.getByTestId("todoSpan");
    expect(todoSpan).toBeInTheDocument();
  });

  test("should edit todo input be not visible in the first render", () => {
    const todoInput = screen.queryByTestId("todoInput");
    expect(todoInput).not.toBeInTheDocument();
  });
});

describe("TodoItem edit todo button functionality tests", () => {
  beforeEach(() => {
    render(<MockTodoItem data={mockTodoData} />);
  });

  test("should disappear edit todo icon when user clicks the edit todo icon", () => {
    const editIcon = screen.getByTestId("editIcon");
    fireEvent.click(editIcon);
    expect(editIcon).not.toBeInTheDocument();
  });

  test("should disappear complete todo icon when user clicks the edit todo icon", () => {
    const editIcon = screen.getByTestId("editIcon");
    fireEvent.click(editIcon);
    expect(screen.queryByTestId("completeIcon")).not.toBeInTheDocument();
  });

  test("should disappear delete todo icon when user clicks the edit todo icon", () => {
    const editIcon = screen.getByTestId("editIcon");
    fireEvent.click(editIcon);
    expect(screen.queryByTestId("deleteIcon")).not.toBeInTheDocument();
  });

  test("should disappear todo span element when user clicks the edit todo icon", () => {
    const editIcon = screen.getByTestId("editIcon");
    fireEvent.click(editIcon);
    expect(screen.queryByTestId("todoSpan")).not.toBeInTheDocument();
  });

  test("should appear edit todo input element when user clicks the edit todo icon", () => {
    const editIcon = screen.getByTestId("editIcon");
    fireEvent.click(editIcon);
    expect(screen.queryByRole("textbox")).toBeInTheDocument();
  });

  test("should the update todo button be visible when user clicks the edit todo icon", () => {
    const editIcon = screen.getByTestId("editIcon");
    fireEvent.click(editIcon);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should the close icon be visible when user clicks the edit todo icon", () => {
    const editIcon = screen.getByTestId("editIcon");
    fireEvent.click(editIcon);
    expect(screen.queryByTestId("closeIcon")).toBeInTheDocument();
  });
});

describe("Update todo item tests", () => {
  beforeEach(() => {
    render(<MockTodoItem data={mockTodoData} />);
  });

  test("should value of the edit todo input can change when user types", () => {
    const editIcon = screen.getByTestId("editIcon");
    fireEvent.click(editIcon);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "dummy text" } });
    expect(inputElement.value).toBe("dummy text");

    fireEvent.click(editIcon);
    fireEvent.change(inputElement, { target: { value: "dummy text2" } });
    expect(inputElement.value).toBe("dummy text2");
  });
});

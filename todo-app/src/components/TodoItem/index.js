import { useContext, useState, useEffect } from "react";
import style from "./styles.module.css";
import { TodoContext } from "../../store/TodoContext";

const TodoItem = ({ data }) => {
  const { todoItems, setTodoItems } = useContext(TodoContext);
  const [todoText, setTodoText] = useState(data.text);
  const [isEditable, setIsEditable] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  useEffect(() => {
    validateInput();
  }, [todoText]);

  const validateInput = () => {
    if (todoText && todoText.trim().length > 0) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  };

  const handleChangeInput = (e) => {
    setTodoText(e.target.value);
  };

  const handleUpdateTodo = () => {
    if (isInputValid) {
      const copyTodoItems = [...todoItems];
      const selectedTodo = copyTodoItems.find((todo) => todo.id === data.id);
      selectedTodo.text = todoText;
      setTodoItems(copyTodoItems);
      setIsEditable(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key.toLowerCase() === "enter") {
      handleUpdateTodo();
    }
  };

  const handleDeleteTodo = () => {
    const filteredTodoItems = [...todoItems].filter(
      (todo) => todo.id !== data.id
    );
    setTodoItems(filteredTodoItems);
  };

  const completeTodo = () => {
    const copyTodoItems = [...todoItems];
    const selectedTodo = copyTodoItems.find((todo) => todo.id === data.id);
    selectedTodo.isCompleted = !selectedTodo.isCompleted;
    setTodoItems(copyTodoItems);
  };

  return (
    <li className={`${style.item}`}>
      {!isEditable && (
        <span
          className={`${style.text} ${data.isCompleted && style.lineThrough}`}
          data-testid="todoSpan"
        >
          {data.text}
        </span>
      )}

      {isEditable && (
        <input
          value={todoText}
          onChange={handleChangeInput}
          className={style.input}
          onKeyDown={handleKeyDown}
        />
      )}

      {!isEditable && (
        <span className={`${style.iconWrapper}`}>
          <svg
            className={`${style.icon} ${
              data.isCompleted && style.completedIcon
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={completeTodo}
            data-testid="completeIcon"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>

          <svg
            className={style.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={() => setIsEditable(true)}
            data-testid="editIcon"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>

          <svg
            className={style.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={handleDeleteTodo}
            data-testid="deleteIcon"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        </span>
      )}

      {isEditable && (
        <span className={style.editableIconWrapper}>
          <button
            className={style.updateButton}
            disabled={!isInputValid}
            onClick={handleUpdateTodo}
          >
            <svg
              className={style.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </button>

          <svg
            className={style.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={() => setIsEditable(false)}
            data-testid="closeIcon"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </span>
      )}
    </li>
  );
};

export default TodoItem;

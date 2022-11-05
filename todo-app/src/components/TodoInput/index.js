import style from "./styles.module.css";
import { useContext, useState, useEffect } from "react";
import { TodoContext } from "../../store/TodoContext";
import { v4 as uuidv4 } from "uuid";

const TodoInput = () => {
  const { setTodoItems } = useContext(TodoContext);
  const [todoText, setTodoText] = useState("");
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

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const addTodo = () => {
    if (isInputValid) {
      const todo = {
        id: uuidv4(),
        date: new Date(),
        text: todoText,
        isCompleted: false,
      };
      setTodoItems((prevState) => [todo, ...prevState]);
      setTodoText("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key.toLowerCase() === "enter" && isInputValid) {
      addTodo();
    }
  };

  return (
    <div className={style.wrapper}>
      <input
        type="text"
        placeholder="Add todo"
        className={style.input}
        value={todoText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className={style.button}
        disabled={!isInputValid}
        onClick={addTodo}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={style.inputIcon}
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </button>
    </div>
  );
};

export default TodoInput;

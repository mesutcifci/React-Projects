import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext({
  todoItems: [],
  setTodoItems: () => {},
});

export const TodoProvider = (props) => {
  const localStorageTodoItems =
    JSON.parse(localStorage.getItem("todoItems")) || [];
  const [todoItems, setTodoItems] = useState(localStorageTodoItems);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <TodoContext.Provider value={{ todoItems, setTodoItems }}>
      {props.children}
    </TodoContext.Provider>
  );
};

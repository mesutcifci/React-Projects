import { createContext, useState } from "react";

export const TodoContext = createContext({
  todoItems: [],
  setTodoItems: () => {},
});

export const TodoProvider = (props) => {
  const [todoItems, setTodoItems] = useState([]);

  return (
    <TodoContext.Provider value={{ todoItems, setTodoItems }}>
      {props.children}
    </TodoContext.Provider>
  );
};

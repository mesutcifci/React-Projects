import { useContext } from "react";
import style from "./styles.module.css";
import { TodoContext } from "../../store/TodoContext";
import TodoItem from "../TodoItem";

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <ul className={style.list}>
      {todos.length > 0 &&
        todos.map((todo) => <TodoItem key={todo.id} data={todo} />)}
    </ul>
  );
};

export default TodoList;

import { useContext } from "react";
import style from "./styles.module.css";
import { TodoContext } from "../../store/TodoContext";
import TodoItem from "../TodoItem";

const TodoList = () => {
  const { todoItems } = useContext(TodoContext);

  return (
    <ul className={style.list}>
      {todoItems.length > 0 &&
        todoItems.map((todo) => <TodoItem key={todo.id} data={todo} />)}
    </ul>
  );
};

export default TodoList;

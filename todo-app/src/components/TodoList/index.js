import { useContext, useState, useEffect } from "react";
import style from "./styles.module.css";
import { TodoContext } from "../../store/TodoContext";
import TodoItem from "../TodoItem";

const TodoList = () => {
  const { todoItems } = useContext(TodoContext);
  const [filteredTodoItems, setFilteredTodoItems] = useState(todoItems);
  const [filterParameter, setFilterParameter] = useState("all");

  useEffect(() => {
    filterTodo()
  }, [todoItems]);

  const filterTodo = (completed) => {
    if(completed === true){
      const filteredItems = todoItems.filter((todo) => todo.isCompleted === true);
      setFilteredTodoItems(filteredItems);
      setFilterParameter("completed");
    }else if(completed === false){
      const filteredItems = todoItems.filter((todo) => todo.isCompleted === false);
      setFilteredTodoItems(filteredItems);
      setFilterParameter("unCompleted");
    }else{
      setFilteredTodoItems(todoItems);
      setFilterParameter("all");
    }
  };

  return (
    <div>
      <div className={style.filterWrapper}>
        <p
          onClick={() => filterTodo()}
          className={`${style.filterText} ${
            filterParameter === "all" && style.selected
          }`}
        >
          All
        </p>
        <p>&nbsp;/&nbsp;</p>
        <p
          onClick={() => filterTodo(false)}
          className={`${style.filterText} ${
            filterParameter === "unCompleted" && style.selected
          }`}
        >
          UnCompleted
        </p>
        <p>&nbsp;/&nbsp;</p>
        <p
          onClick={() => filterTodo(true)}
          className={`${style.filterText} ${
            filterParameter === "completed" && style.selected
          }`}
        >
          Completed
        </p>
      </div>
      <ul className={style.list}>
        {filteredTodoItems.length > 0 &&
          filteredTodoItems.map((todo) => (
            <TodoItem key={todo.id} data={todo} />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;

import style from "./app.module.css";
import { Header, TodoInput, TodoList } from "./components";
import { useContext } from "react";
import { ThemeContext } from "./store/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={style.app} data-theme={theme}>
      <div className={style.wrapper}>
        TEST NETLİFY UPDATE
        <Header />
        <TodoInput />
        <TodoList />
      </div>
    </div>
  );
}

export default App;

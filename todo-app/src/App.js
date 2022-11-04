import "./App.css";
import { Header, TodoInput } from "./components";
import { useContext } from "react";
import { ThemeContext } from "./store/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="app" data-theme={theme}>
      <Header />
      <TodoInput />
    </div>
  );
}

export default App;

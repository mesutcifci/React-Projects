import "./App.css";
import Header from "./components/Header";
import { useContext } from "react";
import { ThemeContext } from "./store/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="App" data-theme={theme}>
      <Header />
    </div>
  );
}

export default App;

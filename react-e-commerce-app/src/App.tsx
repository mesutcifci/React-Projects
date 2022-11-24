import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components";
import { Home } from "./pages";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

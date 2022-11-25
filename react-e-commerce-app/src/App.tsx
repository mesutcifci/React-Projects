import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Auth } from "./pages";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/:key" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

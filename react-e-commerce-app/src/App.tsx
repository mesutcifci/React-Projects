import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import { Home, Auth } from "./pages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/:key" element={<Auth />} />
        </Routes>
        <Newsletter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Footer, Navbar, Newsletter } from "./components";
import { Home, Auth, Products, ProductDetail } from "./pages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:primaryCategory" element={<Products />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/auth/:key" element={<Auth />} />
        </Routes>
        <Newsletter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

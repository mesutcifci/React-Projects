import { Routes, Route, BrowserRouter } from "react-router-dom";

// Components
import {
  AppWrapper,
  Footer,
  Navbar,
  Newsletter,
  ScrollToTop,
  Subscribe,
} from "./components";
import { Home, Auth, Products, ProductDetail, Cart } from "./pages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <AppWrapper>
          <Subscribe />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:primaryCategory" element={<Products />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/auth/:key" element={<Auth />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
          <Newsletter />
          <Footer />
        </AppWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;

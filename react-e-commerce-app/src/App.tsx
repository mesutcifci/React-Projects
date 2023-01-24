import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// Components
import {
  AppWrapper,
  Footer,
  Loading,
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
        <Loading />
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Newsletter />
          <Footer />
        </AppWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;

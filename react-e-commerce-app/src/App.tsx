import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// Components
import {
  Footer,
  Loading,
  Navbar,
  Newsletter,
  ScrollToTop,
  Subscribe,
} from "./components";

import {
  Home,
  Auth,
  Products,
  ProductDetail,
  Cart,
  FavoriteProducts,
} from "./pages";

import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ maxWidth: "1600px", marginLeft: "auto", marginRight: "auto" }}>
      <BrowserRouter>
        <Loading />
        <ScrollToTop />
        <Subscribe />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:primaryCategory" element={<Products />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/auth/:key" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorite-products" element={<FavoriteProducts />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Newsletter />
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// Components
import { AppWrapper, Loading, ScrollToTop, Subscribe } from "./components";
import InitializeProducts from "./components/InitializeProducts";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Loading />
        <ScrollToTop />
        <AppWrapper>
          <Subscribe />
          <Routes>
            <Route path="*" element={<InitializeProducts />} />
          </Routes>
        </AppWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;

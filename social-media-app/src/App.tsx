import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// Components
import Navigation from "./components/Header";
import Footer from "./components/Footer";
import CreatePostModal from "./components/CreatePostModal";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const isVisible = useSelector<RootState, boolean>(
    (state) => state.modal.isVisible
  );

  return (
    <div className="App">
      <Navigation/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      {isVisible && <CreatePostModal isVisible={isVisible} />}
    </div>
  );
}

export default App;

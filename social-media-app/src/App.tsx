import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// Components
import Navigation from "./components/Header";
import Footer from "./components/Footer";
import CreatePostModal from "./components/CreatePostModal";
import UpdatePostModal from "./components/UpdatePostModal";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const { createPostModal, updatePostModal } = useSelector<RootState, any>(
    (state) => state.modal
  );

  return (
    <div className="App">
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
        {createPostModal.isVisible && (
          <CreatePostModal isVisible={createPostModal.isVisible} />
        )}
        {updatePostModal.isVisible && (
          <UpdatePostModal
            isVisible={updatePostModal.isVisible}
            previewedPostData={updatePostModal.previewedPostData}
          />
        )}
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser/EditUser";
import ViewUsers from "./pages/ViewUsers";
import UserDetails from "./pages/UserDetails.tsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<ViewUsers />} />
          <Route path="/users/:id/detail" element={<UserDetails />} />
          <Route path="/add-users" element={<AddUser />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

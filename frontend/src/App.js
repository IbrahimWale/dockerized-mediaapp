import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./App.css";

import Login from "./components/Login.js";
import Signup from "./components/Signup_component.js";
import SearchMedia from "./components/Search_media.js";
import BarMenu from "./components/Menubar.js";
import FetchDBResource from "./components/Fetch_fromdb.js";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <BarMenu />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/media" element={<SearchMedia />} />
            <Route path="/fetchfromdb" element={<FetchDBResource />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

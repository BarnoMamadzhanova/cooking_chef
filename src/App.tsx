import React from "react";
import "./styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Splash from "./pages/Splash/Splash";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Details from "./pages/Details/Details";
import Profile from "./pages/Profile/Profile";
import Chef from "./pages/Chef/Chef";

import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/details" element={<Details />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chef" element={<Chef />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

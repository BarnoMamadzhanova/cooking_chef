import "./styles/App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Splash from "./pages/Splash";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import Chef from "./pages/Chef";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/details" element={<Details />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chef" element={<Chef />} />
      </Routes>
    </div>
  );
}

export default App;

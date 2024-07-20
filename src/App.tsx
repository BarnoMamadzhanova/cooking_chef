import React from "react";
import "./styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/hook";
import { selectAuthState } from "./redux/auth/authSlice";

import Home from "./pages/Home/Home";
import Splash from "./pages/Splash/Splash";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Details from "./pages/Details/Details";
import Profile from "./pages/Profile/Profile";
import Chef from "./pages/Chef/Chef";

import Layout from "./components/Layout/Layout";
import withAuthProtection from "./components/HOC/withAuthProtection";

const ProtectedHome = withAuthProtection(Home);
const ProtectedProfile = withAuthProtection(Profile);
const ProtectedChef = withAuthProtection(Chef);
const ProtectedDetails = withAuthProtection(Details);
const ProtectedSearch = withAuthProtection(Search);

const App: React.FC = () => {
  const { isLoading } = useAppSelector(selectAuthState);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<ProtectedHome />} />
          <Route path="/details/:recipeId" element={<ProtectedDetails />} />
          <Route path="/search" element={<ProtectedSearch />} />
          <Route path="/profile" element={<ProtectedProfile />} />
          <Route path="/chef" element={<ProtectedChef />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

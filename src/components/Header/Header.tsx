import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import {
  logo,
  logo_alt,
  home,
  home_alt,
  search,
  search_alt,
  user,
  user_alt,
  logout,
} from "../../assests/index";

const setActiveLink = ({ isActive }) =>
  `${classes.nav_link} ${isActive ? classes.active_link : ""}`;

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header_wrapper}>
        <div className={classes.sidebar}>
          <NavLink to="/" className={classes.first_link}>
            {({ isActive }) => (
              <img src={isActive ? logo : logo_alt} alt="CooksCorner" />
            )}
          </NavLink>
          <div className={classes.links}>
            <NavLink to="/home" className={setActiveLink}>
              {({ isActive }) => (
                <img src={isActive ? home : home_alt} alt="Home" />
              )}
            </NavLink>
            <NavLink to="/search" className={setActiveLink}>
              {({ isActive }) => (
                <img src={isActive ? search : search_alt} alt="Search" />
              )}
            </NavLink>
            <NavLink to="/profile" className={setActiveLink}>
              {({ isActive }) => (
                <img src={isActive ? user : user_alt} alt="Profile" />
              )}
            </NavLink>
          </div>
        </div>
        <NavLink
          to="*"
          className={({ isActive }) =>
            `${setActiveLink({ isActive })} ${classes.last_link}`
          }
        >
          <img src={logout} alt="Logout" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;

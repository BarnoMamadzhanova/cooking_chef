import { Link } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header_wrapper}>
        <div className={classes.sidebar}>
          <Link to="/" className={`${classes.nav_link} ${classes.first_link}`}>
            Login
          </Link>
          <div className={classes.links}>
            <Link to="/home" className={classes.nav_link}>
              Home
            </Link>
            <Link to="/search" className={classes.nav_link}>
              Search
            </Link>
            <Link to="/profile" className={classes.nav_link}>
              Profile
            </Link>
          </div>
        </div>
        <Link className={classes.nav_btn}>Logout</Link>
      </div>
    </header>
  );
};

export default Header;

// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { logoutUser } from "../../redux/auth/authSlice";
// import { useAppDispatch } from "../../redux/hook";
// import Modal from "../Modal/Modal";
// import classes from "./Header.module.css";
// import {
//   logo,
//   logo_alt,
//   home,
//   home_alt,
//   search,
//   search_alt,
//   user,
//   user_alt,
//   logout,
// } from "../../assests/index";

// type ActiveLinkProps = {
//   isActive: boolean;
// };

// const setActiveLink = ({ isActive }: ActiveLinkProps) =>
//   `${classes.nav_link} ${isActive ? classes.active_link : ""}`;

// const Header = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [modalActive, setModalActive] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser());
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <header className={classes.header}>
//       <div className={classes.header_wrapper}>
//         <div className={classes.sidebar}>
//           <NavLink to="/" className={classes.first_link}>
//             {({ isActive }) => (
//               <img src={isActive ? logo : logo_alt} alt="CooksCorner" />
//             )}
//           </NavLink>
//           <div className={classes.links}>
//             <NavLink to="/home" className={setActiveLink}>
//               {({ isActive }) => (
//                 <img src={isActive ? home : home_alt} alt="Home" />
//               )}
//             </NavLink>
//             <NavLink to="/search" className={setActiveLink}>
//               {({ isActive }) => (
//                 <img src={isActive ? search : search_alt} alt="Search" />
//               )}
//             </NavLink>
//             <NavLink to="/profile" className={setActiveLink}>
//               {({ isActive }) => (
//                 <img src={isActive ? user : user_alt} alt="Profile" />
//               )}
//             </NavLink>
//           </div>
//         </div>
//         <NavLink
//           to="*"
//           className={({ isActive }) =>
//             `${setActiveLink({ isActive })} ${classes.last_link}`
//           }
//           onClick={() => setModalActive(true)}
//         >
//           <img src={logout} alt="Logout" />
//         </NavLink>
//       </div>
//       <Modal active={modalActive} setActive={setModalActive}>
//         <div className={classes.modal__message}>
//           <p>Are you sure you want to leave?</p>
//           <div className={classes.modal_btns}>
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setModalActive(false);
//               }}
//             >
//               Yes
//             </button>
//             <button onClick={() => setModalActive(false)}>No</button>
//           </div>
//         </div>
//       </Modal>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import Modal from "../Modal/Modal";
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
  logout as logoutIcon,
} from "../../assests/index";

type ActiveLinkProps = {
  isActive: boolean;
};

const setActiveLink = ({ isActive }: ActiveLinkProps) =>
  `${classes.nav_link} ${isActive ? classes.active_link : ""}`;

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogoutClick = () => {
    setModalActive(true);
  };

  const renderImage = (
    isActive: boolean,
    normalImg: string,
    altImg: string,
    altText: string
  ) => <img src={isActive ? normalImg : altImg} alt={altText} />;

  return (
    <header className={classes.header}>
      <div className={classes.header_wrapper}>
        <div className={classes.sidebar}>
          <div className={classes.first_link} onClick={() => navigate("/")}>
            {renderImage(true, logo, logo_alt, "CooksCorner")}
          </div>
          <div className={classes.links}>
            <NavLink to="/home" className={setActiveLink}>
              {({ isActive }) => renderImage(isActive, home, home_alt, "Home")}
            </NavLink>
            <NavLink to="/search" className={setActiveLink}>
              {({ isActive }) =>
                renderImage(isActive, search, search_alt, "Search")
              }
            </NavLink>
            <NavLink to="/profile" className={setActiveLink}>
              {({ isActive }) =>
                renderImage(isActive, user, user_alt, "Profile")
              }
            </NavLink>
          </div>
        </div>
        <div
          className={`${setActiveLink({ isActive: false })} ${
            classes.nav_link
          } ${classes.last_link}`}
        >
          <button
            className={`${classes.logoutButton} ${setActiveLink({
              isActive: false,
            })}`}
            onClick={handleLogoutClick}
          >
            {renderImage(true, logoutIcon, logoutIcon, "Logout")}
          </button>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={classes.modal__message}>
          <p>Are you sure you want to leave?</p>
          <div className={classes.modal_btns}>
            <button
              onClick={() => {
                handleLogout();
                setModalActive(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setModalActive(false)}>No</button>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Header;

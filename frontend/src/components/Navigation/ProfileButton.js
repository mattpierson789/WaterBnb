// import React, {useState, useEffect} from 'react';
// import { useDispatch } from 'react-redux';
// import * as sessionActions from "../../store/session";

// function ProfileButton({user}) {

// const dispatch = useDispatch() 
// const [showMenu, setShowMenu] = useState(false)

// const openMenu = () => {

//         if (showMenu) return 
//         setShowMenu(true)

// }

//     useEffect(() => {

//         if (!showMenu) return 

//         const closeMenu = () => {

//         setShowMenu(false)   
//         };

//     document.addEventListener('click', closeMenu)

//     return () => document.removeEventListener ("click", closeMenu)}, [showMenu]);

//     const logout = (e) => {

//     e.preventDefault()

//     dispatch(sessionActions.logout()) 

//     }

//     return (

//         <>
//         <button onClick={openMenu}>
//           <i className="fa-solid fa-user-circle" />
//         </button>
//         {showMenu && (
//           <ul className="profile-dropdown">
//             <li>{user.username}</li>
//             <li>{user.email}</li>
//             <li>
//               <button onClick={logout}>Log Out</button>
//             </li>
//           </ul>
//         )}
//       </>
//     );
//   }
  
//   export default ProfileButton;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";
import { Navigate, Link } from "react-router-dom";
// import { formatTwoDigitNumberString } from "../../utils/urlFormatter";

import "./Navigation.css";

const ProfileButton = ({ setShowSignUpModal, setShowLogInModal }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session?.user);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowMenu(false); // Close the menu after logout
    // Instead of returning a <Navigate>, use programmatic navigation if you're using React Router
    // Example: history.push("/")
  };

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleCloseDropDown = (e) => {
    const dropDownMenu = document.querySelector(".profile-drop-menu");
    const profileButton = document.querySelector(".session-menu-button");
    
    if (!profileButton?.contains(e.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseDropDown);

    return () => {
      document.removeEventListener("click", handleCloseDropDown);
    };
  }, []);

  const MenuDivider = () => {
    return <div className="menu-divider"></div>;
  };

  let sessionLinks;

  if (!sessionUser) {
    sessionLinks = (
      <>
        <li onClick={() => setShowSignUpModal(true)}>Sign up</li>
        <li onClick={() => setShowLogInModal(true)}>Log in</li>
        <li className="menu-divider-li">
          <MenuDivider />
        </li>
        <a target="_blank" href="https://www.linkedin.com/in/mattpierson1/">
          <li>LinkedIn</li>
        </a>
        <a target="_blank" href="https://github.com/mattpierson789">
          <li>Github</li>
        </a>
        {/* <li>Help</li> */}
      </>
    );
  }
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="profile-drop-menu-bold-item">
        <div className="user-info">
          <h3>Welcome {sessionUser.username}!</h3>
          <p className="user-name">
            
          </p>
        </div>
        <div className="line"></div>
          <Link to={`user/trips`}>
            <div>Trips</div>
          </Link>
          {/* <li>Wishlists</li> */}
        </div>
        <li className="menu-divider-li">
          <MenuDivider />
        </li>
        {/* <li>Sparebnb your home</li> */}
        {/* <a target="_blank" href="https://www.linkedin.com/in/carvey-hor/">
          <li>LinkedIn</li>
        </a>
        <a target="_blank" href="https://github.com/carveyh/sparebnb">
          <li>Github</li>
        </a> */}
        <li className="menu-divider-li">
          {/* <MenuDivider /> */}
        </li>
        <span onClick={handleLogout}>Logout</span>
      </>
    );
  }

  const ProfileDropMenu = () => {
    return (
      <div className="profile-drop-menu">
        <ul>{sessionLinks}</ul>
      </div>
    );
  };

  return (
    <div className="session-menu-button-container">
      <button className="session-menu-button" onClick={toggleMenu}>
        <i className="fa-solid fa-bars"></i>
        <div className="user-icon">
          {!sessionUser && <i className="fa-solid fa-user"></i>}
          {/* Profile photo setup */}
          {/* {sessionUser && (
            <img
              className="fit-photo"
              src={require(`../../images/profilepics/${formatTwoDigitNumberString(
                (sessionUser.id % 12) + 1
              )}.png`)}
              alt="User profile"
            />
          )} */}
        </div>
      </button>
      {showMenu && <ProfileDropMenu />}
    </div>
  );
};

export default ProfileButton;

    
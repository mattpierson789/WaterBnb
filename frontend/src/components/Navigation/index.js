// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import LoginModal from '../LoginModal/LoginModal';
// import './Navigation.css';
// import RegistrationForm from '../RegistrationForm/RegistrationForm'; // Updated import statement
// import * as sessionActions from '../../store/session';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// function Navigation() {
//   const sessionUser = useSelector((state) => state.session.user);
//   const dispatch = useDispatch();

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <div className="logged-out-links">
//         <ul>
//           <li className="dropdown-menu-option" onClick={logout}>
//             <span id="logout">Logout</span>
//           </li>
//           <li className="dropdown-menu-option">
//             <Link to="user/trips">
//               <span id="my-trips">Trips</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     );
//   } else {
//     sessionLinks = (
//       <div className="logged-out-links">
//         <LoginModal />
//         <RegistrationForm />
//       </div>
//     );
//   }

//   return (
//     <ul>
//       <div id="session-Links">{sessionLinks}</div>
//     </ul>
//   );
// }

// export default Navigation;

import React from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProfileButton from "./ProfileButton";
import LoginForm from "../AuthComponents/LoginForm";
import SignupForm from "../AuthComponents/SignupForm";
import "./Navigation.css";
import logo from './waterbnb_logo.png'

function Navigation({ filter, setFilter }) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  const location = useLocation();

  if (showLogInModal || showSignUpModal) {
    document.querySelector('body').style.overflowY = "hidden";
  } else {
    document.querySelector('body').style.overflowY = "scroll";
  }

  const handleCloseModals = (e) => {
    setShowLogInModal(false)
    setShowSignUpModal(false)
  }

  return (

  <>
  <div className="upper-navbar-container">
    <Link id="logo" to="/">
      <img id="logo-img" alt="WaterBnb logo" src={logo} />
      <span id="span-logo">waterbnb</span>
    </Link>
    <div className="social-icons-container">
      <a href="https://github.com/mattpierson789" target="_blank">
        <img
          className="icons-header"
          alt="Github"
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        />
      </a>
      <a href="https://www.linkedin.com/in/mattpierson1/" target="_blank">
        <img
          className="icons-header"
          alt="LinkedIn"
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        />
      </a>
    </div>
    <div className="upper-navbar-left">
      <ProfileButton
        setShowSignUpModal={setShowSignUpModal}
        setShowLogInModal={setShowLogInModal}
      />
    </div>
  </div>
  {(showLogInModal || showSignUpModal) && (
    <div>
      {showLogInModal && (
        <LoginForm setShowSignUpModal={setShowSignUpModal} setShowLogInModal={setShowLogInModal} />
      )}
      {showSignUpModal && (
        <SignupForm setShowSignUpModal={setShowSignUpModal} setShowLogInModal={setShowLogInModal} />
      )}
    </div>
  )}
</>)

}

export default Navigation;






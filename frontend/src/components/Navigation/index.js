import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../LoginModal/LoginModal';
import './Navigation.css';
import RegistrationForm from '../RegistrationForm/RegistrationForm'; // Updated import statement
import * as sessionActions from '../../store/session';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="logged-out-links">
        <ul>
          <li className="dropdown-menu-option" onClick={logout}>
            <span id="logout">Logout</span>
          </li>
          <li className="dropdown-menu-option">
            <Link to="user/trips">
              <span id="my-trips">Trips</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="logged-out-links">
        <LoginModal />
        <RegistrationForm />
      </div>
    );
  }

  return (
    <ul>
      <div id="session-Links">{sessionLinks}</div>
    </ul>
  );
}

export default Navigation;

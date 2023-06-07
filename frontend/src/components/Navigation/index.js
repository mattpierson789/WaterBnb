import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../LoginModal/LoginModal';
import './Navigation.css';
import RegistrationFormModal from '../RegistrationForm/RegistrationForm';
import * as sessionActions from '../../store/session';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';



function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className="logged-out-links">
                <ul>
                    <li className='dropdown-menu-option' onClick={logout}>
                        <span id='logout'>Log Out</span>
                    </li>
                    <li className='dropdown-menu-option'>
                        <Link to='/trips'>
                            <span id='my-trips'>My Trips</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    } else {
        sessionLinks = (
            <div className='logged-out-links'>
              <LoginModal/>
              <RegistrationFormModal/>
            </div>
        );
    }

    return (
        <ul>
            <div id='session-Links'>
                {sessionLinks}
            </div>
        </ul>
    );
}

export default Navigation;
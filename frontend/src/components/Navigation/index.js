import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../LoginModal/LoginModal';
import './Navigation.css';
import RegistrationFormModal from '../RegistrationForm/RegistrationForm';
import * as sessionActions from '../../store/session';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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
                    <li>
                        {/* <Link id='trips' className='dropdown-menu-option' to={'/trips'}>My Trips</Link> */}
                    </li>
                    <li className='dropdown-menu-option' onClick={logout}>
                        <span id='logout'>Log Out</span>
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

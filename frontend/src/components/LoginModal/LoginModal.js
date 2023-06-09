import React, { useState } from 'react';
import './LoginModal.css';
import csrfFetch from '../../store/csrf';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/session';
import * as sessionActions from '../../store/session';

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    e.stopPropagation();
    setCredential(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.stopPropagation();
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    e.stopPropagation();
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (password !== confirmPassword) {
      setErrorMessages(['Passwords do not match!']);
      return;
    }

    try {
      const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
          session: {credential,
          password,},
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentUser(data.user));
        setIsOpen(false);
      } else {
        const data = await response.json();
        setErrorMessages(data.errors);
      }
    } catch (error) {
      console.error(error);
      setErrorMessages(['Incorrect Email or Password. Please try again.']);
    }
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrorMessages([]);

    dispatch(sessionActions.login({
        username: 'Demo-lition',
        password: 'password'
    }))
    .catch(async (res) => {
        let data;
        try {
            data = await res.clone().json();
        } catch {
            data = await res.text();
        }
        if (data?.errors) {
            setErrorMessages(data.errors);
        } else if (data) {
            setErrorMessages([data]);
        } else {
            setErrorMessages([res.statusText]);
        }
    });
};

// const demoLogin = (e) => {
//   e.preventDefault();
//   dispatch(sessionActions.login({
//       username: 'Demo-lition',
//       password: 'password'
//   }))
//   }


  const openModal = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="login-button-container">
        <span onClick={openModal} className="login-button">
          Login
        </span>
      </div>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={stopPropagation}>
            <form onSubmit={handleSubmit}>
              <header>
               
              </header>
              <hr />
              <h1 id="login-title">Welcome to Waterbnb</h1>
              <div
                className="input-container"
                style={errorMessages.length > 0 ? { border: '2px solid red' } : {}}
              >
                <input
                  type="username"
                  value={credential}
                  onChange={handleUsernameChange}
                  required
                  placeholder="Username"
                  onFocus={() => setErrorMessages([])}
                />
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Password"
                  onFocus={() => setErrorMessages([])}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder="Confirm Password"
                  onFocus={() => setErrorMessages([])}
                />
              </div>
              <ul className="error-list">
                {errorMessages.map((error) => (
                  <li key={error} style={{ color: 'red' }}>
                    {error}
                  </li>
                ))}
              </ul>
              <div className="submit-div">
                <button type="submit">Log in</button>
              </div>
              <div id="line-div">
                <div className="line">
                  <hr />
                </div>
                <div id="or">or</div>
                <div className="line">
                  <hr />
                </div>
              </div>
            </form>
            <div id="other-buttons-div">
              <button onClick={handleDemo} className="other-buttons-login">
                <img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt="" />
                Log in with demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;

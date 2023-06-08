import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import './RegistrationForm.css';


function RegistrationForm({ trigger }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (userPassword !== confirmPassword) {
      setErrorMessages(["Passwords do not match!"]);
      return;
    }
    return dispatch(
      sessionActions.signup({
        username: username,
        email: userEmail,
        password: userPassword,
      })
    )
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data && data.errors) setErrorMessages(data.errors);
        else if (data) setErrorMessages([data]);
        else setErrorMessages([res.statusText]);
      });
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({
        username: 'Demo-lition',
        password: 'password'
    }))
    }
  

  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen (true)
  }

  const closeModal = (e) => {
    setIsOpen(false);
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  return (
    <>
      <div className='login-button'>
        <span onClick={openModal}>
          Signup
        </span>
      </div>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={stopPropagation}>
            <form onSubmit={submitForm}>
              <div className="input-container">
                <input
                  className="modal-content input[type='text']"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Name"
                />
              </div>
              <div className="input-container">
                <input
                  className="modal-content input[type='text']"
                  id="email"
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  placeholder="Email Address"
                />
              </div>
              <div className="input-container">
                <input
                  className="modal-content input[type='text']"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Username"
                />
              </div>
              <div className="input-container">
                <input
                  className="modal-content input[type='password']"
                  id="password"
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>
              <div className="input-container">
                <input
                  className="modal-content input[type='password']"
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                />
              </div>
              <ul className="error-list">
                {errorMessages.map(error => <li key={error}>{error}</li>)}
              </ul>
              <div className="submit-div">
                <button className="modal-content input[type='submit']" type="submit">Agree and Continue</button>
              </div>
              <button onClick={demoLogin} className='demo-login'>Demo Login</button>
            </form>
            <p className="centered-text">
              By selecting <span className="bold-text">Agree and Continue</span>, I agree to WaterBnb's Terms of Service, Payments Terms of Service, and Nondiscrimination Policy and acknowledge the Privacy Policy
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationForm;

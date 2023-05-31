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
    return dispatch(sessionActions.signup({ userEmail, name, username, userPassword, confirmPassword }))
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
      <button onClick={openModal}>
        Register!
      </button>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={stopPropagation}>
            <form onSubmit={submitForm}>
              <div className="field">
             
                <input className="entryInput" id="name" type="text" value={name}
                  onChange={(e) => setName(e.target.value)} required 
                  placeholder="Name"/>
              </div>
              <div className="field">
           
                <input className="entryInput" id="email" type="text" value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)} required 
                  placeholder="Email Address"/>
              </div>
              <div className="field">
     
                <input className="entryInput" id="username" type="text" value={username}
                  onChange={(e) => setUsername(e.target.value)} required 
                  placeholder="Username"/>
              </div>
              <div className="field">
  
                <input className="entryInput" id="password" type="password" value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)} required 
                  placeholder="Password"/>
              </div>
              <div className="field">
               
                <input className="entryInput" id="confirmPassword" type="password" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} required 
                  placeholder="Confirm Password"/>
              </div>
              <ul className="form-errors">
                {errorMessages.map(error => <li key={error}>{error}</li>)}
              </ul>
              <button className="Login-button" type="submit">Agree and Continue</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationForm;

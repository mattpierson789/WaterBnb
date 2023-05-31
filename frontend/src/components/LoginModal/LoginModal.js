import React, { useState } from 'react';
import './LoginModal.css';
import csrfFetch from '../../store/csrf';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/session';
import * as sessionActions from '../../store/session';

const LoginModal = ({  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const dispatch = useDispatch();

    const handleUsernameChange = (e) => {
        e.stopPropagation();
        setCredential(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.stopPropagation();
        setPassword(e.target.value);
    } 

    const handleConfirmPasswordChange = (e) => {
        e.stopPropagation();
        setConfirmPassword(e.target.value);
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
      
        if (password !== confirmPassword) {
          setErrorMessages(["Passwords do not match!"]);
          return;
        }
      
        try {
          const response = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({
              session: { credential, password },
            }),
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            dispatch(setCurrentUser(data.user));
            setIsOpen(false);
          } else {
            const data = await response.json();
            console.log(data);
            setErrorMessages(data.errors);
          }
        } catch (error) {
          console.error(error);
          setErrorMessages(["Incorrect Username or Password. Please try again."]);
        }
      };

      const demoLogin = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({
            username: 'Demo-lition',
            password: 'password'
        }))
        }
    
      
      
   
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setErrorMessages([]);
      
    //     if (password !== confirmPassword) {
    //       setErrorMessages(["Passwords do not match!"]);
    //       return;
    //     }
      
    //     try {
    //       const response = await csrfFetch('/api/session', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //           session: { credential, password },
    //         }),
    //       });
    //       const data = await response.json();
    //       console.log(data);
    //       if (response.ok) {
    //         dispatch(setCurrentUser(data.user));
    //         setIsOpen(false);
    //       } else {
    //         setErrorMessages(data.errors);
    //       }
    //     } catch (err) {
         
    //       console.error(err);
    //       setErrorMessages(['An error occurred. Please try again.']);
    //     }
    //   };
      
      
    const openModal = (e) => {
        e.stopPropagation();
        setIsOpen (true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setIsOpen (false);
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <> <div
            className="login-button-container">
            <span onClick={openModal} className="login-button">
        Login
      </span>
      </div>
            {isOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={stopPropagation}>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Username" value={credential} onChange={handleUsernameChange} required />
                            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                            <input type="submit" class="login-button" value="Log in" />
                            <button onClick={demoLogin} className='demo-login'>Demo Login</button>
                            <ul className="form-errors">
                            {errorMessages.map(error => <li key={error}>{error}</li>)}
                        </ul>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginModal;

// import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { login } from "../../store/session"
// import './LoginModal.css'



// export const LoginModal = () => {
//     const dispatch = useDispatch()
    
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [errors, setErrors] = useState([])
//     const [showModal, setShowModal] = useState(false)

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         setErrors([])

//         return dispatch(login({ email, password }))
//             .catch(async (res) => {
//                 let data;
//                 try {
//                     data = await res.clone().json()
//                 } catch {
//                     data = await res.text()
//                 }
//                 if (data?.errors) setErrors(data.errors)
//                 else if (data) setErrors([data])
//                 else setErrors([res.statusText])
                
//             })        
//     }

//     const handleDemo = (e) => {
//         e.preventDefault()
//         setErrors([])

//         return dispatch(login({ email: 'demo@user.io', password: 'password' }))
//             .catch(async (res) => {
//                 let data;
//                 try {
//                     data = await res.clone().json()
//                 } catch {
//                     data = await res.text()
//                 }
//                 if (data?.errors) setErrors(data.errors)
//                 else if (data) setErrors([data])
//                 else setErrors([res.statusText])

//             })
//     }

//     const closeModal = () => {
//         setShowModal(false)
        
//     }

//     return (
//         <div className='modal-form'>
//         <form  onSubmit={handleSubmit}>
//             <header>
//                 <div>
//                     <button onClick={() => dispatch(closeModal())}>X</button>
//                 </div>
//                 <h3>Log in</h3>
//             </header>
//                 <hr></hr>
//             <h1 id="login-title">Welcome to Waterbnb</h1>
//             <div
//                 className="input-container"
//                 style={errors.length > 0 ? {border: '2px solid red'} : {}}
//             >
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     placeholder="Email"
//                     onFocus={() => setErrors([])}
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     placeholder="Password"
//                     onFocus={() => setErrors([])}
//                 />
//             </div>
//             <ul className="error-list">
//                 {errors.map(error => <li key={error} style={{color: 'red'}}>{error}</li>)}
//             </ul>
//             <div className='submit-div'>
//                 <button type="submit">Log in</button>
//             </div>
//             <div id='line-div'>
//                 <div className="line"><hr></hr></div>
//                     <div id='or'>or</div>
//                 <div className="line"><hr></hr></div>
//             </div>
//         </form>
//             <div id='other-buttons-div'>
//                 <button onClick={handleDemo} className='other-buttons-login'><img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt=""></img>Log in with demo</button>
//             </div>
//         </div>
//     )
// }

// export default LoginModal

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
            // console.log(data);
            dispatch(setCurrentUser(data.user));
            setIsOpen(false);
          } else {
            const data = await response.json();
            // console.log(data);
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
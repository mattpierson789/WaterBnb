import React, { useState } from 'react';
import './LoginModal.css';
import csrfFetch from '../../store/csrf';

const LoginModal = ({ trigger }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        e.stopPropagation();
        setCredential(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.stopPropagation();
        setPassword(e.target.value);
    } 

   const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const response = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({
                session: {credential,
                 password,
                },
            })
        });
        const data = await response.json();
        console.log(data);
        setIsOpen(false);
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
        <>
            <button onClick={openModal}>
                Login
            </button>
            {isOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={stopPropagation}>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Username" value={credential} onChange={handleUsernameChange} required />
                            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                            <input type="submit" value="Log in" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginModal;

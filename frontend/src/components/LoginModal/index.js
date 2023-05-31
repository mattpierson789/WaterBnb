import React, { useState } from 'react';
import PopUp from '../PopUp';
import LoginModal from './LoginModal';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  


  return (
    <>
        <PopUp onClose={() => setShowModal(false)}>
          <div className='login-header'>Log In</div>
          <LoginModal />
          <br/>
        </PopUp>
    
    </>
  );
}

export default LoginFormModal;
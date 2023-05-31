import React, { useState } from 'react';
import PopUp from '../PopUp';
import RegistrationForm from './RegistrationForm';

function RegistrationFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
        <PopUp onClose={() => setShowModal(false)}>
          <RegistrationForm />
          <br/>
        </PopUp>
  
    </>
  );
}

export default RegistrationFormModal;

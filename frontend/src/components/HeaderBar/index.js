import React from 'react';
import DropDown from '../DropDown';
import Header from '../Header';

const HeaderBar = () => {
  return (
    <div id="header-bar">
      <DropDown />
      <Header />
    </div>
  );
};

export default HeaderBar;

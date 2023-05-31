import React from 'react';
import DropDown from '../DropDown';
import Header from '../Header';
import SearchBar from '../SearchBar/SearchBar';

const HeaderBar = () => {
  return (
    <div id="header-bar">
      <DropDown />
      <Header />
      <SearchBar/>
    </div>
  );
};

export default HeaderBar;

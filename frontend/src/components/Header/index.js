import { Link } from 'react-router-dom';
import React from "react";
import "./Header.css";
import logo from './waterbnb_logo.png'

function Header(props) {
  return (
    <>
    <div id="header-bar-4">
      <Link id="logo" to="/">
        <img id="logo-img" alt="WaterBnb logo" src={logo} />
        <span id="span-logo">Waterbnb</span>
      </Link>
      <a href="https://github.com/mattpierson789" target="_blank">
        <img
          className="icons-header"
          alt="Github"
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        />
      </a>
      <br />
      <a href="https://www.linkedin.com/in/mattpierson1/" target="_blank">
        <img
          className="icons-header"
          alt="LinkedIn"
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        />
      </a>
      <br />
    </div>

     </>
  );
}

export default Header;

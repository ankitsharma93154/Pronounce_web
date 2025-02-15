import React from 'react';
import Logo from "./text_to_speech_24dp_FFF_FILL0_wght400_GRAD0_opsz24.png";

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} loading="lazy" alt="QuickPronounce logo"/>
        <h1>QuickPronounce</h1>
      </div>
    </nav>
  );
};

export default Navbar;

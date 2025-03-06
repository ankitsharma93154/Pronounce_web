import React, { memo } from "react";

const MobileMenu = memo(() => (
  <div className="mobile-menu">
    <a href="#home" className="mobile-nav-link">
      Home
    </a>
    <a href="#features" className="mobile-nav-link">
      Features
    </a>
    <a href="#about" className="mobile-nav-link">
      About
    </a>
    <a href="#contact" className="mobile-nav-link">
      Contact
    </a>
  </div>
));

export default MobileMenu;

import React, { memo } from "react";
import { Link } from "react-router-dom";

const Footer = memo(() => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <Link to="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>
        <span className="footer-separator">|</span>
        <Link to="/terms-and-conditions" className="footer-link">
          Terms and Conditions
        </Link>
        <span className="footer-separator">|</span>
        <Link to="/disclaimer" className="footer-link">
          Disclaimer
        </Link>
        <span className="footer-separator">|</span>
        <Link to="/editorial-policy" className="footer-link">
          Editorial Policy
        </Link>
        <span className="footer-separator">|</span>
        <span className="footer-copyright">
          © {new Date().getFullYear()} QuickPronounce. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
));

export default Footer;

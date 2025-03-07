import React, { memo } from "react";

const Footer = memo(() => (
  <footer className="footer">
    <div className="container">
      <p>© {new Date().getFullYear()} QuickPronounce. All rights reserved.</p>
    </div>
  </footer>
));

export default Footer;

import React, { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import logo from "../images/favicon-32x32.png"; // Adjust the path as necessary

const Header = () => {
  // State management
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle functions
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevState) => !prevState);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prevState) => !prevState);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Apply dark mode to body
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        isDarkMode ? "#1a1a1a" : "#ffffff"
      );
    }
    return () => document.body.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <img src={logo} alt="Logo" height={28} width="auto" />
          </div>
          <span className="logo-text">QuickPronounce</span>
        </Link>

        <nav className="nav-desktop">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          <Link to="/faq" className="nav-link">
            FAQ
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
        </nav>

        <div className="header-actions">
          <button
            onClick={toggleDarkMode}
            className="icon-button"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="icon-button"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link
              to="/contact"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              FAQ
            </Link>
            <Link
              to="/blog"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

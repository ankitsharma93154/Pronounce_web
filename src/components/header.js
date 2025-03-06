import React, { memo } from "react";
import { Volume2, Moon, Sun, Menu, X } from "lucide-react";

const Header = memo(
  ({ isDarkMode, toggleDarkMode, isMobileMenuOpen, toggleMobileMenu }) => (
    <header className="header">
      <div className="container header-content">
        <a href="/" className="logo">
          <div className="logo-icon">
            <Volume2 size={24} color="#2563eb" />
            <div className="logo-dot"></div>
          </div>
          <span className="logo-text">QuickPronounce</span>
        </a>

        <nav className="nav-desktop">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
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
    </header>
  )
);

export default Header;

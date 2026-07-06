import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme, navLinks = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} glassmorphism`}>
      <div className="navbar-container">
        {/* Logo and Brand Name */}
        <a href="#home" className="navbar-logo-container">
          <img src={logoImg} alt="MMA Logo" className="navbar-logo" />
          <div className="navbar-brand-text">
            <span className="navbar-brand-title">MAGRA MARINERS</span>
            <span className="navbar-brand-subtitle">ASSOCIATION</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <ul className="navbar-links-desktop">
          {navLinks.map((link, idx) => (
            <li key={idx} className="navbar-item">
              <a href={link.href} className="navbar-link">{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Right side: Theme Toggle & Hamburger */}
        <div className="navbar-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun className="theme-icon sun" /> : <FaMoon className="theme-icon moon" />}
          </button>
          
          <button 
            onClick={toggleMenu} 
            className="hamburger-btn"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar-drawer-mobile ${isOpen ? 'drawer-open' : ''} glassmorphism`}>
        <ul className="navbar-links-mobile">
          {navLinks.map((link, idx) => (
            <li key={idx} className="navbar-item-mobile">
              <a 
                href={link.href} 
                className="navbar-link-mobile"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

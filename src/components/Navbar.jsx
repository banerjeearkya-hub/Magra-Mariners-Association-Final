import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaEllipsisV } from 'react-icons/fa';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const Navbar = ({ navLinks = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Track scroll position
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
      <div className="navbar-container" ref={menuRef}>
        {/* Logo and Brand Name */}
        <a href="#home" className="navbar-logo-container" onClick={() => setIsOpen(false)}>
          <img src={logoImg} alt="MMA Logo" className="navbar-logo" />
          <div className="navbar-brand-text">
            <span className="navbar-brand-title">MAGRA MARINERS</span>
            <span className="navbar-brand-subtitle">ASSOCIATION</span>
          </div>
        </a>

        {/* Right side: Three-dot menu button */}
        <div className="navbar-actions">
          <button 
            onClick={toggleMenu} 
            className={`threedot-btn ${isOpen ? 'active' : ''}`}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FaTimes /> : <FaEllipsisV />}
          </button>
          
          {/* Dropdown Menu Container */}
          <div className={`threedot-dropdown ${isOpen ? 'dropdown-open' : ''} glassmorphism`}>
            <ul className="dropdown-links">
              {navLinks.map((link, idx) => (
                <li key={idx} className="dropdown-item">
                  <a 
                    href={link.href} 
                    className="dropdown-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

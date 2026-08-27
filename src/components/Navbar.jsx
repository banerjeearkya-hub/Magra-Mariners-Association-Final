import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShieldAlt } from 'react-icons/fa';
import logoImg from '../assets/logo.png';
import PortalModal from './PortalModal';
import './Navbar.css';

const Navbar = ({ navLinks = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
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
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} glassmorphism`}>
        <div className="navbar-container" ref={menuRef}>
          {/* Logo and Brand Name */}
          <Link to="/" className="navbar-logo-container" onClick={() => setIsOpen(false)}>
            <img src={logoImg} alt="MMA Logo" className="navbar-logo" />
            <div className="navbar-brand-text">
              <span className="navbar-brand-title">MAGRA MARINERS</span>
              <span className="navbar-brand-subtitle">ASSOCIATION</span>
            </div>
          </Link>

          {/* Desktop Menu: options are directly visible horizontally */}
          <ul className="navbar-links-desktop">
            {navLinks.map((link, idx) => (
              <li key={idx} className="navbar-item">
                <NavLink 
                  to={link.href} 
                  className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="navbar-item">
              <button 
                className="navbar-official-btn"
                onClick={() => setPortalModalOpen(true)}
              >
                <FaShieldAlt style={{ marginRight: '6px' }} /> Member Login
              </button>
            </li>
          </ul>

          {/* Mobile Menu Action (Hamburger Icon) */}
          <div className="navbar-actions-mobile">
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
                <NavLink 
                  to={link.href} 
                  className={({ isActive }) => `navbar-link-mobile ${isActive ? 'active-link-mobile' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="navbar-item-mobile" style={{ marginTop: '10px' }}>
              <button 
                className="navbar-link-mobile official-mobile-link"
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => {
                  setIsOpen(false);
                  setPortalModalOpen(true);
                }}
              >
                🛡️ Member Login
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Single Portal Modal Selector */}
      <PortalModal 
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

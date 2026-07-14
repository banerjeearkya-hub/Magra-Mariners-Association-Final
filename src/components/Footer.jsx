import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ logo, navLinks = [] }) => {
  const currentYear = 2026;

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Logo & Slogan Column */}
        <div className="footer-column branding-col">
          <Link to="/" className="footer-branding">
            <img src={logo} alt="MMA Logo" className="footer-logo" />
            <div className="footer-brand-text">
              <h3>MAGRA MARINERS</h3>
              <p>ASSOCIATION</p>
            </div>
          </Link>
          <p className="footer-slogan">
            Founded in 2014, Magra Mariners Association is the official voice and community of the passionate Mohun Bagan supporters in Magra, Hooghly.
          </p>
          <div className="footer-social-row">
            <a href="https://www.facebook.com/share/163KJQmNVdA/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.instagram.com/magramarinersassociation2014?igsh=aWRnb2h0MWdlemoz" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column links-col">
          <h4>Quick Links</h4>
          <div className="footer-link-divider"></div>
          <ul className="footer-links-list">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Fan Resources Column */}
        <div className="footer-column resources-col">
          <h4>Fan Clubhouse</h4>
          <div className="footer-link-divider"></div>
          <p className="clubhouse-info">
            Visit our clubhouse for screenings, membership registration, and club merchandise collections.
          </p>
          <div className="clubhouse-hours">
            <p><strong>Open Hours:</strong> Sat & Sun: 5:00 PM - 9:00 PM</p>
            <p><strong>Match Screenings:</strong> As scheduled</p>
          </div>
        </div>

      </div>

      {/* Copyright Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p>© {currentYear} Magra Mariners Association. All Rights Reserved.</p>
          <p className="developer-tag">
            Made with <FaHeart className="heart-icon" /> for the Mariners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCheck, FaUserShield, FaTimes, FaArrowRight } from 'react-icons/fa';
import logoImg from '../assets/logo.png';
import './PortalModal.css';

const PortalModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelectMember = () => {
    onClose();
    navigate('/member-portal');
  };

  const handleSelectOfficial = () => {
    onClose();
    navigate('/login');
  };

  return (
    <AnimatePresence>
      <div className="portal-modal-backdrop" onClick={onClose}>
        <motion.div 
          className="portal-modal-card glassmorphism"
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="portal-modal-header">
            <img src={logoImg} alt="MMA Crest" className="portal-logo" />
            <div>
              <h3>Magra Mariners Association</h3>
              <p>Select your portal to continue</p>
            </div>
            <button className="portal-close-btn" onClick={onClose} aria-label="Close portal modal">
              <FaTimes />
            </button>
          </div>

          {/* Portal Options Grid */}
          <div className="portal-options-grid">
            {/* Option 1: Member Portal */}
            <div className="portal-option-card option-member" onClick={handleSelectMember}>
              <div className="portal-option-icon icon-emerald">
                <FaUserCheck />
              </div>
              <div className="portal-option-text">
                <h4>Member Portal</h4>
                <p>Register as a new member or check your application verification status via Mobile OTP.</p>
              </div>
              <div className="portal-arrow">
                <FaArrowRight />
              </div>
            </div>

            {/* Option 2: Official Portal */}
            <div className="portal-option-card option-official" onClick={handleSelectOfficial}>
              <div className="portal-option-icon icon-maroon">
                <FaUserShield />
              </div>
              <div className="portal-option-text">
                <h4>Official Portal</h4>
                <p>Restricted sign-in for authorized officials and administrators to verify member applications.</p>
              </div>
              <div className="portal-arrow">
                <FaArrowRight />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PortalModal;

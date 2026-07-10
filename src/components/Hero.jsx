import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaUsers, FaInfoCircle } from 'react-icons/fa';
import logoImg from '../assets/logo.png';
import './Hero.css';

const Hero = ({ data }) => {
  return (
    <section id="home" className="hero-section">
      {/* Background Image with Dark Overlay */}
      <div 
        className="hero-bg" 
        style={{ backgroundImage: `url(${data.bgImage})` }}
      />
      <div className="hero-overlay" />
      
      {/* Curved Bottom Divider */}
      <div className="hero-curve">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-logo-box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={logoImg} alt="MMA Crest" className="hero-crest glow-animation" />
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {data.title}
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          "{data.subtitle}"
        </motion.p>

        <motion.div
          className="hero-btn-container"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a 
            href={data.ctaLink} 
            className="btn-primary hero-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaUsers /> {data.ctaText}
          </a>
          <a href={data.secondaryLink} className="btn-secondary hero-btn hero-btn-sec">
            <FaInfoCircle /> {data.secondaryText}
          </a>
        </motion.div>
      </div>

      {/* Floating Indicator */}
      <motion.div
        className="scroll-down-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#about" aria-label="Scroll down">
          <FaChevronDown />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;

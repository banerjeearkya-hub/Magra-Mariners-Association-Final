import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="loader-content">
        {/* Outer Ring with Maroon & Green */}
        <div className="loader-ring">
          <div className="ring-segment maroon-segment"></div>
          <div className="ring-segment green-segment"></div>
        </div>
        
        {/* Core Logo Placeholder or Icon */}
        <motion.div
          className="loader-logo-wrapper"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <img src="/logo.png" alt="MMA Logo" className="loader-logo" />
        </motion.div>
        
        <motion.h2 
          className="loader-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          MAGRA MARINERS
        </motion.h2>
        <motion.p 
          className="loader-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          United by Passion. Driven by Mariners.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;

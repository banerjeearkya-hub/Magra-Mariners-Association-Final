import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import './SocialFollow.css';

const SocialFollow = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="social-follow-section section-padding">
      <motion.div 
        className="social-follow-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <h2>Stay Connected</h2>
          <p className="social-subtitle">
            Follow us on our official social media platforms for the latest updates, match day events, and welfare activities.
          </p>
        </motion.div>

        <motion.div className="social-buttons-grid" variants={itemVariants}>
          {/* Facebook Button */}
          <motion.a 
            href="https://www.facebook.com/share/163KJQmNVdA/"
            target="_blank" 
            rel="noopener noreferrer"
            className="social-btn facebook-btn glassmorphism"
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="social-icon-wrapper fb-icon">
              <FaFacebookF />
            </div>
            <div className="social-btn-text">
              <h4>Facebook</h4>
              <p>Join our group & community</p>
            </div>
          </motion.a>

          {/* Instagram Button */}
          <motion.a 
            href="https://www.instagram.com/magramarinersassociation2014?igsh=aWRnb2h0MWdlemoz"
            target="_blank" 
            rel="noopener noreferrer"
            className="social-btn instagram-btn glassmorphism"
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="social-icon-wrapper ig-icon">
              <FaInstagram />
            </div>
            <div className="social-btn-text">
              <h4>Instagram</h4>
              <p>See our latest moments & reels</p>
            </div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SocialFollow;

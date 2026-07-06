import React from 'react';
import { motion } from 'framer-motion';
import { FaBookmark, FaQuoteLeft, FaHistory } from 'react-icons/fa';
import './About.css';

const About = ({ data }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="about-section section-padding">
      <div className="about-container">
        
        {/* Left column: Visual Badge & Summary */}
        <motion.div 
          className="about-visual"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-badge-card glassmorphism premium-border-maroon">
            <FaHistory className="about-badge-icon" />
            <h3>ESTD 2014</h3>
            <p>More than a decade of unwavering loyalty and supporter activities in Magra.</p>
            <div className="badge-logo-container">
              <img src="/logo.png" alt="MMA" className="badge-logo" />
            </div>
          </div>
          
          <div className="about-quote glassmorphism premium-border-green">
            <FaQuoteLeft className="quote-icon" />
            <p>Joy Mohun Bagan! We sail with pride, supporting the mariners through every wave of victory and challenge.</p>
          </div>
        </motion.div>

        {/* Right column: Narrative Text */}
        <motion.div 
          className="about-text-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="about-header-sub" variants={itemVariants}>
            <span className="about-tagline"><FaBookmark /> OFFICIAL SUPPORTERS CLUB</span>
            <h2 className="about-title">{data.title}</h2>
            <div className="title-divider-line"></div>
          </motion.div>

          <motion.div className="about-paragraphs" variants={itemVariants}>
            {data.description.map((paragraph, idx) => (
              <p key={idx} className="about-paragraph">{paragraph}</p>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;

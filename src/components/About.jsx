import React from 'react';
import { motion } from 'framer-motion';
import { FaBookmark, FaQuoteLeft, FaHistory, FaTrophy, FaAward, FaShieldAlt, FaCrown, FaStar, FaMedal } from 'react-icons/fa';
import logoImg from '../assets/logo.png';
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
              <img src={logoImg} alt="MMA" className="badge-logo" />
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

      {/* About Mohun Bagan Section */}
      <motion.div 
        className="mohun-bagan-wrapper"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 className="mb-section-title" variants={itemVariants}>
          About Mohun Bagan
        </motion.h2>

        <div className="mb-main-grid">
          <motion.div className="mb-intro-card" variants={itemVariants}>
            <h3>The Legacy of the Mariners</h3>
            <p>
              Mohun Bagan, founded in 1889, is one of the oldest and most successful football clubs in India. 
              Known as the Mariners, the club represents a rich legacy, passion, and footballing excellence. 
              The Green and Maroon colors symbolize generations of supporters who continue to carry the club’s spirit across the world.
            </p>
          </motion.div>

          <motion.div className="mb-stats-grid" variants={itemVariants}>
            <div className="mb-stat-card">
              <div className="mb-stat-val">1889</div>
              <div className="mb-stat-label">Founded</div>
            </div>
            <div className="mb-stat-card">
              <div className="mb-stat-val">Mariners</div>
              <div className="mb-stat-label">Nickname</div>
            </div>
            <div className="mb-stat-card">
              <div className="mb-stat-val">Green & Maroon</div>
              <div className="mb-stat-label">Club Colours</div>
            </div>
            <div className="mb-stat-card">
              <div className="mb-stat-val">137+ Years</div>
              <div className="mb-stat-label">Legacy</div>
            </div>
          </motion.div>
        </div>

        {/* Club Achievements Subsection */}
        <div className="mb-achievements-container">
          <motion.h3 className="mb-section-title" variants={itemVariants} style={{ fontSize: '1.75rem', marginBottom: '10px' }}>
            Club Achievements
          </motion.h3>
          <div className="mb-achievements-grid">
            <motion.div className="mb-achievement-card" variants={itemVariants}>
              <div className="mb-ach-icon-wrapper ach-icon-maroon">
                <FaTrophy />
              </div>
              <h4>Durand Cup Winners</h4>
            </motion.div>

            <motion.div className="mb-achievement-card" variants={itemVariants}>
              <div className="mb-ach-icon-wrapper ach-icon-green">
                <FaAward />
              </div>
              <h4>Federation Cup Winners</h4>
            </motion.div>

            <motion.div className="mb-achievement-card" variants={itemVariants}>
              <div className="mb-ach-icon-wrapper ach-icon-maroon">
                <FaShieldAlt />
              </div>
              <h4>IFA Shield Winners</h4>
            </motion.div>

            <motion.div className="mb-achievement-card" variants={itemVariants}>
              <div className="mb-ach-icon-wrapper ach-icon-green">
                <FaCrown />
              </div>
              <h4>Calcutta Football League Champions</h4>
            </motion.div>

            <motion.div className="mb-achievement-card" variants={itemVariants}>
              <div className="mb-ach-icon-wrapper ach-icon-maroon">
                <FaStar />
              </div>
              <h4>ISL Champions</h4>
            </motion.div>

            <motion.div className="mb-achievement-card" variants={itemVariants}>
              <div className="mb-ach-icon-wrapper ach-icon-green">
                <FaMedal />
              </div>
              <h4>League Winners Shield</h4>
            </motion.div>
          </div>
        </div>

        {/* Supporter Message Subsection */}
        <motion.div className="mb-inspiration-card glassmorphism" variants={itemVariants}>
          <h3>Our Inspiration</h3>
          <p>
            "For us, Mohun Bagan is more than a football club. It is a symbol of heritage, pride, unity, and passion. 
            Magra Mariners Association was formed to bring together supporters who proudly carry the Green and Maroon spirit beyond matchdays."
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;

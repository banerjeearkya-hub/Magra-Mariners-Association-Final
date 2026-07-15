import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaAward, 
  FaShieldAlt, 
  FaCrown, 
  FaStar, 
  FaMedal,
  FaChevronDown
} from 'react-icons/fa';
import logoImg from '../assets/logo.png';
import './Club.css';

const Club = () => {
  const [particles, setParticles] = useState([]);

  // Generate random light particles on load
  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 6
    }));
    setParticles(generated);
  }, []);

  const handleScrollDown = () => {
    const cabinet = document.getElementById('trophy-cabinet');
    if (cabinet) {
      cabinet.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Custom White Trophy SVGs Silhouettes mapping exactly to reference shapes
  const trophiesData = [
    {
      title: "ISL Cup",
      titlesCount: "2 Titles",
      desc: "Champions",
      svg: (
        <svg viewBox="0 0 100 120" className="trophy-svg-graphic">
          <rect x="35" y="105" width="30" height="8" rx="2" fill="white" />
          <path d="M40,105 L44,85 L56,85 L60,105 Z" fill="white" opacity="0.9" />
          <path d="M44,85 C44,70 32,55 35,25 L65,25 C68,55 56,70 56,85 Z" fill="white" />
          <ellipse cx="50" cy="25" rx="15" ry="3" fill="rgba(0,0,0,0.15)" stroke="white" strokeWidth="1.5" />
          <path d="M35,28 C20,32 15,55 38,70 C36,65 30,48 35,32 Z" fill="white" />
          <path d="M65,28 C80,32 85,55 62,70 C64,65 70,48 65,32 Z" fill="white" />
        </svg>
      )
    },
    {
      title: "ISL League Shield",
      titlesCount: "2 Titles",
      desc: "Champions",
      svg: (
        <svg viewBox="0 0 100 100" className="trophy-svg-graphic">
          <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="3" />
          <circle cx="50" cy="9" r="2.5" fill="white" />
          <circle cx="50" cy="91" r="2.5" fill="white" />
          <circle cx="9" cy="50" r="2.5" fill="white" />
          <circle cx="91" cy="50" r="2.5" fill="white" />
          <circle cx="21" cy="21" r="2.5" fill="white" />
          <circle cx="79" cy="21" r="2.5" fill="white" />
          <circle cx="21" cy="79" r="2.5" fill="white" />
          <circle cx="79" cy="79" r="2.5" fill="white" />
          <circle cx="50" cy="50" r="38" fill="white" />
          <circle cx="50" cy="50" r="24" fill="rgba(0,0,0,0.2)" stroke="white" strokeWidth="2" />
          <path d="M50,32 L53,45 L66,42 L56,50 L63,63 L50,55 L37,63 L44,50 L34,42 L47,45 Z" fill="white" />
        </svg>
      )
    },
    {
      title: "NFL / I-League",
      titlesCount: "5 Titles",
      desc: "Champions",
      svg: (
        <svg viewBox="0 0 100 130" className="trophy-svg-graphic">
          <rect x="25" y="115" width="50" height="8" rx="1" fill="white" />
          <rect x="30" y="105" width="40" height="10" fill="white" opacity="0.9" />
          <rect x="35" y="97" width="30" height="8" fill="white" opacity="0.8" />
          <rect x="38" y="45" width="5" height="52" fill="white" />
          <rect x="47" y="42" width="6" height="55" fill="white" />
          <rect x="57" y="45" width="5" height="52" fill="white" />
          <path d="M32,42 L68,42 L62,35 L38,35 Z" fill="white" />
          <circle cx="50" cy="23" r="14" fill="white" />
          <path d="M40,16 C46,19 54,19 60,16" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />
          <path d="M40,30 C46,27 54,27 60,30" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />
          <path d="M50,9 L50,37" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />
        </svg>
      )
    },
    {
      title: "Federation Cup",
      titlesCount: "14 Titles",
      desc: "Champions",
      svg: (
        <svg viewBox="0 0 100 120" className="trophy-svg-graphic">
          <ellipse cx="50" cy="110" rx="22" ry="6" fill="white" />
          <rect x="35" y="90" width="30" height="15" fill="white" opacity="0.9" />
          <path d="M45,90 L48,65 L52,65 L55,90 Z" fill="white" />
          <path d="M28,25 C28,55 35,68 50,68 C65,68 72,55 72,25 Z" fill="white" />
          <ellipse cx="50" cy="25" rx="22" ry="4" fill="rgba(0,0,0,0.15)" stroke="white" strokeWidth="1.5" />
          <path d="M28,30 C12,32 16,65 38,62 C37,56 22,54 30,36 Z" fill="white" />
          <path d="M72,30 C88,32 84,65 62,62 C63,56 78,54 70,36 Z" fill="white" />
        </svg>
      )
    },
    {
      title: "Durand Cup",
      titlesCount: "17 Titles",
      desc: "Champions",
      svg: (
        <svg viewBox="0 0 100 130" className="trophy-svg-graphic">
          <ellipse cx="50" cy="115" rx="24" ry="5" fill="white" />
          <rect x="32" y="98" width="36" height="14" fill="white" opacity="0.9" />
          <path d="M44,98 C44,92 56,92 56,98 Z" fill="white" />
          <path d="M30,55 C30,85 40,94 50,94 C60,94 70,85 70,55 C70,44 65,38 50,38 C35,38 30,44 30,55 Z" fill="white" />
          <path d="M32,38 C32,23 68,23 68,38 Z" fill="white" />
          <circle cx="50" cy="20" r="4.5" fill="white" />
          <path d="M30,46 C18,36 22,66 38,78 C36,70 28,58 32,48 Z" fill="white" />
          <path d="M70,46 C82,36 78,66 62,78 C64,70 72,58 68,48 Z" fill="white" />
        </svg>
      )
    },
    {
      title: "IFA Shield",
      titlesCount: "23 Titles",
      desc: "Champions",
      svg: (
        <svg viewBox="0 0 100 100" className="trophy-svg-graphic">
          <path d="M50,92 C20,75 10,48 10,18 L32,18 C32,10 50,5 50,5 C50,5 68,10 68,18 L90,18 C90,48 80,75 50,92 Z" fill="white" />
          <path d="M50,83 C24,68 15,44 15,22 L34,22 C34,16 50,11 50,11 C50,11 66,16 66,22 L85,22 C85,44 76,68 50,83 Z" fill="rgba(0,0,0,0.2)" stroke="white" strokeWidth="1.5" />
          <circle cx="50" cy="46" r="14" fill="white" />
          <circle cx="50" cy="46" r="11" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          <path d="M42,46 C45,49 55,49 58,46 M42,46 C45,43 55,43 58,46" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />
        </svg>
      )
    },
    {
      title: "Rovers Cup",
      titlesCount: "14 Titles",
      desc: "Champions",
      svg: (
        <svg viewBox="0 0 100 130" className="trophy-svg-graphic">
          <polygon points="28,120 72,120 66,106 34,106" fill="white" />
          <path d="M43,106 L45,86 L55,86 L57,106 Z" fill="white" opacity="0.9" />
          <path d="M34,42 C32,60 38,86 50,86 C62,86 68,60 66,42 Z" fill="white" />
          <path d="M34,42 L66,42 L58,32 L42,32 Z" fill="white" />
          <circle cx="50" cy="27" r="3.5" fill="white" />
          <path d="M34,50 C12,42 16,14 43,26 C37,34 26,38 34,46 Z" fill="white" />
          <path d="M66,50 C88,42 84,14 57,26 C63,34 74,38 66,46 Z" fill="white" />
        </svg>
      )
    },
    {
      title: "Calcutta Football League",
      titlesCount: "30 Titles",
      desc: "Champions",
      svg: (
        <svg viewBox="0 0 100 120" className="trophy-svg-graphic">
          <ellipse cx="50" cy="112" rx="20" ry="4" fill="white" />
          <rect x="34" y="90" width="32" height="18" fill="white" opacity="0.9" />
          <path d="M42,90 C42,80 58,80 58,90 Z" fill="white" />
          <path d="M45,80 L48,58 L52,58 L55,80 Z" fill="white" />
          <path d="M26,32 C26,52 35,58 50,58 C65,58 74,52 74,32 Z" fill="white" />
          <ellipse cx="50" cy="32" rx="24" ry="4" fill="rgba(0,0,0,0.15)" stroke="white" strokeWidth="1.5" />
          <path d="M26,36 C16,36 14,48 27,51 C24,47 22,42 26,38 Z" fill="white" />
          <path d="M74,36 C84,36 86,48 73,51 C76,47 78,42 74,38 Z" fill="white" />
        </svg>
      )
    }
  ];

  return (
    <div className="club-page-container">
      {/* FULL-SCREEN HERO BANNER (100vh) */}
      <section className="club-hero-section">
        {/* Parallax Background */}
        <div className="club-hero-bg"></div>
        <div className="club-hero-overlay"></div>

        {/* Floating Light Particles */}
        <div className="particles-container">
          {particles.map((p) => (
            <div 
              key={p.id}
              className="light-particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.x}%`,
                top: `${p.y}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            />
          ))}
        </div>

        {/* Centered Hero Content */}
        <div className="club-hero-content-wrapper">
          <motion.div 
            className="club-hero-logo-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={logoImg} alt="Mohun Bagan Logo" className="club-hero-logo" />
            <div className="club-logo-glow"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="club-hero-text-block"
          >
            <motion.h1 className="club-hero-main-title" variants={itemVariants}>
              MOHUN BAGAN
            </motion.h1>
            <motion.h2 className="club-hero-subtitle" variants={itemVariants}>
              THE PRIDE OF INDIAN FOOTBALL
            </motion.h2>
            <motion.h3 className="club-hero-tagline" variants={itemVariants}>
              A Legacy Since 1889
            </motion.h3>
            <motion.p className="club-hero-description" variants={itemVariants}>
              "Founded in 1889, Mohun Bagan is one of India's oldest and most decorated football clubs. 
              With a legacy built on passion, excellence, and unforgettable achievements, the Green & Maroon 
              continues to inspire generations of supporters."
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div className="club-hero-btn-row" variants={itemVariants}>
              <a href="#/about" className="btn-primary club-cta-btn legacy-btn">
                Explore Legacy
              </a>
              <button onClick={handleScrollDown} className="btn-secondary club-cta-btn cabinet-btn">
                Trophy Cabinet
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll-down indicator */}
        <div className="club-scroll-indicator" onClick={handleScrollDown}>
          <span>Scroll to Cabinet</span>
          <FaChevronDown className="indicator-arrow-icon" />
        </div>
      </section>

      {/* MUSEUM-STYLE TROPHY CABINET SECTION */}
      <section id="trophy-cabinet" className="trophy-cabinet-section">
        {/* Dark Museum Background Glows */}
        <div className="cabinet-ambient-glow glow-maroon"></div>
        <div className="cabinet-ambient-glow glow-green"></div>

        <div className="cabinet-content-container">
          <div className="section-header cabinet-header">
            <h2 className="cabinet-section-title">MOHUN BAGAN TROPHY CABINET</h2>
            <p className="cabinet-section-subtitle">A Legacy Forged Through Champions</p>
            <div className="cabinet-header-divider"></div>
          </div>

          {/* Trophy Cabinet Grid */}
          <div className="trophy-cabinet-grid">
            {trophiesData.map((trophy, idx) => (
              <motion.div
                key={idx}
                className="trophy-cabinet-card glassmorphism"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: (idx % 4) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Custom White Trophy SVG (Silhouettes) */}
                <div className="trophy-svg-container">
                  <div className="trophy-floating-wrapper">
                    {trophy.svg}
                  </div>
                  <div className="trophy-svg-shadow"></div>
                </div>

                {/* Trophy Details */}
                <div className="trophy-details">
                  <h4 className="trophy-title-text">{trophy.title}</h4>
                  <div className="trophy-badge-row">
                    <span className="trophy-title-count">{trophy.titlesCount}</span>
                    <span className="trophy-tag-champions">{trophy.desc}</span>
                  </div>
                </div>

                {/* Light sweep element */}
                <div className="light-sweep-effect"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Club;

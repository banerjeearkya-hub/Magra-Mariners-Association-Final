import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaTimes, 
  FaSearchPlus, 
  FaFilePdf, 
  FaDownload, 
  FaExpand, 
  FaExternalLinkAlt,
  FaAward,
  FaHistory
} from 'react-icons/fa';
import './Gallery.css';

// Import a representative thumbnail for the brochure card
import brochureThumb from '../assets/brochure/page_1_img_1.jpg';

const Gallery = ({ data }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const brochureUrl = `${import.meta.env.BASE_URL}MMA_Brochure.pdf`;

  // Filter categories
  const categories = [
    { key: 'all', label: 'All Memories' },
    { key: 'social-work', label: 'Social Work' },
    { key: 'blood-donation', label: 'Blood Donation' },
    { key: 'football', label: 'Football Events' },
    { key: 'stadium-visits', label: 'Stadium & Away Visits' },
    { key: 'mohun-bagan', label: 'Club Celebrations' }
  ];

  // Filtered list
  const filteredImages = data.images.filter(
    (img) => selectedCategory === 'all' || img.category === selectedCategory
  );

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const openBrochureFullscreen = () => {
    setIsBrochureOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBrochureFullscreen = () => {
    setIsBrochureOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Timeline Decadal Journey Data
  const timelineData = [
    {
      year: '2014',
      title: 'The Foundation',
      desc: 'Magra Mariners Association is born out of a small group of passionate Mohun Bagan fans in Magra, Hooghly, uniting local supporters.'
    },
    {
      year: '2016 - 2018',
      title: 'Official Affiliation & Social Work',
      desc: 'Registered officially under the West Bengal Society Act (Reg No. S0027331). Initiated annual Voluntary Blood Donation Camps and clothes distribution campaigns.'
    },
    {
      year: '2020',
      title: 'Pandemic Relief Response',
      desc: 'Donated to the Chief Minister\'s Relief Fund during COVID-19, distributed clothes to sanitation workers, and felicitated medical staff at Magra Hospital.'
    },
    {
      year: '2022 - 2023',
      title: 'Stadium Duties & Away Travel',
      desc: 'Organized massive regular trips to Salt Lake Stadium (VYBK) and traveled to away matches in Bhubaneswar, Jamshedpur, and Dhaka (AFC Cup matches).'
    },
    {
      year: '2024 - 2025',
      title: 'League Shield & Trophy Rally',
      desc: 'Witnessed Mohun Bagan lift the ISL League Shield & Championship. Organized a historic celebration rally through the streets of Magra.'
    }
  ];

  return (
    <section id="gallery" className="gallery-section section-padding">
      <div className="section-header">
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </div>

      <div className="gallery-container">
        {/* BROCHURE INTEGRATION CARD */}
        <motion.div 
          className="brochure-card-container glassmorphism premium-border-maroon"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="brochure-grid">
            <div className="brochure-left">
              <div className="brochure-thumb-wrapper">
                <img src={brochureThumb} alt="MMA Brochure Cover" className="brochure-thumb" />
                <div className="brochure-badge">
                  <FaFilePdf className="pdf-icon" />
                  <span>Brochure</span>
                </div>
              </div>
            </div>
            <div className="brochure-right">
              <span className="premium-accent-tag">Established 2014</span>
              <h3 className="brochure-title">Official Association Brochure</h3>
              <p className="brochure-desc">
                Explore the official documentation of the Magra Mariners Association (Reg No. S0027331), affiliated with Mohun Bagan Athletic Club. Discover our decade-long journey, achievements, stadium away duties, and continuous social welfare services in Hooghly.
              </p>
              
              <div className="brochure-features">
                <div className="feature-item">
                  <span className="feature-bullet">⚽</span>
                  <span><strong>12th Man Journey:</strong> Supporting Mohun Bagan across India & Bangladesh.</span>
                </div>
                <div className="feature-item">
                  <span className="feature-bullet">⚽</span>
                  <span><strong>Social Responsibility:</strong> Organizing Blood Donation Camps and charity programs.</span>
                </div>
                <div className="feature-item">
                  <span className="feature-bullet">⚽</span>
                  <span><strong>Grassroots Football:</strong> Supporting orphanages and local tournaments.</span>
                </div>
              </div>

              <div className="brochure-actions">
                <a 
                  href={brochureUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary brochure-btn"
                >
                  <FaExternalLinkAlt className="btn-icon" /> View Online
                </a>
                <button 
                  onClick={openBrochureFullscreen} 
                  className="btn btn-sec brochure-btn"
                >
                  <FaExpand className="btn-icon" /> Full Screen Reader
                </button>
                <a 
                  href={brochureUrl} 
                  download="MMA_Official_Brochure.pdf" 
                  className="btn brochure-download-btn"
                >
                  <FaDownload className="btn-icon" /> Download PDF
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GALLERY TABS & FILTERS */}
        <div className="gallery-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-tab ${selectedCategory === cat.key ? 'active-tab' : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                className="gallery-item-wrapper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                onClick={() => openLightbox(index)}
              >
                <div className="gallery-card glassmorphism">
                  <div className="gallery-img-container">
                    <img 
                      src={image.src} 
                      alt={image.title} 
                      className="gallery-img"
                      loading="lazy" 
                    />
                    <div className="gallery-hover-overlay">
                      <FaSearchPlus className="zoom-icon" />
                      <h3>{image.title}</h3>
                      <p className="hover-category">{image.category.replace('-', ' ')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* DECADAL JOURNEY TIMELINE */}
        <div className="timeline-section">
          <div className="timeline-header">
            <FaHistory className="timeline-history-icon" />
            <h3>Our Decadal Journey</h3>
            <div className="timeline-subtitle-line"></div>
          </div>
          
          <div className="timeline-container">
            {timelineData.map((item, idx) => (
              <motion.div 
                key={idx}
                className="timeline-item"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="timeline-badge-year">
                  <FaAward className="timeline-badge-icon" />
                  <span>{item.year}</span>
                </div>
                <div className="timeline-card glassmorphism">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN BROCHURE READER MODAL */}
      <AnimatePresence>
        {isBrochureOpen && (
          <motion.div
            className="lightbox-overlay pdf-viewer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="lightbox-close-btn" onClick={closeBrochureFullscreen} aria-label="Close reader">
              <FaTimes />
            </button>
            <motion.div
              className="pdf-viewer-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <iframe 
                src={`${brochureUrl}#view=FitH`} 
                title="Magra Mariners Association Official Brochure PDF Reader"
                className="pdf-iframe"
                frameBorder="0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImageIndex !== null && filteredImages[activeImageIndex] && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close lightbox">
              <FaTimes />
            </button>

            {filteredImages.length > 1 && (
              <>
                <button className="lightbox-nav-btn prev-btn" onClick={showPrev} aria-label="Previous image">
                  <FaChevronLeft />
                </button>
                <button className="lightbox-nav-btn next-btn" onClick={showNext} aria-label="Next image">
                  <FaChevronRight />
                </button>
              </>
            )}

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredImages[activeImageIndex].src} 
                alt={filteredImages[activeImageIndex].title} 
                className="lightbox-img"
              />
              <div className="lightbox-caption glassmorphism">
                <h3>{filteredImages[activeImageIndex].title}</h3>
                <p>{filteredImages[activeImageIndex].description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

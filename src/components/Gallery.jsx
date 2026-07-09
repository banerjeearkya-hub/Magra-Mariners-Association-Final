import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaTimes, 
  FaSearchPlus,
  FaAward,
  FaHistory
} from 'react-icons/fa';
import './Gallery.css';

const Gallery = ({ data }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // New Categories requested by the user
  const categories = [
    { key: 'all', label: 'All Memories' },
    { key: 'social-welfare', label: 'Social Welfare Activities' },
    { key: 'mohun-bagan', label: 'Mohun Bagan & Fan Celebrations' },
    { key: 'match-day', label: 'Match Day Memories' },
    { key: 'afc-international', label: 'AFC International Memories' },
    { key: 'football-development', label: 'Football Development' }
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaSearchPlus } from 'react-icons/fa';
import './Gallery.css';

const Gallery = ({ data }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

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
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
  };

  return (
    <section id="gallery" className="gallery-section section-padding">
      <div className="section-header">
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </div>

      {/* Grid Layout */}
      <div className="gallery-grid">
        {data.images.map((image, index) => (
          <motion.div
            key={image.id}
            className="gallery-item-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
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
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close lightbox">
              <FaTimes />
            </button>

            {/* Navigation Buttons */}
            <button className="lightbox-nav-btn prev-btn" onClick={showPrev} aria-label="Previous image">
              <FaChevronLeft />
            </button>
            <button className="lightbox-nav-btn next-btn" onClick={showNext} aria-label="Next image">
              <FaChevronRight />
            </button>

            {/* Lightbox Content */}
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={data.images[activeImageIndex].src} 
                alt={data.images[activeImageIndex].title} 
                className="lightbox-img"
              />
              <div className="lightbox-caption glassmorphism">
                <h3>{data.images[activeImageIndex].title}</h3>
                <p>{data.images[activeImageIndex].description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

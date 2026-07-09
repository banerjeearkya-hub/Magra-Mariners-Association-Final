import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf, FaDownload, FaExpand, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import './Brochure.css';

// Import the brochure cover thumbnail
import brochureThumb from '../assets/brochure/page_1_img_1.jpg';

const Brochure = ({ data }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const brochureUrl = `${import.meta.env.BASE_URL}MMA_Brochure.pdf`;

  const openViewer = () => {
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="brochure" className="brochure-section section-padding">
      <div className="section-header">
        <h2>Official Brochure</h2>
        <p>Learn more about our legacy and operations</p>
      </div>

      <div className="brochure-container">
        <motion.div 
          className="brochure-glass-card glassmorphism premium-border-maroon"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="brochure-layout">
            <div className="brochure-preview-side">
              <div className="brochure-img-frame">
                <img src={brochureThumb} alt="Official Brochure Cover" className="brochure-cover-img" />
                <div className="brochure-overlay-tag">
                  <FaFilePdf className="pdf-tag-icon" />
                  <span>PDF Document</span>
                </div>
              </div>
            </div>

            <div className="brochure-text-side">
              <span className="brochure-badge-tag">Association Document</span>
              <h3 className="brochure-card-title">Magra Mariners Association Brochure</h3>
              <p className="brochure-card-desc">
                Explore the official brochure of Magra Mariners Association featuring our organization details, activities, achievements, and initiatives.
              </p>

              <div className="brochure-bullets">
                <div className="bullet-row">
                  <span className="bullet-dot">⚽</span>
                  <span><strong>Society Reg:</strong> Official registration & administrative framework details.</span>
                </div>
                <div className="bullet-row">
                  <span className="bullet-dot">⚽</span>
                  <span><strong>Welfare Work:</strong> Decadal milestones of charity and community services.</span>
                </div>
                <div className="bullet-row">
                  <span className="bullet-dot">⚽</span>
                  <span><strong>Supporter Travels:</strong> Match day journeys and away stadium duties records.</span>
                </div>
              </div>

              <div className="brochure-button-row">
                <button onClick={openViewer} className="btn btn-primary brochure-action-btn">
                  <FaExpand className="btn-icon-svg" /> View Brochure
                </button>
                <a href={brochureUrl} download="MMA_Official_Brochure.pdf" className="btn brochure-download-btn brochure-action-btn">
                  <FaDownload className="btn-icon-svg" /> Download Brochure
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FULLSCREEN PDF VIEWER MODAL */}
      <AnimatePresence>
        {isViewerOpen && (
          <motion.div
            className="brochure-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewer}
          >
            {/* Close Button */}
            <button className="brochure-modal-close" onClick={closeViewer} aria-label="Close PDF Viewer">
              <FaTimes />
            </button>

            {/* External Tab Option */}
            <a href={brochureUrl} target="_blank" rel="noopener noreferrer" className="brochure-external-btn" onClick={(e) => e.stopPropagation()}>
              <FaExternalLinkAlt /> Open in New Tab
            </a>

            {/* PDF Iframe Box */}
            <motion.div
              className="brochure-iframe-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe 
                src={`${brochureUrl}#view=FitH`} 
                title="Magra Mariners Association Official Brochure Reader"
                className="brochure-pdf-iframe"
                frameBorder="0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Brochure;

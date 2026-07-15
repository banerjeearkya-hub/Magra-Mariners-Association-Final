import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';
import './App.css';

import logoImg from './assets/logo.png';

// Central Site Data
import { siteData } from './data/siteData';

// Components
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Committee from './components/Committee';
import Gallery from './components/Gallery';
import Brochure from './components/Brochure';
import Events from './components/Events';
import Statistics from './components/Statistics';
import Contact from './components/Contact';
import SocialFollow from './components/SocialFollow';
import Club from './components/Club';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopRoute from './components/ScrollToTopRoute';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force set default dark attributes
    document.documentElement.setAttribute('data-theme', 'dark');

    // Loader timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Club", href: "/club" },
    { label: "About", href: "/about" },
    { label: "Committee", href: "/committee" },
    ...(siteData.gallery.images && siteData.gallery.images.length > 0 ? [{ label: "Gallery", href: "/gallery" }] : []),
    { label: "Brochure", href: "/brochure" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <div className="app-container">
      {/* Entrance Loader Animation */}
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <HashRouter>
          {/* Reset window scroll position on route transitions */}
          <ScrollToTopRoute />

          {/* Sticky Navigation */}
          <Navbar navLinks={navLinks} />
          
          {/* Main Page Layout */}
          <main>
            <Routes>
              {/* Home Page Route */}
              <Route path="/" element={
                <>
                  <Hero data={siteData.hero} />
                  
                  {/* Association Introduction */}
                  <section className="about-section section-padding">
                    <div className="section-header">
                      <h2>Who We Are</h2>
                      <p style={{ maxWidth: '750px', margin: '15px auto 0 auto', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                        Founded in 2014, Magra Mariners Association is the official voice and community of the passionate Mohun Bagan supporters in Magra, Hooghly. 
                        As a registered society, we are united by our love for the green & maroon colors and are dedicated to promoting sports, arranging match day screenings, 
                        conducting voluntary blood donation camps, and supporting social welfare activities in our region.
                      </p>
                    </div>
                  </section>

                  {/* Highlights statistics counter */}
                  <Statistics data={siteData.statistics} />
                </>
              } />

              {/* Club Page Route */}
              <Route path="/club" element={<Club />} />

              {/* About Us Page Route */}
              <Route path="/about" element={<About data={siteData.about} />} />

              {/* Executive Committee Page Route */}
              <Route path="/committee" element={<Committee data={siteData.committee} />} />

              {/* Gallery Page Route */}
              {siteData.gallery.images && siteData.gallery.images.length > 0 && (
                <Route path="/gallery" element={<Gallery data={siteData.gallery} />} />
              )}

              {/* Brochure Page Route */}
              <Route path="/brochure" element={<Brochure data={siteData.gallery} />} />

              {/* Events Page Route */}
              <Route path="/events" element={<Events data={siteData.events} />} />

              {/* Contact Page Route */}
              <Route path="/contact" element={
                <>
                  <Contact data={siteData.contact} />
                  <SocialFollow />
                </>
              } />

              {/* Fallback Wildcard Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer logo={logoImg} navLinks={navLinks} />
          
          {/* Floating back-to-top widget */}
          <ScrollToTop />
        </HashRouter>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
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
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [loading, setLoading] = useState(true);
  const theme = 'dark';

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
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Committee", href: "#committee" },
    ...(siteData.gallery.images && siteData.gallery.images.length > 0 ? [{ label: "Gallery", href: "#gallery" }] : []),
    { label: "Brochure", href: "#brochure" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <div className="app-container">
        {/* Entrance Loader Animation */}
        <AnimatePresence>
          {loading && <Loader />}
        </AnimatePresence>

        {!loading && (
          <>
            {/* Sticky Navigation */}
            <Navbar navLinks={navLinks} />
            
            {/* Main Page Layout */}
            <main>
              {/* Hero Banner */}
              <Hero data={siteData.hero} />
              
              {/* About Section */}
              <About data={siteData.about} />
              
              {/* Committee Section */}
              <Committee data={siteData.committee} />

              {/* Statistics Counter */}
              <Statistics data={siteData.statistics} />
              
              {/* Gallery Grid (conditional rendering) */}
              {siteData.gallery.images && siteData.gallery.images.length > 0 && (
                <Gallery data={siteData.gallery} />
              )}
              
              {/* Brochure Section */}
              <Brochure data={siteData.gallery} />
              
              {/* Events Timeline */}
              <Events data={siteData.events} />
              
              {/* Contact Information & Form */}
              <Contact data={siteData.contact} />
            </main>

            {/* Footer */}
            <Footer logo={logoImg} navLinks={navLinks} />
            
            {/* Floating back-to-top widget */}
            <ScrollToTop />
          </>
      )}
    </div>
  );
}

export default App;

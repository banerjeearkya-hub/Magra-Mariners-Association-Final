import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';
import './App.css';

import logoImg from './assets/logo.png';

// Central Site Data
import { siteData } from './data/siteData';

// Context
import { AuthProvider } from './context/AuthContext';

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
import ErrorBoundary from './components/ErrorBoundary';
import OfficialLogin from './components/OfficialLogin';
import OfficialDashboard from './components/OfficialDashboard';
import MemberPortal from './components/MemberPortal';

// Layout wrapper to conditionally render public navbar/footer
const AppLayout = ({ navLinks }) => {
  const location = useLocation();
  const isStandalonePortal = 
    location.pathname === '/login' || 
    location.pathname === '/dashboard' ||
    location.pathname === '/member-portal' ||
    location.pathname === '/member-login' ||
    location.pathname === '/member-dashboard';

  return (
    <>
      {/* Reset window scroll position on route transitions */}
      <ScrollToTopRoute />

      {/* Sticky Navigation - on public pages only */}
      {!isStandalonePortal && <Navbar navLinks={navLinks} />}
      
      {/* Main Content Layout */}
      <main>
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={
            <>
              <Hero data={siteData.hero} />
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
          <Route path="/gallery" element={<Gallery data={siteData.gallery} />} />

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

          {/* Member Registration & Verification Portal */}
          <Route path="/member-portal" element={<MemberPortal />} />
          <Route path="/member-login" element={<MemberPortal />} />
          <Route path="/member-dashboard" element={<MemberPortal />} />

          {/* Official Authentication Portal */}
          <Route path="/login" element={<OfficialLogin />} />

          {/* Official Dashboard (Protected) */}
          <Route path="/dashboard" element={<OfficialDashboard />} />

          {/* Fallback Wildcard Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer - on public pages only */}
      {!isStandalonePortal && <Footer logo={logoImg} navLinks={navLinks} />}
      
      {/* Floating back-to-top widget */}
      {!isStandalonePortal && <ScrollToTop />}
    </>
  );
};

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
    { label: "About", href: "/about" },
    { label: "Committee", href: "/committee" },
    ...(siteData.gallery.images && siteData.gallery.images.length > 0 ? [{ label: "Gallery", href: "/gallery" }] : []),
    { label: "Brochure", href: "/brochure" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="app-container">
          {/* Entrance Loader Animation */}
          <AnimatePresence>
            {loading && <Loader />}
          </AnimatePresence>

          {!loading && (
            <HashRouter>
              <AppLayout navLinks={navLinks} />
            </HashRouter>
          )}
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

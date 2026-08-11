import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLock, 
  FaEnvelope, 
  FaKey, 
  FaEye, 
  FaEyeSlash, 
  FaArrowLeft, 
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png';
import './OfficialLogin.css';

const OfficialLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { login, resetPassword, currentUser, isOfficial, authLoading } = useAuth();
  const navigate = useNavigate();

  // If already authenticated as official, redirect safely after render
  useEffect(() => {
    if (!authLoading && currentUser && isOfficial) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, isOfficial, authLoading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Official login error:', err);
      if (err.message && err.message.includes('Access Denied')) {
        setError(err.message);
      } else if (err.code === 'auth/api-key-not-valid' || err.message?.includes('api-key-not-valid')) {
        setError('Firebase API configuration error. Please check your project settings.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid official credentials. Please check your email and password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later or reset your password.');
      } else {
        setError(err.message || 'Failed to authenticate. Please check your connection.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your official email address first.');
      return;
    }

    setError('');
    setResetMessage('');
    setSubmitting(true);

    try {
      await resetPassword(email);
      setResetMessage(`Password reset link has been sent to ${email}. Check your inbox!`);
      setIsResetting(false);
    } catch (err) {
      console.error('Password reset error:', err);
      if (err.message && err.message.includes('Access Denied')) {
        setError(err.message);
      } else {
        setError('Failed to send password reset email. Ensure the email is registered in Firebase.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="official-login-container">
      {/* Background Ambience */}
      <div className="login-bg-glow glow-maroon"></div>
      <div className="login-bg-glow glow-green"></div>

      <motion.div 
        className="login-card glassmorphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Header */}
        <div className="login-header">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Website
          </Link>
          <div className="login-logo-wrapper">
            <img src={logoImg} alt="MMA Logo" className="login-logo" />
            <div className="official-badge">
              <FaShieldAlt /> OFFICIAL PORTAL
            </div>
          </div>
          <h2>Official Portal</h2>
          <p>Magra Mariners Association Administrative Access</p>
        </div>

        {/* Feedback Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="alert-box alert-error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FaExclamationTriangle className="alert-icon" />
              <span>{error}</span>
            </motion.div>
          )}

          {resetMessage && (
            <motion.div 
              className="alert-box alert-success"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FaCheckCircle className="alert-icon" />
              <span>{resetMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={isResetting ? handleResetPassword : handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="official-email">Official Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input 
                id="official-email"
                type="email"
                required
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {!isResetting && (
            <div className="form-group">
              <label htmlFor="official-password">Password</label>
              <div className="input-wrapper">
                <FaKey className="input-icon" />
                <input 
                  id="official-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          )}

          <div className="form-actions">
            {!isResetting ? (
              <>
                <button 
                  type="submit" 
                  className="btn-primary submit-login-btn"
                  disabled={submitting}
                >
                  <FaLock /> {submitting ? 'Authenticating...' : 'Sign In as Official'}
                </button>

                <button 
                  type="button"
                  className="forgot-password-link"
                  onClick={() => { setIsResetting(true); setError(''); setResetMessage(''); }}
                >
                  Forgot Password?
                </button>
              </>
            ) : (
              <>
                <button 
                  type="submit" 
                  className="btn-primary submit-login-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Sending Link...' : 'Send Password Reset Email'}
                </button>

                <button 
                  type="button"
                  className="forgot-password-link"
                  onClick={() => { setIsResetting(false); setError(''); setResetMessage(''); }}
                >
                  Back to Sign In
                </button>
              </>
            )}
          </div>
        </form>

        <div className="login-footer-info">
          <p>Restricted to authorized officials only: <strong>Soumyadeep Modak</strong>, <strong>Arkya Banerjee</strong>, <strong>Arnab Mukherjee</strong>.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default OfficialLogin;

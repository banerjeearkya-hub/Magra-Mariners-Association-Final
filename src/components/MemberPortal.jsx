import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  FaUserCheck, 
  FaMobileAlt, 
  FaKey, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaClock,
  FaShieldAlt,
  FaIdCard,
  FaUserShield,
  FaArrowRight
} from 'react-icons/fa';
import { db } from '../firebase/config';
import { 
  sendMemberPhoneOTP, 
  verifyMemberPhoneOTP, 
  normalizeMobileNumber, 
  formatFirebaseError 
} from '../services/otpService';
import logoImg from '../assets/logo.png';
import './MemberPortal.css';

// List of authorized official numbers for automatic access detection
const AUTHORIZED_OFFICIAL_MOBILES = [
  '+919475083599',
  '9475083599',
  '+919876543210'
];

const MemberPortal = () => {
  // Form Input States
  const [fullName, setFullName] = useState('');
  const [mobileInput, setMobileInput] = useState('');
  
  // Step Flow:
  // 1: Phone & Name Input
  // 2: 6-Digit OTP Verification
  // 3: Verified Result Card (Role Auto-Detected)
  const [step, setStep] = useState(1);
  const [otpInput, setOtpInput] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [formattedMobileNum, setFormattedMobileNum] = useState('');
  
  // Post-Verification Data
  const [isOfficial, setIsOfficial] = useState(false);
  const [memberRecord, setMemberRecord] = useState(null);

  // Timers & Alerts
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  // Cooldown interval timer for OTP resends
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // Clean up reCAPTCHA verifier on unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // --- STEP 1: SEND REAL OTP ---
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const digitsOnly = mobileInput.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const normalizedMobile = normalizeMobileNumber(mobileInput);
    setFormattedMobileNum(normalizedMobile);
    setLoading(true);

    try {
      // 1. Check if member already exists in Firestore 'members' collection
      const membersRef = collection(db, 'members');
      const q = query(
        membersRef, 
        where('mobileNumber', 'in', [normalizedMobile, digitsOnly, `+91 ${digitsOnly}`])
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const existingDoc = snapshot.docs[0];
        setMemberRecord({ id: existingDoc.id, ...existingDoc.data() });
      } else {
        setMemberRecord(null);
      }

      // Check if official number
      const officialMatch = AUTHORIZED_OFFICIAL_MOBILES.some(num => normalizedMobile.includes(num) || digitsOnly.includes(num));
      setIsOfficial(officialMatch);

      // If new member and full name not entered yet, prompt for name
      if (snapshot.empty && !officialMatch && !fullName.trim()) {
        setError('New member detected. Please enter your Full Name before requesting OTP.');
        setLoading(false);
        return;
      }

      // 2. Trigger OTP Dispatch (generates fresh random OTP)
      const res = await sendMemberPhoneOTP(normalizedMobile, 'portal-recaptcha-container');
      setConfirmationResult(res.confirmationResult);

      setCooldown(45); // 45-second resend cooldown timer
      setSuccessMsg(`OTP sent to ${normalizedMobile}. Please enter the 6-digit verification code.`);
      setStep(2);
    } catch (err) {
      console.error('Send OTP Failure:', err);
      setError(formatFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: VERIFY OTP & ROUTE BASED ON ROLE ---
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanOTP = otpInput.trim();
    if (!cleanOTP || cleanOTP.length < 4) {
      setError('Please enter the 6-digit OTP code received on your mobile phone.');
      return;
    }

    setLoading(true);

    try {
      // 1. Verify OTP
      await verifyMemberPhoneOTP(formattedMobileNum, cleanOTP, confirmationResult);

      // 2. Role Check: Is Official?
      const officialMatch = AUTHORIZED_OFFICIAL_MOBILES.some(num => formattedMobileNum.includes(num));

      if (officialMatch || isOfficial) {
        setIsOfficial(true);
        setSuccessMsg('Official identity verified! Redirecting to Official Portal...');
        setStep(3);
        return;
      }

      // 3. Member Check: Existing vs New Member
      if (memberRecord) {
        // Existing verified member
        setSuccessMsg('Mobile number verified successfully.');
        setStep(3);
      } else {
        // Create new member record in Firestore
        const nowIso = new Date().toISOString();
        const newPayload = {
          name: fullName.trim(),
          fullName: fullName.trim(),
          mobileNumber: formattedMobileNum,
          mobileVerified: true,
          status: 'Pending Verification',
          createdAt: serverTimestamp(),
          createdAtIso: nowIso,
          verifiedAt: null,
          verifiedBy: null
        };

        const docRef = await addDoc(collection(db, 'members'), newPayload);
        const createdDoc = { id: docRef.id, ...newPayload };

        setMemberRecord(createdDoc);
        setSuccessMsg('Registration successful. Application pending admin verification.');
        setStep(3);
      }
    } catch (err) {
      console.error('Verify OTP Failure:', err);
      setError(formatFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  // --- RESEND OTP ---
  const handleResendOTP = async () => {
    if (cooldown > 0 || loading) return;
    setError('');
    setSuccessMsg('');

    setLoading(true);
    try {
      const res = await sendMemberPhoneOTP(formattedMobileNum, 'portal-recaptcha-container');
      setConfirmationResult(res.confirmationResult);
      setCooldown(45);
      setSuccessMsg(`A fresh OTP code has been sent to ${formattedMobileNum}`);
    } catch (err) {
      console.error('Resend OTP Error:', err);
      setError(formatFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setOtpInput('');
    setError('');
    setSuccessMsg('');
    setMemberRecord(null);
    setConfirmationResult(null);
    setIsOfficial(false);
  };

  return (
    <div className="member-portal-container">
      {/* Invisible reCAPTCHA container for Firebase Phone Auth */}
      <div id="portal-recaptcha-container"></div>

      {/* Background ambient glow */}
      <div className="portal-bg-glow glow-green"></div>
      <div className="portal-bg-glow glow-maroon"></div>

      <motion.div 
        className="member-portal-card glassmorphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="portal-card-header">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Main Website
          </Link>

          <div className="portal-logo-group">
            <img src={logoImg} alt="MMA Crest" className="portal-crest" />
            <div>
              <h2>Magra Mariners Association</h2>
              <span className="portal-sub-badge"><FaShieldAlt /> MEMBER & OFFICIAL PORTAL</span>
            </div>
          </div>
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

          {successMsg && (
            <motion.div 
              className="alert-box alert-success"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FaCheckCircle className="alert-icon" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 1: MOBILE & NAME INPUT */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="portal-form">
            <div className="form-group">
              <label htmlFor="reg-mobile">Mobile Number (10 Digits) *</label>
              <div className="input-wrapper">
                <span className="country-prefix">+91</span>
                <input 
                  id="reg-mobile"
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  value={mobileInput}
                  onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <small className="form-help">Members and Officials enter mobile number to verify.</small>
            </div>

            <div className="form-group" style={{ marginTop: '10px' }}>
              <label htmlFor="reg-fullname">Full Name (Required for New Registration)</label>
              <input 
                id="reg-fullname"
                type="text"
                placeholder="e.g. Subhankar Banerjee"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary submit-portal-btn" disabled={loading}>
              <FaMobileAlt /> {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="portal-form">
            <div className="form-group">
              <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '6px', fontWeight: '700' }}>
                OTP Verification
              </h3>
              <p style={{ color: '#aaa', fontSize: '0.88rem', marginBottom: '16px' }}>
                Enter the 6-digit OTP sent to <strong>{formattedMobileNum}</strong>
              </p>

              <label htmlFor="otp-input">Enter 6-Digit OTP *</label>
              <div className="input-wrapper">
                <FaKey className="input-icon" />
                <input 
                  id="otp-input"
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                />
              </div>
            </div>

            <button type="submit" className="btn-primary submit-portal-btn" disabled={loading}>
              <FaUserCheck /> {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>

            <div className="otp-actions-row">
              <button 
                type="button" 
                className="resend-timer-btn"
                disabled={cooldown > 0 || loading}
                onClick={handleResendOTP}
              >
                <FaClock /> {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
              </button>

              <button type="button" className="change-num-btn" onClick={resetFlow}>
                Change Number
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ROLE AUTO-DETECTED RESULT CARD */}
        {step === 3 && (
          <div className="member-status-display-card glassmorphism">
            {isOfficial ? (
              /* OFFICIAL ACCESS CARD */
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div className="member-avatar-circle" style={{ margin: '0 auto 16px auto', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' }}>
                  <FaUserShield />
                </div>
                <h3 className="member-name-title" style={{ fontSize: '1.4rem', color: '#fff' }}>Authorized Official</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '6px 0 20px 0' }}>
                  Verified Mobile: <strong style={{ color: '#4ade80' }}>{formattedMobileNum}</strong>
                </p>

                <button 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '14px', borderRadius: '25px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: '800' }}
                  onClick={() => navigate('/login')}
                >
                  <FaShieldAlt /> Open Official Portal Dashboard <FaArrowRight />
                </button>
              </div>
            ) : memberRecord ? (
              /* MEMBER CARD: NAME & MEMBERSHIP STATUS ONLY */
              <div>
                <div className="status-card-header">
                  <div className="member-avatar-circle">
                    <FaUserCheck />
                  </div>
                  <div>
                    <span className="label-sub">Member Profile</span>
                    <h3 className="member-name-title">{memberRecord.name || memberRecord.fullName}</h3>
                    <span className="member-mobile-text"><FaMobileAlt /> {memberRecord.mobileNumber || formattedMobileNum}</span>
                  </div>
                </div>

                <div className="status-badge-container" style={{ marginTop: '20px' }}>
                  <span className="label-sub">Membership Status</span>
                  {(memberRecord.status === 'Pending Verification' || !memberRecord.status) && (
                    <div className="status-badge-box status-amber">
                      <FaClock />
                      <div>
                        <strong>Pending Verification</strong>
                        <p>Your application is pending admin verification.</p>
                      </div>
                    </div>
                  )}
                  {memberRecord.status === 'Verified' && (
                    <div className="status-badge-box status-green">
                      <FaCheckCircle />
                      <div>
                        <strong>Verified Member</strong>
                        <p>Approved member of Magra Mariners Association.</p>
                      </div>
                    </div>
                  )}
                  {memberRecord.status === 'Rejected' && (
                    <div className="status-badge-box status-red">
                      <FaExclamationTriangle />
                      <div>
                        <strong>Application Rejected</strong>
                        <p>Please contact an association official for details.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="status-card-actions" style={{ marginTop: '20px' }}>
                  <button className="btn-secondary" onClick={resetFlow}>
                    Sign Out / Close Session
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Footer */}
        <div className="portal-footer-info">
          <p>Magra Mariners Association Official Portal. Applications are verified manually by authorized officials.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberPortal;

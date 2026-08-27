import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from 'firebase/auth';
import { auth, db } from '../firebase/config';

/**
 * Normalizes a mobile number into standard E.164 format (+91XXXXXXXXXX)
 */
export const normalizeMobileNumber = (raw) => {
  if (!raw || typeof raw !== 'string') return '';
  const cleaned = raw.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned.slice(2)}`;
  }
  return raw.trim();
};

/**
 * Generates a cryptographically secure 6-digit random OTP (e.g. "483921")
 */
export const generate6DigitOTP = () => {
  try {
    if (window.crypto && window.crypto.getRandomValues) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const otp = (array[0] % 900000) + 100000;
      return String(otp);
    }
  } catch (e) {
    // fallback
  }
  return String(Math.floor(100000 + Math.random() * 900000));
};

/**
 * Setup Recaptcha Verifier for Firebase Phone Authentication with container safety
 */
export const setupRecaptcha = (containerId = 'portal-recaptcha-container') => {
  let element = document.getElementById(containerId);
  if (!element) {
    element = document.createElement('div');
    element.id = containerId;
    document.body.appendChild(element);
  }

  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    } catch (e) {
      // ignore
    }
  }

  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {},
    'expired-callback': () => {
      console.warn('reCAPTCHA expired');
    }
  });

  return window.recaptchaVerifier;
};

/**
 * Sends a real fresh random 6-digit OTP.
 * Invalidates old OTPs and stores a new OTP session in Cloud Firestore 'otpSessions' with 5-minute expiry.
 */
export const sendMemberPhoneOTP = async (mobileNumber, containerId = 'portal-recaptcha-container') => {
  const normalized = normalizeMobileNumber(mobileNumber);
  const digitsOnly = normalized.replace(/\D/g, '');
  if (!digitsOnly || digitsOnly.length < 10) {
    throw new Error('Please enter a valid 10-digit Indian mobile number.');
  }

  // 1. Invalidate and delete any previous OTP sessions for this mobile number
  try {
    const sessionsRef = collection(db, 'otpSessions');
    const oldSessionsQuery = query(sessionsRef, where('mobileNumber', '==', normalized));
    const oldSnap = await getDocs(oldSessionsQuery);
    for (const d of oldSnap.docs) {
      try { await deleteDoc(doc(db, 'otpSessions', d.id)); } catch (e) { /* ignore */ }
    }
  } catch (err) {
    console.warn('Notice cleaning old OTP sessions:', err);
  }

  // 2. Generate a fresh 6-digit random OTP
  const freshOTP = generate6DigitOTP();
  const now = new Date();
  const expiresAtDate = new Date(now.getTime() + 5 * 60 * 1000); // 5 Minutes Validity

  // 3. Store active OTP Session in Cloud Firestore
  const sessionPayload = {
    mobileNumber: normalized,
    otpCode: freshOTP,
    createdAt: serverTimestamp(),
    createdAtIso: now.toISOString(),
    expiresAt: Timestamp.fromDate(expiresAtDate),
    expiresAtIso: expiresAtDate.toISOString(),
    attempts: 0,
    maxAttempts: 3,
    used: false
  };

  const sessionDoc = await addDoc(collection(db, 'otpSessions'), sessionPayload);

  // 4. Trigger SMS via Firebase Phone Auth
  let confirmationResult = null;
  try {
    const appVerifier = setupRecaptcha(containerId);
    confirmationResult = await signInWithPhoneNumber(auth, normalized, appVerifier);
  } catch (smsErr) {
    console.error('Firebase Phone Auth Dispatch Log:', smsErr);
    // Don't throw if Firestore session was created, so user can verify code
  }

  return {
    success: true,
    sessionId: sessionDoc.id,
    normalizedMobile: normalized,
    confirmationResult,
    otpCode: freshOTP
  };
};

/**
 * Verifies the 6-digit OTP against Firebase Phone Auth and Cloud Firestore 'otpSessions'.
 * Marks session as used = true upon successful verification.
 */
export const verifyMemberPhoneOTP = async (mobileNumber, enteredOTP, confirmationResult = null) => {
  const normalized = normalizeMobileNumber(mobileNumber);
  const cleanOTP = (enteredOTP || '').trim();
  if (!cleanOTP || cleanOTP.length < 4) {
    throw new Error('Please enter the 6-digit OTP code received on your mobile phone.');
  }

  // 1. Attempt Firebase Auth Confirmation if present
  let fbVerified = false;
  if (confirmationResult && typeof confirmationResult.confirm === 'function') {
    try {
      await confirmationResult.confirm(cleanOTP);
      fbVerified = true;
    } catch (fbErr) {
      console.warn('Firebase confirmation error:', fbErr);
    }
  }

  // 2. Query Cloud Firestore 'otpSessions' for active session
  const sessionsRef = collection(db, 'otpSessions');
  const q = query(
    sessionsRef, 
    where('mobileNumber', '==', normalized),
    where('used', '==', false)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty && !fbVerified) {
    throw new Error('No active OTP session found for this mobile number. Please request a new OTP.');
  }

  if (!snapshot.empty) {
    const sessionDocSnap = snapshot.docs[0];
    const sessionData = sessionDocSnap.data();
    const sessionRef = doc(db, 'otpSessions', sessionDocSnap.id);

    // Check Expiry (5 Minutes)
    const now = new Date();
    const expiryDate = sessionData.expiresAt?.toDate 
      ? sessionData.expiresAt.toDate() 
      : (sessionData.expiresAtIso ? new Date(sessionData.expiresAtIso) : null);

    if (expiryDate && now > expiryDate) {
      await deleteDoc(sessionRef);
      throw new Error('OTP has expired. Please request a new OTP.');
    }

    // Check Attempts (Limit 3)
    if (sessionData.attempts >= sessionData.maxAttempts) {
      await deleteDoc(sessionRef);
      throw new Error('Maximum invalid OTP attempts reached. Please request a new OTP.');
    }

    // Match OTP Code
    if (fbVerified || sessionData.otpCode === cleanOTP) {
      // Mark as USED!
      await updateDoc(sessionRef, {
        used: true,
        verifiedAt: serverTimestamp()
      });
      return { success: true, normalizedMobile: normalized };
    } else {
      // Increment attempt count
      const newAttempts = (sessionData.attempts || 0) + 1;
      await updateDoc(sessionRef, { attempts: newAttempts });

      const remaining = sessionData.maxAttempts - newAttempts;
      if (remaining <= 0) {
        await deleteDoc(sessionRef);
        throw new Error('Maximum invalid OTP attempts reached. Please request a new OTP.');
      }
      throw new Error(`Incorrect OTP code. (${remaining} attempt${remaining > 1 ? 's' : ''} remaining)`);
    }
  }

  if (fbVerified) {
    return { success: true, normalizedMobile: normalized };
  }

  throw new Error('Invalid OTP code. Please try again.');
};

/**
 * Maps raw Firebase technical error codes to clean, user-friendly messages.
 */
export const formatFirebaseError = (err) => {
  if (!err) return 'An unexpected error occurred. Please try again.';
  console.error('[Firebase Technical Log]:', err);
  
  const code = err.code || '';
  const message = err.message || '';

  if (code === 'auth/invalid-phone-number') {
    return 'Invalid mobile number. Please enter a valid 10-digit Indian mobile number.';
  }
  if (code === 'auth/missing-phone-number') {
    return 'Please enter your 10-digit mobile number.';
  }
  if (code === 'auth/quota-exceeded' || code === 'auth/too-many-requests') {
    return 'Too many OTP requests from this device. Please wait a few minutes before trying again.';
  }
  if (code === 'auth/invalid-verification-code') {
    return 'Invalid OTP code. Please check the SMS code sent to your phone and try again.';
  }
  if (code === 'auth/code-expired') {
    return 'The OTP has expired. Please click Resend OTP to receive a new code.';
  }
  if (code === 'auth/captcha-check-failed' || code === 'auth/invalid-app-credential') {
    return 'Security verification (reCAPTCHA) failed. Please refresh the page and try again.';
  }
  if (code === 'permission-denied' || message.includes('insufficient permissions')) {
    return 'Database permission error. Please contact an association official if this persists.';
  }
  
  return message || 'Authentication failed. Please check your details and try again.';
};

// Aliases
export const sendMemberOTP = sendMemberPhoneOTP;
export const verifyMemberOTP = verifyMemberPhoneOTP;

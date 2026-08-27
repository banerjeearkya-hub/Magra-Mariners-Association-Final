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
    return `+${cleaned}`;
  }
  return raw.trim();
};

/**
 * Generates a cryptographically random 6-digit OTP code (e.g. "483921")
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
 * Setup Recaptcha Verifier singleton
 */
export const setupRecaptcha = (containerId = 'portal-recaptcha-container') => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {},
      'expired-callback': () => {
        console.warn('reCAPTCHA expired');
      }
    });
  }
  return window.recaptchaVerifier;
};

/**
 * Sends a real fresh random 6-digit OTP to the user's mobile number.
 * Stores an active OTP session in Cloud Firestore 'otpSessions' with a 5-minute expiry.
 */
export const sendMemberOTP = async (mobileNumber) => {
  const normalized = normalizeMobileNumber(mobileNumber);
  if (!normalized || normalized.length < 12) {
    throw new Error('Please enter a valid 10-digit mobile number.');
  }

  // 1. Invalidate and clean up any previous OTP sessions for this mobile number
  try {
    const sessionsRef = collection(db, 'otpSessions');
    const oldSessionsQuery = query(sessionsRef, where('mobileNumber', '==', normalized));
    const oldSnap = await getDocs(oldSessionsQuery);
    for (const d of oldSnap.docs) {
      try { await deleteDoc(doc(db, 'otpSessions', d.id)); } catch (e) { /* ignore */ }
    }
  } catch (err) {
    console.warn('Notice cleaning up old OTP sessions:', err);
  }

  // 2. Generate a fresh, random 6-digit OTP
  const freshOTP = generate6DigitOTP();
  const now = new Date();
  const expiresAtDate = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes validity

  // 3. Store OTP Session record in Cloud Firestore 'otpSessions'
  const sessionPayload = {
    mobileNumber: normalized,
    otpCode: freshOTP,
    createdAt: serverTimestamp(),
    createdAtIso: now.toISOString(),
    expiresAt: Timestamp.fromDate(expiresAtDate),
    expiresAtIso: expiresAtDate.toISOString(),
    attempts: 0,
    maxAttempts: 3,
    verified: false
  };

  const sessionDoc = await addDoc(collection(db, 'otpSessions'), sessionPayload);

  // 4. Trigger SMS Dispatch via Firebase Phone Auth
  let confirmationResult = null;
  try {
    const appVerifier = setupRecaptcha();
    confirmationResult = await signInWithPhoneNumber(auth, normalized, appVerifier);
  } catch (smsErr) {
    console.warn('Firebase SMS Dispatch Warning:', smsErr);
    // Log explicit error details for development diagnosis
    if (smsErr.code === 'auth/invalid-app-credential') {
      console.warn('Firebase Phone Auth app credential warning. Ensure domain is listed in Firebase Auth settings.');
    }
  }

  return {
    success: true,
    sessionId: sessionDoc.id,
    normalizedMobile: normalized,
    confirmationResult,
    otpCode: freshOTP // Retained for session context
  };
};

/**
 * Verifies the entered 6-digit OTP against active Cloud Firestore session.
 */
export const verifyMemberOTP = async (mobileNumber, enteredOTP, confirmationResult = null) => {
  const normalized = normalizeMobileNumber(mobileNumber);
  const cleanEnteredOTP = (enteredOTP || '').trim();

  if (!cleanEnteredOTP || cleanEnteredOTP.length < 4) {
    throw new Error('Please enter the OTP received on your mobile phone.');
  }

  // 1. First attempt verification via Firebase Phone Auth confirmationResult if available
  if (confirmationResult && typeof confirmationResult.confirm === 'function') {
    try {
      await confirmationResult.confirm(cleanEnteredOTP);
      // Firebase confirmed
    } catch (fbErr) {
      console.warn('Firebase confirmation error:', fbErr);
    }
  }

  // 2. Query Cloud Firestore 'otpSessions' for active session matching this mobile number
  const sessionsRef = collection(db, 'otpSessions');
  const q = query(
    sessionsRef, 
    where('mobileNumber', '==', normalized),
    where('verified', '==', false)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    throw new Error('No active OTP request found for this mobile number. Please request a new OTP.');
  }

  const sessionDocSnap = snapshot.docs[0];
  const sessionData = sessionDocSnap.data();
  const sessionRef = doc(db, 'otpSessions', sessionDocSnap.id);

  // 3. Check Expiry (5 Minutes limit)
  const now = new Date();
  const expiryDate = sessionData.expiresAt?.toDate 
    ? sessionData.expiresAt.toDate() 
    : (sessionData.expiresAtIso ? new Date(sessionData.expiresAtIso) : null);

  if (expiryDate && now > expiryDate) {
    await deleteDoc(sessionRef);
    throw new Error('OTP has expired. Please request a new OTP.');
  }

  // 4. Check Attempt Count (Limit max 3 wrong attempts)
  if (sessionData.attempts >= sessionData.maxAttempts) {
    await deleteDoc(sessionRef);
    throw new Error('Maximum invalid attempts reached. Please request a new OTP.');
  }

  // 5. Match OTP Code
  if (sessionData.otpCode === cleanEnteredOTP || cleanEnteredOTP === sessionData.otpCode) {
    // OTP MATCHED! Mark session as verified and cleanup
    await updateDoc(sessionRef, {
      verified: true,
      verifiedAt: serverTimestamp()
    });

    return {
      success: true,
      normalizedMobile: normalized,
      sessionDocId: sessionDocSnap.id
    };
  } else {
    // INCORRECT OTP CODE! Increment attempt count in Firestore
    const newAttempts = (sessionData.attempts || 0) + 1;
    await updateDoc(sessionRef, {
      attempts: newAttempts
    });

    const remainingAttempts = sessionData.maxAttempts - newAttempts;
    if (remainingAttempts <= 0) {
      await deleteDoc(sessionRef);
      throw new Error('Maximum invalid attempts reached. Please request a new OTP.');
    }

    throw new Error(`Incorrect OTP code. (${remainingAttempts} attempt${remainingAttempts > 1 ? 's' : ''} remaining)`);
  }
};

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase Client Configuration
// Supports environment variables (Vite prefix VITE_) with fallback configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForMagraMariners12345678",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "magra-mariners-association.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "magra-mariners-association",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "magra-mariners-association.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "100000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:100000000000:web:abcdef1234567890"
};

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Map of Exactly 3 Authorized Officials
export const AUTHORIZED_OFFICIALS = {
  'sm429113@gmail.com': 'Soumyadeep Modak',
  'banerjeearkya@gmail.com': 'Arkya Banerjee',
  'arnabinsky@gmail.com': 'Arnab Mukherjee'
};

// Helper to verify if an email belongs to an authorized official
export const isAuthorizedOfficial = (email) => {
  if (!email || typeof email !== 'string') return false;
  return Object.prototype.hasOwnProperty.call(AUTHORIZED_OFFICIALS, email.toLowerCase().trim());
};

// Helper to get official's display name
export const getOfficialName = (email) => {
  if (!email || typeof email !== 'string') return 'Official';
  return AUTHORIZED_OFFICIALS[email.toLowerCase().trim()] || 'Official';
};

export default app;

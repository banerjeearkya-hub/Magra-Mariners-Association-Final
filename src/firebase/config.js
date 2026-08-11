import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Official Firebase Web Configuration for Magra Mariners Association
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyClr70HwiNOU6jz9E5532Z9B6Mme9uqMuU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "magra-mariners-association.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "magra-mariners-association",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "magra-mariners-association.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "245577627284",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:245577627284:web:4a925adbb623a3b03ea681",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-C4BJEBHLKC"
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
  'ghostygamer47@gmail.com': 'Subhankar Banerjee',
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

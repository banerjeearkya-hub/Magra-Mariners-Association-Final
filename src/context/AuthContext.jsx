import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, isAuthorizedOfficial, getOfficialName } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Monitor auth state changes with safety timeout
  useEffect(() => {
    let unsubscribe = () => {};
    // Safety timeout: Never leave auth in loading state for more than 600ms
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 600);

    try {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        clearTimeout(timer);
        setCurrentUser(user);
        setAuthLoading(false);
      }, (err) => {
        clearTimeout(timer);
        console.warn('Firebase onAuthStateChanged notice:', err);
        setAuthLoading(false);
      });
    } catch (e) {
      clearTimeout(timer);
      console.warn('Firebase Auth initialization notice:', e);
      setAuthLoading(false);
    }

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  // Official Email/Password Login
  const login = async (email, password) => {
    const normalizedEmail = (email || '').toLowerCase().trim();
    
    // Check if email is in the authorized list before attempting sign-in
    if (!isAuthorizedOfficial(normalizedEmail)) {
      throw new Error('Access Denied: This email address is not an authorized Magra Mariners official account.');
    }

    const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
    
    // Verify once more after sign-in
    if (!isAuthorizedOfficial(userCredential.user.email)) {
      await signOut(auth);
      throw new Error('Access Denied: You do not have management permissions.');
    }

    setCurrentUser(userCredential.user);
    return userCredential.user;
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('SignOut error:', e);
    }
    setCurrentUser(null);
  };

  // Forgot Password / Password Reset
  const resetPassword = async (email) => {
    const normalizedEmail = (email || '').toLowerCase().trim();
    if (!isAuthorizedOfficial(normalizedEmail)) {
      throw new Error('Access Denied: Password reset is only available for authorized official emails.');
    }
    return sendPasswordResetEmail(auth, normalizedEmail);
  };

  const isOfficial = currentUser ? isAuthorizedOfficial(currentUser.email) : false;
  const officialName = currentUser ? getOfficialName(currentUser.email) : '';

  const value = {
    currentUser,
    isOfficial,
    officialName,
    login,
    logout,
    resetPassword,
    authLoading,
    loading: authLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

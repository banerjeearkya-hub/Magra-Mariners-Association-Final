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
  const [loading, setLoading] = useState(true);

  // Monitor auth state changes persistently
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Official Email/Password Login
  const login = async (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();
    
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

    return userCredential.user;
  };

  // Logout
  const logout = async () => {
    return signOut(auth);
  };

  // Forgot Password / Password Reset
  const resetPassword = async (email) => {
    const normalizedEmail = email.toLowerCase().trim();
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
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db, isAuthorizedOfficial, getOfficialName, getOfficialRole, ROLES } from '../firebase/config';
import { logLogin, logLogout } from '../services/activityLogger';

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
  const [customRole, setCustomRole] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // Monitor auth state changes with safety timeout
  useEffect(() => {
    let unsubscribe = () => {};
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 600);

    try {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        clearTimeout(timer);
        setCurrentUser(user);

        if (user && isAuthorizedOfficial(user.email)) {
          // Fetch any updated role override from Firestore 'adminUsers'
          try {
            const userDocRef = doc(db, 'adminUsers', user.uid);
            const snap = await getDoc(userDocRef);
            if (snap.exists()) {
              setCustomRole(snap.data().role);
            } else {
              // Pre-seed official user document in Firestore
              const defaultRole = getOfficialRole(user.email);
              const officialName = getOfficialName(user.email);
              await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email.toLowerCase(),
                name: officialName,
                role: defaultRole,
                status: 'ACTIVE',
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
              }, { merge: true });
              setCustomRole(defaultRole);
            }
          } catch (e) {
            console.warn('Could not sync adminUsers document:', e);
          }
        } else {
          setCustomRole(null);
        }

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

  // Official Email/Password Login with Audit Logging
  const login = async (email, password) => {
    const normalizedEmail = (email || '').toLowerCase().trim();
    
    // Check if email is in the authorized list
    if (!isAuthorizedOfficial(normalizedEmail)) {
      throw new Error('Access Denied: This email address is not an authorized Magra Mariners official account.');
    }

    const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
    const user = userCredential.user;

    // Verify authorization
    if (!isAuthorizedOfficial(user.email)) {
      await signOut(auth);
      throw new Error('Access Denied: You do not have management permissions.');
    }

    const assignedRole = customRole || getOfficialRole(user.email);
    const officialName = getOfficialName(user.email);

    // Sync adminUsers in Firestore
    try {
      const userDocRef = doc(db, 'adminUsers', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email.toLowerCase(),
        name: officialName,
        role: assignedRole,
        status: 'ACTIVE',
        lastLogin: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('Could not update adminUsers on login:', err);
    }

    // Record Login History & Activity Log
    try {
      const sessionId = await logLogin({
        user: { ...user, displayName: officialName },
        role: assignedRole,
        status: 'SUCCESS'
      });
      setCurrentSessionId(sessionId);
    } catch (logErr) {
      console.warn('Login audit recording notice:', logErr);
    }

    setCurrentUser(user);
    return user;
  };

  // Logout with Audit Logging
  const logout = async () => {
    const userToLog = currentUser;
    const roleToLog = userRole;
    const sessionToLog = currentSessionId;

    try {
      await signOut(auth);
    } catch (e) {
      console.warn('SignOut error:', e);
    }

    // Log Logout
    if (userToLog) {
      try {
        await logLogout({
          user: { ...userToLog, displayName: officialName },
          role: roleToLog,
          loginHistoryDocId: sessionToLog
        });
      } catch (err) {
        console.warn('Logout audit notice:', err);
      }
    }

    setCurrentUser(null);
    setCustomRole(null);
    setCurrentSessionId(null);
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
  const userRole = currentUser ? (customRole || getOfficialRole(currentUser.email)) : ROLES.STAFF;
  const isSuperAdmin = userRole === ROLES.SUPER_ADMIN;
  const isAdmin = userRole === ROLES.ADMIN || userRole === ROLES.SUPER_ADMIN;
  const isStaff = userRole === ROLES.STAFF;

  const value = {
    currentUser,
    isOfficial,
    officialName,
    userRole,
    isSuperAdmin,
    isAdmin,
    isStaff,
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

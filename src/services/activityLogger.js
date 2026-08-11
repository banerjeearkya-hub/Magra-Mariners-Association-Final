import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Strips sensitive fields (passwords, tokens, credentials) from payloads
 */
export const sanitizePayload = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'accessToken', 'refreshToken', 'credential'];
  const sanitized = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
        continue;
      }
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Limit deep Base64 or recursive object sizes for log storage
        if (typeof obj[key] === 'string' && obj[key].startsWith('data:image') && obj[key].length > 100) {
          sanitized[key] = `[Embedded Image Data: ${(obj[key].length / 1024).toFixed(1)} KB]`;
        } else {
          sanitized[key] = sanitizePayload(obj[key]);
        }
      } else if (typeof obj[key] === 'string' && obj[key].startsWith('data:image') && obj[key].length > 100) {
        sanitized[key] = `[Embedded Image Data: ${(obj[key].length / 1024).toFixed(1)} KB]`;
      } else {
        sanitized[key] = obj[key];
      }
    }
  }
  return sanitized;
};

/**
 * Computes changed fields between beforeData and afterData
 */
export const computeFieldDiff = (before = {}, after = {}) => {
  const changes = [];
  const allKeys = new Set([...Object.keys(before || {}), ...Object.keys(after || {})]);

  allKeys.forEach((key) => {
    // Ignore internal timestamp / ID fields
    if (['updatedAt', 'createdAt', 'id'].includes(key)) return;

    const valBefore = before ? before[key] : undefined;
    const valAfter = after ? after[key] : undefined;

    if (JSON.stringify(valBefore) !== JSON.stringify(valAfter)) {
      changes.push({
        field: key,
        before: valBefore !== undefined ? valBefore : '—',
        after: valAfter !== undefined ? valAfter : '—'
      });
    }
  });

  return changes;
};

/**
 * Retrieves client device & browser metadata
 */
export const getClientMetadata = () => {
  try {
    return {
      userAgent: navigator.userAgent || 'Unknown',
      platform: navigator.platform || 'Web',
      language: navigator.language || 'en',
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      recordedAtLocal: new Date().toLocaleString('en-US')
    };
  } catch {
    return { platform: 'Web' };
  }
};

/**
 * Centralized Activity Logging Function
 * Writes an immutable audit entry to Cloud Firestore 'activityLogs' collection.
 */
export const logActivity = async ({
  action = 'UPDATE', // 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'ROLE_CHANGE'
  section = 'General', // 'Events' | 'Gallery' | 'Users' | 'Auth' | 'Forms' | 'Settings'
  documentId = '',
  documentTitle = '',
  beforeData = null,
  afterData = null,
  details = '',
  user = null
}) => {
  try {
    const sanitizedBefore = sanitizePayload(beforeData);
    const sanitizedAfter = sanitizePayload(afterData);
    const changedFields = (action === 'UPDATE' && beforeData && afterData) 
      ? computeFieldDiff(sanitizedBefore, sanitizedAfter) 
      : [];

    const activityEntry = {
      uid: user?.uid || 'anonymous',
      userName: user?.displayName || user?.name || user?.email?.split('@')[0] || 'Official User',
      userEmail: user?.email || 'unknown@official.mma',
      userRole: user?.role || 'ADMIN',
      action: action.toUpperCase(),
      section,
      documentId: documentId || 'N/A',
      documentTitle: documentTitle || '',
      beforeData: sanitizedBefore,
      afterData: sanitizedAfter,
      changedFields,
      details: details || `${action} operation in ${section}`,
      metadata: getClientMetadata(),
      timestamp: serverTimestamp(),
      createdAtIso: new Date().toISOString()
    };

    await addDoc(collection(db, 'activityLogs'), activityEntry);
    return true;
  } catch (err) {
    console.warn('Activity logging notice (non-fatal):', err);
    return false;
  }
};

/**
 * Logs a User Login Event in both 'loginHistory' and 'activityLogs'
 */
export const logLogin = async ({ user, role = 'ADMIN', status = 'SUCCESS' }) => {
  try {
    const loginEntry = {
      uid: user.uid,
      userName: user.displayName || user.email?.split('@')[0] || 'Official User',
      userEmail: user.email,
      userRole: role,
      status,
      metadata: getClientMetadata(),
      loginTime: serverTimestamp(),
      logoutTime: null,
      createdAtIso: new Date().toISOString()
    };

    // 1. Add to login history
    const loginDocRef = await addDoc(collection(db, 'loginHistory'), loginEntry);

    // 2. Add to central activity logs
    await logActivity({
      action: 'LOGIN',
      section: 'Auth',
      documentId: loginDocRef.id,
      documentTitle: `Login session for ${user.email}`,
      details: `Official sign-in successful (${role})`,
      user: { ...user, role }
    });

    return loginDocRef.id;
  } catch (err) {
    console.warn('Login history recording notice:', err);
    return null;
  }
};

/**
 * Logs a User Logout Event
 */
export const logLogout = async ({ user, role = 'ADMIN', loginHistoryDocId = null }) => {
  try {
    // 1. Update login history if docId exists
    if (loginHistoryDocId) {
      try {
        const loginDocRef = doc(db, 'loginHistory', loginHistoryDocId);
        await updateDoc(loginDocRef, {
          logoutTime: serverTimestamp()
        });
      } catch (e) {
        console.warn('Could not update logout time on session:', e);
      }
    }

    // 2. Add to central activity logs
    if (user?.email) {
      await logActivity({
        action: 'LOGOUT',
        section: 'Auth',
        documentId: loginHistoryDocId || 'session-end',
        documentTitle: `Logout session for ${user.email}`,
        details: `Official signed out (${role})`,
        user: { ...user, role }
      });
    }
  } catch (err) {
    console.warn('Logout logging notice:', err);
  }
};

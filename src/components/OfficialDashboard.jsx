import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy,
  limit,
  setDoc
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { 
  FaCalendarAlt, 
  FaImages, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSignOutAlt, 
  FaUserShield, 
  FaUpload, 
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaHourglassHalf,
  FaFire,
  FaImage,
  FaClipboardList,
  FaHistory,
  FaUsersCog,
  FaSearch,
  FaFilter,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaLayerGroup,
  FaDesktop,
  FaUserCheck,
  FaClock
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { db, storage, ROLES, AUTHORIZED_OFFICIALS } from '../firebase/config';
import { getLocalTodayString, formatDisplayDate, normalizeDateStr } from './Events';
import SafeImage from './SafeImage';
import { compressImage, compressImageToBase64 } from '../utils/imageCompressor';
import { logActivity } from '../services/activityLogger';
import ActivityDetailsModal from './ActivityDetailsModal';
import logoImg from '../assets/logo.png';
import './OfficialDashboard.css';

const OfficialDashboard = () => {
  const { 
    currentUser, 
    isOfficial, 
    officialName, 
    userRole, 
    isSuperAdmin, 
    logout, 
    authLoading 
  } = useAuth();
  
  const navigate = useNavigate();

  // Navigation Tabs: 'events' | 'gallery' | 'activity' | 'logins' | 'users' | 'members'
  const [activeTab, setActiveTab] = useState('events');

  // Real-time Data States
  const [events, setEvents] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [members, setMembers] = useState([]);

  // Loading States
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [loadingLogins, setLoadingLogins] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);

  // Event Modal States
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({ title: '', date: '', description: '' });
  const [eventFile, setEventFile] = useState(null);
  const [eventSaving, setEventSaving] = useState(false);
  const [modalError, setModalError] = useState('');

  // Gallery Upload State
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryUploading, setGalleryUploading] = useState(false);

  // Edit Caption State
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [photoCaptionForm, setPhotoCaptionForm] = useState('');

  // User Management Modal State
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', role: ROLES.ADMIN, status: 'ACTIVE' });
  const [userSaving, setUserSaving] = useState(false);

  // Member & Cashier Control Modal State
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({
    name: '',
    mobile: '',
    startDate: getLocalTodayString(),
    endDate: '2026-12-31',
    durationMonths: 12,
    status: 'Active'
  });
  const [memberSaving, setMemberSaving] = useState(false);

  // Activity Details Modal State
  const [selectedLog, setSelectedLog] = useState(null);

  // Activity Log Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');
  const [filterSection, setFilterSection] = useState('ALL');
  const [filterDateRange, setFilterDateRange] = useState('ALL'); // 'ALL' | 'TODAY' | 'WEEK' | 'MONTH'
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Notification / Alert Message
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // Promise with safety timeout helper
  const withTimeout = (promise, ms = 8000, errorMsg = 'Operation timed out') => {
    let timer;
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(new Error(errorMsg));
      }, ms);
    });
    return Promise.race([
      promise.then((res) => {
        clearTimeout(timer);
        return res;
      }),
      timeoutPromise
    ]);
  };

  // 1. Subscribe to Events
  useEffect(() => {
    if (!currentUser || !isOfficial) return;
    const timeout = setTimeout(() => setLoadingEvents(false), 1800);

    let unsubscribe = () => {};
    try {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, orderBy('date', 'asc'));

      unsubscribe = onSnapshot(q, (snapshot) => {
        clearTimeout(timeout);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(items);
        setLoadingEvents(false);
      }, (err) => {
        clearTimeout(timeout);
        console.warn('Firestore events notice:', err);
        setLoadingEvents(false);
      });
    } catch (e) {
      clearTimeout(timeout);
      setLoadingEvents(false);
    }
    return () => { clearTimeout(timeout); unsubscribe(); };
  }, [currentUser, isOfficial]);

  // 2. Subscribe to Gallery
  useEffect(() => {
    if (!currentUser || !isOfficial) return;
    const timeout = setTimeout(() => setLoadingGallery(false), 1800);

    let unsubscribe = () => {};
    try {
      const galleryRef = collection(db, 'gallery');
      const q = query(galleryRef, orderBy('uploadedAt', 'desc'));

      unsubscribe = onSnapshot(q, (snapshot) => {
        clearTimeout(timeout);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGalleryItems(items);
        setLoadingGallery(false);
      }, (err) => {
        clearTimeout(timeout);
        console.warn('Firestore gallery notice:', err);
        setLoadingGallery(false);
      });
    } catch (e) {
      clearTimeout(timeout);
      setLoadingGallery(false);
    }
    return () => { clearTimeout(timeout); unsubscribe(); };
  }, [currentUser, isOfficial]);

  // 3. Subscribe to Activity Logs (Limit 200 recent for high performance)
  useEffect(() => {
    if (!currentUser || !isOfficial) return;
    const timeout = setTimeout(() => setLoadingLogs(false), 2000);

    let unsubscribe = () => {};
    try {
      const logsRef = collection(db, 'activityLogs');
      const q = query(logsRef, orderBy('timestamp', 'desc'), limit(200));

      unsubscribe = onSnapshot(q, (snapshot) => {
        clearTimeout(timeout);
        const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setActivityLogs(logs);
        setLoadingLogs(false);
      }, (err) => {
        clearTimeout(timeout);
        console.warn('Firestore activityLogs notice:', err);
        setLoadingLogs(false);
      });
    } catch (e) {
      clearTimeout(timeout);
      setLoadingLogs(false);
    }
    return () => { clearTimeout(timeout); unsubscribe(); };
  }, [currentUser, isOfficial]);

  // 4. Subscribe to Login History
  useEffect(() => {
    if (!currentUser || !isOfficial) return;
    const timeout = setTimeout(() => setLoadingLogins(false), 2000);

    let unsubscribe = () => {};
    try {
      const loginsRef = collection(db, 'loginHistory');
      const q = query(loginsRef, orderBy('loginTime', 'desc'), limit(100));

      unsubscribe = onSnapshot(q, (snapshot) => {
        clearTimeout(timeout);
        const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLoginHistory(history);
        setLoadingLogins(false);
      }, (err) => {
        clearTimeout(timeout);
        console.warn('Firestore loginHistory notice:', err);
        setLoadingLogins(false);
      });
    } catch (e) {
      clearTimeout(timeout);
      setLoadingLogins(false);
    }
    return () => { clearTimeout(timeout); unsubscribe(); };
  }, [currentUser, isOfficial]);

  // 5. Subscribe to Admin Users
  useEffect(() => {
    if (!currentUser || !isOfficial) return;
    const timeout = setTimeout(() => setLoadingUsers(false), 2000);

    let unsubscribe = () => {};
    try {
      const usersRef = collection(db, 'adminUsers');
      unsubscribe = onSnapshot(usersRef, (snapshot) => {
        clearTimeout(timeout);
        const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Merge with pre-configured static officials if Firestore is empty
        if (usersList.length === 0) {
          const fallbackUsers = Object.entries(AUTHORIZED_OFFICIALS).map(([email, info], idx) => ({
            id: `static-${idx}`,
            email,
            name: info.name,
            role: info.role,
            status: 'ACTIVE',
            uid: `official-${idx + 1}`
          }));
          setAdminUsers(fallbackUsers);
        } else {
          setAdminUsers(usersList);
        }
        setLoadingUsers(false);
      }, (err) => {
        clearTimeout(timeout);
        console.warn('Firestore adminUsers notice:', err);
        setLoadingUsers(false);
      });
    } catch (e) {
      clearTimeout(timeout);
      setLoadingUsers(false);
    }
    return () => { clearTimeout(timeout); unsubscribe(); };
  }, [currentUser, isOfficial]);

  // 6. Subscribe to Members (Cashier)
  useEffect(() => {
    if (!currentUser || !isOfficial) return;
    const timeout = setTimeout(() => setLoadingMembers(false), 2000);

    let unsubscribe = () => {};
    try {
      const membersRef = collection(db, 'members');
      unsubscribe = onSnapshot(membersRef, (snapshot) => {
        clearTimeout(timeout);
        const membersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Pre-seed official member if empty
        if (membersList.length === 0) {
          const sample = {
            id: 'subhankar-9475083599',
            name: 'Subhankar Banerjee',
            mobile: '+919475083599',
            status: 'Active',
            startDate: '2026-01-01',
            endDate: '2026-12-31',
            durationMonths: 12
          };
          setMembers([sample]);
        } else {
          setMembers(membersList);
        }
        setLoadingMembers(false);
      }, (err) => {
        clearTimeout(timeout);
        console.warn('Firestore members notice:', err);
        setLoadingMembers(false);
      });
    } catch (e) {
      clearTimeout(timeout);
      setLoadingMembers(false);
    }
    return () => { clearTimeout(timeout); unsubscribe(); };
  }, [currentUser, isOfficial]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  // --- EVENT MANAGEMENT ACTIONS ---
  const openAddEventModal = () => {
    setEditingEvent(null);
    setEventForm({ title: '', date: getLocalTodayString(), description: '' });
    setEventFile(null);
    setModalError('');
    setEventModalOpen(true);
  };

  const openEditEventModal = (ev) => {
    setEditingEvent(ev);
    setEventForm({
      title: ev.title || '',
      date: ev.date || getLocalTodayString(),
      description: ev.description || ''
    });
    setEventFile(null);
    setModalError('');
    setEventModalOpen(true);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setModalError('');
    if (!eventForm.title.trim() || !eventForm.date.trim()) {
      setModalError('Event title and date are required.');
      return;
    }

    setEventSaving(true);
    try {
      let imageUrl = editingEvent?.imageUrl || '';
      let storagePath = editingEvent?.storagePath || '';

      if (eventFile) {
        try {
          const compressedPoster = await compressImage(eventFile, 1920, 1920, 0.85);
          const fileExt = compressedPoster.name.split('.').pop();
          const fileName = `events/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
          const storageRef = ref(storage, fileName);
          
          const uploadResult = await withTimeout(uploadBytes(storageRef, compressedPoster), 6000, 'Storage unavailable');
          imageUrl = await getDownloadURL(uploadResult.ref);
          storagePath = fileName;

          if (editingEvent?.storagePath) {
            try { await deleteObject(ref(storage, editingEvent.storagePath)); } catch (delErr) { /* ignore */ }
          }
        } catch (storageErr) {
          imageUrl = await compressImageToBase64(eventFile, 1200, 1200, 0.75);
          storagePath = '';
        }
      }

      const eventPayload = {
        title: eventForm.title.trim(),
        date: normalizeDateStr(eventForm.date.trim()),
        description: eventForm.description.trim(),
        imageUrl,
        storagePath,
        updatedBy: currentUser.email,
        updatedAt: serverTimestamp()
      };

      if (editingEvent) {
        // UPDATE EVENT
        const eventDocRef = doc(db, 'events', editingEvent.id);
        await withTimeout(updateDoc(eventDocRef, eventPayload), 15000, 'Firestore update timed out.');
        
        // Automated Audit Logging
        await logActivity({
          action: 'UPDATE',
          section: 'Events',
          documentId: editingEvent.id,
          documentTitle: eventForm.title.trim(),
          beforeData: editingEvent,
          afterData: eventPayload,
          details: `Updated event "${eventForm.title}" scheduled for ${eventForm.date}`,
          user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
        });

        showAlert('success', `Event "${eventForm.title}" updated successfully!`);
      } else {
        // CREATE EVENT
        eventPayload.createdBy = currentUser.email;
        eventPayload.createdAt = serverTimestamp();
        const docRef = await withTimeout(addDoc(collection(db, 'events'), eventPayload), 15000, 'Firestore creation timed out.');
        
        // Automated Audit Logging
        await logActivity({
          action: 'CREATE',
          section: 'Events',
          documentId: docRef.id,
          documentTitle: eventForm.title.trim(),
          beforeData: null,
          afterData: eventPayload,
          details: `Created new event "${eventForm.title}" scheduled for ${eventForm.date}`,
          user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
        });

        showAlert('success', `Event "${eventForm.title}" added successfully!`);
      }

      setEventModalOpen(false);
    } catch (err) {
      console.error(err);
      const errMsg = err.message.includes('permission-denied') ? 'Permission Denied in Firestore Rules.' : err.message;
      setModalError(errMsg);
      showAlert('error', `Failed to save event: ${errMsg}`);
    } finally {
      setEventSaving(false);
    }
  };

  const handleDeleteEvent = async (ev) => {
    if (!window.confirm(`Are you sure you want to delete the event "${ev.title}"?`)) return;

    try {
      await deleteDoc(doc(db, 'events', ev.id));
      if (ev.storagePath) {
        try { await deleteObject(ref(storage, ev.storagePath)); } catch (delErr) { /* ignore */ }
      }

      // Automated Audit Logging
      await logActivity({
        action: 'DELETE',
        section: 'Events',
        documentId: ev.id,
        documentTitle: ev.title,
        beforeData: ev,
        afterData: null,
        details: `Deleted event "${ev.title}" (Scheduled: ${ev.date})`,
        user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
      });

      showAlert('success', `Event "${ev.title}" deleted.`);
    } catch (err) {
      console.error(err);
      showAlert('error', `Failed to delete event: ${err.message}`);
    }
  };

  // --- GALLERY MANAGEMENT ACTIONS ---
  const handleUploadGallery = async (e) => {
    e.preventDefault();
    if (!galleryFiles || galleryFiles.length === 0) {
      showAlert('error', 'Please select at least one photo to upload.');
      return;
    }

    setGalleryUploading(true);
    let successCount = 0;

    try {
      for (const file of Array.from(galleryFiles)) {
        let imageUrl = '';
        let storagePath = '';

        try {
          const compressedFile = await compressImage(file, 1920, 1920, 0.85);
          const fileExt = compressedFile.name.split('.').pop();
          storagePath = `gallery/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
          const storageRef = ref(storage, storagePath);

          const uploadResult = await withTimeout(uploadBytes(storageRef, compressedFile), 6000, 'Storage unavailable');
          imageUrl = await getDownloadURL(uploadResult.ref);
        } catch (storageErr) {
          imageUrl = await compressImageToBase64(file, 1200, 1200, 0.75);
          storagePath = '';
        }

        const photoPayload = {
          imageUrl,
          storagePath,
          caption: galleryCaption.trim(),
          uploadedBy: currentUser.email,
          uploadedAt: serverTimestamp()
        };

        const docRef = await withTimeout(addDoc(collection(db, 'gallery'), photoPayload), 15000, 'Firestore gallery write timed out.');

        // Automated Audit Logging
        await logActivity({
          action: 'CREATE',
          section: 'Gallery',
          documentId: docRef.id,
          documentTitle: galleryCaption.trim() || file.name,
          beforeData: null,
          afterData: photoPayload,
          details: `Uploaded new gallery photo "${galleryCaption.trim() || file.name}"`,
          user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
        });

        successCount++;
      }

      showAlert('success', `${successCount} photo${successCount > 1 ? 's' : ''} uploaded successfully!`);
      setGalleryFiles([]);
      setGalleryCaption('');
    } catch (err) {
      console.error(err);
      showAlert('error', `Failed to upload photos: ${err.message}`);
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleUpdateCaption = async (e) => {
    e.preventDefault();
    if (!editingPhoto) return;

    try {
      const photoRef = doc(db, 'gallery', editingPhoto.id);
      const updatePayload = {
        caption: photoCaptionForm.trim(),
        updatedBy: currentUser.email,
        updatedAt: serverTimestamp()
      };

      await withTimeout(updateDoc(photoRef, updatePayload), 8000, 'Failed to update caption.');

      // Automated Audit Logging
      await logActivity({
        action: 'UPDATE',
        section: 'Gallery',
        documentId: editingPhoto.id,
        documentTitle: photoCaptionForm.trim(),
        beforeData: editingPhoto,
        afterData: { ...editingPhoto, ...updatePayload },
        details: `Updated gallery photo caption from "${editingPhoto.caption || 'None'}" to "${photoCaptionForm.trim()}"`,
        user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
      });

      showAlert('success', 'Caption updated successfully!');
      setEditingPhoto(null);
    } catch (err) {
      console.error(err);
      showAlert('error', `Failed to update caption: ${err.message}`);
    }
  };

  const handleDeleteGalleryItem = async (photo) => {
    if (!window.confirm('Are you sure you want to delete this photo from the gallery?')) return;

    try {
      await withTimeout(deleteDoc(doc(db, 'gallery', photo.id)), 8000, 'Failed to delete photo from Firestore.');
      if (photo.storagePath) {
        try { await deleteObject(ref(storage, photo.storagePath)); } catch (delErr) { /* ignore */ }
      }

      // Automated Audit Logging
      await logActivity({
        action: 'DELETE',
        section: 'Gallery',
        documentId: photo.id,
        documentTitle: photo.caption || 'Gallery Image',
        beforeData: photo,
        afterData: null,
        details: `Deleted photo "${photo.caption || 'Untitled'}" from gallery`,
        user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
      });

      showAlert('success', 'Photo removed from gallery.');
    } catch (err) {
      console.error(err);
      showAlert('error', `Failed to delete photo: ${err.message}`);
    }
  };

  // --- USER MANAGEMENT (RBAC) ACTIONS ---
  const handleSaveUserRole = async (e) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      showAlert('error', 'Access Denied: Only Super Admins can manage team access and assign roles.');
      return;
    }

    setUserSaving(true);
    try {
      const targetUid = editingUser?.uid || editingUser?.id || `user_${Date.now()}`;
      const userDocRef = doc(db, 'adminUsers', targetUid);

      const userPayload = {
        name: userForm.name.trim(),
        email: userForm.email.toLowerCase().trim(),
        role: userForm.role,
        status: userForm.status,
        updatedBy: currentUser.email,
        updatedAt: serverTimestamp()
      };

      await withTimeout(setDoc(userDocRef, userPayload, { merge: true }), 8000, 'Failed to update user role.');

      // Automated Audit Logging
      await logActivity({
        action: 'ROLE_CHANGE',
        section: 'Users',
        documentId: targetUid,
        documentTitle: userForm.email,
        beforeData: editingUser,
        afterData: userPayload,
        details: `Updated access permissions for ${userForm.email} to ${userForm.role} (${userForm.status})`,
        user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
      });

      showAlert('success', `Access role for ${userForm.email} saved as ${userForm.role}.`);
      setUserModalOpen(false);
    } catch (err) {
      console.error(err);
      showAlert('error', `Failed to save user role: ${err.message}`);
    } finally {
      setUserSaving(false);
    }
  };

  // --- ADMIN MEMBER VERIFICATION ACTIONS ---
  const handleVerifyMember = async (mem) => {
    try {
      const updatePayload = {
        status: 'Verified',
        verifiedAt: serverTimestamp(),
        verifiedBy: currentUser.email
      };

      if (!mem.id.startsWith('subhankar')) {
        const memberDocRef = doc(db, 'members', mem.id);
        await withTimeout(updateDoc(memberDocRef, updatePayload), 8000, 'Failed to verify member application.');
      }

      // Update local state if pre-seeded
      setMembers(prev => prev.map(m => m.id === mem.id ? { ...m, status: 'Verified', verifiedBy: currentUser.email } : m));

      // Audit Logging
      await logActivity({
        action: 'UPDATE',
        section: 'Members',
        documentId: mem.id,
        documentTitle: mem.name,
        beforeData: mem,
        afterData: { ...mem, ...updatePayload },
        details: `Admin verified membership application for ${mem.name} (${mem.mobileNumber || mem.mobile})`,
        user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
      });

      showAlert('success', `Member ${mem.name} marked as Verified!`);
    } catch (err) {
      console.error(err);
      showAlert('error', `Failed to verify member: ${err.message}`);
    }
  };

  const handleRejectMember = async (mem) => {
    try {
      const updatePayload = {
        status: 'Rejected',
        verifiedAt: serverTimestamp(),
        verifiedBy: currentUser.email
      };

      if (!mem.id.startsWith('subhankar')) {
        const memberDocRef = doc(db, 'members', mem.id);
        await withTimeout(updateDoc(memberDocRef, updatePayload), 8000, 'Failed to reject member application.');
      }

      // Update local state if pre-seeded
      setMembers(prev => prev.map(m => m.id === mem.id ? { ...m, status: 'Rejected', verifiedBy: currentUser.email } : m));

      // Audit Logging
      await logActivity({
        action: 'UPDATE',
        section: 'Members',
        documentId: mem.id,
        documentTitle: mem.name,
        beforeData: mem,
        afterData: { ...mem, ...updatePayload },
        details: `Admin rejected membership application for ${mem.name} (${mem.mobileNumber || mem.mobile})`,
        user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
      });

      showAlert('success', `Member ${mem.name} application marked as Rejected.`);
    } catch (err) {
      console.error(err);
      showAlert('error', `Failed to reject member: ${err.message}`);
    }
  };

  const handleDeleteMember = async (mem) => {
    if (!window.confirm(`Are you sure you want to delete member application for ${mem.name}?`)) return;

    try {
      if (!mem.id.startsWith('subhankar')) {
        await deleteDoc(doc(db, 'members', mem.id));
      }
      setMembers(prev => prev.filter(m => m.id !== mem.id));

      await logActivity({
        action: 'DELETE',
        section: 'Members',
        documentId: mem.id,
        documentTitle: mem.name,
        beforeData: mem,
        afterData: null,
        details: `Admin deleted member application record for ${mem.name}`,
        user: { uid: currentUser.uid, email: currentUser.email, name: officialName, role: userRole }
      });

      showAlert('success', `Member ${mem.name} deleted.`);
    } catch (err) {
      console.error(err);
      showAlert('error', `Failed to delete member: ${err.message}`);
    }
  };

  // --- FILTERED & PAGINATED AUDIT LOGS ---
  const filteredLogs = useMemo(() => {
    return activityLogs.filter((log) => {
      // 1. Action Filter
      if (filterAction !== 'ALL' && log.action !== filterAction) return false;

      // 2. Section Filter
      if (filterSection !== 'ALL' && log.section !== filterSection) return false;

      // 3. Date Filter
      if (filterDateRange !== 'ALL') {
        const logDate = log.timestamp?.toDate ? log.timestamp.toDate() : (log.createdAtIso ? new Date(log.createdAtIso) : null);
        if (logDate) {
          const now = new Date();
          if (filterDateRange === 'TODAY') {
            const isToday = logDate.toDateString() === now.toDateString();
            if (!isToday) return false;
          } else if (filterDateRange === 'WEEK') {
            const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (logDate < oneWeekAgo) return false;
          } else if (filterDateRange === 'MONTH') {
            const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (logDate < oneMonthAgo) return false;
          }
        }
      }

      // 4. Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesUser = log.userName?.toLowerCase().includes(q) || log.userEmail?.toLowerCase().includes(q);
        const matchesUid = log.uid?.toLowerCase().includes(q);
        const matchesDocId = log.documentId?.toLowerCase().includes(q);
        const matchesDetails = log.details?.toLowerCase().includes(q);
        const matchesAction = log.action?.toLowerCase().includes(q);
        const matchesSection = log.section?.toLowerCase().includes(q);
        if (!matchesUser && !matchesUid && !matchesDocId && !matchesDetails && !matchesAction && !matchesSection) {
          return false;
        }
      }

      return true;
    });
  }, [activityLogs, filterAction, filterSection, filterDateRange, searchQuery]);

  const totalPages = Math.ceil(filteredLogs.length / pageSize) || 1;
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, currentPage, pageSize]);

  // Statistics Summary
  const stats = useMemo(() => {
    const todayStr = new Date().toDateString();
    const todayCount = activityLogs.filter(l => {
      const d = l.timestamp?.toDate ? l.timestamp.toDate() : (l.createdAtIso ? new Date(l.createdAtIso) : null);
      return d && d.toDateString() === todayStr;
    }).length;

    const uniqueAdmins = new Set(activityLogs.map(l => l.userEmail)).size;
    const recentLoginsCount = loginHistory.length;

    return {
      totalActivities: activityLogs.length,
      todayActivities: todayCount,
      activeAdmins: uniqueAdmins || 3,
      recentLogins: recentLoginsCount
    };
  }, [activityLogs, loginHistory]);

  const todayStr = getLocalTodayString();

  // Auth resolving state
  if (authLoading) {
    return (
      <div className="official-dashboard-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <FaUserShield style={{ fontSize: '3.5rem', color: 'var(--color-green-light)', marginBottom: '16px' }} />
          <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.4rem' }}>Verifying Official Authorization...</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Connecting to official portal...</p>
        </div>
      </div>
    );
  }

  // Access Denied for unauthorized guests
  if (!currentUser || !isOfficial) {
    return (
      <div className="official-dashboard-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '30px 20px' }}>
        <div className="empty-dashboard-card glassmorphism" style={{ maxWidth: '520px', width: '100%', padding: '45px 30px' }}>
          <div className="error-icon-wrapper" style={{ margin: '0 auto 20px auto' }}>
            <FaUserShield />
          </div>
          <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.5rem', marginBottom: '10px' }}>Official Access Required</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '25px' }}>
            This section is restricted to authorized officials only: <strong>Soumyadeep Modak</strong>, <strong>Subhankar Banerjee</strong>, <strong>Arnab Mukherjee</strong>.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn-primary" style={{ padding: '12px 26px', borderRadius: '25px', textDecoration: 'none', fontWeight: '700' }}>
              Sign In as Official
            </Link>
            <Link to="/" className="topbar-site-btn" style={{ padding: '12px 24px', borderRadius: '25px', textDecoration: 'none', fontWeight: '600' }}>
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="official-dashboard-wrapper">
      {/* Top Navigation Bar */}
      <header className="dashboard-topbar glassmorphism">
        <div className="topbar-left">
          <img src={logoImg} alt="MMA Crest" className="dashboard-logo" />
          <div className="dashboard-title-box">
            <h2>Official Dashboard</h2>
            <div className="official-role-badge-row">
              <span className="official-role-badge">
                <FaUserShield /> {officialName} ({currentUser?.email})
              </span>
              <span className={`role-pill pill-${userRole.toLowerCase()}`}>
                {userRole}
              </span>
            </div>
          </div>
        </div>

        <div className="topbar-right">
          <Link to="/" className="topbar-site-btn">
            <FaExternalLinkAlt /> View Website
          </Link>
          <button className="topbar-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="dashboard-main-container">
        {/* Floating Notification Alert */}
        <AnimatePresence>
          {alert && (
            <motion.div 
              className={`dashboard-alert-banner alert-${alert.type}`}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              {alert.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
              <span>{alert.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard 5-Tab Navigation */}
        <nav className="dashboard-tab-nav">
          <button 
            className={`dash-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <FaCalendarAlt /> Event Management ({events.length})
          </button>
          
          <button 
            className={`dash-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <FaImages /> Gallery Management ({galleryItems.length})
          </button>

          <button 
            className={`dash-tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <FaClipboardList /> Activity Logs ({activityLogs.length})
          </button>

          <button 
            className={`dash-tab-btn ${activeTab === 'logins' ? 'active' : ''}`}
            onClick={() => setActiveTab('logins')}
          >
            <FaHistory /> Login History ({loginHistory.length})
          </button>

          <button 
            className={`dash-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsersCog /> Users & Access ({adminUsers.length})
          </button>

          <button 
            className={`dash-tab-btn ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            <FaUserCheck /> Member Database & Cashier ({members.length})
          </button>
        </nav>

        {/* ======================================================== */}
        {/* TAB 1: EVENT MANAGEMENT                                  */}
        {/* ======================================================== */}
        {activeTab === 'events' && (
          <section className="dash-section">
            <div className="section-toolbar">
              <div>
                <h3>Manage Association Events</h3>
                <p>Add, update, or remove events. Dates determine Upcoming vs Past status automatically.</p>
              </div>
              <button className="btn-primary add-entity-btn" onClick={openAddEventModal}>
                <FaPlus /> Add New Event
              </button>
            </div>

            {loadingEvents ? (
              <div className="dashboard-loading">Loading live events from Firestore...</div>
            ) : events.length === 0 ? (
              <div className="empty-dashboard-card glassmorphism">
                <FaCalendarAlt className="empty-dash-icon" />
                <h4>No Events in Cloud Database</h4>
                <p>Click "Add New Event" above to create your first cloud-managed event.</p>
              </div>
            ) : (
              <div className="table-responsive glassmorphism">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Poster</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => {
                      const isToday = ev.date === todayStr;
                      const isUpcoming = ev.date > todayStr;
                      const isPast = ev.date < todayStr;

                      return (
                        <tr key={ev.id}>
                          <td className="poster-td">
                            {ev.imageUrl ? (
                              <SafeImage 
                                src={ev.imageUrl} 
                                alt={ev.title} 
                                className="table-poster-thumb" 
                                fallbackText="No Poster"
                                timeoutMs={4000}
                              />
                            ) : (
                              <div className="no-poster-box">
                                <FaImage />
                              </div>
                            )}
                          </td>
                          <td className="title-td">
                            <strong>{ev.title}</strong>
                          </td>
                          <td className="date-td">
                            <span className="badge-date">
                              <FaCalendarAlt /> {formatDisplayDate(ev.date)}
                            </span>
                          </td>
                          <td className="status-td">
                            {isToday && (
                              <span className="badge-status status-today">
                                <FaFire /> HAPPENING TODAY
                              </span>
                            )}
                            {isUpcoming && (
                              <span className="badge-status status-upcoming">
                                <FaHourglassHalf /> UPCOMING
                              </span>
                            )}
                            {isPast && (
                              <span className="badge-status status-past">
                                <FaCheckCircle /> PAST EVENT
                              </span>
                            )}
                          </td>
                          <td className="desc-td">
                            <p className="table-desc-text">{ev.description || '—'}</p>
                          </td>
                          <td className="actions-td">
                            <button 
                              className="action-icon-btn edit-btn" 
                              onClick={() => openEditEventModal(ev)}
                              title="Edit Event"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button 
                              className="action-icon-btn delete-btn" 
                              onClick={() => handleDeleteEvent(ev)}
                              title="Delete Event"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* ======================================================== */}
        {/* TAB 2: GALLERY MANAGEMENT                                */}
        {/* ======================================================== */}
        {activeTab === 'gallery' && (
          <section className="dash-section">
            <div className="gallery-upload-card glassmorphism">
              <h3><FaUpload /> Upload Photos to Gallery</h3>
              <p>Select photos to publish directly to the live Association Gallery.</p>

              <form onSubmit={handleUploadGallery} className="gallery-upload-form">
                <div className="upload-input-group">
                  <div className="form-group flex-1">
                    <label>Select Photo(s)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      required
                      onChange={(e) => setGalleryFiles(e.target.files)}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label>Caption / Title (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. AFC Cup Match Celebration"
                      value={galleryCaption}
                      onChange={(e) => setGalleryCaption(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary upload-submit-btn"
                  disabled={galleryUploading}
                >
                  <FaUpload /> {galleryUploading ? 'Publishing Photo(s)...' : 'Upload Photos'}
                </button>
              </form>
            </div>

            <div className="section-toolbar" style={{ marginTop: '30px' }}>
              <div>
                <h3>Cloud Gallery Photos ({galleryItems.length})</h3>
                <p>Photos uploaded here appear immediately on the public website Gallery.</p>
              </div>
            </div>

            {loadingGallery ? (
              <div className="dashboard-loading">Loading gallery photos from Firestore...</div>
            ) : galleryItems.length === 0 ? (
              <div className="empty-dashboard-card glassmorphism">
                <FaImages className="empty-dash-icon" />
                <h4>No Cloud Gallery Photos</h4>
                <p>Use the upload box above to add photos to the live gallery.</p>
              </div>
            ) : (
              <div className="dashboard-gallery-grid">
                {galleryItems.map((photo) => (
                  <div key={photo.id} className="dash-gallery-card glassmorphism">
                    <div className="dash-photo-wrapper">
                      <SafeImage 
                        src={photo.imageUrl} 
                        alt={photo.caption || 'Gallery photo'} 
                        fallbackText="Image unavailable"
                        timeoutMs={5000}
                        showRetry={true}
                      />
                    </div>
                    <div className="dash-photo-info">
                      <p className="photo-caption-text">{photo.caption || 'No caption'}</p>
                      <span className="photo-uploader-tag">By: {photo.uploadedBy}</span>
                    </div>
                    <div className="dash-photo-actions">
                      <button 
                        className="action-icon-btn edit-btn"
                        onClick={() => {
                          setEditingPhoto(photo);
                          setPhotoCaptionForm(photo.caption || '');
                        }}
                      >
                        <FaEdit /> Caption
                      </button>
                      <button 
                        className="action-icon-btn delete-btn"
                        onClick={() => handleDeleteGalleryItem(photo)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ACTIVITY & AUDIT LOGS                             */}
        {/* ======================================================== */}
        {activeTab === 'activity' && (
          <section className="dash-section">
            {/* Top Stat Summary Cards */}
            <div className="audit-stats-grid">
              <div className="stat-card glassmorphism">
                <div className="stat-icon icon-emerald"><FaClipboardList /></div>
                <div className="stat-info">
                  <span className="stat-label">Total Activities</span>
                  <h4 className="stat-number">{stats.totalActivities}</h4>
                </div>
              </div>

              <div className="stat-card glassmorphism">
                <div className="stat-icon icon-amber"><FaClock /></div>
                <div className="stat-info">
                  <span className="stat-label">Today's Activities</span>
                  <h4 className="stat-number">{stats.todayActivities}</h4>
                </div>
              </div>

              <div className="stat-card glassmorphism">
                <div className="stat-icon icon-purple"><FaUserCheck /></div>
                <div className="stat-info">
                  <span className="stat-label">Active Officials</span>
                  <h4 className="stat-number">{stats.activeAdmins}</h4>
                </div>
              </div>

              <div className="stat-card glassmorphism">
                <div className="stat-icon icon-cyan"><FaHistory /></div>
                <div className="stat-info">
                  <span className="stat-label">Recent Logins</span>
                  <h4 className="stat-number">{stats.recentLogins}</h4>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="audit-filter-bar glassmorphism">
              <div className="filter-search-box">
                <FaSearch className="search-icon" />
                <input 
                  type="text"
                  placeholder="Search by user email, name, UID, document ID, details..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                />
                {searchQuery && (
                  <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="filter-dropdowns-group">
                <div className="filter-select-wrapper">
                  <FaFilter className="select-icon" />
                  <select 
                    value={filterAction} 
                    onChange={(e) => { setFilterAction(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="ALL">All Actions</option>
                    <option value="CREATE">CREATE</option>
                    <option value="UPDATE">UPDATE</option>
                    <option value="DELETE">DELETE</option>
                    <option value="LOGIN">LOGIN</option>
                    <option value="LOGOUT">LOGOUT</option>
                    <option value="ROLE_CHANGE">ROLE CHANGE</option>
                  </select>
                </div>

                <div className="filter-select-wrapper">
                  <FaLayerGroup className="select-icon" />
                  <select 
                    value={filterSection} 
                    onChange={(e) => { setFilterSection(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="ALL">All Sections</option>
                    <option value="Events">Events</option>
                    <option value="Gallery">Gallery</option>
                    <option value="Users">Users</option>
                    <option value="Auth">Auth</option>
                  </select>
                </div>

                <div className="filter-select-wrapper">
                  <FaCalendarAlt className="select-icon" />
                  <select 
                    value={filterDateRange} 
                    onChange={(e) => { setFilterDateRange(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="ALL">All Time</option>
                    <option value="TODAY">Today Only</option>
                    <option value="WEEK">Last 7 Days</option>
                    <option value="MONTH">Last 30 Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Audit Logs Table */}
            {loadingLogs ? (
              <div className="dashboard-loading">Loading real-time audit logs from Firestore...</div>
            ) : filteredLogs.length === 0 ? (
              <div className="empty-dashboard-card glassmorphism">
                <FaClipboardList className="empty-dash-icon" />
                <h4>No Matching Activity Logs</h4>
                <p>No audit logs matched your search filters. Try clearing your filters.</p>
              </div>
            ) : (
              <>
                <div className="table-responsive glassmorphism">
                  <table className="dashboard-table audit-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>User / Admin</th>
                        <th>Action</th>
                        <th>Section</th>
                        <th>Details</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedLogs.map((log) => {
                        const dateStr = log.timestamp?.toDate 
                          ? log.timestamp.toDate().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                          : (log.createdAtIso ? new Date(log.createdAtIso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent');

                        return (
                          <tr key={log.id} onClick={() => setSelectedLog(log)} className="clickable-row">
                            <td className="log-date-td">
                              <span className="log-date-text">{dateStr}</span>
                            </td>
                            <td className="log-user-td">
                              <strong>{log.userName}</strong>
                              <small className="log-email-sub">{log.userEmail}</small>
                            </td>
                            <td className="log-action-td">
                              <span className={`activity-badge badge-${log.action?.toLowerCase() || 'default'}`}>
                                {log.action}
                              </span>
                            </td>
                            <td className="log-section-td">
                              <span className="section-pill">{log.section}</span>
                            </td>
                            <td className="log-details-td">
                              <p className="log-details-text">{log.details}</p>
                            </td>
                            <td className="log-inspect-td">
                              <button 
                                className="action-icon-btn inspect-btn"
                                onClick={(e) => { e.stopPropagation(); setSelectedLog(log); }}
                                title="Inspect Audit Diff"
                              >
                                <FaEye /> Diff
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="pagination-bar glassmorphism">
                  <span className="pagination-info">
                    Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredLogs.length)} of {filteredLogs.length} activity logs
                  </span>

                  <div className="pagination-btns">
                    <button 
                      className="page-nav-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                      <FaChevronLeft /> Previous
                    </button>

                    <span className="page-current">Page {currentPage} of {totalPages}</span>

                    <button 
                      className="page-nav-btn"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                      Next <FaChevronRight />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* ======================================================== */}
        {/* TAB 4: LOGIN HISTORY                                     */}
        {/* ======================================================== */}
        {activeTab === 'logins' && (
          <section className="dash-section">
            <div className="section-toolbar">
              <div>
                <h3>Official Login Sessions</h3>
                <p>Complete chronological record of official access and authentication sessions.</p>
              </div>
            </div>

            {loadingLogins ? (
              <div className="dashboard-loading">Loading login history...</div>
            ) : loginHistory.length === 0 ? (
              <div className="empty-dashboard-card glassmorphism">
                <FaHistory className="empty-dash-icon" />
                <h4>No Login Sessions Recorded</h4>
                <p>Official sign-in events will appear here automatically.</p>
              </div>
            ) : (
              <div className="table-responsive glassmorphism">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Official User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Login Time</th>
                      <th>Status</th>
                      <th>Client Platform</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loginHistory.map((item) => {
                      const loginTimeStr = item.loginTime?.toDate 
                        ? item.loginTime.toDate().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                        : (item.createdAtIso ? new Date(item.createdAtIso).toLocaleString('en-US') : 'Recent');

                      return (
                        <tr key={item.id}>
                          <td><strong>{item.userName}</strong></td>
                          <td><span className="email-text">{item.userEmail}</span></td>
                          <td><span className={`role-pill pill-${(item.userRole || 'ADMIN').toLowerCase()}`}>{item.userRole || 'ADMIN'}</span></td>
                          <td><span className="badge-date"><FaClock /> {loginTimeStr}</span></td>
                          <td>
                            <span className="badge-status status-today">
                              <FaCheckCircle /> {item.status || 'SUCCESS'}
                            </span>
                          </td>
                          <td>
                            <span className="platform-tag">
                              <FaDesktop /> {item.metadata?.platform || 'Web Browser'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* ======================================================== */}
        {/* TAB 5: USERS & ACCESS (RBAC)                             */}
        {/* ======================================================== */}
        {activeTab === 'users' && (
          <section className="dash-section">
            <div className="section-toolbar">
              <div>
                <h3>Team & Role-Based Access Control (RBAC)</h3>
                <p>Manage administrative roles (SUPER_ADMIN, ADMIN, STAFF). Only Super Admins can alter roles.</p>
              </div>
              {isSuperAdmin && (
                <button 
                  className="btn-primary add-entity-btn"
                  onClick={() => {
                    setEditingUser(null);
                    setUserForm({ name: '', email: '', role: ROLES.ADMIN, status: 'ACTIVE' });
                    setUserModalOpen(true);
                  }}
                >
                  <FaPlus /> Add Team Member
                </button>
              )}
            </div>

            {loadingUsers ? (
              <div className="dashboard-loading">Loading authorized officials directory...</div>
            ) : (
              <div className="table-responsive glassmorphism">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Official Name</th>
                      <th>Email</th>
                      <th>Assigned Role</th>
                      <th>Status</th>
                      <th>User UID</th>
                      {isSuperAdmin && <th>Manage</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <strong>{u.name || 'Official'}</strong>
                        </td>
                        <td><span className="email-text">{u.email}</span></td>
                        <td>
                          <span className={`role-pill pill-${(u.role || 'ADMIN').toLowerCase()}`}>
                            {u.role || 'ADMIN'}
                          </span>
                        </td>
                        <td>
                          <span className="badge-status status-today">
                            <FaCheckCircle /> {u.status || 'ACTIVE'}
                          </span>
                        </td>
                        <td><code className="info-code">{u.uid || u.id}</code></td>
                        {isSuperAdmin && (
                          <td>
                            <button 
                              className="action-icon-btn edit-btn"
                              onClick={() => {
                                setEditingUser(u);
                                setUserForm({
                                  name: u.name || '',
                                  email: u.email || '',
                                  role: u.role || ROLES.ADMIN,
                                  status: u.status || 'ACTIVE'
                                });
                                setUserModalOpen(true);
                              }}
                            >
                              <FaEdit /> Change Role
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* ======================================================== */}
        {/* TAB 6: MEMBER APPLICATION VERIFICATIONS (ADMIN)          */}
        {/* ======================================================== */}
        {activeTab === 'members' && (
          <section className="dash-section">
            <div className="section-toolbar">
              <div>
                <h3>Admin Member Application Verifications</h3>
                <p>Review member registration applications and manually Verify or Reject pending requests.</p>
              </div>
            </div>

            {loadingMembers ? (
              <div className="dashboard-loading">Loading member applications from Cloud Firestore...</div>
            ) : members.length === 0 ? (
              <div className="empty-dashboard-card glassmorphism">
                <FaUserCheck className="empty-dash-icon" />
                <h4>No Member Applications Registered</h4>
                <p>Member registration applications submitted via the Member Portal will appear here.</p>
              </div>
            ) : (
              <div className="table-responsive glassmorphism">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Applicant Name</th>
                      <th>Mobile Number</th>
                      <th>Registration Date</th>
                      <th>Verification Status</th>
                      <th>Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((mem) => {
                      const mob = mem.mobileNumber || mem.mobile || 'N/A';
                      const regDate = mem.createdAt?.toDate 
                        ? mem.createdAt.toDate().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                        : (mem.createdAtIso ? new Date(mem.createdAtIso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent');

                      const memStatus = mem.status || 'Pending Verification';

                      return (
                        <tr key={mem.id}>
                          <td><strong>{mem.name}</strong></td>
                          <td><span className="mobile-pill"><FaMobileAlt /> {mob}</span></td>
                          <td><span className="log-date-text">{regDate}</span></td>
                          <td>
                            {memStatus === 'Pending Verification' && (
                              <span className="badge-status status-upcoming"><FaClock /> PENDING VERIFICATION</span>
                            )}
                            {memStatus === 'Verified' && (
                              <span className="badge-status status-today"><FaCheckCircle /> VERIFIED</span>
                            )}
                            {memStatus === 'Rejected' && (
                              <span className="badge-status status-past"><FaTimesCircle /> REJECTED</span>
                            )}
                          </td>
                          <td className="actions-td">
                            <button 
                              className="action-icon-btn edit-btn"
                              onClick={() => handleVerifyMember(mem)}
                              title="Verify Member Application"
                            >
                              <FaCheckCircle /> Verify
                            </button>

                            <button 
                              className="action-icon-btn delete-btn"
                              onClick={() => handleRejectMember(mem)}
                              title="Reject Member Application"
                              style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.35)', color: '#f87171' }}
                            >
                              <FaTimesCircle /> Reject
                            </button>

                            <button 
                              className="action-icon-btn delete-btn"
                              onClick={() => handleDeleteMember(mem)}
                              title="Delete Record"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>

      {/* --- ADD / EDIT EVENT MODAL --- */}
      <AnimatePresence>
        {eventModalOpen && (
          <div className="modal-backdrop">
            <motion.div 
              className="dashboard-modal glassmorphism"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header">
                <h3>{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
                <button className="modal-close-btn" onClick={() => setEventModalOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              {modalError && (
                <div className="alert-box alert-error" style={{ margin: '0 0 15px 0' }}>
                  <FaExclamationTriangle className="alert-icon" />
                  <span>{modalError}</span>
                </div>
              )}

              <form onSubmit={handleSaveEvent} className="modal-form">
                <div className="form-group">
                  <label>Event Title *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Flag Hosting Ceremony"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Event Date (YYYY-MM-DD) *</label>
                  <input 
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide event details, itinerary, or instructions..."
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Event Poster / Image (Optional)</label>
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEventFile(e.target.files[0] || null)}
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setEventModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={eventSaving}>
                    {eventSaving ? 'Saving Event...' : editingEvent ? 'Save Changes' : 'Create Event'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- EDIT PHOTO CAPTION MODAL --- */}
      <AnimatePresence>
        {editingPhoto && (
          <div className="modal-backdrop">
            <motion.div 
              className="dashboard-modal glassmorphism"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header">
                <h3>Edit Photo Caption</h3>
                <button className="modal-close-btn" onClick={() => setEditingPhoto(null)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleUpdateCaption} className="modal-form">
                <div className="form-group">
                  <label>Caption</label>
                  <input 
                    type="text"
                    required
                    value={photoCaptionForm}
                    onChange={(e) => setPhotoCaptionForm(e.target.value)}
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setEditingPhoto(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Update Caption
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- USER ROLE MANAGEMENT MODAL (SUPER ADMIN ONLY) --- */}
      <AnimatePresence>
        {userModalOpen && (
          <div className="modal-backdrop">
            <motion.div 
              className="dashboard-modal glassmorphism"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header">
                <h3>{editingUser ? 'Edit User Permissions' : 'Add Team Member'}</h3>
                <button className="modal-close-btn" onClick={() => setUserModalOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSaveUserRole} className="modal-form">
                <div className="form-group">
                  <label>Official Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Subhankar Banerjee"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Official Email Address *</label>
                  <input 
                    type="email"
                    required
                    disabled={!!editingUser}
                    placeholder="name@gmail.com"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Access Role *</label>
                  <select 
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  >
                    <option value={ROLES.SUPER_ADMIN}>SUPER_ADMIN (Full control + User Management)</option>
                    <option value={ROLES.ADMIN}>ADMIN (Events, Gallery, Activity Logs)</option>
                    <option value={ROLES.STAFF}>STAFF (Events & Gallery only)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status *</label>
                  <select 
                    value={userForm.status}
                    onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setUserModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={userSaving}>
                    {userSaving ? 'Saving Role...' : 'Save Permissions'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CASHIER MEMBER REGISTRATION & VALIDITY EDIT MODAL --- */}
      <AnimatePresence>
        {memberModalOpen && (
          <div className="modal-backdrop">
            <motion.div 
              className="dashboard-modal glassmorphism"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header">
                <h3>{editingMember ? 'Cashier: Edit Membership Validity' : 'Cashier: Register New Member'}</h3>
                <button className="modal-close-btn" onClick={() => setMemberModalOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSaveMember} className="modal-form">
                <div className="form-group">
                  <label>Member Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Subhankar Banerjee"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Registered Mobile Number (10 Digits) *</label>
                  <input 
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={memberForm.mobile}
                    onChange={(e) => setMemberForm({ ...memberForm, mobile: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Membership Status *</label>
                  <select 
                    value={memberForm.status}
                    onChange={(e) => setMemberForm({ ...memberForm, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Validity Duration (Months)</label>
                  <select 
                    value={memberForm.durationMonths}
                    onChange={(e) => {
                      const months = Number(e.target.value);
                      const start = new Date(memberForm.startDate || new Date());
                      start.setMonth(start.getMonth() + months);
                      const endIso = start.toISOString().split('T')[0];
                      setMemberForm({ ...memberForm, durationMonths: months, endDate: endIso });
                    }}
                  >
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months (1 Year)</option>
                    <option value={24}>24 Months (2 Years)</option>
                    <option value={36}>36 Months (3 Years)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Membership Start Date</label>
                  <input 
                    type="date"
                    required
                    value={memberForm.startDate}
                    onChange={(e) => setMemberForm({ ...memberForm, startDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Valid Till (End Date)</label>
                  <input 
                    type="date"
                    required
                    value={memberForm.endDate}
                    onChange={(e) => setMemberForm({ ...memberForm, endDate: e.target.value })}
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setMemberModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={memberSaving}>
                    {memberSaving ? 'Saving Validity...' : 'Save Membership'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ACTIVITY DETAILS & DIFF INSPECTOR MODAL --- */}
      <AnimatePresence>
        {selectedLog && (
          <ActivityDetailsModal 
            log={selectedLog}
            onClose={() => setSelectedLog(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfficialDashboard;

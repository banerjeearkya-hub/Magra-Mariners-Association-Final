import React, { useState, useEffect } from 'react';
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
  orderBy 
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
  FaImage
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase/config';
import { getLocalTodayString, formatDisplayDate, normalizeDateStr } from './Events';
import SafeImage from './SafeImage';
import { compressImage, compressImageToBase64 } from '../utils/imageCompressor';
import logoImg from '../assets/logo.png';
import './OfficialDashboard.css';

const OfficialDashboard = () => {
  const { currentUser, isOfficial, officialName, logout, authLoading } = useAuth();
  const navigate = useNavigate();

  // Tab State: 'events' | 'gallery'
  const [activeTab, setActiveTab] = useState('events');

  // Events & Gallery State
  const [events, setEvents] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);

  // Modal States
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

  // Subscribe to real-time events from Firestore with safety timeout
  useEffect(() => {
    if (!currentUser || !isOfficial) return;

    // Safety timeout: Never hang in loading state for more than 1.8 seconds
    const timeout = setTimeout(() => {
      setLoadingEvents(false);
    }, 1800);

    let unsubscribe = () => {};
    try {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, orderBy('date', 'asc'));

      unsubscribe = onSnapshot(q, (snapshot) => {
        clearTimeout(timeout);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(items);
        setLoadingEvents(false);
      }, (err) => {
        clearTimeout(timeout);
        console.warn('Firestore events listener notice:', err);
        setLoadingEvents(false);
      });
    } catch (e) {
      clearTimeout(timeout);
      console.warn('Firestore events init error:', e);
      setLoadingEvents(false);
    }

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [currentUser, isOfficial]);

  // Subscribe to real-time gallery items from Firestore with safety timeout
  useEffect(() => {
    if (!currentUser || !isOfficial) return;

    // Safety timeout: Never hang in loading state for more than 1.8 seconds
    const timeout = setTimeout(() => {
      setLoadingGallery(false);
    }, 1800);

    let unsubscribe = () => {};
    try {
      const galleryRef = collection(db, 'gallery');
      const q = query(galleryRef, orderBy('uploadedAt', 'desc'));

      unsubscribe = onSnapshot(q, (snapshot) => {
        clearTimeout(timeout);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGalleryItems(items);
        setLoadingGallery(false);
      }, (err) => {
        clearTimeout(timeout);
        console.warn('Firestore gallery listener notice:', err);
        setLoadingGallery(false);
      });
    } catch (e) {
      clearTimeout(timeout);
      console.warn('Firestore gallery init error:', e);
      setLoadingGallery(false);
    }

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
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

      // Upload new poster image if selected
      if (eventFile) {
        try {
          const compressedPoster = await compressImage(eventFile, 1920, 1920, 0.85);
          const fileExt = compressedPoster.name.split('.').pop();
          const fileName = `events/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
          const storageRef = ref(storage, fileName);
          
          const uploadResult = await withTimeout(
            uploadBytes(storageRef, compressedPoster),
            6000,
            'Storage unavailable'
          );
          imageUrl = await getDownloadURL(uploadResult.ref);
          storagePath = fileName;

          // Delete old poster if updating
          if (editingEvent?.storagePath) {
            try {
              await deleteObject(ref(storage, editingEvent.storagePath));
            } catch (delErr) {
              console.warn('Could not remove previous poster:', delErr);
            }
          }
        } catch (storageErr) {
          // Fallback to storing compressed Base64 image directly in Firestore (100% Free, no Blaze needed)
          console.info('Saving event poster directly to Firestore database:', storageErr);
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
        // Update existing event
        const eventDocRef = doc(db, 'events', editingEvent.id);
        await withTimeout(
          updateDoc(eventDocRef, eventPayload),
          15000,
          'Unable to reach Firestore database. Please verify Firestore Database is created in Firebase Console.'
        );
        showAlert('success', `Event "${eventForm.title}" updated successfully!`);
      } else {
        // Add new event
        eventPayload.createdBy = currentUser.email;
        eventPayload.createdAt = serverTimestamp();
        await withTimeout(
          addDoc(collection(db, 'events'), eventPayload),
          15000,
          'Unable to reach Firestore database. Please make sure Firestore Database is created and active in your Firebase Console (Build > Firestore Database > Create Database).'
        );
        showAlert('success', `Event "${eventForm.title}" added successfully!`);
      }

      setEventModalOpen(false);
    } catch (err) {
      console.error(err);
      const errMsg = err.message.includes('permission-denied') || err.message.includes('unauthorized')
        ? 'Permission Denied: Please publish the Firestore Security Rules in Firebase Console.'
        : err.message;
      setModalError(errMsg);
      showAlert('error', `Failed to save event: ${errMsg}`);
    } finally {
      setEventSaving(false);
    }
  };

  const handleDeleteEvent = async (ev) => {
    if (!window.confirm(`Are you sure you want to delete the event "${ev.title}"?`)) return;

    try {
      // Delete document
      await deleteDoc(doc(db, 'events', ev.id));
      
      // Delete poster from storage if exists
      if (ev.storagePath) {
        try {
          await deleteObject(ref(storage, ev.storagePath));
        } catch (delErr) {
          console.warn('Poster delete warning:', delErr);
        }
      }
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
          // Attempt Storage upload
          const compressedFile = await compressImage(file, 1920, 1920, 0.85);
          const fileExt = compressedFile.name.split('.').pop();
          storagePath = `gallery/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
          const storageRef = ref(storage, storagePath);

          const uploadResult = await withTimeout(
            uploadBytes(storageRef, compressedFile),
            6000,
            'Storage unavailable'
          );
          imageUrl = await getDownloadURL(uploadResult.ref);
        } catch (storageErr) {
          // Fallback to storing compressed Base64 photo directly in Firestore (100% Free Spark Plan)
          console.info('Saving gallery photo directly to Cloud Firestore:', storageErr);
          imageUrl = await compressImageToBase64(file, 1200, 1200, 0.75);
          storagePath = '';
        }

        await withTimeout(
          addDoc(collection(db, 'gallery'), {
            imageUrl,
            storagePath,
            caption: galleryCaption.trim(),
            uploadedBy: currentUser.email,
            uploadedAt: serverTimestamp()
          }),
          15000,
          'Failed to record photo in Firestore. Ensure Firestore Database is active in Firebase Console.'
        );

        successCount++;
      }

      showAlert('success', `${successCount} photo${successCount > 1 ? 's' : ''} uploaded successfully!`);
      setGalleryFiles([]);
      setGalleryCaption('');
    } catch (err) {
      console.error(err);
      const errMsg = err.message.includes('permission-denied') || err.message.includes('unauthorized')
        ? 'Permission Denied: Please publish the Firestore Security Rules in Firebase Console.'
        : err.message;
      showAlert('error', `Failed to upload photos: ${errMsg}`);
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleUpdateCaption = async (e) => {
    e.preventDefault();
    if (!editingPhoto) return;

    try {
      const photoRef = doc(db, 'gallery', editingPhoto.id);
      await withTimeout(
        updateDoc(photoRef, {
          caption: photoCaptionForm.trim(),
          updatedBy: currentUser.email,
          updatedAt: serverTimestamp()
        }),
        8000,
        'Failed to update caption in Firestore.'
      );
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
      await withTimeout(
        deleteDoc(doc(db, 'gallery', photo.id)),
        8000,
        'Failed to delete photo document from Firestore.'
      );

      if (photo.storagePath) {
        try {
          await deleteObject(ref(storage, photo.storagePath));
        } catch (delErr) {
          console.warn('Gallery file delete warning:', delErr);
        }
      }
      showAlert('success', 'Photo removed from gallery.');
    } catch (err) {
      console.error(err);
      showAlert('error', `Failed to delete photo: ${err.message}`);
    }
  };

  const todayStr = getLocalTodayString();

  // If authentication state is still resolving
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

  // If user is not logged in or not an authorized official
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
            <span className="official-role-badge">
              <FaUserShield /> {officialName} ({currentUser?.email})
            </span>
          </div>
        </div>

        <div className="topbar-right">
          <Link to="/" className="topbar-site-btn">
            <FaExternalLinkAlt /> View Website
          </Link>
          <button onClick={handleLogout} className="topbar-logout-btn">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="dashboard-content-container">
        {/* Alerts */}
        <AnimatePresence>
          {alert && (
            <motion.div 
              className={`dashboard-alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              {alert.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
              <span>{alert.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Navigation Tabs */}
        <div className="dashboard-nav-tabs">
          <button 
            className={`dash-tab-btn ${activeTab === 'events' ? 'active-dash-tab' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <FaCalendarAlt /> Event Management ({events.length})
          </button>
          
          <button 
            className={`dash-tab-btn ${activeTab === 'gallery' ? 'active-dash-tab' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <FaImages /> Gallery Management ({galleryItems.length})
          </button>
        </div>

        {/* --- EVENT MANAGEMENT TAB --- */}
        {activeTab === 'events' && (
          <section className="dashboard-section">
            <div className="section-toolbar">
              <div>
                <h3>Manage Association Events</h3>
                <p>Add, update, or remove events. Dates determine Upcoming vs Past status automatically.</p>
              </div>
              <button className="btn-primary add-new-btn" onClick={openAddEventModal}>
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
              <div className="events-table-card glassmorphism">
                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Poster</th>
                        <th>Event Title</th>
                        <th>Date</th>
                        <th>Current Status</th>
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
              </div>
            )}
          </section>
        )}

        {/* --- GALLERY MANAGEMENT TAB --- */}
        {activeTab === 'gallery' && (
          <section className="dashboard-section">
            {/* Upload Box */}
            <div className="gallery-upload-card glassmorphism">
              <h3><FaUpload /> Upload Photos to Gallery</h3>
              <p>Select one or multiple photos to upload directly to Firebase Storage.</p>
              
              <form onSubmit={handleUploadGallery} className="gallery-upload-form">
                <div className="upload-form-grid">
                  <div className="form-group">
                    <label>Select Photo(s)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      required
                      onChange={(e) => setGalleryFiles(e.target.files)}
                      className="file-input-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Caption / Title (Optional)</label>
                    <input 
                      type="text"
                      placeholder="e.g. Match Day Celebration 2026"
                      value={galleryCaption}
                      onChange={(e) => setGalleryCaption(e.target.value)}
                      className="text-input-control"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary upload-submit-btn"
                  disabled={galleryUploading}
                >
                  <FaUpload /> {galleryUploading ? 'Uploading to Firebase Storage...' : 'Upload Photos'}
                </button>
              </form>
            </div>

            {/* Existing Uploaded Gallery Grid */}
            <div className="section-toolbar" style={{ marginTop: '40px' }}>
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
                    placeholder="e.g. Flag Hosting"
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
                  <small className="form-help-text">
                    The website will automatically calculate Upcoming vs Past status based on the real date.
                  </small>
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
                    onChange={(e) => setEventFile(e.target.files[0])}
                  />
                  {editingEvent?.imageUrl && !eventFile && (
                    <small className="form-help-text">Current poster is attached. Choose a new file to replace it.</small>
                  )}
                </div>

                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="modal-cancel-btn"
                    onClick={() => setEventModalOpen(false)}
                    disabled={eventSaving}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary modal-save-btn"
                    disabled={eventSaving}
                  >
                    {eventSaving ? 'Saving to Firestore...' : editingEvent ? 'Update Event' : 'Create Event'}
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
                <div className="caption-preview-box">
                  <img src={editingPhoto.imageUrl} alt="Preview" />
                </div>

                <div className="form-group">
                  <label>Caption</label>
                  <input 
                    type="text"
                    placeholder="Enter caption..."
                    value={photoCaptionForm}
                    onChange={(e) => setPhotoCaptionForm(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="modal-cancel-btn"
                    onClick={() => setEditingPhoto(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary modal-save-btn"
                  >
                    Save Caption
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfficialDashboard;

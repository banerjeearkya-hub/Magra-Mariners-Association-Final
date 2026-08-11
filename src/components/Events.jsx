import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline, Tag } from 'antd';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaHourglassHalf, 
  FaCalendarTimes, 
  FaExternalLinkAlt, 
  FaFire 
} from 'react-icons/fa';
import './Events.css';

// Helper to get local date in YYYY-MM-DD format based on the user's browser/device clock
export const getLocalTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to normalize any input date string to YYYY-MM-DD for reliable comparison
export const normalizeDateStr = (dateStr) => {
  if (!dateStr) return '';
  // If already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  // Try parsing date string like "July 26, 2026" or "15 August 2026"
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return dateStr;
};

// Helper to format YYYY-MM-DD for human-friendly presentation
export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const normalized = normalizeDateStr(dateStr);
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    const [y, m, d] = normalized.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
  return dateStr;
};

const Events = ({ data }) => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past' | 'all'
  const [timelineMode, setTimelineMode] = useState('alternate');
  const [todayStr, setTodayStr] = useState(getLocalTodayString());
  const [firestoreEvents, setFirestoreEvents] = useState([]);
  const [hasFirestoreData, setHasFirestoreData] = useState(false);

  // Subscribe to real-time events from Cloud Firestore
  useEffect(() => {
    try {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, orderBy('date', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const cloudItems = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setFirestoreEvents(cloudItems);
          setHasFirestoreData(true);
        } else {
          // If collection is empty in Firestore, fall back to initial static data
          setHasFirestoreData(false);
        }
      }, (err) => {
        console.warn('Firestore live listener notice (using static events fallback):', err);
        setHasFirestoreData(false);
      });

      return unsubscribe;
    } catch (e) {
      console.warn('Could not initialize Firestore listener:', e);
    }
  }, []);

  // Handle responsive layout for Ant Design timeline
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTimelineMode('left');
      } else {
        setTimelineMode('alternate');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic date watcher: periodically checks the local date every 30s so events
  // automatically transition across midnight without needing a page refresh
  useEffect(() => {
    const interval = setInterval(() => {
      const currentToday = getLocalTodayString();
      if (currentToday !== todayStr) {
        setTodayStr(currentToday);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [todayStr]);

  // Extract raw items: prefer Firestore live items if available, otherwise use data.items fallback
  const baseItems = data?.items || data?.timeline || (Array.isArray(data) ? data : []);
  const rawItems = hasFirestoreData && firestoreEvents.length > 0 ? firestoreEvents : baseItems;

  // Process and enrich events with status based on real device date
  const processedItems = rawItems.map((item, index) => {
    const normDate = normalizeDateStr(item.date);
    let statusType = 'upcoming'; // 'today' | 'upcoming' | 'past'
    
    if (normDate < todayStr) {
      statusType = 'past';
    } else if (normDate === todayStr) {
      statusType = 'today';
    } else {
      statusType = 'upcoming';
    }

    return {
      ...item,
      key: item.id || item.key || `event-${index}`,
      normDate,
      displayDate: formatDisplayDate(item.date),
      statusType
    };
  });

  // Categorize and sort
  // Upcoming events: nearest date first (ascending)
  const upcomingEvents = processedItems
    .filter(item => item.statusType === 'today' || item.statusType === 'upcoming')
    .sort((a, b) => a.normDate.localeCompare(b.normDate));

  // Past events: most recently completed event first (descending)
  const pastEvents = processedItems
    .filter(item => item.statusType === 'past')
    .sort((a, b) => b.normDate.localeCompare(a.normDate));

  // All events: sorted chronologically
  const allEvents = [...processedItems].sort((a, b) => a.normDate.localeCompare(b.normDate));

  // Determine current active list
  const displayedEvents = activeTab === 'upcoming' 
    ? upcomingEvents 
    : activeTab === 'past' 
      ? pastEvents 
      : allEvents;

  return (
    <section id="events" className="events-section section-padding">
      <div className="section-header">
        <h2>{data?.title || "Association Events"}</h2>
        <p>{data?.subtitle || "Mark your calendars and celebrate with the Mariners"}</p>
      </div>

      <div className="events-container">
        {/* Category Tabs: Upcoming vs Past */}
        <div className="events-tab-bar">
          <button 
            className={`event-tab-btn ${activeTab === 'upcoming' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
          
          <button 
            className={`event-tab-btn ${activeTab === 'past' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Events
          </button>

          <button 
            className={`event-tab-btn ${activeTab === 'all' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Events
          </button>
        </div>

        {/* Display Events or Empty State */}
        <AnimatePresence mode="wait">
          {displayedEvents.length === 0 ? (
            <motion.div 
              key={`empty-${activeTab}`}
              className="events-empty-state glassmorphism"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="empty-icon-wrapper">
                <FaCalendarTimes />
              </div>
              <h3 className="empty-title">
                {activeTab === 'upcoming' ? 'No upcoming events at the moment.' : 'No past events yet.'}
              </h3>
              <p className="empty-desc">
                {activeTab === 'upcoming' 
                  ? 'Check back soon for announcements on upcoming match screenings, tournaments, and welfare programs.'
                  : 'Past event records and gallery memories will be archived here as events conclude.'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`timeline-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Timeline mode={timelineMode} className="custom-timeline">
                {displayedEvents.map((item, index) => {
                  const isToday = item.statusType === 'today';
                  const isUpcoming = item.statusType === 'upcoming';
                  const isPast = item.statusType === 'past';

                  let dotClass = 'upcoming-dot';
                  let DotIcon = FaHourglassHalf;
                  let borderClass = 'card-border-green';

                  if (isToday) {
                    dotClass = 'today-dot';
                    DotIcon = FaFire;
                    borderClass = 'card-border-today';
                  } else if (isPast) {
                    dotClass = 'completed-dot';
                    DotIcon = FaCheckCircle;
                    borderClass = 'card-border-maroon';
                  }

                  return (
                    <Timeline.Item
                      key={item.key}
                      dot={
                        <div className={`timeline-dot-wrapper ${dotClass}`}>
                          <DotIcon />
                        </div>
                      }
                      label={
                        <span className={`timeline-date-label ${isToday ? 'label-today' : ''}`}>
                          <FaCalendarAlt className="date-icon" /> {item.displayDate}
                        </span>
                      }
                    >
                      <motion.div
                        className="timeline-card-wrapper"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className={`timeline-event-card glassmorphism ${borderClass} ${isToday ? 'today-highlight-card' : ''}`}>
                          
                          {/* Mobile Date Badge */}
                          <div className={`mobile-date-badge ${isToday ? 'badge-today' : ''}`}>
                            <FaCalendarAlt className="date-icon" /> {item.displayDate}
                          </div>

                          {/* Header row: Title + Status Tag */}
                          <div className="timeline-card-header">
                            <h3 className="event-title">{item.title}</h3>
                            {isToday && (
                              <Tag className="event-tag tag-today">
                                <FaFire className="tag-icon" /> TODAY
                              </Tag>
                            )}
                            {isUpcoming && (
                              <Tag className="event-tag tag-upcoming">
                                <FaHourglassHalf className="tag-icon" /> UPCOMING
                              </Tag>
                            )}
                            {isPast && (
                              <Tag className="event-tag tag-completed">
                                <FaCheckCircle className="tag-icon" /> COMPLETED
                              </Tag>
                            )}
                          </div>

                          {/* Event Poster / Image */}
                          {item.imageUrl && (
                            <div className="event-poster-container">
                              <img src={item.imageUrl} alt={item.title} className="event-poster-img" />
                            </div>
                          )}

                          {/* Description */}
                          {item.description && (
                            <p className="event-description">{item.description}</p>
                          )}

                          {/* Optional Event Link / Action Button */}
                          {item.link && (
                            <div className="event-action-row">
                              <a 
                                href={item.link} 
                                className="event-action-btn"
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                {item.linkText || 'Event Details'} <FaExternalLinkAlt className="btn-icon" />
                              </a>
                            </div>
                          )}

                        </div>
                      </motion.div>
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Events;

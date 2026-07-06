import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timeline, Tag } from 'antd';
import { FaCalendarAlt, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import './Events.css';

const Events = ({ data }) => {
  const [timelineMode, setTimelineMode] = useState('alternate');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTimelineMode('left');
      } else {
        setTimelineMode('alternate');
      }
    };

    handleResize(); // call initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="events" className="events-section section-padding">
      <div className="section-header">
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </div>

      <div className="events-container">
        <Timeline mode={timelineMode} className="custom-timeline">
          {data.timeline.map((item, index) => {
            const isUpcoming = item.status === 'upcoming';
            
            return (
              <Timeline.Item
                key={item.key}
                dot={
                  <div className={`timeline-dot-wrapper ${isUpcoming ? 'upcoming-dot' : 'completed-dot'}`}>
                    {isUpcoming ? <FaHourglassHalf /> : <FaCheckCircle />}
                  </div>
                }
                label={
                  <span className="timeline-date-label">
                    <FaCalendarAlt className="date-icon" /> {item.date}
                  </span>
                }
              >
                <motion.div
                  className="timeline-card-wrapper"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className={`timeline-event-card glassmorphism ${isUpcoming ? 'card-border-green' : 'card-border-maroon'}`}>
                    <div className="timeline-card-header">
                      <h3 className="event-title">{item.title}</h3>
                      <Tag color={isUpcoming ? 'success' : 'default'} className="event-tag">
                        {isUpcoming ? 'Upcoming' : 'Completed'}
                      </Tag>
                    </div>
                    <p className="event-description">{item.description}</p>
                  </div>
                </motion.div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </section>
  );
};

export default Events;

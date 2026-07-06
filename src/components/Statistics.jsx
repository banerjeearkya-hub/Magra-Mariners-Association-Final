import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { FaUserFriends, FaTrophy, FaCalendarCheck, FaHourglass } from 'react-icons/fa';
import './Statistics.css';

const Counter = ({ from = 0, to, duration = 2.5 }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const Statistics = ({ data }) => {
  const getIcon = (label) => {
    switch (label.toLowerCase()) {
      case 'active members':
        return <FaUserFriends />;
      case 'events hosted':
        return <FaCalendarCheck />;
      case 'championships':
        return <FaTrophy />;
      case 'years of association':
        return <FaHourglass />;
      default:
        return <FaTrophy />;
    }
  };

  return (
    <section className="stats-section section-padding">
      <div className="stats-overlay"></div>
      <div className="stats-container">
        {data.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card glassmorphism"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div className="stat-icon-wrapper">
              {getIcon(stat.label)}
            </div>
            <div className="stat-number-box">
              <Counter to={stat.value} />
              <span className="stat-suffix">{stat.suffix}</span>
            </div>
            <h3 className="stat-label">{stat.label}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;

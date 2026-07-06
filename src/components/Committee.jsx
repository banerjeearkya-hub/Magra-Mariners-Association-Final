import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@gravity-ui/uikit';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import './Committee.css';

const Committee = ({ data }) => {
  return (
    <section id="committee" className="committee-section section-padding">
      <div className="section-header">
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </div>

      <div className="committee-cards-container">
        {data.members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: (idx % 4) * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="committee-card-wrapper"
          >
            {/* Gravity UI Card with glassmorphism CSS class */}
            <Card className="committee-card glassmorphism">
              {/* Title & Position */}
              <div className="committee-info">
                <span className={`committee-badge ${idx % 2 === 0 ? 'badge-maroon' : 'badge-green'}`}>
                  {member.position}
                </span>
                <h3 className="committee-name">{member.name}</h3>
                <p className="committee-bio">{member.bio}</p>
              </div>

              {/* Social Media Links */}
              <div className="committee-socials">
                <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-btn twitter" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn linkedin" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href={`mailto:${member.socials.email}`} className="social-icon-btn email" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* General Executive Members list */}
      {data.executiveMembers && data.executiveMembers.length > 0 && (
        <div className="executive-members-section">
          <h3 className="executive-members-title">Executive Members</h3>
          <div className="executive-members-divider"></div>
          <div className="executive-members-grid">
            {data.executiveMembers.map((name, index) => (
              <motion.div 
                key={index}
                className="executive-member-tag glassmorphism"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(245, 194, 66, 0.4)' }}
              >
                <span className="member-bullet">⚽</span>
                <span className="member-name">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Committee;

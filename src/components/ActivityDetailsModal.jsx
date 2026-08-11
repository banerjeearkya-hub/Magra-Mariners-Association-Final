import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTimes, 
  FaUserShield, 
  FaCalendarAlt, 
  FaInfoCircle, 
  FaCode, 
  FaArrowRight, 
  FaLayerGroup, 
  FaDesktop, 
  FaFingerprint 
} from 'react-icons/fa';
import './ActivityDetailsModal.css';

const formatTimestamp = (timestamp, isoStr) => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }
  if (isoStr) {
    return new Date(isoStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  return 'Just now';
};

const getActionClass = (action = '') => {
  switch (action.toUpperCase()) {
    case 'CREATE': return 'badge-create';
    case 'UPDATE': return 'badge-update';
    case 'DELETE': return 'badge-delete';
    case 'LOGIN': return 'badge-login';
    case 'LOGOUT': return 'badge-logout';
    case 'ROLE_CHANGE': return 'badge-role';
    default: return 'badge-default';
  }
};

const ActivityDetailsModal = ({ log, onClose }) => {
  const [viewMode, setViewMode] = useState('diff'); // 'diff' | 'raw'

  if (!log) return null;

  const hasDiff = log.changedFields && log.changedFields.length > 0;
  const isUpdate = log.action === 'UPDATE';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div 
        className="activity-modal glassmorphism"
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="activity-modal-header">
          <div className="header-badge-group">
            <span className={`activity-badge ${getActionClass(log.action)}`}>
              {log.action}
            </span>
            <span className="activity-section-tag">
              <FaLayerGroup /> {log.section}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <div className="activity-modal-body">
          {/* Main Description */}
          <div className="activity-summary-banner">
            <FaInfoCircle className="summary-icon" />
            <p className="summary-text">{log.details || `${log.action} performed in ${log.section}`}</p>
          </div>

          {/* Grid Info Columns */}
          <div className="activity-info-grid">
            <div className="info-cell">
              <span className="info-label"><FaUserShield /> User / Admin</span>
              <strong className="info-val">{log.userName}</strong>
              <small className="info-sub">{log.userEmail}</small>
            </div>

            <div className="info-cell">
              <span className="info-label"><FaCalendarAlt /> Date & Time</span>
              <strong className="info-val">{formatTimestamp(log.timestamp, log.createdAtIso)}</strong>
              <small className="info-sub">Role: {log.userRole || 'ADMIN'}</small>
            </div>

            <div className="info-cell">
              <span className="info-label"><FaFingerprint /> Document ID</span>
              <code className="info-code">{log.documentId || 'N/A'}</code>
              {log.documentTitle && <small className="info-sub">"{log.documentTitle}"</small>}
            </div>

            <div className="info-cell">
              <span className="info-label"><FaDesktop /> User UID & Client</span>
              <code className="info-code">{log.uid || 'N/A'}</code>
              <small className="info-sub">{log.metadata?.platform || 'Web'}</small>
            </div>
          </div>

          {/* Diff & Data Changes Section */}
          <div className="activity-diff-section">
            <div className="diff-header-bar">
              <h4>
                {isUpdate ? 'Field Changes (Before vs After)' : 'Recorded Payload Data'}
              </h4>
              <div className="view-mode-toggle">
                <button 
                  type="button"
                  className={`toggle-btn ${viewMode === 'diff' ? 'active' : ''}`}
                  onClick={() => setViewMode('diff')}
                >
                  Visual Diff
                </button>
                <button 
                  type="button"
                  className={`toggle-btn ${viewMode === 'raw' ? 'active' : ''}`}
                  onClick={() => setViewMode('raw')}
                >
                  <FaCode /> Raw JSON
                </button>
              </div>
            </div>

            {viewMode === 'diff' ? (
              <div className="diff-content-wrapper">
                {isUpdate && hasDiff ? (
                  <div className="diff-table-container">
                    <table className="diff-table">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Before (Previous Value)</th>
                          <th className="arrow-th"></th>
                          <th>After (New Value)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {log.changedFields.map((change, idx) => (
                          <tr key={idx}>
                            <td className="diff-field-name">
                              <code>{change.field}</code>
                            </td>
                            <td className="diff-val-before">
                              <span className="diff-pill pill-red">
                                {typeof change.before === 'object' ? JSON.stringify(change.before) : String(change.before)}
                              </span>
                            </td>
                            <td className="diff-arrow-cell">
                              <FaArrowRight />
                            </td>
                            <td className="diff-val-after">
                              <span className="diff-pill pill-green">
                                {typeof change.after === 'object' ? JSON.stringify(change.after) : String(change.after)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : log.afterData ? (
                  <div className="data-preview-card">
                    <div className="data-preview-header">Created / Active Data Snapshot</div>
                    <pre className="json-pre">{JSON.stringify(log.afterData, null, 2)}</pre>
                  </div>
                ) : log.beforeData ? (
                  <div className="data-preview-card">
                    <div className="data-preview-header">Deleted Document Snapshot</div>
                    <pre className="json-pre">{JSON.stringify(log.beforeData, null, 2)}</pre>
                  </div>
                ) : (
                  <div className="no-diff-box">
                    <p>No additional payload modifications stored for this event.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="raw-json-container">
                <div className="raw-json-cols">
                  {log.beforeData && (
                    <div className="raw-col">
                      <span className="raw-col-title">Before Data</span>
                      <pre className="json-pre">{JSON.stringify(log.beforeData, null, 2)}</pre>
                    </div>
                  )}
                  {log.afterData && (
                    <div className="raw-col">
                      <span className="raw-col-title">After Data</span>
                      <pre className="json-pre">{JSON.stringify(log.afterData, null, 2)}</pre>
                    </div>
                  )}
                  {!log.beforeData && !log.afterData && (
                    <pre className="json-pre">{JSON.stringify(log, null, 2)}</pre>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="activity-modal-footer">
          <span className="immutable-notice">🔒 Append-Only Immutable Audit Log</span>
          <button type="button" className="btn-primary modal-done-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityDetailsModal;

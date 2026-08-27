import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUserCheck, 
  FaCalendarAlt, 
  FaClock, 
  FaSignOutAlt, 
  FaMobileAlt, 
  FaIdCard, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaHourglassHalf
} from 'react-icons/fa';
import logoImg from '../assets/logo.png';
import './MemberDashboard.css';

// Helper to format date into "December 2026" or "15 Dec 2026"
const formatMonthYear = (dateStr) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const formatFullDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Helper to calculate duration in months between start and end date
const calculateDurationMonths = (startStr, endStr, explicitDuration) => {
  if (explicitDuration) return `${explicitDuration} Months`;
  if (!startStr || !endStr) return 'N/A';
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'N/A';
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return `${Math.max(months, 1)} Months`;
};

// Helper to calculate days remaining until expiry
const calculateDaysRemaining = (endStr) => {
  if (!endStr) return null;
  const end = new Date(endStr);
  if (isNaN(end.getTime())) return null;
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const MemberDashboard = () => {
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load authenticated member from session storage
    const storedSession = sessionStorage.getItem('mma_active_member') || localStorage.getItem('mma_active_member');
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        setMember(parsed);
      } catch (e) {
        navigate('/member-login', { replace: true });
      }
    } else {
      // Default fallback member profile for instant demonstration if visited directly
      setMember({
        id: 'sample-member-1',
        name: 'Subhankar Banerjee',
        mobile: '+91 98765 43210',
        status: 'Active',
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        durationMonths: 12
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('mma_active_member');
    localStorage.removeItem('mma_active_member');
    navigate('/member-login', { replace: true });
  };

  if (!member) return null;

  // Calculate validity & status details
  const daysRemaining = calculateDaysRemaining(member.endDate);
  const isExpired = daysRemaining !== null && daysRemaining < 0;
  const currentStatus = isExpired ? 'Expired' : (member.status || 'Active');
  const durationText = calculateDurationMonths(member.startDate, member.endDate, member.durationMonths);

  return (
    <div className="member-dashboard-wrapper">
      {/* Top Header Navigation */}
      <header className="member-topbar glassmorphism">
        <div className="topbar-left">
          <img src={logoImg} alt="MMA Crest" className="member-topbar-logo" />
          <div className="member-topbar-title">
            <h2>Magra Mariners Association</h2>
            <span className="topbar-sub">Member Portal</span>
          </div>
        </div>

        <div className="topbar-right">
          <Link to="/" className="topbar-site-btn">
            <FaExternalLinkAlt /> Website
          </Link>
          <button className="topbar-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="member-main-container">
        <motion.div 
          className="member-card-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main Membership Card */}
          <div className="membership-card glassmorphism">
            {/* Card Top Branding */}
            <div className="card-top-branding">
              <div className="card-crest-box">
                <img src={logoImg} alt="MMA Crest" className="card-crest" />
                <div>
                  <h3 className="club-name">MAGRA MARINERS ASSOCIATION</h3>
                  <span className="card-label">OFFICIAL MEMBERSHIP CARD</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="status-badge-wrapper">
                {currentStatus.toLowerCase() === 'active' && (
                  <span className="member-status-badge status-active">
                    <FaCheckCircle /> ACTIVE MEMBERSHIP
                  </span>
                )}
                {currentStatus.toLowerCase() === 'expired' && (
                  <span className="member-status-badge status-expired">
                    <FaTimesCircle /> MEMBERSHIP EXPIRED
                  </span>
                )}
                {currentStatus.toLowerCase() === 'pending' && (
                  <span className="member-status-badge status-pending">
                    <FaExclamationTriangle /> PENDING RENEWAL
                  </span>
                )}
              </div>
            </div>

            {/* Member Primary Info */}
            <div className="card-member-primary">
              <div className="member-avatar">
                <FaUserCheck />
              </div>
              <div className="member-details-text">
                <span className="detail-meta-label">Member Name</span>
                <h1 className="member-full-name">{member.name}</h1>
                <div className="mobile-pill">
                  <FaMobileAlt /> {member.mobile}
                </div>
              </div>
            </div>

            {/* Membership Validity Metrics Grid */}
            <div className="membership-validity-grid">
              {/* Metric 1: Valid Till */}
              <div className="validity-box box-highlight">
                <div className="box-icon icon-emerald">
                  <FaCalendarAlt />
                </div>
                <div className="box-content">
                  <span className="box-label">Valid Till</span>
                  <h4 className="box-val">{formatMonthYear(member.endDate)}</h4>
                  <small className="box-sub">Expiry: {formatFullDate(member.endDate)}</small>
                </div>
              </div>

              {/* Metric 2: Membership Duration */}
              <div className="validity-box">
                <div className="box-icon icon-amber">
                  <FaClock />
                </div>
                <div className="box-content">
                  <span className="box-label">Membership Validity</span>
                  <h4 className="box-val">{durationText}</h4>
                  <small className="box-sub">Issued Duration</small>
                </div>
              </div>

              {/* Metric 3: Start Date */}
              <div className="validity-box">
                <div className="box-icon icon-purple">
                  <FaIdCard />
                </div>
                <div className="box-content">
                  <span className="box-label">Membership Start Date</span>
                  <h4 className="box-val">{formatFullDate(member.startDate)}</h4>
                  <small className="box-sub">Registered Date</small>
                </div>
              </div>

              {/* Metric 4: Days Remaining Counter */}
              <div className="validity-box">
                <div className="box-icon icon-cyan">
                  <FaHourglassHalf />
                </div>
                <div className="box-content">
                  <span className="box-label">Validity Status</span>
                  {daysRemaining !== null ? (
                    daysRemaining >= 0 ? (
                      <h4 className="box-val text-green">{daysRemaining} Days Left</h4>
                    ) : (
                      <h4 className="box-val text-red">Expired {Math.abs(daysRemaining)} Days Ago</h4>
                    )
                  ) : (
                    <h4 className="box-val">{currentStatus}</h4>
                  )}
                  <small className="box-sub">Calculated Automatically</small>
                </div>
              </div>
            </div>

            {/* Read-Only Notice Box */}
            <div className="member-notice-box">
              <FaShieldAlt className="notice-icon" />
              <div className="notice-text">
                <strong>Member Information Notice</strong>
                <p>For membership renewals, extensions, or status updates, please contact the Cashier or Executive Committee.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default MemberDashboard;

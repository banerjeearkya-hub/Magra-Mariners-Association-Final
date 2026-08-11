import React from 'react';
import { FaExclamationTriangle, FaRedo, FaHome } from 'react-icons/fa';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.hash = '#/';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-screen">
          <div className="error-boundary-card glassmorphism">
            <div className="error-icon-wrapper">
              <FaExclamationTriangle />
            </div>
            <h2>Something Went Wrong</h2>
            <p className="error-desc">
              An unexpected error occurred while loading this section of the website.
            </p>

            {this.state.error?.message && (
              <div className="error-details-box">
                <code>{this.state.error.message}</code>
              </div>
            )}

            <div className="error-boundary-actions">
              <button 
                className="btn-primary error-action-btn"
                onClick={this.handleReload}
              >
                <FaRedo /> Reload Website
              </button>
              <a 
                href="#/" 
                className="error-home-btn"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                <FaHome /> Back to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

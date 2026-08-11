import React, { useState, useEffect, useRef } from 'react';
import { FaImage, FaRedo, FaExclamationCircle } from 'react-icons/fa';
import './SafeImage.css';

/**
 * SafeImage Component
 * Prevents infinite loading and handles unavailable, broken, deleted, or slow images gracefully.
 */
const SafeImage = ({
  src,
  alt = 'Image',
  className = '',
  containerClassName = '',
  fallbackText = 'Image unavailable',
  timeoutMs = 6000,
  showRetry = false,
  onClick,
  loading = 'lazy'
}) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [retryCount, setRetryCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Timeout safety fallback: if image doesn't load within timeoutMs, mark as error
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setStatus((currentStatus) => (currentStatus === 'loading' ? 'error' : currentStatus));
    }, timeoutMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [src, retryCount, timeoutMs]);

  const handleLoad = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus('loaded');
  };

  const handleError = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus('error');
  };

  const handleRetry = (e) => {
    e.stopPropagation();
    if (retryCount < 3) {
      setStatus('loading');
      setRetryCount((prev) => prev + 1);
    }
  };

  return (
    <div 
      className={`safe-image-container ${containerClassName} ${status === 'error' ? 'image-error-state' : ''}`}
      onClick={onClick}
    >
      {/* Loading Skeleton */}
      {status === 'loading' && (
        <div className="safe-image-skeleton">
          <div className="skeleton-pulse"></div>
        </div>
      )}

      {/* Actual Image */}
      {src && status !== 'error' && (
        <img
          key={`${src}-${retryCount}`}
          src={src}
          alt={alt}
          className={`safe-image-img ${className} ${status === 'loaded' ? 'image-visible' : 'image-hidden'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
        />
      )}

      {/* Fallback View on Error / Timeout */}
      {status === 'error' && (
        <div className="safe-image-fallback">
          <FaImage className="fallback-icon" />
          <span className="fallback-text">{fallbackText}</span>
          {showRetry && retryCount < 3 && (
            <button 
              type="button" 
              className="fallback-retry-btn" 
              onClick={handleRetry}
              title="Retry loading image"
            >
              <FaRedo className="retry-icon" /> Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SafeImage;

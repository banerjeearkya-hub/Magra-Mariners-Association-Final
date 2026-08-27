import React, { useState, useEffect, useRef } from 'react';
import { FaImage, FaRedo } from 'react-icons/fa';
import './SafeImage.css';

/**
 * SafeImage Component
 * Prevents infinite loading, auto-recovers gallery paths, and handles image load failures gracefully.
 */
const SafeImage = ({
  src,
  alt = 'Image',
  className = '',
  containerClassName = '',
  fallbackText = 'Photo unavailable',
  timeoutMs = 15000, // Increased timeout to 15s for slow mobile networks
  showRetry = true,
  onClick,
  loading = 'lazy'
}) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    setCurrentSrc(src);
    setStatus('loading');

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

    // Path recovery attempt for relative gallery paths
    if (currentSrc && typeof currentSrc === 'string' && !currentSrc.startsWith('http') && !currentSrc.startsWith('data:')) {
      if (currentSrc.startsWith('./')) {
        const altPath = currentSrc.replace(/^\.\//, '');
        setCurrentSrc(altPath);
        return;
      }
      if (currentSrc.startsWith('/')) {
        const altPath = `.${currentSrc}`;
        setCurrentSrc(altPath);
        return;
      }
    }

    setStatus('error');
  };

  const handleRetry = (e) => {
    if (e) e.stopPropagation();
    if (retryCount < 3) {
      setStatus('loading');
      setCurrentSrc(src);
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
      {currentSrc && status !== 'error' && (
        <img
          key={`${currentSrc}-${retryCount}`}
          src={currentSrc}
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
              title="Retry loading photo"
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

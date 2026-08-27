import React, { useState, useEffect } from 'react';
import { FaImage, FaRedo } from 'react-icons/fa';
import './SafeImage.css';

/**
 * SafeImage Component
 * Clean, fast, and fail-proof image rendering with automatic path recovery.
 */
const SafeImage = ({
  src,
  alt = 'Photo',
  className = '',
  containerClassName = '',
  fallbackText = 'Photo unavailable',
  showRetry = true,
  onClick
}) => {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setHasError(false);
    setCurrentSrc(src);
  }, [src, retryCount]);

  const handleError = () => {
    if (currentSrc && typeof currentSrc === 'string' && !currentSrc.startsWith('http') && !currentSrc.startsWith('data:')) {
      const fileName = currentSrc.split('/').pop();
      if (fileName && !currentSrc.startsWith('gallery/')) {
        setCurrentSrc(`gallery/${fileName}`);
        return;
      }
    }
    setHasError(true);
  };

  const handleRetry = (e) => {
    if (e) e.stopPropagation();
    setHasError(false);
    setCurrentSrc(src);
    setRetryCount(prev => prev + 1);
  };

  if (hasError || !currentSrc) {
    return (
      <div className={`safe-image-container ${containerClassName} image-error-state`} onClick={onClick}>
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
      </div>
    );
  }

  return (
    <div className={`safe-image-container ${containerClassName}`} onClick={onClick}>
      <img
        key={`${currentSrc}-${retryCount}`}
        src={currentSrc}
        alt={alt}
        className={`safe-image-img ${className}`}
        onError={handleError}
        loading="eager"
      />
    </div>
  );
};

export default SafeImage;

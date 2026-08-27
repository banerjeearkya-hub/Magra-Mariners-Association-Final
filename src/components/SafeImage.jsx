import React, { useState, useEffect } from 'react';
import { FaImage, FaRedo } from 'react-icons/fa';
import './SafeImage.css';

/**
 * SafeImage Component
 * Robust multi-candidate path resolver for guaranteed image loading across dev & production hosts.
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
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

  // Compute all potential URL candidates for the image
  useEffect(() => {
    if (!src) {
      setCandidates([]);
      setHasError(true);
      return;
    }

    const initial = src.trim();
    if (initial.startsWith('http') || initial.startsWith('data:')) {
      setCandidates([initial]);
    } else {
      const fileName = initial.split('/').pop();
      const base = import.meta.env.BASE_URL || './';
      const cleanBase = base.endsWith('/') ? base : `${base}/`;

      const list = [
        initial,
        `${cleanBase}gallery/${fileName}`,
        `./gallery/${fileName}`,
        `gallery/${fileName}`,
        `/gallery/${fileName}`,
        `./assets/${fileName}`
      ];
      setCandidates([...new Set(list)]);
    }

    setCandidateIndex(0);
    setHasError(false);
  }, [src, retryCount]);

  const handleError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const handleRetry = (e) => {
    if (e) e.stopPropagation();
    setHasError(false);
    setCandidateIndex(0);
    setRetryCount((prev) => prev + 1);
  };

  const activeSrc = candidates[candidateIndex] || src;

  if (hasError || !activeSrc) {
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
        key={`${activeSrc}-${retryCount}`}
        src={activeSrc}
        alt={alt}
        className={`safe-image-img ${className}`}
        onError={handleError}
        loading="eager"
      />
    </div>
  );
};

export default SafeImage;

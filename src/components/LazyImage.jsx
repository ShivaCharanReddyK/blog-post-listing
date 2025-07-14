import React, { useState, useRef, useEffect } from 'react';
import styles from './LazyImage.module.css';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  onLoad = () => {},
  onError = () => {}
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  const handleError = () => {
    setHasError(true);
    onError();
  };

  return (
    <div 
      ref={imgRef} 
      className={`${styles.lazyImageContainer} ${className}`}
    >
      {(!isInView || hasError) && (
        <div className={styles.placeholder}>
          {hasError ? (
            <div className={styles.errorPlaceholder}>
              <span>Failed to load image</span>
            </div>
          ) : (
            placeholder || <div className={styles.loadingPlaceholder} />
          )}
        </div>
      )}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`${styles.image} ${isLoaded ? styles.loaded : styles.loading}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;

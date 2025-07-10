import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDebounce } from '../hooks/useSearch';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, isMobile = false }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const inputRef = useRef(null);
  
  // Debounce search for performance
  const debouncedQuery = useDebounce(query, 300);

  // Effect to trigger search when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery.trim());
  }, [debouncedQuery, onSearch]);

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  // Handle input change with real-time debounced search
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
  }, []);

  // Handle search icon click on mobile
  const handleSearchIconClick = () => {
    if (isMobile && !isExpanded) {
      setIsExpanded(true);
      // Focus the input after expansion
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      handleSubmit({ preventDefault: () => {} });
    }
  };

  // Handle cancel on mobile
  const handleCancel = useCallback(() => {
    setIsExpanded(false);
    setQuery('');
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobile && isExpanded) {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobile, isExpanded]);

  // Mobile collapsed state - just show search icon
  if (isMobile && !isExpanded) {
    return (
      <button
        className={styles.searchIconButton}
        onClick={handleSearchIconClick}
        aria-label="Open search"
        title="Search posts"
      >
        <svg 
          className={styles.searchIcon} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    );
  }

  return (
    <div className={`${styles.searchContainer} ${isMobile ? styles.mobileExpanded : styles.desktop}`}>
      <form onSubmit={handleSubmit} className={styles.searchForm} role="search">
        <div className={styles.inputGroup}>
          <label htmlFor="search-input" className={styles.searchLabel}>
            Search posts
          </label>
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search posts..."
            className={styles.searchInput}
            aria-label="Search posts by title or content"
          />
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Submit search"
            title="Search"
          >
            <svg 
              className={styles.searchIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
        {isMobile && (
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
            aria-label="Cancel search"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;

import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchResults.module.css';

const SearchResults = memo(({ results, query, isSearching }) => {
  // Function to highlight search terms in text
  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className={styles.highlight}>{part}</mark>
      ) : part
    );
  };

  // Function to create content snippet
  const createSnippet = (content, query, maxLength = 200) => {
    // Remove HTML tags for snippet
    const textContent = content.replace(/<[^>]+>/g, '');
    
    if (!query.trim()) {
      return textContent.length > maxLength 
        ? textContent.substring(0, maxLength) + '...'
        : textContent;
    }

    // Find the position of the search term
    const lowerContent = textContent.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const queryIndex = lowerContent.indexOf(lowerQuery);
    
    if (queryIndex === -1) {
      return textContent.length > maxLength 
        ? textContent.substring(0, maxLength) + '...'
        : textContent;
    }

    // Create snippet around the search term
    const start = Math.max(0, queryIndex - 50);
    const end = Math.min(textContent.length, start + maxLength);
    
    let snippet = textContent.substring(start, end);
    
    // Add ellipsis if we're not at the beginning or end
    if (start > 0) snippet = '...' + snippet;
    if (end < textContent.length) snippet = snippet + '...';
    
    return snippet;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isSearching) {
    return (
      <div className={styles.searchResults}>
        <div className={styles.searchingMessage}>
          <div className={styles.spinner} aria-hidden="true"></div>
          <span>Searching...</span>
        </div>
      </div>
    );
  }

  if (!query.trim()) {
    return null;
  }

  return (
    <div className={styles.searchResults}>
      <div className={styles.resultsHeader}>
        <h2 className={styles.resultsTitle}>
          Search Results
        </h2>
        <p className={styles.resultsCount} role="status" aria-live="polite">
          {results.length === 0 
            ? `No posts found for "${query}"` 
            : `${results.length} ${results.length === 1 ? 'post' : 'posts'} found for "${query}"`
          }
        </p>
      </div>

      {results.length === 0 ? (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
              <line x1="9" y1="9" x2="15" y2="15"></line>
              <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
          </div>
          <h3 className={styles.noResultsTitle}>No posts found</h3>
          <p className={styles.noResultsText}>
            Try adjusting your search terms or browse all posts to find what you're looking for.
          </p>
          <Link to="/" className={styles.browseAllLink}>
            Browse All Posts
          </Link>
        </div>
      ) : (
        <div className={styles.resultsList}>
          {results.map((post) => (
            <article key={post.id} className={styles.resultItem}>
              <Link to={`posts/${post.id}`} className={styles.resultLink}>
                <div className={styles.resultContent}>
                  <h3 className={styles.resultTitle}>
                    {highlightText(post.title, query)}
                  </h3>
                  <p className={styles.resultSnippet}>
                    {highlightText(createSnippet(post.content, query), query)}
                  </p>
                  <div className={styles.resultMeta}>
                    <span className={styles.resultAuthor}>By {post.author}</span>
                    <span className={styles.resultDate}>{formatDate(post.date)}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
});

SearchResults.displayName = 'SearchResults';

export default SearchResults;

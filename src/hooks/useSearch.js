import React, { useState, useEffect } from 'react';

// Custom hook for debouncing values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for optimized search
export const useSearch = (items, searchFields, delay = 300) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, delay);

  const results = React.useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const searchTerm = debouncedQuery.toLowerCase();
    return items.filter(item => {
      return searchFields.some(field => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], item);
        return value && value.toString().toLowerCase().includes(searchTerm);
      });
    });
  }, [items, searchFields, debouncedQuery]);

  useEffect(() => {
    if (query !== debouncedQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [query, debouncedQuery]);

  return {
    query,
    setQuery,
    results,
    isSearching: isSearching && query.trim() !== ''
  };
};

import { useEffect } from 'react';

// Performance monitoring hook
export const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) { // Flag slow renders (60fps = 16ms per frame)
        console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  });
};

// Memory usage monitoring
export const useMemoryMonitor = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (performance.memory) {
        const memory = performance.memory;
        const used = Math.round(memory.usedJSHeapSize / 1048576 * 100) / 100;
        const total = Math.round(memory.totalJSHeapSize / 1048576 * 100) / 100;
        
        if (used > 50) { // Flag high memory usage
          console.warn(`High memory usage: ${used}MB / ${total}MB`);
        }
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);
};

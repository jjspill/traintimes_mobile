import { useState, useEffect, useRef } from 'react';

export const useContinuousCountdown = () => {
  const duration = 15000; // 15 seconds in milliseconds
  const [refreshCounter, setRefreshCounter] = useState(0);
  const intervalIdRef = useRef<number | null>(null);

  const startInterval = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = window.setInterval(() => {
      // setRefreshCounter((prevCounter) => prevCounter + 1);
    }, duration);
  };

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const resetCountdown = () => {
    setRefreshCounter((prevCounter) => prevCounter + 1);
    startInterval();
  };

  return { refreshCounter, resetCountdown };
};

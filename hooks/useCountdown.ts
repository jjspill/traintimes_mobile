import { useState, useEffect } from 'react';

export const useContinuousCountdown = () => {
  const duration = 15;
  const [timer, setTimer] = useState(duration);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setRefreshCounter((prevCounter) => prevCounter + 1);
      setTimer(duration);
    }
  }, [timer]);

  const resetCountdown = () => {
    setTimer(duration);
    setRefreshCounter((prev) => prev + 1);
  };

  return { timer, refreshCounter, resetCountdown };
};

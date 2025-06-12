import { useState, useEffect } from 'react';

const useCountdown = (startDate, endDate) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = start - now;

      if (now > end) {
        setCountdown('✔️ Trip completed');
      } else if (now >= start) {
        setCountdown('🌍 Trip in progress');
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        setCountdown(`🚀 ${days} days until your trip!`);
      }
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return countdown;
};

export default useCountdown;
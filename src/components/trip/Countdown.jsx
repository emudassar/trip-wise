import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

function Countdown({ startDate }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const start = new Date(startDate);
      const diff = start - now;

      if (diff <= 0) {
        setTimeLeft('Trip started!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="p-4 bg-cream dark:bg-gray-800 rounded-lg shadow flex items-center">
      <Clock size={24} className="mr-2 text-primary" />
      <span className="text-lg font-semibold">{timeLeft}</span>
    </div>
  );
}

export default Countdown;
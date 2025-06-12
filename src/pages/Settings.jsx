import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import ThemeToggle from '../components/common/ThemeToggle';
import useLocalStorage from '../hooks/useLocalStorage';

const Settings = () => {
  const [, setTrips] = useLocalStorage('tripwise_trips', []);

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all trip data?')) {
      setTrips([]);
      localStorage.removeItem('tripwise_trips');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Theme</h2>
          <ThemeToggle />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Data</h2>
          <Button onClick={handleClearData} className="bg-red-500">
            Clear All Data
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
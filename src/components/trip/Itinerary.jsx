import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import useLocalStorage from '../../hooks/useLocalStorage';

const Itinerary = ({ items, tripId }) => {
  const [trips, setTrips] = useLocalStorage('tripwise_trips', []);
  const [newPlan, setNewPlan] = useState({ day: '', plan: '', time: '' });

  const handleAdd = () => {
    if (!newPlan.day || !newPlan.plan) return;
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? { ...t, itinerary: [...t.itinerary, newPlan] }
        : t
    );
    setTrips(updatedTrips);
    setNewPlan({ day: '', plan: '', time: '' });
  };

  const handleDelete = (index) => {
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? { ...t, itinerary: t.itinerary.filter((_, i) => i !== index) }
        : t
    );
    setTrips(updatedTrips);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold flex items-center">
        <Calendar size={20} className="mr-2" />
        Itinerary
      </h2>
      <div className="flex flex-col gap-2 mb-2">
        <Input
          value={newPlan.day}
          onChange={(e) => setNewPlan({ ...newPlan, day: e.target.value })}
          placeholder="Day (e.g., Day 1)"
        />
        <Input
          value={newPlan.plan}
          onChange={(e) => setNewPlan({ ...newPlan, plan: e.target.value })}
          placeholder="Plan"
        />
        <Input
          value={newPlan.time}
          onChange={(e) => setNewPlan({ ...newPlan, time: e.target.value })}
          placeholder="Time (optional)"
        />
        <Button onClick={handleAdd}>Add Plan</Button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{item.day} {item.time && `(${item.time})`}</h3>
              <p>{item.plan}</p>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

function TripCard({ trip, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-cream dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
    >
      <Link to={`/trip/${trip.id}`}>
        <h3 className="text-xl font-semibold text-primary">{trip.name}</h3>
        <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
          <MapPin size={16} className="mr-1" />
          <span>{trip.destination}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
          <Calendar size={16} className="mr-1" />
          <span>{format(new Date(trip.startDate), 'MMM d, yyyy')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}</span>
        </div>
      </Link>
      <button
        onClick={() => onDelete(trip.id)}
        className="mt-2 text-red-500 hover:text-red-700 text-sm"
      >
        Delete
      </button>
    </motion.div>
  );
}

export default TripCard;
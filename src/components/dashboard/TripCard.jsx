import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import Button from '../common/Button';
import useCountdown from '../../hooks/useCountdown';

const TripCard = ({ trip }) => {
  const countdown = useCountdown(trip.startDate, trip.endDate);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold">{trip.title}</h2>
      <p className="flex items-center">
        <MapPin size={16} className="mr-1" /> {trip.destination}
      </p>
      <p className="flex items-center">
        <Calendar size={16} className="mr-1" /> {trip.startDate} to {trip.endDate}
      </p>
      <p>{countdown}</p>
      <Link to={`/trip/${trip.id}`}>
        <Button className="mt-2">View Details</Button>
      </Link>
    </motion.div>
  );
};

export default TripCard;
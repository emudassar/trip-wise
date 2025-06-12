import { motion } from 'framer-motion';
import TripForm from '../components/trip/TripForm';

const NewTrip = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="container mx-auto p-4"
  >
    <h1 className="text-2xl font-bold mb-4">Add New Trip</h1>
    <TripForm />
  </motion.div>
);

export default NewTrip;
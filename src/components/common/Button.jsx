import { motion } from 'framer-motion';

const Button = ({ children, className, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-lg bg-primary text-white ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export default Button;
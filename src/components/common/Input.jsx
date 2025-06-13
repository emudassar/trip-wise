function Input({ className = '', ...props }) {
  return (
    <input
      className={`px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
}

export default Input;
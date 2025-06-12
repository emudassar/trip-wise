const Input = ({ label, className, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium">{label}</label>
    <input
      className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${className}`}
      {...props}
    />
  </div>
);

export default Input;
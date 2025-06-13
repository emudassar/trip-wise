import { Link } from 'react-router-dom';
import { Sun, Moon, HelpCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';

function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">TripWise</Link>
        <div className="flex items-center space-x-4">
          <Link to="/help">
            <Button className="flex items-center">
              <HelpCircle size={20} className="mr-2" />
              Help
            </Button>
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
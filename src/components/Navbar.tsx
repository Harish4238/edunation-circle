
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                VSkill Arena
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/odyssey" className="text-gray-700 dark:text-gray-200 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Odyssey
              </Link>
              <Link to="/arena" className="text-gray-700 dark:text-gray-200 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Arena
              </Link>
              <Link to="/tribe" className="text-gray-700 dark:text-gray-200 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Tribe
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-primary rounded-full"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/odyssey"
              className="text-gray-700 dark:text-gray-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Odyssey
            </Link>
            <Link
              to="/arena"
              className="text-gray-700 dark:text-gray-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Arena
            </Link>
            <Link
              to="/tribe"
              className="text-gray-700 dark:text-gray-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Tribe
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

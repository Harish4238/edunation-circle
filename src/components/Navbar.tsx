
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string; coins: number } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Check if user is logged in on component mount
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [location.pathname]); // Re-check when route changes

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate('/');
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
              <Link 
                to="/odyssey" 
                className={`text-gray-700 dark:text-gray-200 hover:text-primary px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/odyssey' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                Odyssey
              </Link>
              <Link 
                to="/arena" 
                className={`text-gray-700 dark:text-gray-200 hover:text-primary px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/arena' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                Arena
              </Link>
              <Link 
                to="/tribe" 
                className={`text-gray-700 dark:text-gray-200 hover:text-primary px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/tribe' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                Tribe
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-700 dark:text-gray-200 hover:text-primary px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/contact' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                Contact
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-primary rounded-full"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {user && (
                  <div className="flex items-center bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                    <span className="text-sm font-medium">{user.coins} coins</span>
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate('/odyssey')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign up
                </Button>
              </>
            )}
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
              className={`text-gray-700 dark:text-gray-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/odyssey' ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              Odyssey
            </Link>
            <Link
              to="/arena"
              className={`text-gray-700 dark:text-gray-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/arena' ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              Arena
            </Link>
            <Link
              to="/tribe"
              className={`text-gray-700 dark:text-gray-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/tribe' ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              Tribe
            </Link>
            <Link
              to="/contact"
              className={`text-gray-700 dark:text-gray-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/contact' ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              Contact
            </Link>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-primary rounded-full"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              {isLoggedIn ? (
                <div className="flex space-x-2">
                  {user && (
                    <div className="flex items-center bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      <span className="text-xs font-medium">{user.coins} coins</span>
                    </div>
                  )}
                  <Button size="sm" variant="outline" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => navigate('/login')}>
                    Log in
                  </Button>
                  <Button size="sm" onClick={() => navigate('/signup')}>
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

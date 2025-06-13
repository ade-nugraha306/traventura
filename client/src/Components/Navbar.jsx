import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../data/api';
import defaultUserImage from '../assets/user.png';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getProfileImageSrc = () => {
    if (imageError || !user?.photo) {
      return defaultUserImage;
    }
    return user.photo;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md relative">
      {/* Logo and Hamburger Menu */}
      <div className="w-full md:w-auto flex justify-between items-center">
        <div className="text-black text-xl font-bold">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>traventura</Link>
        </div>
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-8`}>
        <Link 
          to="/about" 
          className="text-gray-600 hover:text-black"
          onClick={() => setIsMenuOpen(false)}
        >
          About us
        </Link>
        <Link 
          to="/highlight" 
          className="text-gray-600 hover:text-black"
          onClick={() => setIsMenuOpen(false)}
        >
          Highlight
        </Link>
        <Link 
          to="/recommendation" 
          className="text-gray-600 hover:text-black"
          onClick={() => setIsMenuOpen(false)}
        >
          Recommendation
        </Link>
        <Link 
          to="/chatbot" 
          className="text-gray-600 hover:text-black"
          onClick={() => setIsMenuOpen(false)}
        >
          Chatbot AI
        </Link>
      </div>

      {/* User/Auth Section */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0`}>
        {user ? (
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src={getProfileImageSrc()}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-gray-800">{user.displayName}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full md:w-auto"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full text-center md:w-auto"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
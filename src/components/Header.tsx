import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold">CineMax</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Movies
            </Link>
            <Link to="/?genre=action" className="text-gray-300 hover:text-white transition-colors">
              Action
            </Link>
            <Link to="/?genre=drama" className="text-gray-300 hover:text-white transition-colors">
              Drama
            </Link>
            <Link to="/?genre=comedy" className="text-gray-300 hover:text-white transition-colors">
              Comedy
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white placeholder-gray-400 pl-4 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
              </button>
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                to="/?genre=action"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Action
              </Link>
              <Link
                to="/?genre=drama"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Drama
              </Link>
              <Link
                to="/?genre=comedy"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Comedy
              </Link>
              <form onSubmit={handleSearch} className="pt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 text-white placeholder-gray-400 pl-4 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
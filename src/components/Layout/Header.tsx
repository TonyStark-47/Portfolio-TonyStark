import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-yellow-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-white font-orbitron">STARK</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {!isAdminRoute && (
              <>
                <a href="#about" className="text-gray-300 hover:text-yellow-400 transition-colors">About</a>
                <a href="#projects" className="text-gray-300 hover:text-yellow-400 transition-colors">Projects</a>
                <a href="#experience" className="text-gray-300 hover:text-yellow-400 transition-colors">Experience</a>
                <a href="#skills" className="text-gray-300 hover:text-yellow-400 transition-colors">Skills</a>
                <a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</a>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated && isAdmin && (
              <>
                {!isAdminRoute ? (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <Settings size={18} />
                    <span>Admin</span>
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    View Portfolio
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import Logo from '../Logo';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Logo className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">CineMax Admin</h1>
              <p className="text-sm text-gray-500">Movie Management System</p>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="w-5 h-5" />
              <span className="font-medium">Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
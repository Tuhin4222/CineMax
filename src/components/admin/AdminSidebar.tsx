import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Film, Home, Plus } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/admin/movies', icon: Film, label: 'Movies' },
  ];

  return (
    <aside className="w-64 bg-gray-800 min-h-screen">
      <nav className="p-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
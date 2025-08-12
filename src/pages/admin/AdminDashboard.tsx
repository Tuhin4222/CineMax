import React from 'react';
import { useMovies } from '../../contexts/MovieContext';
import { Film, Star, TrendingUp, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { movies } = useMovies();

  const stats = [
    {
      title: 'Total Movies',
      value: movies.length,
      icon: Film,
      color: 'bg-blue-500'
    },
    {
      title: 'Average Rating',
      value: movies.length > 0 ? (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1) : '0',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'Genres',
      value: new Set(movies.flatMap(movie => movie.genre)).size,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'This Month',
      value: movies.filter(movie => {
        const movieDate = new Date(movie.createdAt);
        const now = new Date();
        return movieDate.getMonth() === now.getMonth() && movieDate.getFullYear() === now.getFullYear();
      }).length,
      icon: Users,
      color: 'bg-purple-500'
    }
  ];

  const recentMovies = movies.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your movies.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Movies */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Movies</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentMovies.length > 0 ? (
            recentMovies.map((movie) => (
              <div key={movie.id} className="p-6 flex items-center space-x-4">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{movie.title}</h3>
                  <p className="text-gray-500 text-sm truncate">{movie.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{movie.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{movie.year}</span>
                    <div className="flex space-x-1">
                      {movie.genre.slice(0, 2).map((genre, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Film className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No movies available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
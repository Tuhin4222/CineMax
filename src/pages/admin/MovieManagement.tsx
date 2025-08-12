import React, { useState } from 'react';
import { useMovies, Movie } from '../../contexts/MovieContext';
import { Plus, Search, Edit2, Trash2, Star, Calendar } from 'lucide-react';
import MovieForm from '../../components/admin/MovieForm';

const MovieManagement: React.FC = () => {
  const { movies, deleteMovie } = useMovies();
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Movie Management</h1>
          <p className="text-gray-600">Manage your movie collection</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Movie</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-32 h-48 object-cover"
              />
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {movie.description}
                  </p>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{movie.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{movie.year}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
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
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="flex items-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No movies found</h3>
          <p className="text-gray-500">
            {searchQuery 
              ? `No movies match your search for "${searchQuery}"`
              : 'Start by adding your first movie'
            }
          </p>
        </div>
      )}

      {/* Movie Form Modal */}
      {showForm && (
        <MovieForm
          movie={editingMovie}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default MovieManagement;
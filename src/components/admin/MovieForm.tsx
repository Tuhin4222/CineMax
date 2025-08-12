import React, { useState, useEffect } from 'react';
import { useMovies, Movie } from '../../contexts/MovieContext';
import { X, Upload, Plus, Minus } from 'lucide-react';

interface MovieFormProps {
  movie?: Movie | null;
  onClose: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onClose }) => {
  const { addMovie, updateMovie } = useMovies();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    poster: '',
    trailer: '',
    genre: [''],
    year: new Date().getFullYear(),
    rating: 0,
    duration: 0,
    director: '',
    cast: ['']
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        poster: movie.poster,
        trailer: movie.trailer || '',
        genre: movie.genre.length > 0 ? movie.genre : [''],
        year: movie.year,
        rating: movie.rating,
        duration: movie.duration,
        director: movie.director,
        cast: movie.cast.length > 0 ? movie.cast : ['']
      });
    }
  }, [movie]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.poster.trim()) newErrors.poster = 'Poster URL is required';
    if (!formData.director.trim()) newErrors.director = 'Director is required';
    if (formData.year < 1900 || formData.year > 2030) newErrors.year = 'Year must be between 1900 and 2030';
    if (formData.rating < 0 || formData.rating > 10) newErrors.rating = 'Rating must be between 0 and 10';
    if (formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';
    if (formData.genre.filter(g => g.trim()).length === 0) newErrors.genre = 'At least one genre is required';
    if (formData.cast.filter(c => c.trim()).length === 0) newErrors.cast = 'At least one cast member is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const movieData = {
      ...formData,
      genre: formData.genre.filter(g => g.trim()),
      cast: formData.cast.filter(c => c.trim()),
      trailer: formData.trailer.trim() || undefined
    };

    if (movie) {
      updateMovie(movie.id, movieData);
    } else {
      addMovie(movieData);
    }

    onClose();
  };

  const addGenre = () => {
    setFormData(prev => ({ ...prev, genre: [...prev.genre, ''] }));
  };

  const removeGenre = (index: number) => {
    if (formData.genre.length > 1) {
      setFormData(prev => ({
        ...prev,
        genre: prev.genre.filter((_, i) => i !== index)
      }));
    }
  };

  const updateGenre = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.map((g, i) => i === index ? value : g)
    }));
  };

  const addCastMember = () => {
    setFormData(prev => ({ ...prev, cast: [...prev.cast, ''] }));
  };

  const removeCastMember = (index: number) => {
    if (formData.cast.length > 1) {
      setFormData(prev => ({
        ...prev,
        cast: prev.cast.filter((_, i) => i !== index)
      }));
    }
  };

  const updateCastMember = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      cast: prev.cast.map((c, i) => i === index ? value : c)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {movie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter movie title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter movie description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Poster URL */}
            <div>
              <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-2">
                Poster URL *
              </label>
              <input
                type="url"
                id="poster"
                value={formData.poster}
                onChange={(e) => setFormData(prev => ({ ...prev, poster: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.poster ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/poster.jpg"
              />
              {errors.poster && <p className="text-red-500 text-sm mt-1">{errors.poster}</p>}
            </div>

            {/* Trailer URL */}
            <div>
              <label htmlFor="trailer" className="block text-sm font-medium text-gray-700 mb-2">
                Trailer URL
              </label>
              <input
                type="url"
                id="trailer"
                value={formData.trailer}
                onChange={(e) => setFormData(prev => ({ ...prev, trailer: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            {/* Year, Rating, Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  min="1900"
                  max="2030"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) || 0 }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0-10) *
                </label>
                <input
                  type="number"
                  id="rating"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.rating ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  id="duration"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>
            </div>

            {/* Director */}
            <div>
              <label htmlFor="director" className="block text-sm font-medium text-gray-700 mb-2">
                Director *
              </label>
              <input
                type="text"
                id="director"
                value={formData.director}
                onChange={(e) => setFormData(prev => ({ ...prev, director: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.director ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter director name"
              />
              {errors.director && <p className="text-red-500 text-sm mt-1">{errors.director}</p>}
            </div>

            {/* Genres */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genres *
              </label>
              <div className="space-y-2">
                {formData.genre.map((genre, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={genre}
                      onChange={(e) => updateGenre(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter genre"
                    />
                    {formData.genre.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGenre(index)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addGenre}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Genre</span>
                </button>
              </div>
              {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
            </div>

            {/* Cast */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cast *
              </label>
              <div className="space-y-2">
                {formData.cast.map((actor, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={actor}
                      onChange={(e) => updateCastMember(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter actor name"
                    />
                    {formData.cast.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCastMember(index)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCastMember}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Cast Member</span>
                </button>
              </div>
              {errors.cast && <p className="text-red-500 text-sm mt-1">{errors.cast}</p>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              {movie ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
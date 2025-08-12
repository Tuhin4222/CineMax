import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Star, Clock, Calendar, User } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovie } = useMovies();
  
  const movie = id ? getMovie(id) : null;

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
        <p className="text-gray-400 mb-8">The movie you're looking for doesn't exist.</p>
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Movies</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 md:h-screen/2">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        
        {/* Back Button */}
        <Link 
          to="/"
          className="absolute top-8 left-8 flex items-center space-x-2 text-white hover:text-red-400 transition-colors bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-lg z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Movies</span>
        </Link>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-medium text-lg">{movie.rating}/10</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-300">{movie.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-300">{movie.year}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {movie.trailer && (
                <div className="mb-6">
                  <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    <Play className="w-5 h-5 fill-current" />
                    <span>Watch Trailer</span>
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Director & Cast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Director</span>
                </h3>
                <p className="text-gray-300 text-lg">{movie.director}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">Cast</h3>
                <div className="space-y-2">
                  {movie.cast.map((actor, index) => (
                    <p key={index} className="text-gray-300">{actor}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
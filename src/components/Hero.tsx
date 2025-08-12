import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Star, Clock } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';

const Hero: React.FC = () => {
  const { movies } = useMovies();
  const [currentMovie, setCurrentMovie] = useState(0);

  // Rotate through featured movies
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % Math.min(3, movies.length));
    }, 8000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (movies.length === 0) return null;

  const featuredMovies = movies.slice(0, 3);
  const movie = featuredMovies[currentMovie];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white font-medium">{movie.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-300" />
              <span className="text-gray-300">{movie.duration} min</span>
            </div>
            <span className="text-gray-300">{movie.year}</span>
          </div>

          <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {movie.genre.map((genre, index) => (
              <span
                key={index}
                className="bg-gray-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Watch Now</span>
            </Link>
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center justify-center space-x-2 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border border-gray-600"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Movie Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMovie(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentMovie 
                  ? 'bg-red-500 w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
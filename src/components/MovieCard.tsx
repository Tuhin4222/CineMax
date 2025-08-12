import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Movie } from '../contexts/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group block bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full aspect-[3/4] object-cover group-hover:brightness-75 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-white font-medium">{movie.rating}</span>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <Clock className="w-3 h-3" />
            <span>{movie.duration} min</span>
            <span>•</span>
            <span>{movie.year}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {movie.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
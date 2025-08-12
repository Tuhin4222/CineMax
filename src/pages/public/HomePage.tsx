import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../../contexts/MovieContext';
import MovieCard from '../../components/MovieCard';
import Hero from '../../components/Hero';
import { Search, Filter } from 'lucide-react';

const HomePage: React.FC = () => {
  const { movies } = useMovies();
  const [searchParams] = useSearchParams();
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const searchQuery = searchParams.get('search') || '';
  const genreParam = searchParams.get('genre') || '';

  useEffect(() => {
    let filtered = movies;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply genre filter
    const currentGenre = genreParam || selectedGenre;
    if (currentGenre && currentGenre !== 'all') {
      filtered = filtered.filter(movie =>
        movie.genre.some(g => g.toLowerCase() === currentGenre.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredMovies(filtered);
  }, [movies, searchQuery, genreParam, selectedGenre, sortBy]);

  const genres = ['all', ...Array.from(new Set(movies.flatMap(movie => movie.genre)))];

  return (
    <div>
      {/* Hero Section */}
      {!searchQuery && !genreParam && (
        <Hero />
      )}

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-gray-400">
              Found {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Genre Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={genreParam || selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="newest">Newest</option>
              <option value="rating">Rating</option>
              <option value="year">Year</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No movies found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No movies match your search for "${searchQuery}"`
                : 'No movies available in this category'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
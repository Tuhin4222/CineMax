import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  trailer?: string;
  genre: string[];
  year: number;
  rating: number;
  duration: number;
  director: string;
  cast: string[];
  createdAt: string;
}

interface MovieContextType {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, 'id' | 'createdAt'>) => void;
  updateMovie: (id: string, movie: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  getMovie: (id: string) => Movie | undefined;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

const initialMovies: Movie[] = [
  {
    id: '1',
    title: 'The Digital Frontier',
    description: 'A thrilling journey into the world of artificial intelligence and digital consciousness.',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    trailer: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    genre: ['Sci-Fi', 'Thriller'],
    year: 2024,
    rating: 8.5,
    duration: 142,
    director: 'Alex Rivera',
    cast: ['Emma Stone', 'Ryan Gosling', 'Oscar Isaac'],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Ocean\'s Mystery',
    description: 'Deep beneath the waves lies a secret that could change humanity forever.',
    poster: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    genre: ['Adventure', 'Mystery'],
    year: 2023,
    rating: 7.8,
    duration: 118,
    director: 'Sofia Coppola',
    cast: ['Scarlett Johansson', 'Jason Momoa', 'Lupita Nyong\'o'],
    createdAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    title: 'Urban Legends',
    description: 'When myths become reality, a young detective must solve the impossible.',
    poster: 'https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    genre: ['Horror', 'Mystery'],
    year: 2024,
    rating: 7.2,
    duration: 105,
    director: 'Jordan Peele',
    cast: ['Lupita Nyong\'o', 'Daniel Kaluuya', 'Keke Palmer'],
    createdAt: '2024-01-05T16:45:00Z'
  },
  {
    id: '4',
    title: 'Neon Nights',
    description: 'In a cyberpunk future, love blooms in the most unexpected places.',
    poster: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop',
    genre: ['Romance', 'Sci-Fi'],
    year: 2023,
    rating: 8.1,
    duration: 128,
    director: 'Denis Villeneuve',
    cast: ['Zendaya', 'Timothée Chalamet', 'Rebecca Ferguson'],
    createdAt: '2023-12-20T12:00:00Z'
  }
];

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const addMovie = (movieData: Omit<Movie, 'id' | 'createdAt'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setMovies(prev => [newMovie, ...prev]);
  };

  const updateMovie = (id: string, updates: Partial<Movie>) => {
    setMovies(prev => prev.map(movie => 
      movie.id === id ? { ...movie, ...updates } : movie
    ));
  };

  const deleteMovie = (id: string) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  const getMovie = (id: string) => {
    return movies.find(movie => movie.id === id);
  };

  return (
    <MovieContext.Provider value={{
      movies,
      addMovie,
      updateMovie,
      deleteMovie,
      getMovie
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
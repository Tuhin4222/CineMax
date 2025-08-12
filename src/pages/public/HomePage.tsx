import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import Hero from '../../components/Hero';
import { Search, Filter } from 'lucide-react';
import sanityClient from '../../sanityClient'; // আপনার Sanity ক্লায়েন্ট

// Sanity থেকে আসা ডেটার জন্য একটি টাইপ
interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  posterUrl?: string;
  // MovieCard-এর জন্য প্রয়োজনীয় অন্যান্য ফিল্ড, যেমন rating, year ইত্যাদি
  rating?: number;
  year?: number;
}

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [allMovies, setAllMovies] = useState<Movie[]>([]); // Sanity থেকে আসা সব মুভি
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); // ফিল্টার করা মুভি
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // ধাপ ১: Sanity থেকে সব মুভি নিয়ে আসা
  useEffect(() => {
    sanityClient
      .fetch<Movie[]>(
        `*[_type == "movie"]{
            _id,
            title,
            "description": plot,
            genre,
            rating,
            year,
            "posterUrl": poster.asset->url
        }`
      )
      .then((data) => {
        setAllMovies(data);
        setFilteredMovies(data); // শুরুতে সব মুভিই দেখানো হবে
      })
      .catch(console.error);
  }, []); // [] মানে এই ইফেক্ট শুধু একবার চলবে

  // ধাপ ২: সার্চ, জেনার এবং সর্টিং এর জন্য ফিল্টার করা
  useEffect(() => {
    let moviesToFilter = [...allMovies];
    const searchQuery = searchParams.get('search') || '';
    const genreParam = searchParams.get('genre') || 'all';

    // সার্চ অনুযায়ী ফিল্টার
    if (searchQuery) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // জেনার অনুযায়ী ফিল্টার
    if (genreParam !== 'all') {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.genre?.includes(genreParam)
      );
    }
    
    // এখানে আপনি সর্টিং এর লজিক যোগ করতে পারেন, যেমন:
    // if (sortBy === 'newest') { ... }

    setFilteredMovies(moviesToFilter);
  }, [searchParams, allMovies, selectedGenre, sortBy]);

  // ডেটা লোড হওয়ার সময় একটি মেসেজ দেখান
  if (allMovies.length === 0) {
    return <div>Loading your cinematic universe...</div>;
  }

  return (
    <>
      <Hero movie={allMovies[0]} /> {/* হিরো সেকশনে প্রথম মুভিটি দেখানো যেতে পারে */}

      <div className="container mx-auto px-4 py-8">
        {/* এখানে আপনার সার্চ এবং ফিল্টার বার এর UI থাকবে */}
        {/* <FilterBar ... /> */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
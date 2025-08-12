import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import Hero from '../../components/Hero';
import sanityClient from '../../sanityClient';

// Sanity থেকে আসা ডেটার গঠন
interface Movie {
  _id: string;
  title: string;
  plot: string;
  genre: string[];
  rating: number;
  year: number;
  posterUrl?: string;
}

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  // useEffect অংশটি এখানে আপডেট করা হয়েছে
  useEffect(() => {
    sanityClient
      .fetch<Movie[]>(
        `*[_type == "movie"]{
            _id,
            title,
            plot,
            genre,
            rating,
            year,
            "posterUrl": poster.asset->url
        }`
      )
      .then((data) => {
        setAllMovies(data);
        setFilteredMovies(data);
      })
      .catch(console.error);
  }, []);

  // সার্চ এবং ফিল্টারিং এর জন্য useEffect
  useEffect(() => {
    let moviesToFilter = [...allMovies];
    const searchQuery = searchParams.get('search') || '';
    if (searchQuery) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredMovies(moviesToFilter);
  }, [searchParams, allMovies]);

  if (allMovies.length === 0) {
    return <div>Loading your cinematic universe...</div>;
  }

  return (
    <>
      <Hero movie={allMovies[0]} />

      <div className="container mx-auto px-4 py-8">
        {/* FilterBar UI এখানে থাকবে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMovies.map((movie) => (
            // MovieCard কে এখন সঠিক ডেটা দেওয়া হচ্ছে
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
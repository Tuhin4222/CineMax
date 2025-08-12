import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import sanityClient from '../../sanityClient';

interface MovieDetail {
  _id: string;
  title: string;
  plot: string;
  genre?: string[];
  rating?: number;
  year?: number;
  posterUrl?: string;
}

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null); // <-- এখানে ভুলটি ছিল
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      setError("Movie ID not found in URL.");
      return;
    }

    console.log("Fetching movie with ID:", movieId);

    const query = `*[_type == "movie" && _id == $movieId][0]{
      _id,
      title,
      plot,
      genre,
      rating,
      year,
      "posterUrl": poster.asset->url
    }`;
    
    const params = { movieId };

    sanityClient.fetch<MovieDetail>(query, params)
      .then((data) => {
        console.log("Data received from Sanity:", data);
        if (data) {
          setMovie(data);
        } else {
          setError("Movie data not found for this ID.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching from Sanity:", err);
        setError("Failed to fetch movie details.");
        setLoading(false);
      });

  }, [movieId]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
        <p className="mb-8">{error || "The movie you're looking for doesn't exist."}</p>
        <Link to="/" className="text-primary hover:underline">
          &larr; Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} className="rounded-lg w-full" />}
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{movie.title} ({movie.year})</h1>
          {movie.rating && <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-2">★</span>
            <span>{movie.rating} / 10</span>
          </div>}
          {movie.genre && <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.map((g) => (
              <span key={g} className="bg-gray-700 px-2 py-1 rounded-full text-sm">{g}</span>
            ))}
          </div>}
          <p className="mb-8">{movie.plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
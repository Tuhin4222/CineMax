import React from 'react';
import { Link } from 'react-router-dom'; // Link ব্যবহার করার জন্য

// Sanity থেকে আসা ডেটার গঠন অনুযায়ী Props টাইপ
interface MovieCardProps {
  movie: {
    _id: string;
    title: string;
    plot?: string;
    posterUrl?: string; // poster এর পরিবর্তে posterUrl
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // যদি কোনো মুভির ডেটা না থাকে, তাহলে কিছুই দেখাবে না
  if (!movie) {
    return null;
  }

  return (
    <Link to={`/movie/${movie._id}`}> {/* প্রতিটি কার্ডকে একটি লিঙ্কে পরিণত করা হলো */}
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-primary transition-all duration-300 ease-in-out">
        <img
          className="w-full h-64 object-cover"
          src={movie.posterUrl || 'https://via.placeholder.com/300x450'} // যদি পোস্টার না থাকে, একটি প্লেসহোল্ডার দেখাবে
          alt={movie.title}
        />
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {movie.plot}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
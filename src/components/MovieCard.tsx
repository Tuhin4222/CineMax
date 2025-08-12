import React from 'react';
// আপনার MovieCardProps এর টাইপ ইম্পোর্ট করুন, যদি আলাদা ফাইলে থাকে

// MovieCardProps এর একটি উদাহরণ
interface MovieCardProps {
  movie: {
    _id: string;
    title: string;
    description: string;
    genre?: string[]; // genre কে অপশনাল করা হলো
    poster?: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card-container"> {/* একটি মূল কন্টেইনার যোগ করা হলো */}
      {/* এখানে আপনার Link বা a ট্যাগ এবং ছবির কোড থাকবে */}
      <img src={movie.poster} alt={movie.title} />

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary transition-all duration-300 ease-in-out">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {movie.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {/* জেনার দেখানোর সঠিক কোড */}
          {(movie.genre ?? []).slice(0, 2).map((g, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`https://www.themoviedb.org/movie/${movie.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-2">{movie.overview}</p>
          <p className="text-xs text-gray-500">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  );
}

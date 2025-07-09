'use client';

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { fetchMovieRecommendations } from "@/utils/fetchMovieRecommendations";
import withAuth from "@/components/Auth/withAuth";

function RecommendationsPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMovieRecommendations();
      setMovies(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">🎬 Movie Recommendations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md hover:shadow-lg transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{movie.overview}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default withAuth(RecommendationsPage);

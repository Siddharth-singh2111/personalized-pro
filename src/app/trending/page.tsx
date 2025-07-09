'use client';

import { useEffect, useState } from "react";
import { fetchTrendingNews } from "@/utils/fetchTrendingNews";
import { fetchTrendingMovies } from "@/utils/fetchTrendingMovies";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import withAuth from "@/components/Auth/withAuth";

function TrendingPage() {
  const [news, setNews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [newsData, movieData] = await Promise.all([
        fetchTrendingNews(),
        fetchTrendingMovies(),
      ]);
      setNews(newsData);
      setMovies(movieData);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">🔥 Trending</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Top News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((article: any) => (
                <div key={article.url} className="bg-white p-4 rounded-xl shadow">
                  <h4 className="font-bold">{article.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    className="text-blue-500 hover:underline text-sm inline-block mt-2"
                  >
                    Read More →
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-600">Top Movies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {movies.map((movie: any) => (
                <div key={movie.id} className="bg-white p-4 rounded-xl shadow">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-md mb-3"
                  />
                  <h4 className="font-bold text-sm">{movie.title}</h4>
                  <p className="text-xs text-gray-500">{movie.release_date}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default withAuth(TrendingPage);

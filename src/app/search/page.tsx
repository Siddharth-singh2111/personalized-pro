'use client';

import { useState, useEffect } from 'react';
import { fetchNewsSearch } from '@/utils/fetchNewsSearch';
import { fetchMovieSearch } from '@/utils/fetchMovieSearch';
import mockSocialPosts from '@/data/mockSocialPosts.json';
import DashboardLayout from '@/components/Layout/DashboardLayout';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [newsResults, setNewsResults] = useState<any[]>([]);
  const [movieResults, setMovieResults] = useState<any[]>([]);
  const [socialResults, setSocialResults] = useState<any[]>([]);

  // Debounce: update debouncedQuery after 500ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery) return;

      const [news, movies] = await Promise.all([
        fetchNewsSearch(debouncedQuery),
        fetchMovieSearch(debouncedQuery)
      ]);

      const socials = mockSocialPosts.filter(post =>
        post.content.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

      setNewsResults(news);
      setMovieResults(movies);
      setSocialResults(socials);
    };

    search();
  }, [debouncedQuery]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">🔍 Search</h1>

      <input
        type="text"
        placeholder="Search news, movies, or social posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />

      {debouncedQuery && (
        <>
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">News Results</h2>
            {newsResults.length === 0 ? (
              <p>No news found.</p>
            ) : (
              <ul className="space-y-2">
                {newsResults.map((article, i) => (
                  <li key={i}>
                    <a href={article.url} target="_blank" className="text-sm text-blue-600 hover:underline">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-green-700 mb-2">Movie Results</h2>
            {movieResults.length === 0 ? (
              <p>No movies found.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movieResults.map(movie => (
                  <a
                    key={movie.id}
                    href={`https://www.themoviedb.org/movie/${movie.id}`}
                    target="_blank"
                    className="block"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="w-full h-64 object-cover rounded"
                      alt={movie.title}
                    />
                    <p className="mt-1 text-sm font-medium">{movie.title}</p>
                  </a>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-purple-700 mb-2">Social Posts</h2>
            {socialResults.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              <ul className="space-y-2">
                {socialResults.map((post, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {post.content}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </DashboardLayout>
  );
}

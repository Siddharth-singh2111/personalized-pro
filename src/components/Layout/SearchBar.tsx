'use client';

import { useState, useEffect } from "react";
import { searchNews } from "@/utils/searchNews";
import NewsCard from "../Feed/NewsCard";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        setLoading(true);
        searchNews(query).then((data) => {
          setResults(data);
          setLoading(false);
        });
      } else {
        setResults([]);
      }
    }, 500); // ⏱️ Debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="w-full p-4 bg-white dark:bg-slate-800 sticky top-0 z-50 shadow-md">
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm text-black dark:text-white bg-gray-100 dark:bg-gray-700"
      />

      {loading && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Searching...</p>
      )}

      {results.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}

      {query.length > 2 && results.length === 0 && !loading && (
        <p className="text-sm text-gray-500 mt-4">No results found for “{query}”.</p>
      )}
    </div>
  );
}

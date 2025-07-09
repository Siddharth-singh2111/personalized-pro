'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { searchNews } from "@/utils/searchNews";
import NewsCard from "../Feed/NewsCard";

export default function TopBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 2) {
        setLoading(true);
        searchNews(query).then(data => {
          setResults(data);
          setShowDropdown(true);
          setLoading(false);
        });
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 shadow">
      {/* 🌟 Site Title */}
      <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
        Welcome..
      </Link>

      {/* 🔍 Search Bar */}
      <div className="relative flex-1 max-w-lg mx-6" ref={wrapperRef}>
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />

        {showDropdown && (
          <div className="absolute top-full left-0 w-full mt-2 max-h-96 overflow-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            {loading && <p className="p-3 text-sm text-gray-500">Searching...</p>}

            {!loading && results.length === 0 && (
              <p className="p-3 text-sm text-gray-500">No results found.</p>
            )}

            {!loading && results.length > 0 && (
              <div className="grid grid-cols-1 gap-3 p-3">
                {results.slice(0, 5).map((article, i) => (
                  <NewsCard key={i} article={article} />
                ))}
                <Link href="/search" className="block text-xs text-center text-blue-600 hover:underline mt-2">
                  🔎 View all search results
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🔗 Search Page Button */}
      <Link
        href="/search"
        className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
        Search Page
      </Link>
    </div>
  );
}

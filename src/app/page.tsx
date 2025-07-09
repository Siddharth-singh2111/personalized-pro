'use client';

import Link from 'next/link';
import { FaRocket, FaUserPlus, FaSignInAlt, FaNewspaper, FaFilm, FaComments } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-2">
          Welcome to <span className="text-blue-400">PersonalizePro</span> <FaRocket className="text-pink-400" />
        </h1>
        <p className="text-gray-300 text-lg">
          Your AI-powered personalized content dashboard. Stay ahead with trending news, movies, and social updates — all tailored for you.
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition">
              <FaSignInAlt className="inline mr-2" />
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition">
              <FaUserPlus className="inline mr-2" />
              Signup
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition">
            <FaNewspaper className="text-blue-300 text-2xl mb-3" />
            <h3 className="text-lg font-semibold mb-1">Curated News</h3>
            <p className="text-gray-400 text-sm">Stay informed with real-time trending news tailored to your preferences.</p>
          </div>
          <div className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition">
            <FaFilm className="text-purple-300 text-2xl mb-3" />
            <h3 className="text-lg font-semibold mb-1">Trending Movies</h3>
            <p className="text-gray-400 text-sm">Get updates on the latest movies, trailers, and entertainment buzz.</p>
          </div>
          <div className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition">
            <FaComments className="text-pink-300 text-2xl mb-3" />
            <h3 className="text-lg font-semibold mb-1">Social Feed</h3>
            <p className="text-gray-400 text-sm">See what people are discussing across platforms in one social feed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

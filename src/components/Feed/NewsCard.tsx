"use client";

import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "@/redux/slices/favoritesSlice";
import { RootState } from "@/redux/store";
import { Heart, HeartOff } from "lucide-react";
import { motion } from "framer-motion";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};

export default function NewsCard({ article }: { article: Article }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorited = favorites.some(item => item.url === article.url);

  const toggleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFavorite(article.url));
    } else {
      dispatch(addFavorite(article));
    }
  };

  return (
    <motion.div
      layout
      drag="y"
      className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 cursor-grab active:cursor-grabbing"
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      )}

      <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{article.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Read More →
        </a>

        <button onClick={toggleFavorite} className="text-red-500 hover:scale-110 transition-transform duration-200">
          {isFavorited ? <HeartOff size={18} /> : <Heart size={18} />}
        </button>
      </div>
    </motion.div>
  );
}

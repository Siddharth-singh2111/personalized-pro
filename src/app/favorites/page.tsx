'use client';

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import NewsCard from "@/components/Feed/NewsCard";
import withAuth from "@/components/Auth/withAuth";
import { Article } from "@/types"; // ✅ Import the shared type

function FavoritesPage() {
  const favorites: Article[] = useSelector((state: RootState) => state.favorites.items);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven't favorited any articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default withAuth(FavoritesPage);

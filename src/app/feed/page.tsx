'use client';

import DashboardLayout from "@/components/Layout/DashboardLayout";
import NewsCard from "@/components/Feed/NewsCard";
import { useHasMounted } from "@/hooks/useHasMounted";
import { fetchNewsByCategory } from "@/utils/fetchNews";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import withAuth from "@/components/Auth/withAuth";

function FeedPage() {
  const hasMounted = useHasMounted();
  const categories = useSelector((state: RootState) => state.preferences.categories);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasMounted) return;

    const fetchAll = async () => {
      const results = await Promise.all(categories.map(fetchNewsByCategory));
      setNews(results.flat());
      setLoading(false);
    };

    fetchAll();
  }, [categories, hasMounted]);

  if (!hasMounted) return null;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Your Feed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : news.length === 0 ? (
        <p className="text-gray-500">No articles found for selected categories.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default withAuth(FeedPage);

export const fetchTrendingNews = async () => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=9&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("🔥 Trending articles fetched:", data.articles?.length);
    return data.articles || [];
  } catch (err) {
    console.error("❌ Failed to fetch trending news", err);
    return [];
  }
};

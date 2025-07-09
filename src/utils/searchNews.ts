export const searchNews = async (query: string) => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&sortBy=publishedAt&pageSize=10&language=en&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("🔍 Search results:", data.articles?.length);
    return data.articles || [];
  } catch (err) {
    console.error("❌ Search failed:", err);
    return [];
  }
};

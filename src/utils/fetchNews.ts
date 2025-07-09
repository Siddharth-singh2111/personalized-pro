export const fetchNewsByCategory = async (category: string) => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`✅ Fetched ${data.articles?.length} articles for ${category}`);
    return data.articles || [];
  } catch (err) {
    console.error("❌ Error:", err);
    return [];
  }
};

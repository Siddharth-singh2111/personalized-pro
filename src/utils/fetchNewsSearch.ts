export const fetchNewsSearch = async (query: string) => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=6&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.articles || [];
  } catch (err) {
    console.error("❌ News search failed", err);
    return [];
  }
};

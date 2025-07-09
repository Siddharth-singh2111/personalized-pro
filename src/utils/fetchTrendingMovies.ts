export const fetchTrendingMovies = async () => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("🎬 Trending movies fetched:", data.results?.length);
    return data.results.slice(0, 3) || [];
  } catch (err) {
    console.error("❌ Failed to fetch trending movies", err);
    return [];
  }
};

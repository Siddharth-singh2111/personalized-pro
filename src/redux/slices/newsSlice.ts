import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Article } from "@/types"; // adjust path if needed

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/top-headlines";

export const getNews = createAsyncThunk<Article[], void, { state: any }>(
  "news/getNews",
  async (_, { getState }) => {
    const state = getState();
    const categories: string[] = state.preferences.categories || [];

    const requests = categories.map((category) =>
      axios.get(BASE_URL, {
        params: {
          category,
          country: "in",
          apiKey: API_KEY,
        },
      })
    );

    const results = await Promise.all(requests);
    const articles: Article[] = results.flatMap((res) => res.data.articles);

    return articles;
  }
);

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;

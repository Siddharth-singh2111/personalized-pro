import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace this with your real API key or load from env
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/top-headlines";

export const getNews = createAsyncThunk(
  "news/getNews",
  async (_, { getState }) => {
    const state: any = getState();
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
    const articles = results.flatMap((res) => res.data.articles);

    return articles;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
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

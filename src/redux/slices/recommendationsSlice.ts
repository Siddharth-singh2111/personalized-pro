import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "@/utils/fetchMovies";

export const getRecommendations = createAsyncThunk(
  "recommendations/getRecommendations",
  async () => {
    const movies = await fetchPopularMovies();
    return movies;
  }
);

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getRecommendations.rejected, (state) => {
        state.loading = false;
        
      });
  },
});

export default recommendationsSlice.reducer;

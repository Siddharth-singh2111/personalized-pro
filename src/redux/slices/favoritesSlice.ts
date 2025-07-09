import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Article {
  title: string;
  url: string;
  urlToImage?: string;
  description?: string;
  [key: string]: any;
}

interface FavoritesState {
  items: Article[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Article>) => {
      const exists = state.items.find(item => item.url === action.payload.url);
      if (!exists) state.items.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.url !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

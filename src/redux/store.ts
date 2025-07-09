import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './slices/preferencesSlice';
import favoritesReducer from "./slices/favoritesSlice";
import recommendationsReducer from "./slices/recommendationsSlice";
import newsReducer from "./slices/newsSlice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    favorites: favoritesReducer,
    recommendations: recommendationsReducer,
     news: newsReducer,
     
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

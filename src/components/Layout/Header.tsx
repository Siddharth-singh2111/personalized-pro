'use client';

import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '@/redux/slices/preferencesSlice';
import { RootState } from '@/redux/store';

export default function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.preferences.darkMode);

  return (
    <header className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
      <h1 className="text-xl font-bold">Personalized Dashboard</h1>
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className="bg-gray-300 dark:bg-gray-700 px-4 py-1 rounded"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );
}

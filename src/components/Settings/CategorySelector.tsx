'use client';

import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/redux/slices/preferencesSlice";
import { RootState } from "@/redux/store";

const availableCategories = ["technology", "sports", "health", "finance", "science", "entertainment"];

export default function CategorySelector() {
  const selected = useSelector((state: RootState) => state.preferences.categories);
  const dispatch = useDispatch();

  const toggleCategory = (cat: string) => {
    const updated = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat];
    dispatch(setCategories(updated));
  };

  return (
    <div className="space-y-4">
      <p>Select your preferred categories:</p>
      <div className="flex flex-wrap gap-3">
        {availableCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-4 py-2 rounded border ${
              selected.includes(cat)
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

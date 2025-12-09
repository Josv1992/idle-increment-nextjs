"use client";

import useStateData from "../hooks/useStateData";

export default function ButtonGrid() {
  const buttons = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    label: `Button ${i + 1}`,
  }));

  const { open, handleSetOpen, handleIncrementPoints } = useStateData();

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Actions</h2>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) => (
          <button
            onClick={handleIncrementPoints}
            key={btn.id}
            className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-transform"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

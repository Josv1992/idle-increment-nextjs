"use client"

import { createContext, useContext, useState } from 'react';
import useStateData from '../hooks/useStateData';

export default function Gallery() {
  const [count, setCount] = useState(0);
  const { open, points } = useStateData();


  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Game Screen</h2>
      <div className="p-8 bg-blue-300 dark:bg-blue-900 rounded-lg flex items-center justify-center text-slate-900 dark:text-white">
        <div className="flex flex-col">
          <p>Points: {String(points)}</p>
        </div>
      </div>
    </div>
  );
}

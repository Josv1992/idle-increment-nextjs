"use client";

import { useContext } from "react";
import { StateContext } from "../contexts/StateContext";

export default function Inventory() {
  const ctx = useContext(StateContext);
  if (!ctx) return null;

  const { game } = ctx;
  const slots = Array.from({ length: 28 });

  return (
    <div className="mt-6">
      <div className="grid grid-cols-7 gap-1">
        {slots.map((_, idx) => {
          const item = game.inventory[idx];
          const isEmpty = !item;

          return (
            <div
              key={idx}
              className={`w-8 h-8 rounded border-2 flex items-center justify-center text-sm ${
                isEmpty
                  ? "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                  : item.type === "ore"
                  ? "bg-yellow-100 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-700"
                  : "bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-700"
              }`}
            >
              {item && (item.type === "ore" ? "⛏️" : "🪵")}
            </div>
          );
        })}
      </div>
      <div className="text-xs text-slate-500 mt-2 space-y-1">
        <div>Bank Inventory: </div>
      </div>
    </div>
  );
}

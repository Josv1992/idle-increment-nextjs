"use client";

import { useContext } from "react";
import { StateContext } from "../contexts/StateContext";

export default function GameScreen() {
  const ctx = useContext(StateContext);
  if (!ctx) return null;

  const { game, stopAction } = ctx;

  return (
    <div className="p-6 h-full bg-white dark:bg-slate-800 shadow-lg rounded-l-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl ${game.playerAction ? 'animate-bounce' : ''}`}>
            {/* simple avatar - replace with an image later if desired */}
            <span>🙂</span>
          </div>
          <div>
            <div className="text-sm text-slate-500">Total XP: {game.totalXP}</div>
            <div className="text-sm font-medium">Player is currently: <span className="font-semibold">{game.playerAction ?? 'Idle'}</span></div>
          </div>
        </div>

        <div>
          {game.playerAction ? (
            <button
              onClick={() => stopAction()}
              className="px-3 py-1 text-sm rounded bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : null}
        </div>
      </div>

      {game.playerAction === "Banking" && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-1">
            <div>Banking</div>
            <div className="text-xs">{Math.round(game.bankingProgress)}%</div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-500 h-3"
              style={{ width: `${Math.min(100, game.bankingProgress)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

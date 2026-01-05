"use client";

import { useState, useEffect, useRef } from "react";

type ButtonAction = {
  label: string;
  actionType: string;
  onClick?: () => void;
  variant?: string;
  actionDurationMs?: number;
};

export default function ButtonGrid({ buttons }: { buttons: ButtonAction[] }) {
  const safeButtons = buttons ?? [];
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  const animateButton = (actionType: string, duration: number) => {
    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
    }

    setActiveAction(null);

    requestAnimationFrame(() => {
      setActiveAction(actionType);

      const btn = safeButtons.find(b => b.actionType === actionType);

      animationTimeout.current = setTimeout(() => {
        setActiveAction(null);
        animationTimeout.current = null;
      }, duration);
    });
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (!detail?.actionType) return;

      animateButton(detail.actionType, detail.duration);
    };

    window.addEventListener("game:skillTick", handler);
    window.addEventListener("game:skillStart", handler);
    return () => {
      window.removeEventListener("game:skillTick", handler);
      window.removeEventListener("game:skillStart", handler);
    };
  }, [safeButtons]);


  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Actions</h2>
      <div className="grid grid-cols-4 gap-3">
        {safeButtons.map((btn) => {
          const duration = btn.actionDurationMs ?? 500;
          const isActive = activeAction === btn.actionType;

          return (
            <button
              key={btn.actionType}
              onClick={() => {
                btn.onClick?.();
              }}
              className="relative overflow-hidden bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-transform"
            >
              <span
                className="absolute left-0 top-0 h-full bg-blue-700 z-0"
                style={{
                  width: isActive ? "100%" : "0%",
                  transition: isActive ? `width ${duration}ms linear` : "none",
                }}
              />
              <span className="relative z-10">{btn.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

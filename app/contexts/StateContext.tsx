"use client";

import { createContext, useCallback, useMemo, useState } from "react";
import { GameState, StateContextProps, nextXPThreshold } from "./state.types";
import useGameActions from "./useGameActions";

const StateContext = createContext<StateContextProps | null>(null);

const StateContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleSetOpen = useCallback(() => setOpen((prev) => !prev), []);

  const [points, setPoints] = useState<number>(0);
  const handleIncrementPoints = useCallback(() => setPoints((p) => p + 1), []);

  const [game, setGame] = useState<GameState>({
    totalXP: 0,
    playerAction: null,
    inventory: [],
    bankedOre: 0,
    bankedWood: 0,
    bankingProgress: 0,
  });

  const { levelUpSkill, stopAction, performBanking, performSkillAction } = useGameActions(game, setGame);

  const contextValue = useMemo<StateContextProps>(() => ({
    open,
    handleSetOpen,
    points,
    handleIncrementPoints,
    game,
    levelUpSkill,
    stopAction,
    performBanking,
    performSkillAction
  }), [open, handleSetOpen, points, handleIncrementPoints, game, levelUpSkill, stopAction, performBanking, performSkillAction]);

  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
};

export { StateContextProvider, StateContext };

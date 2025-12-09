"use client";

import { createContext, useCallback, useMemo, useState } from "react";

interface StateContextProps {
  open: boolean;
  handleSetOpen: VoidFunction;
  points: Number;
  handleIncrementPoints: VoidFunction;
}

const StateContext = createContext<StateContextProps | null>(null);

const StateContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSetOpen = useCallback(() => setOpen((prev) => !prev), []);

  const [points, incrementPoints] = useState<number>(0);

  const handleIncrementPoints = useCallback(() => incrementPoints((prev) => prev + 1), []);

  const contextValue = useMemo<StateContextProps>(
    () => ({ open, handleSetOpen, points, handleIncrementPoints }),
    [open, handleSetOpen, points, handleIncrementPoints]
  );

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContextProvider, StateContext };

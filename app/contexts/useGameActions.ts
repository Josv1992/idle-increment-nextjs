"use client";

import { useCallback, useEffect, useRef } from "react";
import { GameState, INVENTORY_SLOTS, BANKING_DURATION_MS, nextXPThreshold } from "./state.types";
import { bankAll, tickSkillAction } from "./state.actions";

export type SetGame = (updater: (g: GameState) => GameState) => void;

export default function useGameActions(game: GameState, setGame: SetGame) {
  // refs to manage intervals/timeouts
  const actionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bankingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bankingProgressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const actionBeforeBankingRef = useRef<{ type: string; amount: number } | null>(null);
  const performCutWoodRef = useRef<((amount?: number) => void) | null>(null);
  const performBankingRef = useRef<(() => void) | null>(null);
  const playerActionRef = useRef<string | null>(null);
  const performSkillActionRef = useRef<((amount?: number) => void) | null>(null);

  // stop any ongoing action
  const stopAction = useCallback(() => {
    if (actionIntervalRef.current) {
      clearInterval(actionIntervalRef.current as unknown as number);
      actionIntervalRef.current = null;
    }
    playerActionRef.current = null;
    setGame((g) => ({ ...g, playerAction: null }));
  }, [setGame]);

  const doSkillActionTick = useCallback((skillName: string, actionType: string, itemType: string, amountofXP: number, duration: number) => {
    setGame((g) => {
      const next = tickSkillAction(g, skillName, actionType, itemType, amountofXP);
      const amount = 1;

      if (next.inventory.length >= INVENTORY_SLOTS) {
        actionBeforeBankingRef.current = { type: actionType, amount};
        setTimeout(() => {
          if (performBankingRef.current) performBankingRef.current();
        }, 0);
      }

      return next;
    });

    // dispatch asynchronously after state update/render to avoid cross-component updates during render
    if (typeof window !== "undefined") {
      setTimeout(() => {
        try {
          window.dispatchEvent(new CustomEvent("game:skillTick", {
            detail: { skillName, actionType, itemType, duration },
          }));
        } catch (e) { /* no event */ }
      }, 0);
    }
  }, [setGame]);

  const performSkillAction = useCallback((skillName: string, actionType: string, itemType: string, amountofXP: number, baseDurationMs: number) => {
    // Prevent starting a new action if one is already in progress
    if (playerActionRef.current) return;

    if (game.inventory.length >= INVENTORY_SLOTS) {
      return;
    }

    const placeholderSkillLevel = 3;

    // const duration = baseDurationMs  * (1 - Math.min(0.5, (placeholderSkillLevel - 1) * 0.05)); // TODO: improve calculation

    const duration = baseDurationMs;

    // Ensure any previous interval is cleared (defensive)
    if (actionIntervalRef.current) {
      clearInterval(actionIntervalRef.current as unknown as number);
      actionIntervalRef.current = null;
    }

    setGame((g) => ({ ...g, playerAction: actionType }));

    // update ref synchronously so rapid clicks can't start another action
    playerActionRef.current = actionType;

    // perform the first tick immediately, then schedule repeating ticks
    doSkillActionTick(skillName, actionType, itemType, amountofXP, duration);
    actionIntervalRef.current = setInterval(() => doSkillActionTick(skillName, actionType, itemType, amountofXP, duration), duration);
  }, [doSkillActionTick, game.playerAction, game.inventory.length, stopAction, game, setGame]);

  const levelUpSkill = useCallback((skill: string) => {
    setGame((g) => {
      const skills = g.skills || {};
      const skillData = skills[skill] || { xp: 0, level: 1 };

      return {
        ...g,
        skills: {
          ...skills,
          [skill]: {
            ...skillData,
            level: skillData.level + 1,
            xp: 0,
          },
        },
      };
    });
  }, [setGame]);

  // Banking
  const performBanking = useCallback(() => {
    if (game.playerAction === "Banking") return;

    stopAction();

    // use pure action to move inventory contents into bank totals
    setGame((g) => ({ ...bankAll(g), playerAction: "Banking", bankingProgress: 0 }));

    let progress = 0;
    if (bankingProgressIntervalRef.current) {
      clearInterval(bankingProgressIntervalRef.current as unknown as number);
    }
    
    bankingProgressIntervalRef.current = setInterval(() => {
      progress += 100 / (BANKING_DURATION_MS / 100);
      if (progress > 100) progress = 100;
      setGame((g) => ({ ...g, bankingProgress: progress }));
    }, 100);

    if (bankingTimeoutRef.current) {
      clearTimeout(bankingTimeoutRef.current);
    }
    bankingTimeoutRef.current = setTimeout(() => {
      if (bankingProgressIntervalRef.current) {
        clearInterval(bankingProgressIntervalRef.current as unknown as number);
        bankingProgressIntervalRef.current = null;
      }

      // clear banking state
      playerActionRef.current = null;
      setGame((g) => ({ ...g, playerAction: null, bankingProgress: 0 }));

      // mark banking as finished before we attempt to resume
      const pending = actionBeforeBankingRef.current;
      actionBeforeBankingRef.current = null;
      bankingTimeoutRef.current = null;

      // schedule resume slightly later to allow React state/effects to settle
      if (pending) {
        const { type, amount } = pending;
        setTimeout(() => {
          // TODO: Perform the action that was interrupted
        }, 50);
      }
    }, BANKING_DURATION_MS);
  }, [game.playerAction, stopAction, setGame]);


  // Update ref whenever performBanking changes
  useEffect(() => {
    performBankingRef.current = performBanking;
  }, [performBanking]);

  // keep a ref in sync with the latest playerAction to avoid stale closures
  useEffect(() => {
    playerActionRef.current = game.playerAction;
  }, [game.playerAction]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (actionIntervalRef.current) {
        clearInterval(actionIntervalRef.current as unknown as number);
        actionIntervalRef.current = null;
      }
      if (bankingTimeoutRef.current) {
        clearTimeout(bankingTimeoutRef.current);
        bankingTimeoutRef.current = null;
      }
      if (bankingProgressIntervalRef.current) {
        clearInterval(bankingProgressIntervalRef.current as unknown as number);
        bankingProgressIntervalRef.current = null;
      }
      playerActionRef.current = null;
    };
  }, []);

  return {
    performBanking,
    stopAction,
    levelUpSkill,
    performSkillAction
  };
}

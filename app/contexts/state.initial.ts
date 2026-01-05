import { GameState, ALL_SKILLS } from "./state.types";

export const createInitialGameState = (): GameState => {
  const skills: { [key: string]: { skillName: string, xp: number; level: number } } = {};
  ALL_SKILLS.forEach((skill) => {
    skills[skill] = { skillName: skill, xp: 0, level: 1 };
  });

  return {
    totalXP: 0,
    playerAction: null,
    inventory: [],
    playerBankInventory: [],
    bankingProgress: 0,
    skills,
  };
};

export const initialGameState = createInitialGameState();

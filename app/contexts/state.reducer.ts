import { GameState, InventoryItem, nextXPThreshold } from "./state.types";

// Pure reducer-style helper functions for manipulating GameState immutably

export function addItemsToInventory(state: GameState, items: InventoryItem[]) {
  const inventory = [...state.inventory];
  for (const it of items) {
    if (inventory.length >= 28) break; // keep a hard cap; constants file has the canonical value
    inventory.push(it);
  }
  return { ...state, inventory };
}

export function emptyInventoryToBank(state: GameState) {
  const oreCount = state.inventory.filter((i) => i.type === "ore").length;
  const woodCount = state.inventory.filter((i) => i.type === "wood").length;
  return {
    ...state,
    inventory: [],
    bankedOre: state.bankedOre + oreCount,
    bankedWood: state.bankedWood + woodCount,
  };
}

export function addXPForSkill(state: GameState, skillName: string, actionType: string, xpAmount: number) {
  const skillsObj = state.skills ?? {};
  const current = skillsObj[skillName] ?? { skillName: skillName, xp: 0, level: 1 };

  let newXP = current.xp + xpAmount;
  let newLevel = current.level;
  let xpToNext = nextXPThreshold(Math.max(1, newLevel));

  while (newXP >= xpToNext) {
    newXP -= xpToNext;
    newLevel += 1;
    xpToNext = nextXPThreshold(Math.max(1, newLevel));
  }

  const newSkills = { ...skillsObj, [skillName]: { skillName: skillName, xp: newXP, level: newLevel } };

  // Keep totalXP updated
  const newTotalXP = (state.totalXP ?? 0) + xpAmount;

  // Generic update for other skills
  return {
    ...state,
    skills: newSkills,
    totalXP: newTotalXP,
  };
}

import { GameState, Item, nextXPThreshold, INVENTORY_SLOTS } from "./state.types";

// Pure reducer-style helper functions for manipulating GameState immutably

export function addItemsToInventory(state: GameState, items: Item[]) {
  const inventory = [...state.inventory];
  for (const item of items) {
    if (inventory.length >= INVENTORY_SLOTS) break; 
    inventory.push(item);
  }
  return { ...state, inventory };
}

// TODO: make it so player walks to bank, deposits all items immediately, and then walks back to previous action

export function emptyInventoryToBank(state: GameState) {
  return {
    ...state,
    inventory: [],
    playerBankInventory: [...(state.playerBankInventory ?? []), ...state.inventory],
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

import { GameState, InventoryItem } from "./state.types";
import { addItemsToInventory, emptyInventoryToBank, addXPForSkill } from "./state.reducer";

// These are higher-level helpers that can be used by components or hooks.
// They accept the current `game` and return a new `game` state or a small result
// that callers can use with `setGame`.

export function tickSkillAction(game: GameState, skillName: string, actionType: string, itemType: string, amountofXP: number) {
  const items: InventoryItem[] = [];
  items.push({ type: itemType, id: `${itemType}-${Date.now()}-skillaction` });
  let next = addItemsToInventory(game, items);

  next = addXPForSkill(next, skillName, actionType, amountofXP);

  return next;
}

export function bankAll(game: GameState) {
  return emptyInventoryToBank(game);
}

export interface Item {
  type: string;
  id: string;
  icon: string;
}

export interface GameState {
  totalXP?: number;
  playerAction: string | null;
  inventory: Item[];
  playerBankInventory?: Item[];
  bankingProgress: number;
  skills?: {
    [key: string]: {
      skillName: string;
      xp: number;
      level: number;
    };
  };
}

export interface StateContextProps {
  open: boolean;
  handleSetOpen: VoidFunction;
  points: number;
  handleIncrementPoints: VoidFunction;
  game: GameState;
  stopAction: () => void;
  performBanking: () => void;
  performSkillAction: (skillName: string, actionType: string, itemType: string, xpAmount: number, baseDurationMs: number) => void;
  levelUpSkill: (skill: string) => void;
}

export const XP_PER_UNIT = 10;
export const INVENTORY_SLOTS = 28;
export const BANKING_DURATION_MS = 10000;

// List of all available skills
export const ALL_SKILLS = ['mining', 'woodcutting', 'fishing', 'cooking'];

export const nextXPThreshold = (level: number) => Math.floor(100 * Math.pow(1.34, level - 1));

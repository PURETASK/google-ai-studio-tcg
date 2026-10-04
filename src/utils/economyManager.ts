import { Domain } from '../types';
import { soundEngine } from './audioEngine';

export interface MatchHistoryRecord {
  id: string;
  gameIndex: number;
  isVictory: boolean;
  streakCount: number;
  damageDealt: number;
  damageTaken: number;
  turnCount: number;
  spellsCast: number;
  unitsSlain: number;
  opponentName: string;
  playerDomain: Domain;
  environmentName: string;
  timestamp: string;
  score: number;
}

export interface PlayerEconomy {
  astralShards: number;
  cosmicDust: number;
  totalWins: number;
  totalMatches: number;
  winStreak: number;
  highestWinStreak: number;
  masteryLevel: number;
  masteryXp: number;
  masteryXpRequired: number;
  domainMastery: Record<Domain, number>;
  unlockedPacksTotal: number;
  lastDailyRewardDate?: string;
  matchHistory?: MatchHistoryRecord[];
}

const INITIAL_HISTORY: MatchHistoryRecord[] = [
  {
    id: 'match-hist-1',
    gameIndex: 1,
    isVictory: true,
    streakCount: 1,
    damageDealt: 34,
    damageTaken: 12,
    turnCount: 6,
    spellsCast: 4,
    unitsSlain: 3,
    opponentName: 'Ignis Volkanic Warlord',
    playerDomain: 'Sanctuary',
    environmentName: 'Molten Caldera',
    timestamp: '2h ago',
    score: 850
  },
  {
    id: 'match-hist-2',
    gameIndex: 2,
    isVictory: true,
    streakCount: 2,
    damageDealt: 40,
    damageTaken: 8,
    turnCount: 5,
    spellsCast: 5,
    unitsSlain: 4,
    opponentName: 'Corvus Void Reaper',
    playerDomain: 'Radiance',
    environmentName: 'Baatorian Trench',
    timestamp: '1h 45m ago',
    score: 920
  },
  {
    id: 'match-hist-3',
    gameIndex: 3,
    isVictory: false,
    streakCount: 0,
    damageDealt: 22,
    damageTaken: 36,
    turnCount: 7,
    spellsCast: 3,
    unitsSlain: 2,
    opponentName: 'Archon of the High Spire',
    playerDomain: 'Abyss',
    environmentName: 'Celestial Spire',
    timestamp: '1h 30m ago',
    score: 410
  },
  {
    id: 'match-hist-4',
    gameIndex: 4,
    isVictory: true,
    streakCount: 1,
    damageDealt: 38,
    damageTaken: 14,
    turnCount: 6,
    spellsCast: 6,
    unitsSlain: 3,
    opponentName: 'Verdant Forest Keeper',
    playerDomain: 'Verdance',
    environmentName: 'Eldervale Canopy',
    timestamp: '1h 10m ago',
    score: 880
  },
  {
    id: 'match-hist-5',
    gameIndex: 5,
    isVictory: true,
    streakCount: 2,
    damageDealt: 45,
    damageTaken: 6,
    turnCount: 4,
    spellsCast: 7,
    unitsSlain: 5,
    opponentName: 'Nexus Chrono-Weaver',
    playerDomain: 'Arcane',
    environmentName: 'Astral Rift Core',
    timestamp: '55m ago',
    score: 1050
  },
  {
    id: 'match-hist-6',
    gameIndex: 6,
    isVictory: true,
    streakCount: 3,
    damageDealt: 42,
    damageTaken: 10,
    turnCount: 5,
    spellsCast: 5,
    unitsSlain: 4,
    opponentName: 'Titan Juggernaut Automaton',
    playerDomain: 'Sanctuary',
    environmentName: 'Clockwork Fortress',
    timestamp: '40m ago',
    score: 990
  },
  {
    id: 'match-hist-7',
    gameIndex: 7,
    isVictory: true,
    streakCount: 4,
    damageDealt: 48,
    damageTaken: 4,
    turnCount: 4,
    spellsCast: 8,
    unitsSlain: 5,
    opponentName: 'Lava Behemoth Prime',
    playerDomain: 'Radiance',
    environmentName: 'Molten Caldera',
    timestamp: '28m ago',
    score: 1140
  },
  {
    id: 'match-hist-8',
    gameIndex: 8,
    isVictory: false,
    streakCount: 0,
    damageDealt: 28,
    damageTaken: 38,
    turnCount: 8,
    spellsCast: 4,
    unitsSlain: 3,
    opponentName: 'Baatorian Doom Lord',
    playerDomain: 'Arcane',
    environmentName: 'Baatorian Trench',
    timestamp: '18m ago',
    score: 480
  },
  {
    id: 'match-hist-9',
    gameIndex: 9,
    isVictory: true,
    streakCount: 1,
    damageDealt: 36,
    damageTaken: 12,
    turnCount: 6,
    spellsCast: 5,
    unitsSlain: 4,
    opponentName: 'High Archon Seraphim',
    playerDomain: 'Sanctuary',
    environmentName: 'Celestial Spire',
    timestamp: '9m ago',
    score: 870
  },
  {
    id: 'match-hist-10',
    gameIndex: 10,
    isVictory: true,
    streakCount: 2,
    damageDealt: 50,
    damageTaken: 8,
    turnCount: 5,
    spellsCast: 7,
    unitsSlain: 6,
    opponentName: 'Chrono Rift Stalker',
    playerDomain: 'Verdance',
    environmentName: 'Astral Rift Core',
    timestamp: 'Just now',
    score: 1120
  }
];

const DEFAULT_ECONOMY: PlayerEconomy = {
  astralShards: 500, // Generous starting balance so players can immediately open packs
  cosmicDust: 35,
  totalWins: 8,
  totalMatches: 10,
  winStreak: 2,
  highestWinStreak: 4,
  masteryLevel: 3,
  masteryXp: 340,
  masteryXpRequired: 700,
  domainMastery: {
    Sanctuary: 3,
    Radiance: 2,
    Verdance: 2,
    Abyss: 1,
    Arcane: 2,
    Tempest: 2
  },
  unlockedPacksTotal: 2,
  matchHistory: INITIAL_HISTORY
};

const STORAGE_KEY = 'realm_of_nexus_economy_v1';
const listeners: Array<(eco: PlayerEconomy) => void> = [];

export const economyManager = {
  getEconomy(): PlayerEconomy {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { 
          ...DEFAULT_ECONOMY, 
          ...parsed,
          matchHistory: parsed.matchHistory && parsed.matchHistory.length > 0 ? parsed.matchHistory : INITIAL_HISTORY
        };
      }
    } catch (e) {
      console.warn('Failed to parse economy from localStorage, using default:', e);
    }
    return DEFAULT_ECONOMY;
  },

  getMatchHistory(): MatchHistoryRecord[] {
    return this.getEconomy().matchHistory || INITIAL_HISTORY;
  },

  saveEconomy(eco: PlayerEconomy) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(eco));
      listeners.forEach(fn => fn(eco));
    } catch (e) {
      console.warn('Failed to save economy:', e);
    }
  },

  subscribe(callback: (eco: PlayerEconomy) => void) {
    listeners.push(callback);
    callback(this.getEconomy());
    return () => {
      const idx = listeners.indexOf(callback);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  },

  addMatchReward(params: {
    isVictory: boolean;
    damageDealt: number;
    damageTaken: number;
    spellsCast: number;
    unitsSlain: number;
    turnCount: number;
    playerDomain?: Domain;
    opponentName?: string;
    environmentName?: string;
  }): {
    shardsGained: number;
    dustGained: number;
    xpGained: number;
    isLevelUp: boolean;
    firstWinBonus: boolean;
    streakBonus: number;
  } {
    const current = this.getEconomy();
    const todayStr = new Date().toISOString().split('T')[0];
    const isFirstWinToday = current.lastDailyRewardDate !== todayStr && params.isVictory;

    let baseShards = params.isVictory ? 160 : 40;
    let baseDust = params.isVictory ? 12 : 2;
    let baseXP = params.isVictory ? 250 : 80;

    // Bonus for performance
    const dmgBonus = Math.min(50, Math.floor(params.damageDealt / 2));
    const slayBonus = params.unitsSlain * 10;
    const cleanSheetBonus = (params.isVictory && params.damageTaken <= 5) ? 50 : 0;
    
    let firstWinBonus = 0;
    if (isFirstWinToday) {
      firstWinBonus = 100;
    }

    let streakBonus = 0;
    let newStreak = params.isVictory ? current.winStreak + 1 : 0;
    if (params.isVictory && newStreak > 1) {
      streakBonus = Math.min(100, newStreak * 20);
    }

    const totalShards = baseShards + dmgBonus + slayBonus + cleanSheetBonus + firstWinBonus + streakBonus;
    const totalDust = baseDust + (params.isVictory && newStreak >= 3 ? 10 : 0);
    const totalXP = baseXP + (params.isVictory ? 100 : 0);

    // Update level and XP
    let newXp = current.masteryXp + totalXP;
    let newLevel = current.masteryLevel;
    let xpReq = current.masteryXpRequired;
    let isLevelUp = false;

    while (newXp >= xpReq) {
      newXp -= xpReq;
      newLevel += 1;
      xpReq = Math.floor(xpReq * 1.35);
      isLevelUp = true;
      baseShards += 100; // level up bonus
      baseDust += 15;
    }

    const updatedDomainMastery = { ...current.domainMastery };
    if (params.playerDomain) {
      updatedDomainMastery[params.playerDomain] = (updatedDomainMastery[params.playerDomain] || 1) + (params.isVictory ? 1 : 0);
    }

    // Build new match history record
    const history = current.matchHistory ? [...current.matchHistory] : [...INITIAL_HISTORY];
    const newRecord: MatchHistoryRecord = {
      id: `match-hist-${Date.now()}`,
      gameIndex: history.length + 1,
      isVictory: params.isVictory,
      streakCount: newStreak,
      damageDealt: params.damageDealt,
      damageTaken: params.damageTaken,
      turnCount: params.turnCount,
      spellsCast: params.spellsCast,
      unitsSlain: params.unitsSlain,
      opponentName: params.opponentName || 'Arena Adversary',
      playerDomain: params.playerDomain || 'Sanctuary',
      environmentName: params.environmentName || 'Nexus Arena',
      timestamp: 'Just now',
      score: (params.isVictory ? 800 : 300) + params.damageDealt * 10 - params.damageTaken * 4 + newStreak * 50
    };

    history.push(newRecord);
    // Keep last 25 games
    const trimmedHistory = history.slice(-25);

    const updated: PlayerEconomy = {
      ...current,
      astralShards: current.astralShards + totalShards,
      cosmicDust: current.cosmicDust + totalDust,
      totalWins: current.totalWins + (params.isVictory ? 1 : 0),
      totalMatches: current.totalMatches + 1,
      winStreak: newStreak,
      highestWinStreak: Math.max(current.highestWinStreak, newStreak),
      masteryLevel: newLevel,
      masteryXp: newXp,
      masteryXpRequired: xpReq,
      domainMastery: updatedDomainMastery,
      lastDailyRewardDate: isFirstWinToday ? todayStr : current.lastDailyRewardDate,
      matchHistory: trimmedHistory
    };

    this.saveEconomy(updated);

    return {
      shardsGained: totalShards,
      dustGained: totalDust,
      xpGained: totalXP,
      isLevelUp,
      firstWinBonus: isFirstWinToday,
      streakBonus
    };
  },

  spendCurrency(shards: number, dust: number = 0): boolean {
    const current = this.getEconomy();
    if (current.astralShards < shards || current.cosmicDust < dust) {
      return false;
    }

    const updated: PlayerEconomy = {
      ...current,
      astralShards: current.astralShards - shards,
      cosmicDust: current.cosmicDust - dust,
      unlockedPacksTotal: current.unlockedPacksTotal + 1
    };

    this.saveEconomy(updated);
    soundEngine.playMicroSound('unlock');
    return true;
  },

  grantBonusShards(amount: number, reason: string = 'Divine Gift') {
    this.grantShards(amount, reason);
  },

  grantShards(amount: number, reason: string = 'Divine Gift') {
    const current = this.getEconomy();
    const updated: PlayerEconomy = {
      ...current,
      astralShards: current.astralShards + amount
    };
    this.saveEconomy(updated);
    soundEngine.playMicroSound('unlock');
  },

  grantDust(amount: number, reason: string = 'Cosmic Transmutation') {
    const current = this.getEconomy();
    const updated: PlayerEconomy = {
      ...current,
      cosmicDust: current.cosmicDust + amount
    };
    this.saveEconomy(updated);
    soundEngine.playMicroSound('unlock');
  },

  grantXp(amount: number) {
    const current = this.getEconomy();
    let newXp = current.masteryXp + amount;
    let newLevel = current.masteryLevel;
    let xpReq = current.masteryXpRequired;

    while (newXp >= xpReq) {
      newXp -= xpReq;
      newLevel += 1;
      xpReq = Math.round(xpReq * 1.35);
    }

    const updated: PlayerEconomy = {
      ...current,
      masteryLevel: newLevel,
      masteryXp: newXp,
      masteryXpRequired: xpReq
    };
    this.saveEconomy(updated);
  }
};

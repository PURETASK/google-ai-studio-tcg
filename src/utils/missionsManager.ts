import { DailyMission, MissionCategory, DailyStreakState, DailyStreakDay } from '../types';
import { economyManager } from './economyManager';
import { soundEngine } from './audioEngine';
import confetti from 'canvas-confetti';

const MISSIONS_STORAGE_KEY = 'realm_of_nexus_daily_missions_v1';
const STREAK_STORAGE_KEY = 'realm_of_nexus_daily_streak_v1';

const INITIAL_STREAK_SCHEDULE: Omit<DailyStreakDay, 'isUnlocked' | 'isClaimed' | 'isCurrent' | 'dateLabel'>[] = [
  { dayIndex: 1, shards: 150, dust: 5, xp: 300 },
  { dayIndex: 2, shards: 220, dust: 10, xp: 450 },
  { dayIndex: 3, shards: 300, dust: 15, xp: 600, packReward: 'Novice Realm Booster' },
  { dayIndex: 4, shards: 380, dust: 20, xp: 750 },
  { dayIndex: 5, shards: 450, dust: 25, xp: 900 },
  { dayIndex: 6, shards: 550, dust: 35, xp: 1100, packReward: 'Aegis of the Celestials' },
  { dayIndex: 7, shards: 800, dust: 60, xp: 1800, packReward: 'Divine Boundless Mythic Cache' }
];

const INITIAL_MISSIONS: DailyMission[] = [
  {
    id: 'mission-win-games',
    title: 'Arena Conqueror',
    description: 'Win 3 skirmish or boss matches in the Arena Clash.',
    category: 'battle',
    targetCount: 3,
    currentCount: 1,
    isCompleted: false,
    isClaimed: false,
    rewards: {
      shards: 250,
      dust: 15,
      xp: 400,
      packType: 'Novice Realm Booster'
    },
    icon: '⚔️',
    badge: 'DAILY COMBAT',
    expiresInHours: 18
  },
  {
    id: 'mission-forge-cards',
    title: 'Divine Artificer',
    description: 'Forge 5 custom cards or blueprints in the Vision Forge & Studio.',
    category: 'forge',
    targetCount: 5,
    currentCount: 2,
    isCompleted: false,
    isClaimed: false,
    rewards: {
      shards: 300,
      dust: 25,
      xp: 500
    },
    icon: '⚒️',
    badge: 'STUDIO CREATION',
    expiresInHours: 18
  },
  {
    id: 'mission-open-packs',
    title: 'Vault Explorer',
    description: 'Open 2 booster packs or caches in the Booster Vault.',
    category: 'collection',
    targetCount: 2,
    currentCount: 1,
    isCompleted: false,
    isClaimed: false,
    rewards: {
      shards: 200,
      dust: 10,
      xp: 350
    },
    icon: '💎',
    badge: 'VAULT REQUISITION',
    expiresInHours: 18
  },
  {
    id: 'mission-cast-spells',
    title: 'Arcane Weaver',
    description: 'Cast 10 tactical spells or trigger reaction abilities in battle.',
    category: 'battle',
    targetCount: 10,
    currentCount: 6,
    isCompleted: false,
    isClaimed: false,
    rewards: {
      shards: 180,
      dust: 12,
      xp: 300
    },
    domainAffinity: 'Arcane',
    icon: '🌀',
    badge: 'TACTICAL MASTERY',
    expiresInHours: 18
  },
  {
    id: 'mission-slay-units',
    title: 'Apex Reaver',
    description: 'Destroy 8 enemy minions or champions across your arena clashes.',
    category: 'battle',
    targetCount: 8,
    currentCount: 5,
    isCompleted: false,
    isClaimed: false,
    rewards: {
      shards: 220,
      dust: 15,
      xp: 380
    },
    domainAffinity: 'Radiance',
    icon: '🌋',
    badge: 'BOARD CLEAR',
    expiresInHours: 18
  },
  {
    id: 'mission-inspect-codex',
    title: 'Codex Scholar',
    description: 'Deep-dive inspect 5 cards and examine their tactical radar polygon in Compendium.',
    category: 'mastery',
    targetCount: 5,
    currentCount: 3,
    isCompleted: false,
    isClaimed: false,
    rewards: {
      shards: 150,
      dust: 8,
      xp: 250
    },
    icon: '📜',
    badge: 'LORE MASTERY',
    expiresInHours: 18
  },
  {
    id: 'mission-deck-synergy',
    title: 'Master Architect',
    description: 'Build or customize a deck in Deck Grimoire with an "A" or "S" synergy grade.',
    category: 'deck',
    targetCount: 1,
    currentCount: 1,
    isCompleted: true,
    isClaimed: false,
    rewards: {
      shards: 200,
      dust: 20,
      xp: 450,
      packType: 'Aegis of the Celestials'
    },
    icon: '🛡️',
    badge: 'DECK BUILDING',
    expiresInHours: 18
  }
];

const missionListeners: Array<(missions: DailyMission[]) => void> = [];
const streakListeners: Array<(streak: DailyStreakState) => void> = [];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function buildDefaultStreakState(): DailyStreakState {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // Build 7-day calendar window
  const currentStreak = 3; // Default active 3-day streak for instant player engagement
  const streakDays: DailyStreakDay[] = INITIAL_STREAK_SCHEDULE.map(item => {
    const isUnlocked = item.dayIndex <= currentStreak + 1;
    const isClaimed = item.dayIndex <= currentStreak;
    const isCurrent = item.dayIndex === currentStreak + 1;
    return {
      ...item,
      isUnlocked,
      isClaimed,
      isCurrent,
      dateLabel: `Day ${item.dayIndex}`
    };
  });

  return {
    currentStreak,
    highestStreak: 5,
    lastLoginDate: todayStr,
    todayClaimed: false,
    totalConsecutiveLogins: 12,
    streakDays
  };
}

export const missionsManager = {
  getMissions(): DailyMission[] {
    try {
      const raw = localStorage.getItem(MISSIONS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse missions from localStorage:', e);
    }
    return INITIAL_MISSIONS || [];
  },

  saveMissions(missions: DailyMission[]) {
    try {
      localStorage.setItem(MISSIONS_STORAGE_KEY, JSON.stringify(missions));
      missionListeners.forEach(fn => {
        try {
          fn(missions);
        } catch (e) {
          console.warn('Mission listener error:', e);
        }
      });
    } catch (e) {
      console.warn('Failed to save missions:', e);
    }
  },

  subscribe(callback: (missions: DailyMission[]) => void) {
    missionListeners.push(callback);
    try {
      callback(missionsManager.getMissions());
    } catch (e) {
      console.warn('Initial mission callback error:', e);
    }
    return () => {
      const idx = missionListeners.indexOf(callback);
      if (idx !== -1) missionListeners.splice(idx, 1);
    };
  },

  // ================= DAILY STREAK MANAGEMENT =================

  getStreakState(): DailyStreakState {
    try {
      const raw = localStorage.getItem(STREAK_STORAGE_KEY);
      if (raw) {
        const parsed: DailyStreakState = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.streakDays) && parsed.streakDays.length === 7) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse streak from localStorage:', e);
    }
    const defaultState = buildDefaultStreakState();
    this.saveStreakState(defaultState);
    return defaultState;
  },

  saveStreakState(streak: DailyStreakState) {
    try {
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(streak));
      streakListeners.forEach(fn => fn(streak));
    } catch (e) {
      console.warn('Failed to save streak:', e);
    }
  },

  subscribeStreak(callback: (streak: DailyStreakState) => void) {
    streakListeners.push(callback);
    callback(this.getStreakState());
    return () => {
      const idx = streakListeners.indexOf(callback);
      if (idx !== -1) streakListeners.splice(idx, 1);
    };
  },

  claimStreakReward(dayIndex: number): boolean {
    const state = this.getStreakState();
    const targetDay = state.streakDays.find(d => d.dayIndex === dayIndex);

    if (!targetDay || targetDay.isClaimed || !targetDay.isUnlocked) {
      return false;
    }

    // Grant currency & rewards to economy
    if (targetDay.shards > 0) {
      economyManager.grantShards(targetDay.shards, `Daily Streak Day ${dayIndex} Bonus`);
    }
    if (targetDay.dust > 0) {
      economyManager.grantDust(targetDay.dust, `Daily Streak Day ${dayIndex} Bonus`);
    }

    const updatedStreak = state.currentStreak + 1;
    const newHighest = Math.max(state.highestStreak, updatedStreak);

    const updatedDays = state.streakDays.map(d => {
      if (d.dayIndex === dayIndex) {
        return { ...d, isClaimed: true, isCurrent: false };
      }
      if (d.dayIndex === dayIndex + 1) {
        return { ...d, isUnlocked: true, isCurrent: true };
      }
      return d;
    });

    const newState: DailyStreakState = {
      ...state,
      currentStreak: updatedStreak > 7 ? 1 : updatedStreak,
      highestStreak: newHighest,
      todayClaimed: true,
      totalConsecutiveLogins: state.totalConsecutiveLogins + 1,
      streakDays: updatedDays
    };

    this.saveStreakState(newState);
    soundEngine.playCombatClash('victory');

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}

    return true;
  },

  getStreakBonusMultiplier(): number {
    const state = this.getStreakState();
    // 5% bonus per streak day, up to +35% bonus
    return 1.0 + Math.min(0.35, state.currentStreak * 0.05);
  },

  incrementProgress(missionIdOrCategory: string, amount: number = 1) {
    const missions = this.getMissions();
    let updatedAny = false;

    const updated = missions.map(m => {
      if (m.id === missionIdOrCategory || m.category === missionIdOrCategory) {
        if (!m.isCompleted) {
          const newCount = Math.min(m.targetCount, m.currentCount + amount);
          const isNowCompleted = newCount >= m.targetCount;
          if (isNowCompleted && !m.isCompleted) {
            soundEngine.playMicroSound('unlock');
          }
          updatedAny = true;
          return {
            ...m,
            currentCount: newCount,
            isCompleted: isNowCompleted
          };
        }
      }
      return m;
    });

    if (updatedAny) {
      this.saveMissions(updated);
    }
  },

  claimMissionReward(missionId: string): boolean {
    const missions = this.getMissions();
    const mission = missions.find(m => m.id === missionId);
    if (!mission || !mission.isCompleted || mission.isClaimed) {
      return false;
    }

    // Grant currency & XP to economy
    if (mission.rewards.shards > 0) {
      economyManager.grantShards(mission.rewards.shards, `Daily Mission: ${mission.title}`);
    }
    if (mission.rewards.dust > 0) {
      economyManager.grantDust(mission.rewards.dust, `Daily Mission: ${mission.title}`);
    }

    // Update mission state
    const updated = missions.map(m => {
      if (m.id === missionId) {
        return { ...m, isClaimed: true };
      }
      return m;
    });

    this.saveMissions(updated);
    soundEngine.playCombatClash('victory');

    // Trigger visual confetti celebration
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    return true;
  },

  claimAllCompleted(): number {
    const missions = this.getMissions();
    const claimable = missions.filter(m => m.isCompleted && !m.isClaimed);
    if (claimable.length === 0) return 0;

    let totalShards = 0;
    let totalDust = 0;

    claimable.forEach(m => {
      totalShards += m.rewards.shards;
      totalDust += m.rewards.dust;
    });

    if (totalShards > 0) economyManager.grantShards(totalShards, 'Claim All Daily Missions');
    if (totalDust > 0) economyManager.grantDust(totalDust, 'Claim All Daily Missions');

    const updated = missions.map(m => (m.isCompleted ? { ...m, isClaimed: true } : m));
    this.saveMissions(updated);
    soundEngine.playCombatClash('victory');

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.55 }
      });
    } catch (e) {}

    return claimable.length;
  },

  resetDailyMissions() {
    this.saveMissions(INITIAL_MISSIONS);
    soundEngine.playMicroSound('select');
  },

  getClaimableCount(): number {
    const missions = this.getMissions();
    return missions.filter(m => m.isCompleted && !m.isClaimed).length;
  }
};

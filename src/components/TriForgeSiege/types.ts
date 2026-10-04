import { Domain } from '../../types';

export type SiegeResourceCategory = 'VALOR' | 'PRIMAL' | 'FORGE' | 'AETHER';

export type SiegeCardType = 'CHAMPION' | 'BEAST' | 'WEAPON' | 'RELIC' | 'HAZARD' | 'AMBUSH_TRAP' | 'INCANTATION';

export type LaneId = 'LEFT_FLANK' | 'CENTER_VANGUARD' | 'RIGHT_SIEGE';

export interface SiegeCost {
  valor?: number;
  primal?: number;
  forge?: number;
  aether?: number;
}

export interface SiegeCard {
  id: string;
  name: string;
  title?: string;
  type: SiegeCardType;
  domain: Domain;
  cost: SiegeCost;
  power?: number;
  health?: number;
  armor?: number;
  preferredLane?: LaneId | 'ANY';
  keywords: string[]; // e.g. ["First Strike", "Taunt", "Pierce", "Regen 2", "Spore 1"]
  description: string;
  flavorText?: string;
  iconEmoji: string;
  weaponBonus?: {
    power: number;
    armor?: number;
    grantedKeyword?: string;
  };
  hazardEffect?: {
    dawnDamage?: number;
    dawnHeal?: number;
    armorMod?: number;
    description: string;
  };
  ambushTrigger?: {
    triggerCondition: 'ON_ATTACKED' | 'ON_HERO_STRIKE' | 'ON_CLASH_START';
    effectDescription: string;
    damage?: number;
    shield?: number;
  };
}

export interface DeployedUnit {
  instanceId: string;
  card: SiegeCard;
  currentHealth: number;
  maxHealth: number;
  currentPower: number;
  armor: number;
  statuses: string[];
  socketedWeapon?: SiegeCard | null;
  isExhausted?: boolean;
}

export interface LaneHazard {
  card: SiegeCard;
  placedBy: 'player' | 'opponent';
  durationTurns: number;
}

export interface AmbushTrap {
  instanceId: string;
  card: SiegeCard;
  placedBy: 'player' | 'opponent';
  isRevealed: boolean;
}

export interface LaneGate {
  id: LaneId;
  name: string;
  subtitle: string;
  specialty: string;
  currentHp: number;
  maxHp: number;
  shield: number;
  isBreached: boolean;
  playerUnit: DeployedUnit | null;
  opponentUnit: DeployedUnit | null;
  activeHazard: LaneHazard | null;
  playerTrap: AmbushTrap | null;
  opponentTrap: AmbushTrap | null;
}

export interface TriForgeResources {
  valor: number;
  maxValor: number;
  primal: number;
  maxPrimal: number;
  forge: number;
  maxForge: number;
  lastMomentumRoll: number;
  kineticStash: number;
}

export interface SovereignCitadel {
  health: number;
  maxHealth: number;
  shield: number;
  socketedRelic: SiegeCard | null;
}

export type MobilizationTurn = 1 | 2 | 3 | 'CLASH';

export interface ClashEventLog {
  id: string;
  timestamp: string;
  laneId: LaneId;
  title: string;
  detail: string;
  severity: 'info' | 'combat' | 'lethal' | 'breach' | 'hazard' | 'trap';
}

export interface SiegeMatchState {
  epicCycle: number;
  mobilizationTurn: MobilizationTurn;
  activeSide: 'player' | 'opponent';
  playerCitadel: SovereignCitadel;
  opponentCitadel: SovereignCitadel;
  lanes: Record<LaneId, LaneGate>;
  playerResources: TriForgeResources;
  opponentResources: TriForgeResources;
  playerHand: SiegeCard[];
  opponentHand: SiegeCard[];
  combatLogs: ClashEventLog[];
  isClashResolving: boolean;
  activeClashStep: number;
  winner: 'player' | 'opponent' | null;
}

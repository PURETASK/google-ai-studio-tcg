import { Domain, Card } from '../types';

export interface TitanBoss {
  id: string;
  name: string;
  title: string;
  domain: Domain;
  avatarIcon: string;
  difficulty: 'Acolyte' | 'Veteran' | 'Nightmare' | 'Mythic';
  startingHealth: number;
  startingShield: number;
  startingEssence: number;
  passiveName: string;
  passiveDescription: string;
  enrageThresholdHp: number;
  enrageEffectDescription: string;
  deckCardIds: string[];
  bossChampionCardId: string;
  lore: string;
  shardReward: number;
  dustReward: number;
  xpReward: number;
  bossBadge: string;
  bgGradient: string;
  themeColor: string;
}

export const TITAN_BOSS_ENCOUNTERS: TitanBoss[] = [
  {
    id: 'ignis-worldbreaker',
    name: 'Ignis, The Worldbreaker',
    title: 'Primordial Titan of Cinder & Magma',
    domain: 'Radiance',
    avatarIcon: '🌋',
    difficulty: 'Veteran',
    startingHealth: 45,
    startingShield: 8,
    startingEssence: 4,
    passiveName: 'Molten Aura',
    passiveDescription: 'At the start of every round, scorches all opposing Vanguard units for 1 Burn damage.',
    enrageThresholdHp: 20,
    enrageEffectDescription: 'ENRAGED: When falling below 20 HP, immediately erupts dealing 4 damage to all opposing units and gains +3 Attack power.',
    deckCardIds: [
      'c-006', 'c-007', 'c-008', 'c-009', 'c-010',
      'c-011', 'c-012', 'c-013', 'c-014', 'c-015',
      'c-006', 'c-008', 'c-010', 'c-012', 'c-014'
    ],
    bossChampionCardId: 'c-015',
    lore: 'Forged in the heart of the first supernova, Ignis commands the living mantle of the earth. His touch turns armor to molten slag.',
    shardReward: 240,
    dustReward: 45,
    xpReward: 350,
    bossBadge: '🏆 Cinder Conqueror',
    bgGradient: 'from-red-950 via-amber-950 to-stone-950',
    themeColor: '#ef4444'
  },
  {
    id: 'astraea-void-sovereign',
    name: 'Astraea, Void Sovereign',
    title: 'Eater of Dying Stars & Forgotten Souls',
    domain: 'Abyss',
    avatarIcon: '🌌',
    difficulty: 'Nightmare',
    startingHealth: 40,
    startingShield: 12,
    startingEssence: 3,
    passiveName: 'Soul Devour',
    passiveDescription: 'Whenever any unit on the battlefield dies, Astraea absorbs its essence, gaining +2 Shield and +1 Health.',
    enrageThresholdHp: 18,
    enrageEffectDescription: 'ENRAGED: Upon reaching 18 HP, summons 2 Void Stalker minions (3/3) into the Vanguard immediately.',
    deckCardIds: [
      'c-046', 'c-047', 'c-048', 'c-049', 'c-050',
      'c-051', 'c-052', 'c-053', 'c-054', 'c-055',
      'c-046', 'c-048', 'c-050', 'c-052', 'c-055'
    ],
    bossChampionCardId: 'c-055',
    lore: 'Dwelling in the silent expanse between realities, Astraea hungers for the light of living commanders. Defeating her requires calculated board control.',
    shardReward: 320,
    dustReward: 65,
    xpReward: 480,
    bossBadge: '🏆 Void Extinguisher',
    bgGradient: 'from-purple-950 via-neutral-950 to-stone-950',
    themeColor: '#a855f7'
  },
  {
    id: 'chronos-time-weaver',
    name: 'Chronos, Sovereign of Aeons',
    title: 'Arch-Weaver of the Cosmic Continuum',
    domain: 'Arcane',
    avatarIcon: '⌛',
    difficulty: 'Nightmare',
    startingHealth: 38,
    startingShield: 10,
    startingEssence: 5,
    passiveName: 'Temporal Rewind',
    passiveDescription: 'The first attack received each turn has its damage halved (rounded down).',
    enrageThresholdHp: 15,
    enrageEffectDescription: 'ENRAGED: Freezes 2 random opposing Vanguard units and restores +5 Essence.',
    deckCardIds: [
      'c-031', 'c-032', 'c-033', 'c-034', 'c-035',
      'c-036', 'c-037', 'c-038', 'c-039', 'c-040',
      'c-031', 'c-034', 'c-035', 'c-037', 'c-040'
    ],
    bossChampionCardId: 'c-040',
    lore: 'Chronos sees the outcome of every battle before the first card is drawn. Outmaneuvering his temporal loops demands relentless aggression.',
    shardReward: 350,
    dustReward: 70,
    xpReward: 520,
    bossBadge: '🏆 Time Bender',
    bgGradient: 'from-blue-950 via-indigo-950 to-stone-950',
    themeColor: '#3b82f6'
  },
  {
    id: 'sylvanus-world-tree',
    name: 'Sylvanus, Primeval Behemoth',
    title: 'Living Colossus of Eldervale Canopy',
    domain: 'Verdance',
    avatarIcon: '🌲',
    difficulty: 'Veteran',
    startingHealth: 55,
    startingShield: 5,
    startingEssence: 4,
    passiveName: 'Deep Roots',
    passiveDescription: 'Restores 3 Health at the start of every turn and grants +1/+1 to its weakest frontline unit.',
    enrageThresholdHp: 25,
    enrageEffectDescription: 'ENRAGED: Roots all opposing units (cannot attack next turn) and gains +10 Shield.',
    deckCardIds: [
      'c-021', 'c-022', 'c-023', 'c-024', 'c-025',
      'c-026', 'c-027', 'c-028', 'c-029', 'c-030',
      'c-021', 'c-023', 'c-025', 'c-027', 'c-030'
    ],
    bossChampionCardId: 'c-030',
    lore: 'Rooted deep in the subterranean ley-lines of Nexus, Sylvanus possesses near-limitless regenerative vigor.',
    shardReward: 260,
    dustReward: 50,
    xpReward: 380,
    bossBadge: '🏆 Grove Guardian',
    bgGradient: 'from-emerald-950 via-teal-950 to-stone-950',
    themeColor: '#10b981'
  },
  {
    id: 'aegis-dawn-archon',
    name: 'Aegis, Vanguard of Dawn',
    title: 'Divine Seraph of the Solar Sanctuary',
    domain: 'Sanctuary',
    avatarIcon: '🛡️',
    difficulty: 'Mythic',
    startingHealth: 50,
    startingShield: 15,
    startingEssence: 4,
    passiveName: 'Radiant Bastion',
    passiveDescription: 'Whenever Aegis casts a Sanctuary spell, all allied Vanguard units gain +2 Shield.',
    enrageThresholdHp: 20,
    enrageEffectDescription: 'ENRAGED: Calls down Divine Wrath, dealing 5 piercing damage to opposing Commander and full cleansing all allied statuses.',
    deckCardIds: [
      'c-001', 'c-002', 'c-003', 'c-004', 'c-005',
      'c-016', 'c-017', 'c-018', 'c-019', 'c-020',
      'c-001', 'c-003', 'c-005', 'c-018', 'c-020'
    ],
    bossChampionCardId: 'c-005',
    lore: 'The supreme arbiter of the High Heavens, Aegis tests only the most seasoned Nexus duelists in single combat.',
    shardReward: 450,
    dustReward: 100,
    xpReward: 700,
    bossBadge: '🏆 Seraphic Vanquisher',
    bgGradient: 'from-amber-950 via-yellow-950 to-stone-950',
    themeColor: '#eab308'
  }
];

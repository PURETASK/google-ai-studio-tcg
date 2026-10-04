import { SiegeCard, LaneGate, SiegeMatchState } from './types';

export const SIEGE_CARDS_CATALOG: SiegeCard[] = [
  // ==================== 👑 VALOR CARDS (CHAMPIONS & HEROES) ====================
  {
    id: 'val_001',
    name: 'Aurelius, Sun-Vanguard',
    title: 'Centurion of the Dawn Gate',
    type: 'CHAMPION',
    domain: 'Radiance',
    cost: { valor: 3, forge: 1 },
    power: 5,
    health: 7,
    armor: 1,
    preferredLane: 'CENTER_VANGUARD',
    keywords: ['Taunt', 'Pierce'],
    description: 'Taunt. Incoming physical strikes in the Center Vanguard are reduced by 1. Deals Pierce spillover to Gate.',
    flavorText: 'The Sun Gate shall not yield while iron still breathes.',
    iconEmoji: '👑'
  },
  {
    id: 'val_002',
    name: 'Vespera, Nightshade Infiltrator',
    title: 'Shadow Assassin of the Flank',
    type: 'CHAMPION',
    domain: 'Abyss',
    cost: { valor: 2, primal: 1 },
    power: 4,
    health: 4,
    armor: 0,
    preferredLane: 'LEFT_FLANK',
    keywords: ['First Strike', 'Life Drain'],
    description: 'First Strike. Strikes before the defender can retaliate. Heals your Citadel for unmitigated damage dealt.',
    flavorText: 'Before the fortress bells ring, their sentries have already turned cold.',
    iconEmoji: '🗡️'
  },
  {
    id: 'val_003',
    name: 'Artificer Kaelen',
    title: 'Grand Engineer of the Heights',
    type: 'CHAMPION',
    domain: 'Arcane',
    cost: { valor: 2, forge: 2 },
    power: 3,
    health: 6,
    armor: 1,
    preferredLane: 'RIGHT_SIEGE',
    keywords: ['Artillery Aura', 'Armor +1'],
    description: 'Artillery Aura: All equipped weapons in this lane deal +2 bonus damage during the Grand Clash.',
    flavorText: 'Measure twice, calibrate the prism, and level the entire horizon.',
    iconEmoji: '🧙‍♂️'
  },
  {
    id: 'val_004',
    name: 'Lady Selene, Silver Aegis',
    title: 'Sanctuary High Justiciar',
    type: 'CHAMPION',
    domain: 'Sanctuary',
    cost: { valor: 3 },
    power: 3,
    health: 8,
    armor: 2,
    preferredLane: 'CENTER_VANGUARD',
    keywords: ['Taunt', 'Radiant Ward'],
    description: 'Taunt. Grants your Center Vanguard Gate a permanent +4 Barrier Shield upon deployment.',
    flavorText: 'A bastion of pure light in the heart of the storm.',
    iconEmoji: '🛡️'
  },

  // ==================== 🌿 PRIMAL CARDS (BEASTS & SWARMS) ====================
  {
    id: 'pri_001',
    name: 'Goretusk Behemoth',
    title: 'Iron-hide Rampager',
    type: 'BEAST',
    domain: 'Verdance',
    cost: { primal: 3 },
    power: 6,
    health: 8,
    armor: 0,
    preferredLane: 'CENTER_VANGUARD',
    keywords: ['Pierce', 'Regen 2'],
    description: 'Pierce. Restores +2 HP at the start of each Epic Cycle. Tramples over defenders straight into the Gate.',
    flavorText: 'Its footsteps shake the stone foundations of the keep.',
    iconEmoji: '🦏'
  },
  {
    id: 'pri_002',
    name: 'Riftstalker Raptor',
    title: 'Agile Flank Prowler',
    type: 'BEAST',
    domain: 'Abyss',
    cost: { primal: 2 },
    power: 4,
    health: 3,
    armor: 0,
    preferredLane: 'LEFT_FLANK',
    keywords: ['First Strike', 'Void Rot 1'],
    description: 'First Strike. Inflicts 1 Void Rot onto defenders, permanently decaying their maximum health cap.',
    flavorText: 'Born in the abyss crevices, hunting the outskirts.',
    iconEmoji: '🦖'
  },
  {
    id: 'pri_003',
    name: 'Venomspire Hydra',
    title: 'Three-Headed Toxic Swarm',
    type: 'BEAST',
    domain: 'Verdance',
    cost: { primal: 4 },
    power: 5,
    health: 9,
    armor: 1,
    preferredLane: 'ANY',
    keywords: ['Regen 3', 'Corrosion'],
    description: 'Regeneration 3. Corrosion: Shreds 1 Armor from the target every time it strikes.',
    flavorText: 'Sever one head, and two more spew acid upon the gate.',
    iconEmoji: '🐉'
  },
  {
    id: 'pri_004',
    name: 'Canyon Skydrake',
    title: 'Apex Aerial Predator',
    type: 'BEAST',
    domain: 'Radiance',
    cost: { primal: 3, valor: 1 },
    power: 5,
    health: 4,
    armor: 0,
    preferredLane: 'RIGHT_SIEGE',
    keywords: ['Skyborn', 'Burn 2'],
    description: 'Skyborn (Flies over ground Taunt defenders to strike the Gate directly). Inflicts 2 Burn DoT.',
    flavorText: 'Down from the cliffs like a falling star.',
    iconEmoji: '🦅'
  },

  // ==================== ⚙️ FORGE CARDS (WEAPONS & RELICS) ====================
  {
    id: 'for_001',
    name: 'Sunfire Halberd',
    title: 'Blazing Vanguard Spear',
    type: 'WEAPON',
    domain: 'Radiance',
    cost: { forge: 2 },
    weaponBonus: {
      power: 3,
      grantedKeyword: 'Pierce'
    },
    keywords: ['Weapon Socket', '+3 PWR', 'Pierce'],
    description: 'Sockets onto any Champion or Beast in a lane. Grants +3 Power and the Pierce trample property.',
    flavorText: 'Forged in the heart of solar flares.',
    iconEmoji: '🔱'
  },
  {
    id: 'for_002',
    name: 'Dragonscale Fortress Shield',
    title: 'Masterwork Plate Armor',
    type: 'WEAPON',
    domain: 'Sanctuary',
    cost: { forge: 2 },
    weaponBonus: {
      power: 1,
      armor: 3,
      grantedKeyword: 'Taunt'
    },
    keywords: ['Weapon Socket', '+3 Armor', 'Taunt'],
    description: 'Sockets onto a unit. Grants +1 Power, +3 Armor damage reduction, and Taunt protection for the Gate.',
    flavorText: 'Impenetrable even against siege ballistas.',
    iconEmoji: '🛡️'
  },
  {
    id: 'for_003',
    name: 'Arcane Rail-Ballista',
    title: 'Long-Range Siege Cannon',
    type: 'RELIC',
    domain: 'Arcane',
    cost: { forge: 3 },
    keywords: ['Siege Engine', 'Direct Gate Fire'],
    description: 'Siege Relic: Deploys into a lane. Deals 4 direct siege damage to the opposing Gate during the Grand Clash.',
    flavorText: 'Tension coiled to rupture castle stonework from across the valley.',
    iconEmoji: '🏹'
  },
  {
    id: 'for_004',
    name: 'Kinetic Battery Generator',
    title: 'Citadel Reserve Engine',
    type: 'RELIC',
    domain: 'Arcane',
    cost: { forge: 2 },
    keywords: ['Economy Ramp', '+1 Kinetic Stash'],
    description: 'Relic: Sockets into Citadel Vault. Generates +1 permanent Kinetic Stash reserve at the start of every Epic Cycle.',
    flavorText: 'Store the excess momentum of today to conquer tomorrow.',
    iconEmoji: '🔋'
  },

  // ==================== ✨ AETHER CARDS (HAZARDS & AMBUSH TRAPS) ====================
  {
    id: 'aet_001',
    name: 'Volcanic Trench Hazard',
    title: 'Planar Radiance Fissure',
    type: 'HAZARD',
    domain: 'Radiance',
    cost: { aether: 2 },
    hazardEffect: {
      dawnDamage: 2,
      description: 'Lava fissures open in this lane. Deals 2 Fire damage to all units in this lane before the Clash.'
    },
    keywords: ['Lane Terraforming', '2 AOE Fire DMG'],
    description: 'Target a Lane. Sets an environmental Hazard. Deals 2 Fire AOE to all units in that lane during Clash.',
    flavorText: 'The soil cracks open, vomiting liquid fire.',
    iconEmoji: '🌋'
  },
  {
    id: 'aet_002',
    name: 'Abyssal Miasma Cloud',
    title: 'Decay Fog Terraformer',
    type: 'HAZARD',
    domain: 'Abyss',
    cost: { aether: 2 },
    hazardEffect: {
      armorMod: -2,
      description: 'Nullifies all Armor and shields in this lane. Units suffer 1 Void Rot max HP decay.'
    },
    keywords: ['Lane Terraforming', 'Strip Armor', 'Void Rot'],
    description: 'Target a Lane. Strips 2 Armor from all units and applies 1 Void Rot decay.',
    flavorText: 'Even cold steel rusts and dissolves in the abyssal fog.',
    iconEmoji: '🌫️'
  },
  {
    id: 'aet_003',
    name: 'Arcane Stasis Glyph',
    title: 'Hidden Counter-Ambush Trap',
    type: 'AMBUSH_TRAP',
    domain: 'Arcane',
    cost: { aether: 1, forge: 1 },
    ambushTrigger: {
      triggerCondition: 'ON_ATTACKED',
      effectDescription: 'When enemy strikes this lane, Freeze/Stun the attacking unit, canceling their attack!',
      damage: 0
    },
    keywords: ['Secret Trap (LIFO)', 'Stun Attacker'],
    description: 'Secret Trap: Placed face-down in a lane. When the enemy clashes, Stuns their unit and negates their strike.',
    flavorText: 'A dormant rune of suspended time awaits the heavy boot.',
    iconEmoji: '🌀'
  },
  {
    id: 'aet_004',
    name: 'Spike Pit Ambush',
    title: 'Concealed Moat Trap',
    type: 'AMBUSH_TRAP',
    domain: 'Verdance',
    cost: { aether: 1 },
    ambushTrigger: {
      triggerCondition: 'ON_ATTACKED',
      effectDescription: 'Deals 4 instant piercing damage to the attacking enemy before they strike the Gate.',
      damage: 4
    },
    keywords: ['Secret Trap (LIFO)', '4 Instant DMG'],
    description: 'Secret Trap: Placed face-down in a lane. Deals 4 instant damage to the opposing attacker during Clash.',
    flavorText: 'Covered in brush, sharpened by wood elves.',
    iconEmoji: '🕳️'
  }
];

export const INITIAL_LANES: Record<'LEFT_FLANK' | 'CENTER_VANGUARD' | 'RIGHT_SIEGE', LaneGate> = {
  LEFT_FLANK: {
    id: 'LEFT_FLANK',
    name: 'Left Shadow Flank',
    subtitle: 'Skirmish Runway',
    specialty: '⚡ First Strike Lane (Agile units attack first)',
    currentHp: 20,
    maxHp: 20,
    shield: 0,
    isBreached: false,
    playerUnit: null,
    opponentUnit: null,
    activeHazard: null,
    playerTrap: null,
    opponentTrap: null
  },
  CENTER_VANGUARD: {
    id: 'CENTER_VANGUARD',
    name: 'Center Vanguard Keep',
    subtitle: 'Fortified Main Gate',
    specialty: '🛡️ Bastion Lane (+1 Natural Armor to defenders)',
    currentHp: 30,
    maxHp: 30,
    shield: 0,
    isBreached: false,
    playerUnit: null,
    opponentUnit: null,
    activeHazard: null,
    playerTrap: null,
    opponentTrap: null
  },
  RIGHT_SIEGE: {
    id: 'RIGHT_SIEGE',
    name: 'Right Arcane Heights',
    subtitle: 'Artillery Ridge',
    specialty: '🏹 Artillery Lane (Weapons & siege engines +2 DMG)',
    currentHp: 20,
    maxHp: 20,
    shield: 0,
    isBreached: false,
    playerUnit: null,
    opponentUnit: null,
    activeHazard: null,
    playerTrap: null,
    opponentTrap: null
  }
};

export const INITIAL_MATCH_STATE: SiegeMatchState = {
  epicCycle: 1,
  mobilizationTurn: 1,
  activeSide: 'player',
  playerCitadel: {
    health: 30,
    maxHealth: 30,
    shield: 0,
    socketedRelic: null
  },
  opponentCitadel: {
    health: 30,
    maxHealth: 30,
    shield: 0,
    socketedRelic: null
  },
  lanes: JSON.parse(JSON.stringify(INITIAL_LANES)),
  playerResources: {
    valor: 4,
    maxValor: 4,
    primal: 4,
    maxPrimal: 4,
    forge: 4,
    maxForge: 4,
    lastMomentumRoll: 4,
    kineticStash: 0
  },
  opponentResources: {
    valor: 4,
    maxValor: 4,
    primal: 4,
    maxPrimal: 4,
    forge: 4,
    maxForge: 4,
    lastMomentumRoll: 3,
    kineticStash: 0
  },
  playerHand: [
    SIEGE_CARDS_CATALOG[0], // Aurelius Vanguard
    SIEGE_CARDS_CATALOG[1], // Vespera Assassin
    SIEGE_CARDS_CATALOG[4], // Goretusk Behemoth
    SIEGE_CARDS_CATALOG[8], // Sunfire Halberd
    SIEGE_CARDS_CATALOG[12], // Volcanic Trench Hazard
    SIEGE_CARDS_CATALOG[14]  // Arcane Stasis Glyph Trap
  ],
  opponentHand: [
    SIEGE_CARDS_CATALOG[3], // Lady Selene
    SIEGE_CARDS_CATALOG[5], // Riftstalker
    SIEGE_CARDS_CATALOG[6], // Venomspire Hydra
    SIEGE_CARDS_CATALOG[9], // Dragonscale Shield
    SIEGE_CARDS_CATALOG[13], // Abyssal Miasma Hazard
    SIEGE_CARDS_CATALOG[15]  // Spike Pit Ambush Trap
  ],
  combatLogs: [
    {
      id: 'init_0',
      timestamp: '00:00',
      laneId: 'CENTER_VANGUARD',
      title: 'Siege Horn Sounded',
      detail: 'Epic Cycle 1 begins! Turn 1 of 3: Scout & Terraforming Phase initialized.',
      severity: 'info'
    }
  ],
  isClashResolving: false,
  activeClashStep: 0,
  winner: null
};

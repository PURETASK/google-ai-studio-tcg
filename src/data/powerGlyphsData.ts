import { PowerGlyph, Domain } from '../types';

export interface EnrichedPowerGlyph extends PowerGlyph {
  domain: Domain | 'Neutral';
  triggerTiming: 'Pre-Combat' | 'Main Action' | 'Fast Reaction' | 'Passive Aura' | 'On Hit' | 'End Phase Trigger' | 'On Death';
  diceFormula?: string;
  energyCost?: number;
  synergyBonus?: string;
  loreSnippet?: string;
  iconId?: string;
}

export const UNIVERSAL_POWER_GLYPHS: EnrichedPowerGlyph[] = [
  // ================= 1. ELEMENTAL GLYPHS =================
  {
    id: 'glyph-lava-control',
    name: 'Lava Control',
    icon: '🔥',
    iconId: 'flame',
    category: 'elemental',
    domain: 'Radiance',
    shortTag: 'LAVA CONTROL',
    ruleClause: 'Ignites terrain and manipulates subterranean magma pools. Traversing enemy units take 2 continuous burn damage per round.',
    timing: 'Passive Aura',
    triggerTiming: 'Passive Aura',
    diceFormula: '2d6 Fire Burn',
    damageMod: '+2 Continuous Burn',
    energyCost: 1,
    synergyBonus: '+50% damage if paired with Molten Burst or Volcanic Storm.',
    loreSnippet: 'Forged in the molten calderas of Sol-Thar, where rock behaves as living liquid gold.'
  },
  {
    id: 'glyph-molten-burst',
    name: 'Molten Burst',
    icon: '💥',
    iconId: 'magma-rock',
    category: 'elemental',
    domain: 'Radiance',
    shortTag: 'MOLTEN BURST',
    ruleClause: 'When destroying an opposing unit, trigger an explosive 10ft shockwave dealing 3d6 Fire damage to all adjacent enemies.',
    timing: 'Fast Reaction',
    triggerTiming: 'Fast Reaction',
    diceFormula: '3d6 Fire',
    damageMod: '3d6 Area Fire',
    energyCost: 2,
    synergyBonus: 'Ignites flammable terrain and melts armor barriers for 1 round.',
    loreSnippet: 'The sudden decompression of volcanic rock creates shockwaves hotter than dragonfire.'
  },
  {
    id: 'glyph-volcanic-storm',
    name: 'Volcanic Storm',
    icon: '🌋',
    iconId: 'magma-rock',
    category: 'elemental',
    domain: 'Radiance',
    shortTag: 'VOLCANIC STORM',
    ruleClause: 'Summons subterranean magma fissures across all 3 lanes for 2 turns; enemy units without Fire resistance suffer -2 DEF.',
    timing: 'Main Action',
    triggerTiming: 'Main Action',
    diceFormula: '4d8 Volcanic Slag',
    damageMod: '4d8 Terrain',
    energyCost: 4,
    synergyBonus: 'Forces all enemy units to make DC 16 Dex saves or be Knocked Prone.',
    loreSnippet: 'The planet itself shudders as ancient mantle heat breaks through tectonic plates.'
  },
  {
    id: 'glyph-spore-swarm',
    name: 'Spore Swarm',
    icon: '🍄',
    iconId: 'wind',
    category: 'elemental',
    domain: 'Verdance',
    shortTag: 'SPORE SWARM',
    ruleClause: 'When struck in melee, release a blinding toxic cloud of wetland spores. Attackers must succeed on DC 15 Con save or become Poisoned.',
    timing: 'Fast Reaction',
    triggerTiming: 'Fast Reaction',
    diceFormula: '2d6 Poison',
    damageMod: '2d6 Nature',
    energyCost: 1,
    synergyBonus: 'Reduces poisoned enemy attack accuracy by 25%.',
    loreSnippet: 'Primeval fungal colonies dormant for centuries release narcotic bioluminescence.'
  },
  {
    id: 'glyph-tidal-surge',
    name: 'Tidal Depth Surge',
    icon: '🌊',
    iconId: 'water-abyss',
    category: 'elemental',
    domain: 'Abyss',
    shortTag: 'TIDAL SURGE',
    ruleClause: 'Unleash crushing oceanic depth pressure that drowns enemy active buffs and pushes targets back one rank.',
    timing: 'Main Action',
    triggerTiming: 'Main Action',
    diceFormula: '3d10 Depth Pressure',
    damageMod: '3d10 Physical',
    energyCost: 3,
    synergyBonus: 'Extinguishes all active fire hazards and doubles frost spell effects.',
    loreSnippet: 'The infinite darkness of the ocean floor crushed empires before humanity walked.'
  },

  // ================= 2. COMBAT & WEAPON GLYPHS =================
  {
    id: 'glyph-seismic-crush',
    name: 'Seismic Crush',
    icon: '🔱',
    iconId: 'sword',
    category: 'combat',
    domain: 'Radiance',
    shortTag: 'SEISMIC CRUSH',
    ruleClause: 'Strike the ground with mythic weight to shatter enemy shields and knock targets down, cancelling their reactions for this phase.',
    timing: 'Main Action',
    triggerTiming: 'Main Action',
    diceFormula: '4d8 Crushing',
    damageMod: '4d8 Crushing',
    energyCost: 3,
    synergyBonus: 'Ignores 50% of target armor resistance.',
    loreSnippet: 'A single blow delivered with the gravitational torque of a falling comet.'
  },
  {
    id: 'glyph-multishot',
    name: 'Multishot Wild Bond',
    icon: '🏹',
    iconId: 'bow-multishot',
    category: 'combat',
    domain: 'Verdance',
    shortTag: 'MULTISHOT',
    ruleClause: 'A single arrow release divides into three spectral animal heads (Wolf, Bear, Stag) targeting up to 3 enemies across all lanes.',
    timing: 'Main Action',
    triggerTiming: 'Main Action',
    diceFormula: '3x 2d8 Piercing',
    damageMod: '3x 2d8 Split',
    energyCost: 3,
    synergyBonus: 'Can bypass Frontline Taunt defenders to hit vulnerable support champions.',
    loreSnippet: 'The spirit of the First Ironwood guides each arrow with primeval beast instinct.'
  },
  {
    id: 'glyph-caustic-maw',
    name: 'Caustic Maw',
    icon: '🩸',
    iconId: 'heavy-flail',
    category: 'combat',
    domain: 'Abyss',
    shortTag: 'CAUSTIC MAW',
    ruleClause: 'Every strike bites into target armor, permanently shredding 1 DEF and siphoning 2 Health directly to the wielder.',
    timing: 'On Hit',
    triggerTiming: 'On Hit',
    diceFormula: '2d8 Acid + Life Steal',
    damageMod: '2d8 Necrotic Acid',
    energyCost: 2,
    synergyBonus: 'Increases life steal by +100% when attacking bleeding targets.',
    loreSnippet: 'Iron teeth that hunger not for flesh, but for the soul-essence residing in metal.'
  },
  {
    id: 'glyph-lava-whip',
    name: 'Lava Whip Tether',
    icon: '🐍',
    iconId: 'flame',
    category: 'combat',
    domain: 'Radiance',
    shortTag: 'LAVA WHIP',
    ruleClause: 'Reach 20ft: Snare an enemy unit from Backline Support to Frontline Vanguard and apply Restrained status.',
    timing: 'Main Action',
    triggerTiming: 'Main Action',
    diceFormula: '2d8 Fire Snare',
    damageMod: '2d8 Fire',
    energyCost: 2,
    synergyBonus: 'Forces target to engage your toughest juggernaut in direct melee.',
    loreSnippet: 'Coiled serpentine fire that wraps around metal armor and fuses joints shut.'
  },
  {
    id: 'glyph-erupting-fury',
    name: 'Erupting Fury',
    icon: '⚡',
    iconId: 'zap',
    category: 'combat',
    domain: 'Radiance',
    shortTag: 'ERUPT FURY',
    ruleClause: 'When below 30% Health, Attack Power doubles and all melee attacks gain Area-of-Effect cleave.',
    timing: 'Passive Aura',
    triggerTiming: 'Passive Aura',
    diceFormula: '2x Base Power',
    damageMod: 'Double Power',
    energyCost: 0,
    synergyBonus: 'Immune to Fear and Stun effects while berserk.',
    loreSnippet: 'When pushed to the precipice of death, the soul releases its bottled solar fire.'
  },

  // ================= 3. DEFENSE & BASTION GLYPHS =================
  {
    id: 'glyph-magma-armor',
    name: 'Magma Armor',
    icon: '🛡️',
    iconId: 'shield',
    category: 'defensive',
    domain: 'Radiance',
    shortTag: 'MAGMA ARMOR',
    ruleClause: 'Melee attackers suffer 1d6 Fire backlash damage on contact; grants +3 Defense against Frost and Physical attacks.',
    timing: 'Passive Aura',
    triggerTiming: 'Passive Aura',
    diceFormula: '1d6 Fire Backlash',
    damageMod: '+3 DEF / 1d6 Thorns',
    energyCost: 1,
    synergyBonus: 'Melts incoming wooden and crystal projectiles on contact.',
    loreSnippet: 'Hardened basalt plates laced with glowing veins of liquid obsidian.'
  },
  {
    id: 'glyph-divine-ward',
    name: 'Divine Sanctuary Ward',
    icon: '☀️',
    iconId: 'divine-ward',
    category: 'defensive',
    domain: 'Sanctuary',
    shortTag: 'DIVINE WARD',
    ruleClause: 'Provides absolute immunity to Abyssal necrotic curses, prevents instant kill effects, and reduces all incoming damage by 5.',
    timing: 'Passive Aura',
    triggerTiming: 'Passive Aura',
    damageMod: '-5 Incoming DMG',
    energyCost: 2,
    synergyBonus: 'Heals adjacent friendly units for 3 HP whenever a ward absorbs an attack.',
    loreSnippet: 'The radiant aegis of the high seraphim, unbroken since the dawn of the cosmos.'
  },
  {
    id: 'glyph-energy-absorption',
    name: 'Astral Energy Absorption',
    icon: '🌌',
    iconId: 'sparkles',
    category: 'defensive',
    domain: 'Arcane',
    shortTag: 'ABSORPTION',
    ruleClause: 'Absorb incoming spell damage and convert 50% into temporary Essence crystals for your next turn.',
    timing: 'Fast Reaction',
    triggerTiming: 'Fast Reaction',
    damageMod: '50% Spell Convert',
    energyCost: 1,
    synergyBonus: 'Can negate an opposing Ultimate ability on successful DC 16 Arcana check.',
    loreSnippet: 'Prismatic crystal lattices that drink raw spellfire like cool water.'
  },
  {
    id: 'glyph-molten-core',
    name: 'Molten Core Regeneration',
    icon: '⭕',
    iconId: 'magma-rock',
    category: 'defensive',
    domain: 'Radiance',
    shortTag: 'MOLTEN CORE',
    ruleClause: 'Regenerate 3 Health at the beginning of each turn if stationed in a Fortified or Magma-active lane.',
    timing: 'Pre-Combat',
    triggerTiming: 'Pre-Combat',
    damageMod: '+3 HP / Turn',
    energyCost: 0,
    synergyBonus: 'Triples regeneration rate if bearer has less than 20% Health remaining.',
    loreSnippet: 'The inner heart never cools, constantly rebuilding damaged tissue with mineral rock.'
  },

  // ================= 4. CELESTIAL & RADIANT GLYPHS =================
  {
    id: 'glyph-consecration',
    name: 'Aetheria Consecration',
    icon: '👑',
    iconId: 'crown',
    category: 'celestial',
    domain: 'Sanctuary',
    shortTag: 'CONSECRATION',
    ruleClause: 'Create a 20ft sphere of radiant sunlight across the center lane. Fiend and Undead creatures take 6d10 Holy damage upon entry.',
    timing: 'Main Action',
    triggerTiming: 'Main Action',
    diceFormula: '6d10 Radiant',
    damageMod: '6d10 Holy',
    energyCost: 5,
    synergyBonus: 'Dispels all enemy stealth and cloaking fields across the entire board.',
    loreSnippet: 'The pure, unfiltered gaze of the sun god turns corrupted souls to vapor.'
  },
  {
    id: 'glyph-astral-amplification',
    name: 'Astral Lens Amplification',
    icon: '✨',
    iconId: 'sparkles',
    category: 'celestial',
    domain: 'Arcane',
    shortTag: 'ASTRAL AMP',
    ruleClause: 'All spells cast by your champions this round cost 1 less Essence and gain +2 bonus range across lanes.',
    timing: 'Pre-Combat',
    triggerTiming: 'Pre-Combat',
    damageMod: '+2 Range / -1 Cost',
    energyCost: 2,
    synergyBonus: 'Enables instant-speed spellcasting for next 2 tactical spells.',
    loreSnippet: 'Faceted sapphires cut at cosmic angles concentrate starlight into laser perfection.'
  },
  {
    id: 'glyph-resurrection-ward',
    name: 'Arcane Stasis Resurrection',
    icon: '♾️',
    iconId: 'hourglass',
    category: 'celestial',
    domain: 'Arcane',
    shortTag: 'RESURRECTION',
    ruleClause: 'Upon death, bearer is preserved in an astral stasis diamond and revives with 15 HP at start of next round.',
    timing: 'On Death',
    triggerTiming: 'On Death',
    damageMod: 'Revive 15 HP',
    energyCost: 4,
    synergyBonus: 'Emits a 3d6 blinding shockwave upon revival, stunning adjacent enemies.',
    loreSnippet: 'Time itself refuses to record the bearer’s demise, resetting their thread of fate.'
  },

  // ================= 5. ABYSSAL & CURSE GLYPHS =================
  {
    id: 'glyph-soulbound',
    name: 'Soulbound Blood Pact',
    icon: '💀',
    iconId: 'skull',
    category: 'abyssal',
    domain: 'Abyss',
    shortTag: 'SOULBOUND',
    ruleClause: 'When this unit is destroyed, you may sacrifice 3 Life to resurrect it immediately as an Abyssal Shadow Wraith.',
    timing: 'On Death',
    triggerTiming: 'On Death',
    diceFormula: 'Spawn Wraith (5 ATK / 5 DEF)',
    damageMod: 'Wraith Rebirth',
    energyCost: 2,
    synergyBonus: 'The newly spawned Wraith inherits all active enchantments of the fallen unit.',
    loreSnippet: 'Death is merely a doorway to a darker, more obedient manifestation.'
  },
  {
    id: 'glyph-necrotic-cackle',
    name: 'Planar Skeleton Key Bypass',
    icon: '🗝️',
    iconId: 'skeleton-key',
    category: 'abyssal',
    domain: 'Abyss',
    shortTag: 'PLANAR KEY',
    ruleClause: 'Bypasses Taunt mechanics, Fortify shields, and unlocks barriers. Steals 1 card from opponent hand on critical strike.',
    timing: 'On Hit',
    triggerTiming: 'On Hit',
    damageMod: 'Shield Bypass',
    energyCost: 2,
    synergyBonus: 'Permanently disables enemy artifact passive effects for 2 rounds.',
    loreSnippet: 'Carved from ivory bone, it whispers passwords that unlock dimensions.'
  },
  {
    id: 'glyph-abyssal-drain',
    name: 'Abyssal Essence Drain',
    icon: '🩸',
    iconId: 'dark-eye',
    category: 'abyssal',
    domain: 'Abyss',
    shortTag: 'ESSENCE DRAIN',
    ruleClause: 'Siphon 2 Essence crystals from the opposing player’s mana pool at the start of combat clashing.',
    timing: 'Pre-Combat',
    triggerTiming: 'Pre-Combat',
    damageMod: '-2 Enemy Mana',
    energyCost: 1,
    synergyBonus: 'Heals your champion for amount equal to drained energy.',
    loreSnippet: 'The cold void of the deep consumes power to sustain its eternal winter.'
  },

  // ================= 6. TACTICAL & FEY GLYPHS =================
  {
    id: 'glyph-fey-enchantment',
    name: 'Fey Enchantment Finesse',
    icon: '🌿',
    iconId: 'spear-reach',
    category: 'tactical',
    domain: 'Verdance',
    shortTag: 'FEY FINESSE',
    ruleClause: 'Attack damage scales with highest attribute (Strength or Speed). Unit ignores hazardous terrain and slow effects.',
    timing: 'Passive Aura',
    triggerTiming: 'Passive Aura',
    damageMod: '+3 Finesse Scaling',
    energyCost: 0,
    synergyBonus: 'Grants +2 Mobility in marsh and forest biomes.',
    loreSnippet: 'Fey weapons do not fight the wind or earth; they dance through the gaps between atoms.'
  },
  {
    id: 'glyph-truesight',
    name: 'Truesight Eye',
    icon: '👁️',
    iconId: 'eye',
    category: 'tactical',
    domain: 'Sanctuary',
    shortTag: 'TRUESIGHT',
    ruleClause: 'Reveals all Stealthed, Invisible, and Phase-Shifted enemies within 60ft. Prevents ambush surprises.',
    timing: 'Passive Aura',
    triggerTiming: 'Passive Aura',
    damageMod: 'Anti-Stealth',
    energyCost: 0,
    synergyBonus: 'Grants +20% Critical Strike chance against revealed targets.',
    loreSnippet: 'The all-seeing eye pierces planar veils, illusions, and shadows alike.'
  },
  {
    id: 'glyph-bound-returning',
    name: 'Bound Returning Weave',
    icon: '🍃',
    iconId: 'compass',
    category: 'tactical',
    domain: 'Verdance',
    shortTag: 'BOUND RETURN',
    ruleClause: 'After ranged attack or throw, weapon dissolves into spectral willow leaves and immediately reforms in bearer hands.',
    timing: 'End Phase Trigger',
    triggerTiming: 'End Phase Trigger',
    damageMod: 'Instant Reload',
    energyCost: 0,
    synergyBonus: 'Permits 1 additional reaction attack during opponent turn.',
    loreSnippet: 'Living wood tethered to its master by an unbreakable chord of fey devotion.'
  },
  {
    id: 'glyph-phase-shift',
    name: 'Temporal Phase Shift',
    icon: '⏳',
    iconId: 'hourglass',
    category: 'tactical',
    domain: 'Arcane',
    shortTag: 'PHASE SHIFT',
    ruleClause: 'Step outside the normal flow of time for 1 round. Immune to all direct targeting and lane hazard triggers.',
    timing: 'Fast Reaction',
    triggerTiming: 'Fast Reaction',
    damageMod: 'Invulnerable (1 Turn)',
    energyCost: 3,
    synergyBonus: 'Resets cooldown on all 1-cost tactical abilities.',
    loreSnippet: 'A temporal ripple that leaves an afterimage while the physical body resides in seconds yet to come.'
  },

  // ================= 7. MYTHIC GLYPHS =================
  {
    id: 'glyph-magma-serpent',
    name: 'World Coil Magma Serpent',
    icon: '🐉',
    iconId: 'magma-rock',
    category: 'mythic',
    domain: 'Radiance',
    shortTag: 'WORLD COIL',
    ruleClause: 'Awaken the subterranean Jörmungandr. All friendly fire attacks gain +3 Pierce and ignore Divine Ward protections.',
    timing: 'End Phase Trigger',
    triggerTiming: 'End Phase Trigger',
    diceFormula: '5d10 Volcanic Maw',
    damageMod: '+3 Pierce / 5d10',
    energyCost: 6,
    synergyBonus: 'Permanently burns ground into liquid slag for remainder of match.',
    loreSnippet: 'The colossal serpent whose tail circles the core of the burning earth.'
  },
  {
    id: 'glyph-ophanim-glory',
    name: 'Ophanim Wheel of Eyes',
    icon: '🌟',
    iconId: 'ophanim-rings',
    category: 'mythic',
    domain: 'Sanctuary',
    shortTag: 'OPHANIM EYE',
    ruleClause: 'Spins the concentric golden wheels. Renders absolute divine judgment dealing 7d10 Radiant damage across all enemy units.',
    timing: 'Main Action',
    triggerTiming: 'Main Action',
    diceFormula: '7d10 Divine Judgment',
    damageMod: '7d10 All Board',
    energyCost: 7,
    synergyBonus: 'Banishes all demons and undead instantly without graveyard triggers.',
    loreSnippet: 'Wheels within wheels, covered in eyes that never blink before righteousness.'
  }
];

export const CODEX_CATEGORIES = [
  { id: 'all', name: 'All Glyphs & Lexicon', icon: '📖' },
  { id: 'elemental', name: 'Elemental & Magma', icon: '🔥' },
  { id: 'combat', name: 'Combat & Strike', icon: '⚔️' },
  { id: 'defensive', name: 'Defense & Bastion', icon: '🛡️' },
  { id: 'celestial', name: 'Celestial & Holy', icon: '☀️' },
  { id: 'abyssal', name: 'Abyssal & Curses', icon: '💀' },
  { id: 'tactical', name: 'Tactical & Fey', icon: '🌿' },
  { id: 'mythic', name: 'Mythic & Cosmic', icon: '✨' }
];

// Helper to simulate dice formula rolls in the UI
export interface DiceRollResult {
  formula: string;
  individualRolls: number[];
  baseTotal: number;
  modifier: number;
  finalTotal: number;
  isCrit: boolean;
  damageType: string;
}

export function rollDiceFormula(formula: string): DiceRollResult {
  // Regex to extract dice e.g. "3d6 Fire" or "4d8 + 4 Radiant"
  const diceMatch = formula.match(/(\d+)d(\d+)(?:\s*\+\s*(\d+))?/i);
  const typeMatch = formula.match(/[a-zA-Z]+/g);
  const damageType = typeMatch ? typeMatch[typeMatch.length - 1] : 'Direct';

  if (!diceMatch) {
    return {
      formula,
      individualRolls: [8],
      baseTotal: 8,
      modifier: 0,
      finalTotal: 8,
      isCrit: false,
      damageType
    };
  }

  const count = parseInt(diceMatch[1], 10) || 1;
  const sides = parseInt(diceMatch[2], 10) || 6;
  const mod = diceMatch[3] ? parseInt(diceMatch[3], 10) : 0;

  const individualRolls: number[] = [];
  let sum = 0;
  for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    individualRolls.push(roll);
    sum += roll;
  }

  const isCrit = individualRolls.filter((r) => r === sides).length >= Math.ceil(count / 2);
  const finalTotal = isCrit ? (sum + mod) * 2 : sum + mod;

  return {
    formula,
    individualRolls,
    baseTotal: sum,
    modifier: mod,
    finalTotal,
    isCrit,
    damageType
  };
}

export function calculateAverageRoll(formula: string): number {
  const diceMatch = formula.match(/(\d+)d(\d+)(?:\s*\+\s*(\d+))?/i);
  if (!diceMatch) return 0;
  const count = parseInt(diceMatch[1], 10) || 1;
  const sides = parseInt(diceMatch[2], 10) || 6;
  const mod = diceMatch[3] ? parseInt(diceMatch[3], 10) : 0;
  return count * ((sides + 1) / 2) + mod;
}

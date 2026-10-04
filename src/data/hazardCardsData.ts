import { HazardCard, HazardDeckPreset, Domain } from '../types';

export const MASTER_HAZARD_DECK: HazardCard[] = [
  // ================= 1. RADIANCE / VOLCANIC / SCORCHED HAZARDS =================
  {
    id: 'HAZ-RAD-001-VOLCANIC-FISSURE',
    name: 'Molten Fissure Eruption',
    subtitle: 'RADIANCE DOMAIN • TECTONIC IGNITION',
    domain: 'Radiance',
    tier: 'Tier II',
    threatLevel: 3,
    category: 'Tectonic Rupture',
    roundDuration: 2,
    icon: '🌋',
    bgGradient: 'from-red-950 via-orange-950 to-stone-950',
    accentColor: '#f97316',
    flavorText: '"The earth splits asunder, spewing liquid flame that incinerates all unworthy armor."',
    description: 'All non-Radiance frontline units take 2 Burn debuff. Radiance champions gain +1 Power and fire abilities deal +2 bonus damage.',
    triggerTiming: 'Turn Start',
    buffTarget: 'radiance',
    passiveEffectSummary: 'Radiance units: +1 Power. Other frontline units: 2 Burn damage per turn.',
    mechanicalClause: {
      burnApplied: 2,
      powerModifier: 1,
      frontlineDamage: 1
    }
  },
  {
    id: 'HAZ-RAD-002-SOLAR-FLARE',
    name: 'Solar Flare Supernova',
    subtitle: 'RADIANCE DOMAIN • BLINDING HEAT',
    domain: 'Radiance',
    tier: 'Tier III',
    threatLevel: 4,
    category: 'Buff Surge',
    roundDuration: 2,
    icon: '☀️',
    bgGradient: 'from-yellow-950 via-orange-950 to-stone-950',
    accentColor: '#eab308',
    flavorText: '"The sun god unleashes blinding coronal mass ejections upon the planar theatre."',
    description: 'All units with Speed < 5 are Restrained/Blind for 1 round. Attackers deal +2 Critical Damage.',
    triggerTiming: 'Turn Start',
    buffTarget: 'radiance',
    passiveEffectSummary: 'Attacks deal +2 damage. Slow units have difficulty targeting.',
    mechanicalClause: {
      powerModifier: 2
    }
  },
  {
    id: 'HAZ-RAD-003-MAGMA-DELUGE',
    name: 'Magma Deluge Rain',
    subtitle: 'RADIANCE DOMAIN • PYROCLASTIC WAVE',
    domain: 'Radiance',
    tier: 'Tier I',
    threatLevel: 2,
    category: 'Environmental',
    roundDuration: 2,
    icon: '🔥',
    bgGradient: 'from-red-950 via-amber-950 to-stone-950',
    accentColor: '#ef4444',
    flavorText: '"Molten rocks rain continuously, melting defensive wards into slag."',
    description: 'Deals 1 fire damage to all frontline units at the start of each turn. Destroys 1 Shield from both champions.',
    triggerTiming: 'Turn Start',
    buffTarget: 'all',
    passiveEffectSummary: '1 Fire damage to all frontlines; strips 1 shield each turn.',
    mechanicalClause: {
      frontlineDamage: 1,
      burnApplied: 1
    }
  },

  // ================= 2. VERDANCE / ELDERVALE / NATURE HAZARDS =================
  {
    id: 'HAZ-VER-001-SPORE-BLOOM',
    name: 'Eldervale Spore Bloom',
    subtitle: 'VERDANCE DOMAIN • TOXIC SYMBIOSIS',
    domain: 'Verdance',
    tier: 'Tier I',
    threatLevel: 2,
    category: 'Environmental',
    roundDuration: 3,
    icon: '🍄',
    bgGradient: 'from-emerald-950 via-green-950 to-stone-950',
    accentColor: '#10b981',
    flavorText: '"Breathe deeply of the ancient spores. They mend the beast, but rot the steel."',
    description: 'All beast and organic units regenerate +2 Health at turn start. Opposing artifact weapons lose 1 charge or take 1 damage.',
    triggerTiming: 'Turn Start',
    buffTarget: 'verdance',
    passiveEffectSummary: 'Verdance & Beast units: +2 HP Regen/Turn. Metallic units suffer corrosion.',
    mechanicalClause: {
      healPerTurn: 2,
      poisonApplied: 1
    }
  },
  {
    id: 'HAZ-VER-002-BRAMBLE-WALL',
    name: 'Primal Ironbark Overgrowth',
    subtitle: 'VERDANCE DOMAIN • LIVING BARRIER',
    domain: 'Verdance',
    tier: 'Tier I',
    threatLevel: 2,
    category: 'Environmental',
    roundDuration: 2,
    icon: '🌿',
    bgGradient: 'from-green-950 via-emerald-950 to-neutral-950',
    accentColor: '#22c55e',
    flavorText: '"Thick thorns and towering ironbark roots erupt from the tiles, blocking straight charges."',
    description: 'Frontline units gain +3 Armor Class/Shield. Direct attacks against the Champion are blocked until frontline is clear.',
    triggerTiming: 'Turn Start',
    buffTarget: 'verdance',
    passiveEffectSummary: 'All frontline units gain +3 Shield. Direct attacks to champion locked.',
    mechanicalClause: {
      shieldGranted: 3
    }
  },
  {
    id: 'HAZ-VER-003-POLLEN-TEMPEST',
    name: 'Canopy Pollen Tempest',
    subtitle: 'VERDANCE DOMAIN • BRAMBLE MIRE',
    domain: 'Verdance',
    tier: 'Tier II',
    threatLevel: 3,
    category: 'Debuff Storm',
    roundDuration: 2,
    icon: '🌱',
    bgGradient: 'from-emerald-950 via-teal-950 to-stone-950',
    accentColor: '#059669',
    flavorText: '"Swirling pollen blinds sensory organs and slows reactions to a crawl."',
    description: 'Reduces attack power of all units by 1. At turn start, heals all injured champions by 2 HP.',
    triggerTiming: 'Turn Start',
    buffTarget: 'all',
    passiveEffectSummary: '-1 ATK to all units. Both champions heal 2 HP per turn.',
    mechanicalClause: {
      powerModifier: -1,
      healPerTurn: 2
    }
  },

  // ================= 3. SANCTUARY / CELESTIAL / SOLAR HAZARDS =================
  {
    id: 'HAZ-SAN-001-CELESTIAL-AEGIS',
    name: 'Radiant Dawn Sanctuary',
    subtitle: 'SANCTUARY DOMAIN • HOLY PRISM',
    domain: 'Sanctuary',
    tier: 'Tier II',
    threatLevel: 2,
    category: 'Buff Surge',
    roundDuration: 2,
    icon: '🛡️',
    bgGradient: 'from-amber-950 via-yellow-950 to-stone-950',
    accentColor: '#eab308',
    flavorText: '"Golden light descends upon the faithful, erecting a barrier impenetrable to dark sorceries."',
    description: 'Both champions receive +5 Shield. Spells that heal restore +50% extra Health.',
    triggerTiming: 'Turn Start',
    buffTarget: 'sanctuary',
    passiveEffectSummary: '+5 Shield to both champions; Sanctuary cards cost 1 less Essence.',
    mechanicalClause: {
      shieldGranted: 5,
      essenceBonus: 1,
      healPerTurn: 2
    }
  },
  {
    id: 'HAZ-SAN-002-LUNAR-ECLIPSE',
    name: 'Eclipse of the Blinded Sun',
    subtitle: 'SANCTUARY / ABYSS • ASTRONOMICAL VEIL',
    domain: 'Sanctuary',
    tier: 'Tier II',
    threatLevel: 3,
    category: 'Spatial Shift',
    roundDuration: 2,
    icon: '🌑',
    bgGradient: 'from-neutral-950 via-purple-950 to-stone-950',
    accentColor: '#9333ea',
    flavorText: '"When shadow swallows the light, even the righteous must tread softly in the dark."',
    description: 'Physical attacks suffer reduction unless attacking with a Relic or Magic Spell. Spells deal +2 damage.',
    triggerTiming: 'Turn Start',
    buffTarget: 'abyss',
    passiveEffectSummary: 'Physical attacks reduced; Magic Spells empowered (+2 Damage).',
    mechanicalClause: {
      powerModifier: -1
    }
  },
  {
    id: 'HAZ-SAN-003-SOLAR-BENEDICTION',
    name: 'High Seraph Benediction',
    subtitle: 'SANCTUARY DOMAIN • DIVINE CHORUS',
    domain: 'Sanctuary',
    tier: 'Tier III',
    threatLevel: 4,
    category: 'Buff Surge',
    roundDuration: 2,
    icon: '✨',
    bgGradient: 'from-amber-950 via-stone-900 to-amber-950',
    accentColor: '#fde047',
    flavorText: '"Angelic chants resonate through the planar ether, purging all afflictions."',
    description: 'Cleanses all Burn and Poison status effects from both sides. Frontline units receive +2 Shield each turn.',
    triggerTiming: 'Turn Start',
    buffTarget: 'all',
    passiveEffectSummary: 'Cleanses debuffs and grants +2 Shield each round.',
    mechanicalClause: {
      shieldGranted: 2,
      healPerTurn: 1
    }
  },

  // ================= 4. ARCANE / ASTRAL / CHRONO HAZARDS =================
  {
    id: 'HAZ-ARC-001-TEMPORAL-RIFT',
    name: 'Astral Temporal Paradox',
    subtitle: 'ARCANE DOMAIN • CHRONO DISTORTION',
    domain: 'Arcane',
    tier: 'Tier II',
    threatLevel: 3,
    category: 'Spatial Shift',
    roundDuration: 2,
    icon: '🌀',
    bgGradient: 'from-blue-950 via-indigo-950 to-stone-950',
    accentColor: '#3b82f6',
    flavorText: '"Time stutters. The present folds into tomorrow, granting glimpses of destiny yet to unfold."',
    description: 'Both players immediately draw 1 extra card. All Spells cost 1 less Essence to cast during this anomaly.',
    triggerTiming: 'Turn Start',
    buffTarget: 'arcane',
    passiveEffectSummary: 'Draw +1 Card. Spells cost -1 Essence across both turns.',
    mechanicalClause: {
      essenceBonus: 1
    }
  },
  {
    id: 'HAZ-ARC-002-LEYLINE-OVERLOAD',
    name: 'Leyline Resonance Surge',
    subtitle: 'ARCANE DOMAIN • MANA STORM',
    domain: 'Arcane',
    tier: 'Tier III',
    threatLevel: 4,
    category: 'Leyline Overload',
    roundDuration: 2,
    icon: '⚡',
    bgGradient: 'from-cyan-950 via-blue-950 to-stone-950',
    accentColor: '#06b6d4',
    flavorText: '"The invisible veins of the world swell with uncontained arcane momentum."',
    description: 'Both players gain +2 Essence immediately at turn start. Whenever a player casts a spell, they heal 2 Health.',
    triggerTiming: 'Turn Start',
    buffTarget: 'arcane',
    passiveEffectSummary: '+2 Essence to both players each turn; spellcasting triggers 2 HP heal.',
    mechanicalClause: {
      essenceBonus: 2,
      healPerTurn: 2
    }
  },
  {
    id: 'HAZ-ARC-003-GRAVITATIONAL-COLLAPSE',
    name: 'Singularity Event Horizon',
    subtitle: 'ARCANE DOMAIN • COSMIC GRAVITY',
    domain: 'Arcane',
    tier: 'Tier III',
    threatLevel: 4,
    category: 'Spatial Shift',
    roundDuration: 2,
    icon: '🌌',
    bgGradient: 'from-indigo-950 via-sky-950 to-stone-950',
    accentColor: '#38bdf8',
    flavorText: '"A miniature black hole warps projectiles and pulls all frontline fighters toward the center."',
    description: 'All units lose 1 Attack and gain +2 Shield as gravity compacts their armor matrices.',
    triggerTiming: 'Turn Start',
    buffTarget: 'all',
    passiveEffectSummary: '-1 ATK, +2 Shield to all combatants across both turns.',
    mechanicalClause: {
      powerModifier: -1,
      shieldGranted: 2
    }
  },

  // ================= 5. ABYSS / VOID / SHADOW HAZARDS =================
  {
    id: 'HAZ-ABY-001-VOID-MIASMA',
    name: 'Abyssal Void Miasma',
    subtitle: 'ABYSS DOMAIN • SOUL DRAIN',
    domain: 'Abyss',
    tier: 'Tier III',
    threatLevel: 4,
    category: 'Debuff Storm',
    roundDuration: 2,
    icon: '💀',
    bgGradient: 'from-purple-950 via-violet-950 to-stone-950',
    accentColor: '#a855f7',
    flavorText: '"The void hunger knows neither friend nor foe—only life to be extinguished."',
    description: 'At the start of each turn, all frontline units suffer 1 Poison and 1 Void Rot. Slain units deal 2 damage to their commander.',
    triggerTiming: 'Turn Start',
    buffTarget: 'abyss',
    passiveEffectSummary: 'All units suffer 1 Poison & Void Rot. Frontline takes 1 periodic damage.',
    mechanicalClause: {
      poisonApplied: 1,
      frontlineDamage: 1
    }
  },
  {
    id: 'HAZ-ABY-002-BLOOD-MOON',
    name: 'Blood Moon Reckoning',
    subtitle: 'ABYSS / RADIANCE • CARNAGE TIDE',
    domain: 'Abyss',
    tier: 'Tier III',
    threatLevel: 4,
    category: 'Buff Surge',
    roundDuration: 2,
    icon: '🩸',
    bgGradient: 'from-red-950 via-rose-950 to-stone-950',
    accentColor: '#dc2626',
    flavorText: '"Under the crimson orb, pain is transformed into raw, unstoppable ferocity."',
    description: 'All units gain Frenzy (+2 Attack) but lose 1 Health at the start of every turn.',
    triggerTiming: 'Turn Start',
    buffTarget: 'all',
    passiveEffectSummary: 'All units gain +2 Attack (Frenzy) but suffer 1 periodic bleeding damage.',
    mechanicalClause: {
      powerModifier: 2,
      burnApplied: 1,
      frontlineDamage: 1
    }
  },
  {
    id: 'HAZ-ABY-003-NETHER-FOG',
    name: 'Dread Nether Fog',
    subtitle: 'ABYSS DOMAIN • SPECTRAL GLOOM',
    domain: 'Abyss',
    tier: 'Tier II',
    threatLevel: 3,
    category: 'Debuff Storm',
    roundDuration: 2,
    icon: '🌫️',
    bgGradient: 'from-purple-950 via-stone-950 to-neutral-950',
    accentColor: '#9333ea',
    flavorText: '"Chilling ethereal vapors shroud the arena in suffocating silence."',
    description: 'Units cannot gain shields. At turn start, 1 random frontline unit on each side suffers Void Rot (-1 HP).',
    triggerTiming: 'Turn Start',
    buffTarget: 'abyss',
    passiveEffectSummary: 'Shield gains disabled; 1 random unit takes 1 Void damage per turn.',
    mechanicalClause: {
      frontlineDamage: 1
    }
  },

  // ================= 6. PLANAR CATACLYSMS (GLOBAL / NEUTRAL) =================
  {
    id: 'HAZ-NEU-001-TECTONIC-CATACLYSM',
    name: 'Planar Cataclysm: World Shatter',
    subtitle: 'NEUTRAL CATACLYSM • APOCALYPTIC RUPTURE',
    domain: 'Neutral',
    tier: 'Planar Cataclysm',
    threatLevel: 5,
    category: 'Tectonic Rupture',
    roundDuration: 1,
    icon: '⚡',
    bgGradient: 'from-stone-900 via-red-950 to-amber-950',
    accentColor: '#ef4444',
    flavorText: '"The foundational pillars of the Nexus buckle under celestial strain."',
    description: 'Deals 2 unavoidable direct damage to both Heroes and 2 damage to all frontline units on each side!',
    triggerTiming: 'Turn Start',
    buffTarget: 'all',
    passiveEffectSummary: 'Deals 2 damage to all heroes and pulverizes frontline units.',
    mechanicalClause: {
      frontlineDamage: 2
    }
  },
  {
    id: 'HAZ-NEU-002-FROSTBITE-BLIZZARD',
    name: 'Glacial Void Blizzard',
    subtitle: 'NEUTRAL ENVIRONMENT • FREEZING GALE',
    domain: 'Neutral',
    tier: 'Tier II',
    threatLevel: 3,
    category: 'Debuff Storm',
    roundDuration: 2,
    icon: '❄️',
    bgGradient: 'from-sky-950 via-cyan-950 to-stone-950',
    accentColor: '#38bdf8',
    flavorText: '"Sub-zero winds crystallize blood and freeze kinetic momentum in place."',
    description: 'Units suffer -1 Attack. Essence generation is tempered.',
    triggerTiming: 'Turn Start',
    buffTarget: 'all',
    passiveEffectSummary: 'Attacks deal -1 damage; chilling frost covers the battlefield.',
    mechanicalClause: {
      powerModifier: -1
    }
  }
];

// ================= SECONDARY HAZARD DECKS PRESETS =================

export const HAZARD_DECK_PRESETS: HazardDeckPreset[] = [
  {
    id: 'molten-caldera-hazard-deck',
    name: 'Molten Caldera Hazard Deck',
    subtitle: 'Radiance / Scorched Earth Hazards',
    domain: 'Radiance',
    environmentId: 'caldera',
    description: 'High offensive pressure with Pyroclastic Eruptions, Solar Supernovas, and persistent Burn damage ticks across both turns.',
    icon: '🌋',
    color: '#ef4444',
    threatTier: 'High Lethality',
    cards: MASTER_HAZARD_DECK.filter(h => h.domain === 'Radiance' || h.id.includes('CATACLYSM'))
  },
  {
    id: 'eldervale-canopy-hazard-deck',
    name: 'Eldervale Canopy Hazard Deck',
    subtitle: 'Verdance / Living Flora Hazards',
    domain: 'Verdance',
    environmentId: 'eldervale',
    description: 'Features Spore Blooms that heal biological combatants, Ironbark living walls for massive shield surges, and creeping pollen tempests.',
    icon: '🌿',
    color: '#10b981',
    threatTier: 'Sustained Attrition',
    cards: MASTER_HAZARD_DECK.filter(h => h.domain === 'Verdance' || h.domain === 'Sanctuary')
  },
  {
    id: 'astral-nexus-hazard-deck',
    name: 'Astral Nexus Hazard Deck',
    subtitle: 'Arcane / Chrono Anomaly Hazards',
    domain: 'Arcane',
    environmentId: 'astral',
    description: 'Unleashes Temporal Rifts, Leyline Resonance mana surges, and Singularity Event Horizons warping spellcasting costs and hand sizes.',
    icon: '🌀',
    color: '#3b82f6',
    threatTier: 'High Chaos',
    cards: MASTER_HAZARD_DECK.filter(h => h.domain === 'Arcane' || h.id.includes('TECTONIC') || h.domain === 'Neutral')
  },
  {
    id: 'abyssal-trench-hazard-deck',
    name: 'Abyssal Trench Hazard Deck',
    subtitle: 'Abyss / Soul Rot Hazards',
    domain: 'Abyss',
    environmentId: 'abyss',
    description: 'Inflicts Void Miasma poisoning, Blood Moon Frenzy surges, and Nether Fog dampening shields and draining life essence.',
    icon: '💀',
    color: '#a855f7',
    threatTier: 'Decay & Sacrifice',
    cards: MASTER_HAZARD_DECK.filter(h => h.domain === 'Abyss' || h.domain === 'Radiance')
  },
  {
    id: 'celestial-sanctuary-hazard-deck',
    name: 'Celestial Sanctuary Hazard Deck',
    subtitle: 'Sanctuary / Holy Aegis Hazards',
    domain: 'Sanctuary',
    environmentId: 'sanctuary',
    description: 'Bestows Radiant Dawn shields, High Seraph Benedictions cleansing debuffs, and divine solar protections.',
    icon: '🛡️',
    color: '#eab308',
    threatTier: 'Protective Barrier',
    cards: MASTER_HAZARD_DECK.filter(h => h.domain === 'Sanctuary' || h.domain === 'Verdance')
  },
  {
    id: 'global-cataclysm-hazard-deck',
    name: 'Planar Cataclysm Omnibus Deck',
    subtitle: 'Universal Nexus Anomaly Mix',
    domain: 'Neutral',
    environmentId: 'random',
    description: 'A volatile shuffle of every planar hazard and apocalyptic rupture from across all five elemental domains.',
    icon: '⚡',
    color: '#f59e0b',
    threatTier: 'Supreme Volatility',
    cards: [...MASTER_HAZARD_DECK]
  }
];

export function getRandomHazardCard(domainPreference?: string): HazardCard {
  if (domainPreference) {
    const matching = MASTER_HAZARD_DECK.filter(h => h.domain === domainPreference);
    if (matching.length > 0) {
      return matching[Math.floor(Math.random() * matching.length)];
    }
  }
  return MASTER_HAZARD_DECK[Math.floor(Math.random() * MASTER_HAZARD_DECK.length)];
}

export function getHazardDeckById(deckId: string): HazardDeckPreset {
  const found = HAZARD_DECK_PRESETS.find(d => d.id === deckId);
  return found || HAZARD_DECK_PRESETS[5];
}

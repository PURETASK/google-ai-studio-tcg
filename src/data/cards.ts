import { Card, DeckPreset } from '../types';
import { UNIVERSAL_POWER_GLYPHS } from './powerGlyphsData';
import { TEMPEST_CARDS } from './tempestCardsData';

export const CARDS_DATABASE: Card[] = [
  {
    id: 'RAD-CHP-001-MAGMA-JORMUNGANDR',
    name: 'Magma Jörmungandr',
    subtitle: 'RAGNAR VOLKAN • THE WORLD COIL OF LAVA • TIER S',
    alias: 'Ragnar Volkan',
    domain: 'Radiance',
    secondaryDomain: 'Abyss',
    cardType: 'Champion',
    subtype: 'Volkanic Clan Mythic Warrior',
    cost: 8,
    rarity: 'Mythic',
    power: 9,
    defense: 11,
    speed: 7,
    divineRank: 5,
    powerStars: 10,
    powerLevelTier: 'TIER S',
    laneRole: 'Center',
    affiliation: 'Volkanic Clan',
    primaryPower: 'Magma Manipulation / Terrain Eruption',
    quote: '"I am the lava that flows beneath the earth. I am the eruption that buries empires."',
    lore: 'Heir of the Volkanic clan, bound to the subterranean World Serpent of molten rock. When awakened, molten scales erupt from his body, turning the ground to liquid slag.',
    aestheticTheme: 'volcanic-dark',
    attributes: { damage: 9.5, durability: 9.0, mobility: 7.5, utility: 7.0, control: 9.0 },
    powerAttributes: {
      strength: 9.5,
      durability: 9.0,
      speed: 7.5,
      energyOutput: 9.0,
      fightingSkill: 8.5,
      intelligence: 7.5,
      control: 9.0
    },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[0], // Lava Control
      UNIVERSAL_POWER_GLYPHS[1], // Molten Burst
      UNIVERSAL_POWER_GLYPHS[2], // Volcanic Storm
      UNIVERSAL_POWER_GLYPHS[3], // Magma Armor
      UNIVERSAL_POWER_GLYPHS[7], // Magma Serpent
      UNIVERSAL_POWER_GLYPHS[8], // Molten Core
    ],
    abilities: [
      {
        id: 'mj-1',
        name: 'Infernal Tidal Wave',
        type: 'Action',
        iconType: 'flame',
        description: 'Channel a surging wave of liquid magma across enemy ranks, burning for 4d6 damage and igniting them.',
        damageDice: '4d6 Fire Magma'
      },
      {
        id: 'mj-2',
        name: 'World Coil Prison',
        type: 'Action',
        iconType: 'skull',
        description: 'Summon the magma serpent body to constrict the opposing champion for 2 rounds.',
        damageDice: '3d8 Crushing Heat'
      },
      {
        id: 'mj-3',
        name: 'Terraforming Eruption',
        type: 'Ultimate',
        iconType: 'flame',
        description: 'Shatter the crust beneath the battlefield, increasing all friendly fire damage by +100%.',
        damageDice: '7d10 Volcanic Shatter'
      }
    ],
    breakdownItems: [
      { label: 'Strength: 9.5', title: 'World Coil Juggernaut', description: 'Pummels fortified stone barriers to liquid slag.' },
      { label: 'Magma Regeneration', title: 'Lava Bath', description: 'Heals 3 HP at the start of each turn if in fire.' }
    ],
    artVisualTheme: {
      primaryColor: '#f97316',
      glowColor: '#c2410c',
      bgGradient: 'from-red-950 via-orange-950 to-neutral-950',
      iconSymbol: '🐉',
      badgeText: 'ELITE HERO',
      visualMotif: 'jormungandr'
    }
  },
  {
    id: 'VER-WEP-002-DUILOKIS',
    name: "Duilokis, The Bog-Warden's Reach",
    subtitle: 'WEAPON (SPEAR), VERY RARE (REQUIRES ATTUNEMENT)',
    domain: 'Verdance',
    cardType: 'Weapon',
    subtype: 'Willow-Leaf Spear / Fey Polearm',
    cost: 5,
    rarity: 'Very Rare',
    power: 7,
    defense: 5,
    speed: 8,
    divineRank: 4,
    powerStars: 8,
    powerLevelTier: 'TIER A+',
    laneRole: 'Flank',
    range: 'Reach (15ft)',
    attunementRequired: true,
    attunementDetail: 'Attunement by a Ranger, Druid or Warden of the Mire',
    quote: '"Forged in the heart of an ancient swamp, the spearhead resembles a long, tapering willow leaf with intricate, glowing green veins etched into its dark metal."',
    lore: 'Twisted living wood bound with ivy, crowned with a willow-leaf steel blade that pulses with primeval fey runes. Embedded at the crossguard are twin gems: an amber sunstone and a sapphire moonstone, balancing solar dawn and lunar marsh mist.',
    aestheticTheme: 'verdant-emerald',
    attributes: { damage: 8.0, durability: 6.5, mobility: 9.0, utility: 8.5, control: 8.0 },
    powerAttributes: {
      strength: 7.5,
      durability: 6.5,
      speed: 9.0,
      energyOutput: 7.5,
      fightingSkill: 9.0,
      intelligence: 7.0,
      control: 8.0
    },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[10], // Fey Enchantment
      UNIVERSAL_POWER_GLYPHS[11], // Spore Swarm
      UNIVERSAL_POWER_GLYPHS[12], // Bound Returning
      UNIVERSAL_POWER_GLYPHS[13], // Wild Companion
    ],
    abilities: [
      {
        id: 'dui-1',
        name: 'Spore Swarm Burst',
        type: 'Reaction',
        iconType: 'wind',
        description: 'When struck in melee, release a cloud of blinding wetland spores. Attacker must save DC 16 Con or become Poisoned for 2 turns.',
        damageDice: '2d6 Nature'
      },
      {
        id: 'dui-2',
        name: 'Returning Fey Thrust',
        type: 'Action',
        iconType: 'sword',
        description: 'Hurl spear across lanes (Reach 20ft). Deals 3d8 piercing damage and immediately returns into hands as spectral willow leaves.',
        damageDice: '3d8 Piercing'
      },
      {
        id: 'dui-3',
        name: 'Bog-Warden Tether',
        type: 'Ultimate',
        iconType: 'sparkles',
        description: 'Drive the spear into the swamp floor, summoning creeping thorn-roots that root all enemy frontline units.',
        damageDice: '5d8 Root Surge'
      }
    ],
    breakdownItems: [
      { label: 'Willow Leaf Blade', title: 'Dark Fey Steel', description: 'Veined with glowing green bio-luminescent runes.' },
      { label: 'Crossguard Gems', title: 'Sunstone & Moonstone', description: 'Harnesses cyclical dawn and twilight magic.' }
    ],
    artVisualTheme: {
      primaryColor: '#10b981',
      glowColor: '#059669',
      bgGradient: 'from-emerald-950 via-teal-950 to-neutral-950',
      iconSymbol: '🌿',
      badgeText: 'FEY SPEAR',
      visualMotif: 'duilokis'
    }
  },
  {
    id: 'RAD-WEP-001-WARPICK',
    name: 'Warpick of the Fire Mountain',
    subtitle: 'WEAPON (WAR PICK), RARE (ATTUNEMENT REQUIRED)',
    domain: 'Radiance',
    cardType: 'Weapon',
    subtype: 'War Pick / Magma Edge',
    cost: 5,
    rarity: 'Rare',
    power: 7,
    defense: 4,
    speed: 5,
    powerStars: 7,
    powerLevelTier: 'TIER A',
    laneRole: 'Center',
    attunementRequired: true,
    quote: '"Forged in the heart of a living volcano, its head shaped like a jagged mountain peak."',
    lore: 'When swung in battle, sparks and incandescent ash trail behind it like a miniature volcanic eruption. The rock within never ceases to smolder.',
    aestheticTheme: 'volcanic-dark',
    attributes: { damage: 8.5, durability: 6.0, mobility: 4.0, utility: 5.0, control: 7.5 },
    powerAttributes: {
      strength: 8.5,
      durability: 6.0,
      speed: 4.5,
      energyOutput: 8.0,
      fightingSkill: 8.0,
      intelligence: 6.0,
      control: 7.5
    },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[0], // Lava Control
      UNIVERSAL_POWER_GLYPHS[1], // Molten Burst
      UNIVERSAL_POWER_GLYPHS[4], // Seismic Crush
      UNIVERSAL_POWER_GLYPHS[5], // Earth Shatter
    ],
    abilities: [
      {
        id: 'wfm-1',
        name: "Mountain's Fury",
        type: 'Passive',
        iconType: 'flame',
        description: 'Attacks deal an additional 1d6 Fire damage and apply 2 stacks of Burn.',
        damageDice: '1d6 Fire',
        charges: 'Passive'
      },
      {
        id: 'wfm-2',
        name: 'Molten Burst',
        type: 'Reaction',
        iconType: 'zap',
        description: 'When defeating an enemy unit, erupt for 3d6 Fire damage to adjacent enemies (DC 15 Dex save).',
        damageDice: '3d6 Fire',
        charges: '3/Match'
      },
      {
        id: 'wfm-3',
        name: 'Eruption Strike',
        type: 'Ultimate',
        iconType: 'flame',
        description: 'Drive the pick into the ground to crack the battlefield and summon magma terrain for 2 rounds.',
        damageDice: '5d8 Magma'
      }
    ],
    breakdownItems: [
      { label: 'Volcanic Core', title: 'Obsidian & Magma Vein', description: 'Glows with 1200°C subterranean heat.' },
      { label: 'Grip', title: 'Dragonhide Wrap', description: 'Resistant to extreme thermal conductivity.' }
    ],
    artVisualTheme: {
      primaryColor: '#ef4444',
      glowColor: '#b91c1c',
      bgGradient: 'from-orange-950 via-red-950 to-neutral-950',
      iconSymbol: '🌋',
      badgeText: 'MAGMA WEAPON',
      visualMotif: 'warpick'
    }
  },
  {
    id: 'SAN-ART-001-BROOCH',
    name: 'Brooch of the Whispering Wilds',
    subtitle: 'WONDROUS ITEM, VERY RARE (REQUIRES ATTUNEMENT)',
    domain: 'Verdance',
    secondaryDomain: 'Sanctuary',
    cardType: 'Artifact',
    subtype: 'Amulet / Relic',
    cost: 4,
    rarity: 'Very Rare',
    power: 2,
    defense: 8,
    speed: 6,
    powerStars: 8,
    powerLevelTier: 'TIER A+',
    laneRole: 'Support',
    attunementRequired: true,
    attunementDetail: 'Attunement by a Druid, Ranger or Nature Warden',
    quote: '"The wild does not obey its bearer... it recognizes them as kin."',
    lore: 'Crafted in an age when the bond between beasts and mortals was still unbroken. It opens ancient pathways where trees remember and the deep earth guides the worthy.',
    aestheticTheme: 'verdant-emerald',
    attributes: { damage: 4.5, durability: 8.0, mobility: 6.5, utility: 9.5, control: 7.0 },
    powerAttributes: {
      strength: 3.5,
      durability: 8.0,
      speed: 6.5,
      energyOutput: 8.5,
      fightingSkill: 6.0,
      intelligence: 9.0,
      control: 7.5
    },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[10], // Fey Enchantment
      UNIVERSAL_POWER_GLYPHS[13], // Wild Companion
      UNIVERSAL_POWER_GLYPHS[19], // Truesight
      UNIVERSAL_POWER_GLYPHS[18], // Divine Ward
    ],
    abilities: [
      {
        id: 'bww-1',
        name: 'Voice of the Untamed',
        type: 'Passive',
        iconType: 'feather',
        description: 'All friendly beasts gain +2 Attack and +3 Health. When summoned, trigger calming presence.',
        charges: 'Passive'
      },
      {
        id: 'bww-2',
        name: 'Whispers Without Words',
        type: 'Action',
        iconType: 'wind',
        description: 'Draw 2 beast or nature cards. Costs no action penalty.',
        charges: '1/Turn'
      },
      {
        id: 'bww-3',
        name: 'Call of the Wild Guardian',
        type: 'Ultimate',
        iconType: 'sparkles',
        description: 'Summon a spirit beast companion with stats matching your current Essence pool.',
        damageDice: '3d8 Radiant Nature'
      }
    ],
    hiddenTrait: {
      title: 'The Forest Remembers',
      description: 'Summoned beasts retain memories of ancient wars, granting Advantage against Abyssal foes.'
    },
    breakdownItems: [
      { label: 'Emerald Heart', title: 'Verdant Gemstone', description: 'Pulses with primordial life force.' },
      { label: 'Living Filigree', title: 'Ironbark Weave', description: 'Bound with enchanted gold vines.' }
    ],
    artVisualTheme: {
      primaryColor: '#10b981',
      glowColor: '#059669',
      bgGradient: 'from-emerald-950 via-green-900 to-neutral-950',
      iconSymbol: '🌿',
      badgeText: 'VERDANT ESSENCE',
      visualMotif: 'brooch'
    }
  },
  {
    id: 'ABY-WEP-001-FLEAU',
    name: 'Fléau de la Gourmandise',
    subtitle: 'ARME DES PÉCHÉS CAPITAUX • VERY RARE (REQUIRES ATTUNEMENT)',
    domain: 'Abyss',
    cardType: 'Weapon',
    subtype: 'Living Demonic Flail',
    cost: 6,
    rarity: 'Very Rare',
    power: 8,
    defense: 5,
    speed: 6,
    powerStars: 8,
    powerLevelTier: 'TIER A+',
    laneRole: 'Center',
    attunementRequired: true,
    attunementDetail: 'Attunement by a Warlock or Blood Knight',
    quote: '"It does not merely crush armor; it hungers for the marrow within."',
    lore: 'A jagged black iron flail head forged with demonic runes that has split down the center into a ravenous mouth of razor-sharp fangs, continuously drooling caustic purple acid.',
    aestheticTheme: 'abyss-crimson',
    attributes: { damage: 9.0, durability: 6.0, mobility: 6.0, utility: 5.5, control: 8.5 },
    powerAttributes: {
      strength: 9.0,
      durability: 6.0,
      speed: 6.0,
      energyOutput: 8.0,
      fightingSkill: 8.5,
      intelligence: 6.0,
      control: 8.5
    },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[21], // Soulbound
      UNIVERSAL_POWER_GLYPHS[22], // Caustic Maw
      UNIVERSAL_POWER_GLYPHS[1],  // Molten Burst
      UNIVERSAL_POWER_GLYPHS[4],  // Seismic Crush
    ],
    abilities: [
      {
        id: 'flg-1',
        name: 'Devouring Maw',
        type: 'Passive',
        iconType: 'skull',
        description: 'Strikes tear away enemy armor, permanently lowering target Defense by 1 and siphoning 2 Health to the wielder.',
        damageDice: '2d8 Necrotic Acid',
        charges: 'Passive'
      },
      {
        id: 'flg-2',
        name: 'Acidic Chain Lash',
        type: 'Action',
        iconType: 'zap',
        description: 'Swing the spiked flail head across target lane, splashing purple caustic slime that blinds for 1 round.',
        damageDice: '3d8 Acid'
      }
    ],
    breakdownItems: [
      { label: 'Demonic Maw', title: 'Living Iron Jaws', description: 'Snaps shut on weapons to disarm opponents.' },
      { label: 'Cursed Spikes', title: 'Abyssal Steel', description: 'Drips corrosive acid that melts metal.' }
    ],
    artVisualTheme: {
      primaryColor: '#a855f7',
      glowColor: '#9333ea',
      bgGradient: 'from-purple-950 via-slate-950 to-neutral-950',
      iconSymbol: '⛓️',
      badgeText: 'DEVOURING FLAIL',
      visualMotif: 'fleau'
    }
  },
  {
    id: 'ABY-ART-002-SKELETONKEY',
    name: 'Skeleton Key',
    subtitle: 'WONDROUS ITEM, UNCOMMON • REQUIRES ATTUNEMENT',
    domain: 'Abyss',
    secondaryDomain: 'Arcane',
    cardType: 'Artifact',
    subtype: 'Necrotic Bone Relic',
    cost: 3,
    rarity: 'Rare',
    power: 3,
    defense: 6,
    speed: 7,
    powerStars: 6,
    powerLevelTier: 'TIER B',
    laneRole: 'Support',
    attunementRequired: true,
    quote: '"It whispers the secrets of locks that were never meant to be opened."',
    lore: 'Carved from aged ivory with a stack of miniature skulls forming the shaft. Glowing blue necrotic runes along its bit unlock barriers between physical rooms and planar vaults.',
    aestheticTheme: 'abyss-crimson',
    attributes: { damage: 3.5, durability: 5.5, mobility: 8.0, utility: 9.5, control: 7.0 },
    powerAttributes: {
      strength: 3.5,
      durability: 5.5,
      speed: 7.5,
      energyOutput: 7.0,
      fightingSkill: 5.5,
      intelligence: 9.5,
      control: 7.0
    },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[23], // Mocking Cackle
      UNIVERSAL_POWER_GLYPHS[14], // Phase Shift
      UNIVERSAL_POWER_GLYPHS[19], // Truesight
    ],
    abilities: [
      {
        id: 'skk-1',
        name: 'Master Lock Bypass',
        type: 'Passive',
        iconType: 'book',
        description: 'Ignore enemy Fortify shields, Taunt mechanics, and protective barrier enchantments.',
        charges: 'Passive'
      },
      {
        id: 'skk-2',
        name: 'Planar Breach',
        type: 'Action',
        iconType: 'sparkles',
        description: 'Open a temporary rift to draw the top card of the opponent’s deck and reduce its cost by 2.',
        charges: '1/Match'
      }
    ],
    breakdownItems: [
      { label: 'Skull Stack Shaft', title: 'Carved Ancient Bone', description: 'Glows with frosty blue arcane vapor.' },
      { label: 'Runic Bit', title: 'Skeleton Mechanism', description: 'Adapts its shape to fit any lock mechanism.' }
    ],
    artVisualTheme: {
      primaryColor: '#38bdf8',
      glowColor: '#0284c7',
      bgGradient: 'from-slate-950 via-blue-950 to-neutral-950',
      iconSymbol: '🗝️',
      badgeText: 'PLANAR KEY',
      visualMotif: 'skeletonkey'
    }
  },
  {
    id: 'ARC-REL-002-PRETASTRA',
    name: 'Pretāstra',
    subtitle: 'MAJOR CELESTIAL ARTIFACT • LEGACY OF THE ANCIENTS',
    domain: 'Arcane',
    cardType: 'Artifact',
    subtype: 'Cosmic Stargate Mirror',
    cost: 7,
    rarity: 'Legendary',
    power: 4,
    defense: 10,
    speed: 8,
    divineRank: 5,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Support',
    quote: '"Eight directions of the cosmos converge into a single sapphire focal lens."',
    lore: 'An eight-pointed brass and starlight device with eight faceted sapphires mounted at each compass node. Within its inner ring swirls the cosmic stardust of ancient constellations.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 6.0, durability: 9.0, mobility: 8.0, utility: 10.0, control: 9.5 },
    powerAttributes: {
      strength: 4.0,
      durability: 9.0,
      speed: 8.0,
      energyOutput: 10.0,
      fightingSkill: 7.0,
      intelligence: 10.0,
      control: 9.5
    },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[15], // Astral Amplification
      UNIVERSAL_POWER_GLYPHS[16], // Energy Absorption
      UNIVERSAL_POWER_GLYPHS[14], // Phase Shift
      UNIVERSAL_POWER_GLYPHS[17], // Resurrection Ward
    ],
    abilities: [
      {
        id: 'pre-1',
        name: 'Starlight Harmonic Pulse',
        type: 'Action',
        iconType: 'sparkles',
        description: 'Release an eight-directional cosmic flare dealing 5d8 Astral damage to all enemy units.',
        damageDice: '5d8 Astral'
      },
      {
        id: 'pre-2',
        name: 'Celestial Anchor',
        type: 'Passive',
        iconType: 'hourglass',
        description: 'All spells played by your side cannot be countered or dispelled.',
        charges: 'Passive'
      }
    ],
    breakdownItems: [
      { label: '8-Pointed Brass Frame', title: 'Celestial Geometry', description: 'Rotates in harmony with planar alignments.' },
      { label: 'Sapphire Lens Array', title: 'Cosmic Star Diamonds', description: 'Channels starlight into focused beams.' }
    ],
    artVisualTheme: {
      primaryColor: '#60a5fa',
      glowColor: '#2563eb',
      bgGradient: 'from-blue-950 via-slate-950 to-neutral-950',
      iconSymbol: '✨',
      badgeText: 'ANCIENT GATE',
      visualMotif: 'pretastra'
    }
  },
  {
    id: 'VER-WEP-003-GREATBOW',
    name: 'Greatbow of the Multishot Wild Bond',
    subtitle: 'WEAPON (GREATBOW), LEGENDARY (REQUIRES ATTUNEMENT)',
    domain: 'Verdance',
    cardType: 'Weapon',
    subtype: 'Ancient World-Tree Greatbow',
    cost: 6,
    rarity: 'Legendary',
    power: 8,
    defense: 4,
    speed: 9,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Flank',
    range: 'Ranged (150/600 ft)',
    attunementRequired: true,
    attunementDetail: 'Attunement by a Master Ranger',
    quote: '"One arrow released becomes the charge of the great forest beasts."',
    lore: 'Carved from an unyielding branch of the First Ironwood. When drawn, the string summons the roaring spectral heads of a wolf, a bear, and a stag that guide three split arrows simultaneously.',
    aestheticTheme: 'verdant-emerald',
    attributes: { damage: 9.0, durability: 5.5, mobility: 8.5, utility: 7.5, control: 8.0 },
    powerAttributes: {
      strength: 8.0,
      durability: 5.5,
      speed: 9.5,
      energyOutput: 8.5,
      fightingSkill: 9.5,
      intelligence: 8.0,
      control: 8.0
    },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[14], // Multishot Wild Bond
      UNIVERSAL_POWER_GLYPHS[13], // Wild Companion
      UNIVERSAL_POWER_GLYPHS[10], // Fey Enchantment
      UNIVERSAL_POWER_GLYPHS[19], // Truesight
    ],
    abilities: [
      {
        id: 'gbw-1',
        name: 'Trident Spirit Volley',
        type: 'Action',
        iconType: 'wind',
        description: 'Fire three spectral animal arrows across all 3 lanes simultaneously, dealing 2d8 damage per target.',
        damageDice: '3x 2d8 Pierce'
      },
      {
        id: 'gbw-2',
        name: 'Eagle-Eye Snipe',
        type: 'Action',
        iconType: 'eye',
        description: 'Target the enemy Backline Champion directly, ignoring Frontline Taunt units.',
        damageDice: '4d10 Heavy Pierce'
      }
    ],
    breakdownItems: [
      { label: 'First Ironwood', title: 'Ancient Tree Heart', description: 'Never warps or loses its tensile power.' },
      { label: 'Spirit String', title: 'Sylvaen Weave', description: 'Generates its own ethereal ammunition.' }
    ],
    artVisualTheme: {
      primaryColor: '#10b981',
      glowColor: '#047857',
      bgGradient: 'from-emerald-950 via-stone-900 to-neutral-950',
      iconSymbol: '🏹',
      badgeText: 'SPIRIT BOW',
      visualMotif: 'greatbow'
    }
  },
  {
    id: 'ARC-ART-001-RING-ETERNITY',
    name: 'Ring of Arcane Eternity',
    subtitle: 'MAJOR ARTIFACT • CASTER LEVEL 30TH',
    domain: 'Arcane',
    cardType: 'Artifact',
    subtype: 'Ring Slot / Cosmic Relic',
    cost: 7,
    rarity: 'Mythic',
    power: 3,
    defense: 12,
    speed: 7,
    divineRank: 5,
    powerStars: 10,
    powerLevelTier: 'TIER S',
    laneRole: 'Support',
    status: 'Awakened',
    quote: '"Eternity is not a gift. It is a responsibility."',
    lore: 'A timeless circle of purest arcane essence, forged beyond the boundaries of time and mortality. It grants its wearer existence free from decay.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 5.0, durability: 10.0, mobility: 7.0, utility: 10.0, control: 9.0 },
    powerAttributes: {
      strength: 3.0,
      durability: 10.0,
      speed: 7.0,
      energyOutput: 10.0,
      fightingSkill: 6.0,
      intelligence: 10.0,
      control: 9.5
    },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[17], // Arcane Resurrection
      UNIVERSAL_POWER_GLYPHS[14], // Phase Shift
      UNIVERSAL_POWER_GLYPHS[15], // Astral Amplification
      UNIVERSAL_POWER_GLYPHS[16], // Energy Absorption
    ],
    abilities: [
      {
        id: 'rae-1',
        name: 'Immortality Ward',
        type: 'Passive',
        iconType: 'hourglass',
        description: 'Bearer cannot suffer lethal damage in a single strike; excess damage over 10 is dissipated into the astral rift.',
        charges: 'Passive'
      },
      {
        id: 'rae-2',
        name: 'Arcane Resurrection',
        type: 'Ultimate',
        iconType: 'sparkles',
        description: 'Upon hero defeat, automatically restore 15 Health and freeze all enemy units for 1 round.',
        charges: '1/Game'
      },
      {
        id: 'rae-3',
        name: 'Time Dilation',
        type: 'Action',
        iconType: 'eye',
        description: 'Draw 3 additional cards and reduce all spell costs in hand by 1 Essence this turn.',
        charges: '1/Turn'
      }
    ],
    breakdownItems: [
      { label: 'Astral Gem', title: 'Sapphire of the Cosmos', description: 'Reflects constellations that do not yet exist.' },
      { label: 'Runed Inner Band', title: 'Celestial Script', description: 'Etched with the true names of primordial stars.' }
    ],
    artVisualTheme: {
      primaryColor: '#3b82f6',
      glowColor: '#1d4ed8',
      bgGradient: 'from-blue-950 via-indigo-950 to-neutral-950',
      iconSymbol: '💍',
      badgeText: 'TIMELESS ARTIFACT'
    }
  },
  {
    id: 'VER-ARM-001-MANTLE',
    name: 'The Verdant Mantle',
    subtitle: 'IRONBARK PLATE • ARMOR (PLATE), VERY RARE',
    domain: 'Verdance',
    cardType: 'Armor',
    subtype: 'Living Wood Armor',
    cost: 5,
    rarity: 'Very Rare',
    power: 3,
    defense: 10,
    attunementRequired: true,
    weight: '55 lbs',
    quote: '"The forest stands because I stand. The earth moves when I command."',
    lore: 'Carved from living ironbark wood, its heavy plates bound together by thick, pulsing emerald vines that actively mend fractures during battle.',
    aestheticTheme: 'verdant-emerald',
    attributes: { damage: 3.5, durability: 9.5, mobility: 3.0, utility: 7.5, control: 8.0 },
    abilities: [
      {
        id: 'vm-1',
        name: 'Blight Splintering',
        type: 'Reaction',
        iconType: 'shield',
        description: 'Upon taking damage, spawn a 2/2 Needle Blight with Taunt in front of you.',
        charges: '2 Charges'
      },
      {
        id: 'vm-2',
        name: 'Vine Lash',
        type: 'Action',
        iconType: 'wind',
        description: 'Shoot thorny vines to drag a target enemy into melee range, dealing 1d8 piercing damage and immobilizing them.',
        damageDice: '1d8 Piercing'
      },
      {
        id: 'vm-3',
        name: 'Forest Walk',
        type: 'Passive',
        iconType: 'feather',
        description: 'Ignore terrain hazards and gain +2 Armor Class when standing on verdant ground.',
        charges: 'Passive'
      }
    ],
    breakdownItems: [
      { label: 'Living Ironbark', title: 'Self-Regenerating Bark', description: 'Heals 2 HP each round in combat.' },
      { label: 'Emerald Heart Core', title: 'Gaia Conduit', description: 'Transmutes raw kinetic impacts into bio-energy.' }
    ],
    artVisualTheme: {
      primaryColor: '#10b981',
      glowColor: '#047857',
      bgGradient: 'from-emerald-950 via-stone-900 to-neutral-950',
      iconSymbol: '🛡️',
      badgeText: 'IRONBARK PLATE'
    }
  },
  {
    id: 'SAN-BST-001-LUMINARIS',
    name: 'Luminaris',
    subtitle: "THE WORLD'S FIRST LIGHT-BREATHING CREATURE",
    domain: 'Sanctuary',
    cardType: 'Beast',
    subtype: 'Celestial Fox / Light Spirt',
    cost: 3,
    rarity: 'Rare',
    power: 4,
    defense: 5,
    speed: 9,
    quote: '"It doesn’t eat, it doesn’t drink, it lives entirely on pure starlight."',
    lore: 'Born from celestial auroras, its glasslike luminous wings absorb ambient sunlight and convert it directly into radiant pulses that cleanse corruption.',
    aestheticTheme: 'starlight-rose',
    attributes: { damage: 5.5, durability: 4.5, mobility: 9.5, utility: 8.5, control: 6.0 },
    abilities: [
      {
        id: 'lum-1',
        name: 'Light Ingestion',
        type: 'Passive',
        iconType: 'sun',
        description: 'Absorbs 50% of incoming magic and converts it into healing pulses for allies.',
        charges: 'Passive'
      },
      {
        id: 'lum-2',
        name: 'Starlight Flicker',
        type: 'Action',
        iconType: 'sparkles',
        description: 'Blind target opposing unit for 1 turn; deal 2d6 Radiant damage.',
        damageDice: '2d6 Radiant'
      }
    ],
    artVisualTheme: {
      primaryColor: '#f59e0b',
      glowColor: '#fbbf24',
      bgGradient: 'from-amber-950 via-slate-900 to-neutral-950',
      iconSymbol: '🦊',
      badgeText: 'LIGHT-BREATHER'
    }
  },
  {
    id: 'ARC-CHP-001-TARANIS',
    name: 'Taranis',
    subtitle: 'CELTIC GOD OF THUNDER • HIT POINTS: 345',
    domain: 'Arcane',
    secondaryDomain: 'Radiance',
    cardType: 'Champion',
    subtype: 'Storm Deity / Mythic Warlord',
    cost: 8,
    rarity: 'Mythic',
    power: 9,
    defense: 14,
    speed: 8,
    divineRank: 5,
    quote: '"The thunder is my voice. The storm is my will. Though the world weeps, I shall not fall."',
    lore: 'During the War of the Weeping Souls, Taranis marshaled the fury of the storm. His vorpal blade cleaves mountains and his golden thunder-shield commands lightning.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 9.5, durability: 9.0, mobility: 8.0, utility: 7.5, control: 9.0 },
    abilities: [
      {
        id: 'tar-1',
        name: 'Celtic Vorpal Strike',
        type: 'Action',
        iconType: 'zap',
        description: 'Melee lightning slash dealing 4d8 slashing + 4d8 lightning damage. Decapitates on critical strike.',
        damageDice: '8d8 Lightning'
      },
      {
        id: 'tar-2',
        name: 'Thunderclap',
        type: 'Action',
        iconType: 'zap',
        description: 'Release a deafening shockwave within 60ft. Enemies must save DC 20 Con or take 6d10 damage and become Stunned.',
        damageDice: '6d10 Thunder',
        charges: 'Recharge 5-6'
      },
      {
        id: 'tar-3',
        name: 'Call the Storm',
        type: 'Ultimate',
        iconType: 'wind',
        description: 'Summon an apocalyptic hurricane across the arena. Random lightning bolts strike enemy units every turn.',
        damageDice: '10d8 Cosmic Storm'
      }
    ],
    breakdownItems: [
      { label: 'Strength: 28 (+9)', title: 'Godlike Might', description: 'Cleaves through heavy fortification.' },
      { label: 'Armor Class: 24', title: 'Celtic Gilded Aegis', description: 'Immune to electric and thunder damage.' }
    ],
    artVisualTheme: {
      primaryColor: '#38bdf8',
      glowColor: '#0284c7',
      bgGradient: 'from-sky-950 via-slate-900 to-neutral-950',
      iconSymbol: '⚡',
      badgeText: 'THUNDER DEITY'
    }
  },
  {
    id: 'ARC-WEP-002-GROMCOIL',
    name: 'Gromcoil',
    subtitle: 'WEAPON (WHIP), VERY RARE (REQUIRES ATTUNEMENT)',
    domain: 'Arcane',
    cardType: 'Weapon',
    subtype: 'Storm Articulated Whip',
    cost: 4,
    rarity: 'Very Rare',
    power: 6,
    defense: 3,
    attunementRequired: true,
    quote: '"Its single articulated spine coils like a metal serpent, lashing prey with lightning before locking them in a crackling bind."',
    lore: 'Segmented whip crafted from dark arcsteel and threaded with blue-white stormlight. Designed to subdue colossi and siphon their kinetic energy.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 7.0, durability: 5.5, mobility: 8.5, utility: 7.0, control: 9.5 },
    abilities: [
      {
        id: 'grom-1',
        name: 'Arc Lash',
        type: 'Passive',
        iconType: 'zap',
        description: 'On hit, the target takes an additional 1d6 Lightning damage and chains 50% damage to the nearest enemy.',
        damageDice: '1d6 Lightning',
        charges: 'Passive'
      },
      {
        id: 'grom-2',
        name: 'Binding Coil',
        type: 'Action',
        iconType: 'zap',
        description: 'Wrap around target unit. DC 17 Strength save or become Restrained and take 2d8 shock damage every turn.',
        damageDice: '2d8 Shock',
        charges: '1/Match'
      },
      {
        id: 'grom-3',
        name: 'Storm Halo',
        type: 'Ultimate',
        iconType: 'sparkles',
        description: 'Spin Gromcoil into a high-speed storm ring emanation. Deals 6d6 lightning damage to all adjacent enemies.',
        damageDice: '6d6 Lightning'
      }
    ],
    artVisualTheme: {
      primaryColor: '#60a5fa',
      glowColor: '#2563eb',
      bgGradient: 'from-blue-950 via-slate-950 to-neutral-950',
      iconSymbol: '🌀',
      badgeText: 'ARCSTEEL WHIP'
    }
  },
  {
    id: 'VER-CHP-002-BRUMHORN',
    name: 'Brumhorn',
    subtitle: 'THE TIMBER GUARDIAN • ROLE: TANK / ROAM',
    domain: 'Verdance',
    cardType: 'Champion',
    subtype: 'Tauren / Forest Frontliner',
    cost: 6,
    rarity: 'Rare',
    power: 6,
    defense: 12,
    speed: 3,
    quote: '"I do not destroy the forest. I defend its will."',
    lore: 'A roaming tauren juggernaut who wields an entire petrified redwood log to reshape battle positioning, disrupt enemy ranks, and protect his companions.',
    aestheticTheme: 'verdant-emerald',
    attributes: { damage: 3.0, durability: 9.5, mobility: 2.5, utility: 7.5, control: 9.0 },
    abilities: [
      {
        id: 'brum-1',
        name: 'Heavy Timber (Passive)',
        type: 'Passive',
        iconType: 'shield',
        description: 'Basic attacks build Tension stacks (up to 5). Each stack increases knockback distance and damage by 15%.',
        charges: 'Passive'
      },
      {
        id: 'brum-2',
        name: 'Log Swing & Rolling Timber',
        type: 'Action',
        iconType: 'sword',
        description: 'Swing massive log in a 180° arc, pushing front row enemies back and dealing 3d6 physical crushing damage.',
        damageDice: '3d6 Crushing'
      },
      {
        id: 'brum-3',
        name: 'Rooted Stance',
        type: 'Bonus Action',
        iconType: 'shield',
        description: 'Plant log into the ground. Gain 50% damage reduction and force all enemies to target Brumhorn for 1 round.',
        charges: '2 Turn Cooldown'
      },
      {
        id: 'brum-4',
        name: 'Forest Avalanche',
        type: 'Ultimate',
        iconType: 'wind',
        description: 'Heave giant log across the arena, stunning all targets in its trajectory and crushing barriers.',
        damageDice: '6d10 Redwood Impact'
      }
    ],
    breakdownItems: [
      { label: 'Role', title: 'Disruptive Vanguard', description: 'Physical crowd control specialist.' },
      { label: 'Tauren Might', title: 'Ancient Forest Blood', description: 'Immune to displacement and forced knockback.' }
    ],
    artVisualTheme: {
      primaryColor: '#84cc16',
      glowColor: '#4d7c0f',
      bgGradient: 'from-stone-950 via-emerald-950 to-neutral-950',
      iconSymbol: '🐂',
      badgeText: 'TIMBER GUARDIAN'
    }
  },
  {
    id: 'SAN-WEP-002-STAR-SLAYER',
    name: 'The Star-Slayer Bow',
    subtitle: 'A WEAPON OF LIGHT, A PROMISE OF PROTECTION',
    domain: 'Sanctuary',
    secondaryDomain: 'Arcane',
    cardType: 'Weapon',
    subtype: 'Celestial Bow',
    cost: 6,
    rarity: 'Legendary',
    power: 8,
    defense: 4,
    quote: '"Its arrows are not forged, but born from will, shaped by the heart, and released as radiant butterflies."',
    lore: 'Forged from moonlit wood and starlight silver, this bow pierces through darkness, lies, and curses. Its bowstring is a thread of living pink celestial light.',
    aestheticTheme: 'starlight-rose',
    attributes: { damage: 8.5, durability: 5.0, mobility: 8.5, utility: 8.0, control: 7.0 },
    abilities: [
      {
        id: 'ssb-1',
        name: 'Butterfly Arrows',
        type: 'Passive',
        iconType: 'sparkles',
        description: 'Arrows ignore physical armor and shields, directly targeting essence with radiant bypass.',
        charges: 'Passive'
      },
      {
        id: 'ssb-2',
        name: 'Silver Moonfiligree',
        type: 'Action',
        iconType: 'moon',
        description: 'Shoot a volley of 3 homing star-bursts dealing 2d8 damage each and illuminating hidden units.',
        damageDice: '3x 2d8 Radiant'
      },
      {
        id: 'ssb-3',
        name: 'Charm of Promise',
        type: 'Reaction',
        iconType: 'heart',
        description: 'When an ally takes fatal damage, expend the charm to grant them divine invulnerability for 1 turn.',
        charges: '1/Match'
      }
    ],
    breakdownItems: [
      { label: 'Lunar Wood', title: 'White Star-Bough', description: 'Harvested under eternal eclipse.' },
      { label: 'Heart Core', title: 'Rose Crystal Focus', description: 'Synchronizes with the archer’s emotional resolve.' }
    ],
    artVisualTheme: {
      primaryColor: '#f43f5e',
      glowColor: '#be123c',
      bgGradient: 'from-pink-950 via-rose-950 to-neutral-950',
      iconSymbol: '🏹',
      badgeText: 'STARLIGHT BOW'
    }
  },
  {
    id: 'ARC-DIV-001-LEVIATHAN',
    name: 'Leviathan',
    subtitle: 'TRIDENT OF THE ABYSSAL KING • DIVINE RANK ★★★★★',
    domain: 'Arcane',
    secondaryDomain: 'Abyss',
    cardType: 'Relic',
    subtype: 'Divine Abyssal Weapon',
    cost: 9,
    rarity: 'Divine Boundless',
    power: 10,
    defense: 12,
    divineRank: 5,
    status: 'Awakened',
    quote: '"When the oceans needed a king... they forged LEVIATHAN."',
    lore: 'The primordial scepter of oceanic dominion. Its three prongs command abyssal tsunamis, fathomless trenches, and the ancient krakens sleeping in the depths.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 9.8, durability: 9.2, mobility: 7.5, utility: 9.0, control: 10.0 },
    abilities: [
      {
        id: 'lev-1',
        name: 'Ocean Dominion',
        type: 'Passive',
        iconType: 'wind',
        description: 'All water and frost spells cost 2 less Essence. Drown opposing frontline in abyssal pressure.',
        charges: 'Passive'
      },
      {
        id: 'lev-2',
        name: 'Maelstrom Surge',
        type: 'Action',
        iconType: 'zap',
        description: 'Create a swirling whirlpool vortex that pulls all opposing cards into a single collision zone.',
        damageDice: '5d8 Frost Water'
      },
      {
        id: 'lev-3',
        name: 'Tsunami Genesis',
        type: 'Ultimate',
        iconType: 'sparkles',
        description: 'Summon the Great Abyssal Wave. Clears all non-Champion cards from the opponent board.',
        damageDice: '8d12 Primordial Flood'
      }
    ],
    breakdownItems: [
      { label: 'Origin', title: 'Abyssal Trench', description: 'Pressure-forged at 11,000 fathoms depth.' },
      { label: 'Weight', title: 'Weight of the Sea', description: 'Changes mass according to the tide cycles.' }
    ],
    artVisualTheme: {
      primaryColor: '#0ea5e9',
      glowColor: '#0369a1',
      bgGradient: 'from-sky-950 via-cyan-950 to-neutral-950',
      iconSymbol: '🔱',
      badgeText: 'DIVINE WEAPON'
    }
  },
  {
    id: 'ABY-CHP-001-DAMYAN',
    name: 'Damyan',
    subtitle: 'SUPREME DEMON SNAKE • POWER LEVEL: ∞ BOUNDLESS',
    domain: 'Abyss',
    cardType: 'Champion',
    subtype: 'Cosmic Serpent Entity',
    cost: 10,
    rarity: 'Divine Boundless',
    power: 12,
    defense: 15,
    divineRank: 5,
    status: 'Ascended',
    quote: '"He is not a part of the story — he is the author, the page, and the eraser."',
    lore: 'Born from the void before time itself. He witnessed the birth of infinite universes and commands endless cosmic serpent forces, void matter, and necrotic infinity.',
    aestheticTheme: 'abyss-crimson',
    attributes: { damage: 10.0, durability: 10.0, mobility: 9.0, utility: 10.0, control: 10.0 },
    abilities: [
      {
        id: 'dam-1',
        name: 'Cosmic Dark Magic',
        type: 'Passive',
        iconType: 'skull',
        description: 'Negates all damage from Common to Rare cards. Every turn, siphons 3 Essence from the enemy.',
        charges: 'Passive'
      },
      {
        id: 'dam-2',
        name: 'Reality Manipulation',
        type: 'Action',
        iconType: 'eye',
        description: 'Rewrite the combat board: swap an enemy minion to your side and corrupt its attributes with Abyss.',
        charges: '1/Turn'
      },
      {
        id: 'dam-3',
        name: 'Soul Devourer & Story Eraser',
        type: 'Ultimate',
        iconType: 'skull',
        description: 'Erase an enemy card permanently from the current match, restoring full health to Damyan.',
        damageDice: '∞ Boundless Void'
      }
    ],
    breakdownItems: [
      { label: 'Weakness', title: 'None', description: 'Transcends standard vulnerabilities and mortality.' },
      { label: 'Realm', title: 'Infinite Dark Serpent Realm', description: 'Void plane where light cannot propagate.' }
    ],
    artVisualTheme: {
      primaryColor: '#22c55e',
      glowColor: '#15803d',
      bgGradient: 'from-emerald-950 via-neutral-950 to-neutral-950',
      iconSymbol: '🐍',
      badgeText: 'BOUNDLESS ENTITY'
    }
  },
  {
    id: 'ARC-ART-002-BOOK-TALES',
    name: 'Book of Infinite Tales',
    subtitle: 'MARTIAL SOUL • TYPE: AUXILIARY SPIRIT',
    domain: 'Arcane',
    cardType: 'Artifact',
    subtype: 'Grimoire / Spirit Tome',
    cost: 5,
    rarity: 'Legendary',
    power: 4,
    defense: 8,
    quote: '"Every story has a beginning... but I hold the power to write the ending."',
    lore: 'A mysterious book containing countless stories from all worlds and times. It records every tale ever told, retaining the raw emotion and power of legends.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 6.0, durability: 7.0, mobility: 5.0, utility: 10.0, control: 9.0 },
    abilities: [
      {
        id: 'bit-1',
        name: 'Tale Collection',
        type: 'Passive',
        iconType: 'book',
        description: 'Whenever a spell is played by either player, copy it into the Grimoire with 0 Essence cost.',
        charges: 'Passive'
      },
      {
        id: 'bit-2',
        name: 'Legend Summon',
        type: 'Action',
        iconType: 'sparkles',
        description: 'Summon a spectral phantom of a defeated hero from earlier in the match for 2 turns.',
        charges: '1/Match'
      },
      {
        id: 'bit-3',
        name: 'Epilogue',
        type: 'Ultimate',
        iconType: 'book',
        description: 'Write the final chapter: deal damage equal to total cards played during this game.',
        damageDice: '1x Played Cards'
      }
    ],
    evolutionTiers: [
      { tier: '1,000 Years', name: 'Tome of Countless Stories', effect: '+1 Card Draw' },
      { tier: '10,000 Years', name: 'Chronicle of Ages', effect: '+2 Max Essence' },
      { tier: '100,000 Years', name: 'Book of Eternal Legends', effect: 'Free Legend Summons' },
      { tier: '1,000,000 Years', name: 'Akashic Record', effect: 'Universal Omniscience' }
    ],
    artVisualTheme: {
      primaryColor: '#a855f7',
      glowColor: '#7e22ce',
      bgGradient: 'from-purple-950 via-indigo-950 to-neutral-950',
      iconSymbol: '📖',
      badgeText: 'MARTIAL SOUL'
    }
  },
  {
    id: 'SAN-WEP-003-AURIC-BIND',
    name: 'Auric Bind',
    subtitle: 'ADAPTIVE CATALYST SYSTEM • ONE WEAPON, ENDLESS FORMS',
    domain: 'Sanctuary',
    cardType: 'Weapon',
    subtype: 'Morphing Arc-Gauntlet',
    cost: 5,
    rarity: 'Legendary',
    power: 7,
    defense: 6,
    quote: '"It does not choose a master. It grows with one."',
    lore: 'Sentient adaptive catalyst system capable of shifting its physical geometry between sword, staff, chain, cannon, barrier, and dual blades in a microsecond.',
    aestheticTheme: 'parchment-gold',
    attributes: { damage: 8.0, durability: 7.5, mobility: 8.5, utility: 9.0, control: 8.0 },
    abilities: [
      {
        id: 'ab-1',
        name: 'Form Shift: Blade & Cannon',
        type: 'Bonus Action',
        iconType: 'sword',
        description: 'Toggle between Melee Slashing (+3 Attack) and Ranged Piercing Blasts (+2 Range).',
        charges: 'At Will'
      },
      {
        id: 'ab-2',
        name: 'Energy Convert',
        type: 'Reaction',
        iconType: 'sparkles',
        description: 'Absorb incoming spell impact and convert 100% of damage into self-healing and shield.',
        charges: '2/Match'
      },
      {
        id: 'ab-3',
        name: 'Overdrive Mode',
        type: 'Ultimate',
        iconType: 'zap',
        description: 'Discharge all stored energy in an omnidirectional prism beam.',
        damageDice: '6d8 Pure Light'
      }
    ],
    breakdownItems: [
      { label: 'Prism Core', title: 'Energy Heart', description: 'Regulates harmonic flux.' },
      { label: 'Harmony Chain', title: 'Gold Alloy Links', description: 'Extends up to 50ft for binding.' }
    ],
    artVisualTheme: {
      primaryColor: '#eab308',
      glowColor: '#ca8a04',
      bgGradient: 'from-amber-950 via-yellow-950 to-neutral-950',
      iconSymbol: '⚙️',
      badgeText: 'ADAPTIVE CATALYST'
    }
  },
  {
    id: 'ABY-CHP-002-VIKTOR-GREYMANTLE',
    name: 'Viktor Greymantle',
    subtitle: 'THE IRON CONFESSOR • FIGHTER / TANK • EXP LANE',
    domain: 'Abyss',
    secondaryDomain: 'Radiance',
    cardType: 'Champion',
    subtype: 'Undead Enforcer / Golem Infused',
    cost: 5,
    rarity: 'Rare',
    power: 7,
    defense: 10,
    speed: 4,
    quote: '"In this city, loyalty is written in blood... and concrete."',
    lore: 'An unstoppable wrecking ball who gains power from absorbing punishment. Built with reinforced concrete limbs and cursed mafia enforcer oaths.',
    aestheticTheme: 'abyss-crimson',
    attributes: { damage: 4.0, durability: 9.0, mobility: 2.0, utility: 6.0, control: 7.0 },
    abilities: [
      {
        id: 'vg-1',
        name: 'Made Man (Passive)',
        type: 'Passive',
        iconType: 'shield',
        description: 'Every time Viktor takes damage exceeding 10% max HP, gain a Concrete Stack (max 5) increasing physical defense.',
        charges: 'Passive'
      },
      {
        id: 'vg-2',
        name: 'Concrete Sermon',
        type: 'Action',
        iconType: 'sword',
        description: 'Swing sledgehammer in wide arc. At 5 Concrete Stacks, creates shockwave knocking enemies airborne.',
        damageDice: '3d8 Bludgeoning'
      },
      {
        id: 'vg-3',
        name: 'Omertà Crush',
        type: 'Ultimate',
        iconType: 'skull',
        description: 'Unstoppable charge, detonating all Concrete Stacks on the first enemy hero hit, shredding defenses by 50%.',
        damageDice: '6d8 Concrete Burst'
      }
    ],
    artVisualTheme: {
      primaryColor: '#94a3b8',
      glowColor: '#475569',
      bgGradient: 'from-neutral-950 via-stone-900 to-neutral-950',
      iconSymbol: '🔨',
      badgeText: 'IRON CONFESSOR'
    }
  },
  {
    id: 'SAN-WEP-004-OPHANIM',
    name: 'Ophanim Morningstar',
    subtitle: 'WEAPON (MORNINGSTAR), LEGENDARY (REQUIRES ATTUNEMENT)',
    domain: 'Sanctuary',
    cardType: 'Weapon',
    subtype: 'Biblical Angelic Relic',
    cost: 7,
    rarity: 'Legendary',
    power: 8,
    defense: 6,
    attunementRequired: true,
    attunementDetail: 'Attunement by a Good-Aligned Champion',
    quote: '"I see all. I judge with light. Let us cast down the darkness that defiles the planes."',
    lore: 'Three strange concentric golden wheels lined with countless holy eyes, revolving around a core of pure sunfire atop an alabaster and winged haft.',
    aestheticTheme: 'parchment-gold',
    attributes: { damage: 8.5, durability: 7.0, mobility: 8.0, utility: 8.5, control: 9.0 },
    abilities: [
      {
        id: 'oph-1',
        name: 'Blinking Banishment',
        type: 'Action',
        iconType: 'sun',
        description: '20ft cone of incandescent light. Banish targeted enemy unit out of existence for 2 rounds (DC 18 Charisma save).',
        charges: '1 Charge'
      },
      {
        id: 'oph-2',
        name: 'Consecration',
        type: 'Action',
        iconType: 'sparkles',
        description: 'Create a 20ft sphere of radiant energy. Deals 6d10 radiant damage (increased to 8d10 against Fiends and Undead).',
        damageDice: '6d10 Radiant',
        charges: '2 Charges'
      },
      {
        id: 'oph-3',
        name: 'Sentience & Truesight',
        type: 'Passive',
        iconType: 'eye',
        description: 'Reveals all stealthed or hidden cards and grants telepathic tactical insight.',
        charges: 'Passive'
      }
    ],
    breakdownItems: [
      { label: 'Three Ring Wheels', title: 'Ophanim Form', description: 'Gears covered in celestial eyes.' },
      { label: 'Alabaster Haft', title: 'Pure White Marble', description: 'Feathered gold pommel with holy balance.' }
    ],
    artVisualTheme: {
      primaryColor: '#facc15',
      glowColor: '#eab308',
      bgGradient: 'from-amber-950 via-slate-900 to-neutral-950',
      iconSymbol: '👁️',
      badgeText: 'OPHANIM RELIC'
    }
  },
  {
    id: 'ARC-CHP-002-MIMIR',
    name: 'Mímir',
    subtitle: 'GUARDIAN OF THE WELL • THE ALL-KNOWING HEAD',
    domain: 'Arcane',
    cardType: 'Champion',
    subtype: 'Cosmic Sage / Oracle',
    cost: 6,
    rarity: 'Legendary',
    power: 4,
    defense: 12,
    quote: '"Odin sacrificed his eye to drink from Mímir’s well. Even in death, Mímir’s counsel shapes the fate of gods."',
    lore: 'Severed head preserved by Odin’s primordial runes. Floating above the Well of Mímisbrunnr, he has witnessed the dawn of the cosmos and the twilight of Ragnarök.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 4.0, durability: 8.5, mobility: 4.0, utility: 10.0, control: 9.5 },
    abilities: [
      {
        id: 'mim-1',
        name: 'Memory of All Ages',
        type: 'Passive',
        iconType: 'book',
        description: 'You can see the opponent hand at all times and predict the next 2 cards in their deck.',
        charges: 'Passive'
      },
      {
        id: 'mim-2',
        name: 'Counsel of Mímisbrunnr',
        type: 'Action',
        iconType: 'eye',
        description: 'Select any card from your deck and place it directly into your hand; reduce its cost by 2.',
        charges: '1/Turn'
      },
      {
        id: 'mim-3',
        name: 'Rune of Severed Fate',
        type: 'Reaction',
        iconType: 'hourglass',
        description: 'Cancel an opposing spell or ultimate ability as it is cast.',
        charges: '2/Match'
      }
    ],
    artVisualTheme: {
      primaryColor: '#38bdf8',
      glowColor: '#0284c7',
      bgGradient: 'from-sky-950 via-neutral-950 to-neutral-950',
      iconSymbol: '🗿',
      badgeText: 'COSMIC SAGE'
    }
  },
  {
    id: 'RAD-REL-001-MJOLNIR',
    name: 'Mjölnir',
    subtitle: 'THE LEGENDARY HAMMER OF THOR ⚡🔨',
    domain: 'Radiance',
    secondaryDomain: 'Arcane',
    cardType: 'Relic',
    subtype: 'Dwarven Forged Relic',
    cost: 8,
    rarity: 'Legendary',
    power: 10,
    defense: 6,
    quote: '"Forged by Sindri and Brokkr. Summons thunder and lightning. Always returns to its master."',
    lore: 'Forged from the heart of a dying star in the dwarven forges of Nidavellir. It shatters mountain ranges and strikes with the weight of thunderbolts.',
    aestheticTheme: 'volcanic-dark',
    attributes: { damage: 10.0, durability: 8.0, mobility: 6.0, utility: 6.5, control: 8.5 },
    abilities: [
      {
        id: 'mjol-1',
        name: 'Shatter Mountains',
        type: 'Action',
        iconType: 'zap',
        description: 'Smash target enemy card for 8d8 physical + lightning damage and break all armor attachments.',
        damageDice: '8d8 Storm Smite'
      },
      {
        id: 'mjol-2',
        name: 'Loyal Return',
        type: 'Passive',
        iconType: 'sword',
        description: 'If this weapon is ever discarded, destroyed, or stolen, return it to the battlefield immediately.',
        charges: 'Passive'
      },
      {
        id: 'mjol-3',
        name: 'Thunder Wrath Call',
        type: 'Ultimate',
        iconType: 'zap',
        description: 'Cast chain lightning across 4 random enemies, dealing 4d10 damage to each.',
        damageDice: '4x 4d10 Lightning'
      }
    ],
    breakdownItems: [
      { label: 'Crafted By', title: 'Brokkr & Sindri', description: 'Short haft due to Loki’s trickery.' },
      { label: 'Uru Metal', title: 'Star-Core Forged', description: 'Absorbs cosmic magic effortlessly.' }
    ],
    artVisualTheme: {
      primaryColor: '#60a5fa',
      glowColor: '#2563eb',
      bgGradient: 'from-blue-950 via-slate-950 to-neutral-950',
      iconSymbol: '🔨',
      badgeText: 'DIVINE HAMMER'
    }
  },
  {
    id: 'VER-BST-002-VENOMCREST',
    name: 'Venomcrest Basilisk',
    subtitle: 'AXIOM RANK: B+ • LEVEL 24 APEX PREDATOR',
    domain: 'Verdance',
    secondaryDomain: 'Abyss',
    cardType: 'Beast',
    subtype: 'Toxic Marsh Serpent',
    cost: 4,
    rarity: 'Rare',
    power: 7,
    defense: 6,
    speed: 8,
    quote: '"Territorial apex predator of swamp regions. Uses bioluminescent patterns to intimidate and confuse."',
    lore: 'Inhabits the toxic marsh zones of the Stiomvile Hill. Strikes with explosive speed despite its massive body, injecting necrotic virulent bile.',
    aestheticTheme: 'verdant-emerald',
    attributes: { damage: 7.5, durability: 6.0, mobility: 8.0, utility: 5.5, control: 7.0 },
    abilities: [
      {
        id: 'vb-1',
        name: 'Toxic Strike',
        type: 'Action',
        iconType: 'snake',
        description: 'Lunge with venom fangs, inflicting 3 stacks of Corrosion poison (damages target every turn).',
        damageDice: '2d8 Poison'
      },
      {
        id: 'vb-2',
        name: 'Intimidating Flare',
        type: 'Reaction',
        iconType: 'eye',
        description: 'Expand glowing bioluminescent hood to blind and stun attackers for 1 turn.',
        charges: '1/Match'
      }
    ],
    breakdownItems: [
      { label: 'Basilisk Heart', title: 'Toxic Core', description: 'Pulses with virulent vitality.' },
      { label: 'Venomcrest Scale', title: 'Armor Plating', description: 'Provides innate poison immunity.' }
    ],
    artVisualTheme: {
      primaryColor: '#84cc16',
      glowColor: '#4d7c0f',
      bgGradient: 'from-lime-950 via-emerald-950 to-neutral-950',
      iconSymbol: '🐍',
      badgeText: 'APEX PREDATOR'
    }
  },
  {
    id: 'VER-BST-003-MRIG',
    name: 'MriG',
    subtitle: 'LIFE-BEARER SOUL • EMERALD DEER SPIRIT',
    domain: 'Verdance',
    cardType: 'Beast',
    subtype: 'Sacred Forest Stag',
    cost: 3,
    rarity: 'Rare',
    power: 3,
    defense: 7,
    speed: 8,
    quote: '"MriG walks not just for itself, but for every living soul, sustaining the balance."',
    lore: 'Ensembles the true meaning of living. Its golden inscribed hooves blossom flowers wherever it treads, and its chrysolite skin radiates lush tranquility.',
    aestheticTheme: 'verdant-emerald',
    attributes: { damage: 3.0, durability: 7.0, mobility: 8.5, utility: 9.5, control: 6.0 },
    abilities: [
      {
        id: 'mrig-1',
        name: 'Chrysolite Radiance',
        type: 'Passive',
        iconType: 'heart',
        description: 'Restores 3 Health to your champion at the beginning of each turn.',
        charges: 'Passive'
      },
      {
        id: 'mrig-2',
        name: 'Flower Garland Blessing',
        type: 'Action',
        iconType: 'sparkles',
        description: 'Cleanse all debuffs, curses, and poisons from your entire board.',
        charges: '1/Turn'
      }
    ],
    artVisualTheme: {
      primaryColor: '#22c55e',
      glowColor: '#16a34a',
      bgGradient: 'from-emerald-950 via-green-950 to-neutral-950',
      iconSymbol: '🦌',
      badgeText: 'LIFE-BEARER'
    }
  },
  {
    id: 'ABY-WEP-001-AME-NO-HABAKIRI',
    name: 'Ame No Habakiri V2',
    subtitle: "HEAVEN'S FEATHER CLAFORGER — REFORGED IN DREAD",
    domain: 'Abyss',
    secondaryDomain: 'Radiance',
    cardType: 'Weapon',
    subtype: 'Cursed Demon Katana',
    cost: 6,
    rarity: 'Legendary',
    power: 9,
    defense: 3,
    quote: '"When the heavens weep, my blade cuts all."',
    lore: 'A fusion of cursed legacy and divine wrath. Born from the union of three forbidden blades, it does not merely cut — it rends fate itself.',
    aestheticTheme: 'abyss-crimson',
    attributes: { damage: 9.8, durability: 4.5, mobility: 9.5, utility: 6.0, control: 7.5 },
    abilities: [
      {
        id: 'anh-1',
        name: 'Heavenrend Slash',
        type: 'Action',
        iconType: 'sword',
        description: 'Cleaves the space between life and death, dealing 5d8 necrotic damage ignoring armor.',
        damageDice: '5d8 Necrotic'
      },
      {
        id: 'anh-2',
        name: 'Bloodfall Tempest',
        type: 'Passive',
        iconType: 'skull',
        description: 'Whenever an enemy unit falls, increase this blade’s attack power by +2 for the remainder of the battle.',
        charges: 'Passive'
      },
      {
        id: 'anh-3',
        name: 'Voidstep',
        type: 'Reaction',
        iconType: 'wind',
        description: 'Dash into Nothingness to evade an attack, reappearing behind the attacker with an immediate counter-slash.',
        charges: '2/Match'
      }
    ],
    breakdownItems: [
      { label: 'Attack Power', title: 'Rank SSS', description: 'Supreme single-target lethality.' },
      { label: 'Curse Level', title: 'EX++', description: 'Whispers the screams of the fallen.' }
    ],
    artVisualTheme: {
      primaryColor: '#ef4444',
      glowColor: '#991b1b',
      bgGradient: 'from-red-950 via-neutral-950 to-neutral-950',
      iconSymbol: '⚔️',
      badgeText: 'CURSED KATANA'
    }
  },
  {
    id: 'ARC-SAN-001-TARO-OF-FATE',
    name: 'Taro of Fate',
    subtitle: 'THE DIVINE DECK OF DESTINY • DIVINE MYTHICAL',
    domain: 'Arcane',
    secondaryDomain: 'Sanctuary',
    cardType: 'Relic',
    subtype: 'Cosmic Card Deck',
    cost: 7,
    rarity: 'Mythic',
    power: 6,
    defense: 9,
    divineRank: 5,
    quote: '"Draw a card and speak its name. Risk grows with power."',
    lore: 'A sacred and forbidden deck blessed by both light and cursed by darkness. In the hands of its master, it can reshape fate, summon the impossible, and bend reality.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 8.5, durability: 7.5, mobility: 8.0, utility: 10.0, control: 9.5 },
    abilities: [
      {
        id: 'tof-1',
        name: 'Good Side: Holy Barrier & Heal',
        type: 'Action',
        iconType: 'sparkles',
        description: 'Draw a gold card: Heal 10 HP to all allies and erect a 15 HP barrier.',
        charges: '1/Turn'
      },
      {
        id: 'tof-2',
        name: 'Evil Side: Chaos Void Eclipse',
        type: 'Action',
        iconType: 'skull',
        description: 'Draw a void card: deal 6d8 dark matter damage to all enemies and curse their draws.',
        damageDice: '6d8 Dark Void',
        charges: '1/Turn'
      },
      {
        id: 'tof-3',
        name: 'Fate Overlord (Ultimate Form)',
        type: 'Ultimate',
        iconType: 'crown',
        description: 'Become the Master of Fate: gain complete choice over card draw and negate RNG for 3 turns.',
        charges: '1/Game'
      }
    ],
    breakdownItems: [
      { label: 'Levels', title: '1 - 100 Ascension', description: 'Novice to Fate Lord.' },
      { label: 'Weapon Mode', title: 'Card Blades / Staff / Shield', description: 'Transforms on command.' }
    ],
    artVisualTheme: {
      primaryColor: '#c084fc',
      glowColor: '#7e22ce',
      bgGradient: 'from-purple-950 via-slate-900 to-neutral-950',
      iconSymbol: '🃏',
      badgeText: 'DECK OF DESTINY'
    }
  },
  {
    id: 'RAD-ARM-001-DESERT-DRAGON',
    name: '+3 Scale Mail of the Desert Dragon',
    subtitle: 'ARMOR (SCALE MAIL), VERY RARE (REQUIRES ATTUNEMENT)',
    domain: 'Radiance',
    cardType: 'Armor',
    subtype: 'Dragonscale Armor',
    cost: 5,
    rarity: 'Very Rare',
    power: 4,
    defense: 11,
    attunementRequired: true,
    quote: '"I am the desert. I am the storm. I am the dragon’s endure."',
    lore: 'Crafted from golden scales shed by an ancient fire dragon during the turning of ages. Shimmers like heat haze and roars like the desert winds in battle.',
    aestheticTheme: 'parchment-gold',
    attributes: { damage: 5.0, durability: 9.5, mobility: 4.5, utility: 6.0, control: 7.0 },
    abilities: [
      {
        id: 'smdd-1',
        name: 'Protection from Heat & Flame',
        type: 'Passive',
        iconType: 'shield',
        description: 'Complete immunity to normal fire damage, burn status, and desert terrain penalties.',
        charges: 'Passive'
      },
      {
        id: 'smdd-2',
        name: 'Breath Weapon',
        type: 'Action',
        iconType: 'flame',
        description: 'Exhale a 60ft cone of extreme heat dealing 6d10 fire damage (half on successful save).',
        damageDice: '6d10 Fire Breath',
        charges: '1/Match'
      },
      {
        id: 'smdd-3',
        name: 'Heat Haze Distortion',
        type: 'Passive',
        iconType: 'eye',
        description: 'Ranged attacks against the bearer suffer -4 penalty to hit due to optical heat distortion.',
        charges: 'Passive'
      }
    ],
    artVisualTheme: {
      primaryColor: '#f59e0b',
      glowColor: '#d97706',
      bgGradient: 'from-amber-950 via-stone-900 to-neutral-950',
      iconSymbol: '🛡️',
      badgeText: 'DRAGONSCALE'
    }
  },
  {
    id: 'VER-CHP-003-DRUUN',
    name: 'Druun',
    subtitle: 'THE TECTONIC MONK • FIGHTER / TANK • EXP LANE',
    domain: 'Verdance',
    secondaryDomain: 'Radiance',
    cardType: 'Champion',
    subtype: 'Stone Martial Artist',
    cost: 6,
    rarity: 'Rare',
    power: 7,
    defense: 11,
    speed: 4,
    quote: '"Endure. Absorb. Then the mountain answers."',
    lore: 'A stone monk whose rock-carved skin passively absorbs kinetic blows, storing tension before detonating it in devastating retaliatory seismic shockwaves.',
    aestheticTheme: 'parchment-gold',
    attributes: { damage: 7.0, durability: 9.0, mobility: 3.5, utility: 6.0, control: 8.5 },
    abilities: [
      {
        id: 'dru-1',
        name: 'Stone Patience (Passive)',
        type: 'Passive',
        iconType: 'shield',
        description: 'Reduces physical damage by 15%. Each hit taken builds a Tension Stack (max 10).',
        charges: 'Passive'
      },
      {
        id: 'dru-2',
        name: 'Granite Fist & Seismic Release',
        type: 'Action',
        iconType: 'sword',
        description: 'Expend all Tension Stacks to unleash a seismic shockwave forward, knocking back enemies.',
        damageDice: '2d8 + Stacks x 1d6'
      },
      {
        id: 'dru-3',
        name: "Mountain's Answer",
        type: 'Ultimate',
        iconType: 'zap',
        description: 'Immune to all damage for 1.5s, then release 360° shockwave dealing 2.5x all absorbed damage.',
        damageDice: '2.5x Absorbed DMG'
      }
    ],
    artVisualTheme: {
      primaryColor: '#d97706',
      glowColor: '#b45309',
      bgGradient: 'from-amber-950 via-stone-900 to-neutral-950',
      iconSymbol: '🪨',
      badgeText: 'TECTONIC MONK'
    }
  },
  {
    id: 'VER-ARC-001-ATHENA-NATURE',
    name: 'Athena Nature',
    subtitle: 'SPEAR OF LIFE AND TECHNOLOGY • LIFE + TECH FUSION',
    domain: 'Verdance',
    secondaryDomain: 'Arcane',
    cardType: 'Champion',
    subtype: 'Cyber-Fey Synthesizer',
    cost: 9,
    rarity: 'Mythic',
    power: 9,
    defense: 12,
    divineRank: 5,
    quote: '"Life is power. Technology is wisdom. Together, they become infinity."',
    lore: 'The ultimate divine spear that fuses all organic vitality of nature with high-tech mechanical nano-intelligence. Adapts endlessly to any battle scenario.',
    aestheticTheme: 'verdant-emerald',
    attributes: { damage: 9.0, durability: 8.5, mobility: 9.5, utility: 9.5, control: 9.0 },
    abilities: [
      {
        id: 'an-1',
        name: 'Requiem Zephyra (Split Form)',
        type: 'Bonus Action',
        iconType: 'sword',
        description: 'Split spear into dual high-speed floating daggers for double strike frequency.',
        charges: 'At Will'
      },
      {
        id: 'an-2',
        name: 'Infinite Regeneration',
        type: 'Passive',
        iconType: 'heart',
        description: 'Nanites and chlorophyllic sap instantly restore 4 Health each round.',
        charges: 'Passive'
      },
      {
        id: 'an-3',
        name: 'Green Infinity',
        type: 'Ultimate',
        iconType: 'sparkles',
        description: 'Supreme technique overwhelming all enemies with boundless bio-energy beams.',
        damageDice: '9d8 Bio-Tech Plasma'
      }
    ],
    artVisualTheme: {
      primaryColor: '#10b981',
      glowColor: '#059669',
      bgGradient: 'from-emerald-950 via-cyan-950 to-neutral-950',
      iconSymbol: '🌿',
      badgeText: 'DIVINE SPEAR'
    }
  },
  {
    id: 'VER-BST-004-BRIARMAW',
    name: 'Briarmaw',
    subtitle: 'THE ROOTBOUND GUARDIAN • CLASSIFICATION: ORYNTH',
    domain: 'Verdance',
    cardType: 'Beast',
    subtype: 'Rootbound Colossus',
    cost: 5,
    rarity: 'Rare',
    power: 7,
    defense: 9,
    quote: '"The forest does not always bloom. Sometimes, it bares its teeth."',
    lore: 'Ancient grove guardian made of stone hide, moss-draped shoulders, and root jaws. Senses the heart of wanderers before choosing whether to protect or consume.',
    aestheticTheme: 'verdant-emerald',
    attributes: { damage: 7.0, durability: 9.0, mobility: 4.0, utility: 7.0, control: 8.5 },
    abilities: [
      {
        id: 'bm-1',
        name: 'Root-Deep Camouflage',
        type: 'Passive',
        iconType: 'shield',
        description: 'Cannot be targeted by enemy spells until it attacks or takes direct damage.',
        charges: 'Passive'
      },
      {
        id: 'bm-2',
        name: 'Grove Entanglement',
        type: 'Action',
        iconType: 'wind',
        description: 'Roots erupt from soil, trapping all opposing frontliners and dealing 2d8 nature damage.',
        damageDice: '2d8 Earth Crushing'
      }
    ],
    artVisualTheme: {
      primaryColor: '#65a30d',
      glowColor: '#3f6212',
      bgGradient: 'from-lime-950 via-stone-900 to-neutral-950',
      iconSymbol: '🌲',
      badgeText: 'ROOT GUARDIAN'
    }
  },
  {
    id: 'ARC-SPL-001-FATE-COLLAPSE',
    name: 'Fate Collapse',
    subtitle: 'IMPOSSIBLE SPELL • CHOSEN BY DESTINY',
    domain: 'Arcane',
    cardType: 'Spell',
    subtype: 'Temporal Cataclysm',
    cost: 6,
    rarity: 'Legendary',
    power: 8,
    defense: 0,
    quote: '"Erase a moment from existence. Rewrite reality."',
    lore: 'Rips a page from the cosmic tapestry, returning the opposing board to the state it was in 2 turns prior and inflicting dimensional recoil.',
    aestheticTheme: 'astral-sapphire',
    abilities: [
      {
        id: 'fc-1',
        name: 'Reality Erasure',
        type: 'Spell',
        iconType: 'hourglass',
        description: 'Destroy target non-Champion enemy unit and prevent it from going to the graveyard (exiled to Void).',
        charges: 'Instant'
      }
    ],
    artVisualTheme: {
      primaryColor: '#c084fc',
      glowColor: '#9333ea',
      bgGradient: 'from-purple-950 via-slate-900 to-neutral-950',
      iconSymbol: '🌌',
      badgeText: 'TEMPORAL SPELL'
    }
  },
  {
    id: 'SAN-SPL-001-RAISE-AEGIS',
    name: 'Raise the Aegis',
    subtitle: 'HOLY LITURGY • SANCTUARY CORE',
    domain: 'Sanctuary',
    cardType: 'Spell',
    subtype: 'Divine Shielding',
    cost: 2,
    rarity: 'Common',
    power: 0,
    defense: 8,
    quote: '"Under the light of Solthar, no darkness shall cross this threshold."',
    lore: 'The order of guardians chant the oath of dawn, summoning an iridescent dome of holy light.',
    aestheticTheme: 'parchment-gold',
    abilities: [
      {
        id: 'rta-1',
        name: 'Sanctuary Shield',
        type: 'Spell',
        iconType: 'shield',
        description: 'Grant target champion or ally +8 Shield and immunity to critical hits for 2 turns.',
        charges: 'Instant'
      }
    ],
    artVisualTheme: {
      primaryColor: '#facc15',
      glowColor: '#ca8a04',
      bgGradient: 'from-amber-950 via-stone-900 to-neutral-950',
      iconSymbol: '🛡️',
      badgeText: 'SANCTUARY SPELL'
    }
  },
  {
    id: 'RAD-SPL-001-MOLTEN-ERUPTION',
    name: 'Molten Eruption',
    subtitle: 'VOLCANIC WRATH • GEOTHERMAL SURGE',
    domain: 'Radiance',
    cardType: 'Spell',
    subtype: 'Fire Sorcery',
    cost: 4,
    rarity: 'Uncommon',
    power: 6,
    defense: 0,
    quote: '"When the mountain cracks, only ash remains."',
    lore: 'Taps directly into underground magma fissures to incinerate opposition ranks.',
    aestheticTheme: 'volcanic-dark',
    abilities: [
      {
        id: 'me-1',
        name: 'Magma Deluge',
        type: 'Spell',
        iconType: 'flame',
        description: 'Deal 5 damage to all enemy units and inflict Burn (2 damage/turn).',
        damageDice: '5 Fire DMG',
        charges: 'Instant'
      }
    ],
    artVisualTheme: {
      primaryColor: '#f97316',
      glowColor: '#ea580c',
      bgGradient: 'from-red-950 via-orange-950 to-neutral-950',
      iconSymbol: '🌋',
      badgeText: 'MAGMA SORCERY'
    }
  },
  {
    id: 'ABY-SPL-001-SOULSTORM',
    name: 'Soulstorm',
    subtitle: 'ABYSSAL NECROMANCY • VOID CATACLYSM',
    domain: 'Abyss',
    cardType: 'Spell',
    subtype: 'Dark Magic',
    cost: 5,
    rarity: 'Rare',
    power: 7,
    defense: 0,
    quote: '"The souls of Baator cry out in hunger."',
    lore: 'Unleashes a vortex of tormented spirits that drain life force directly from the living.',
    aestheticTheme: 'abyss-crimson',
    abilities: [
      {
        id: 'ss-1',
        name: 'Life Drain Whirlwind',
        type: 'Spell',
        iconType: 'skull',
        description: 'Deal 6 necrotic damage to all enemies and heal your champion for 50% of total damage dealt.',
        damageDice: '6 Necrotic Life-Drain',
        charges: 'Instant'
      }
    ],
    artVisualTheme: {
      primaryColor: '#a855f7',
      glowColor: '#6b21a8',
      bgGradient: 'from-purple-950 via-neutral-950 to-neutral-950',
      iconSymbol: '💀',
      badgeText: 'NECROTIC SPELL'
    }
  },
  ...TEMPEST_CARDS
];

export const PRESET_DECKS: DeckPreset[] = [
  {
    id: 'deck-tempest-stormwatch',
    name: 'Eye of the Tempest Squall',
    title: 'Tempest / Cloudshaper Stasis & Spellburst Deck',
    domain: 'Tempest',
    description: 'Mastery over storm currents, atmospheric freeze-locks, fast-action spell chains, and game-ending cyclone avatars.',
    championCardId: 'TMP-CS010-STORMWATCH-CONJURER',
    cardIds: [
      'TMP-CS010-STORMWATCH-CONJURER',
      'TMP-EC001-AETHERSTORM-HERALD',
      'TMP-AM009-TEMPEST-LOREBINDER',
      'TMP-CS001-MISTBIND-ADEPT',
      'TMP-CS004-TEMPESTRIDE-EVOKER',
      'TMP-AM001-AETHER-SPARK-INITIATE',
      'TMP-AM002-CHAINFLARE-SAVANT',
      'TMP-AM003-ESSENCEWEAVER-ARCANIST',
      'TMP-EC006-WHIRLWIND-PARAGON',
      'TMP-EC002-TEMPEST-INCARNATE'
    ],
    color: '#0ea5e9',
    accent: '#38bdf8'
  },
  {
    id: 'deck-fire-mountain',
    name: 'Wrath of the Fire Mountain',
    title: 'Radiance / Magma Destruction Deck',
    domain: 'Radiance',
    description: 'High-damage aggression deck focused on volcanic burns, high-impact weapon strikes, and tectonic devastation.',
    championCardId: 'RAD-CHP-001-MAGMA-JORMUNGANDR',
    cardIds: [
      'RAD-CHP-001-MAGMA-JORMUNGANDR',
      'RAD-WEP-001-WARPICK',
      'RAD-REL-001-MJOLNIR',
      'RAD-ARM-001-DESERT-DRAGON',
      'RAD-SPL-001-MOLTEN-ERUPTION',
      'RAD-SPL-001-MOLTEN-ERUPTION',
      'VER-CHP-003-DRUUN',
      'SAN-ART-001-BROOCH',
      'SAN-SPL-001-RAISE-AEGIS',
      'ABY-WEP-001-AME-NO-HABAKIRI'
    ],
    color: '#ef4444',
    accent: '#f97316'
  },
  {
    id: 'deck-celestial-sanctuary',
    name: 'Aegis of the Celestials',
    title: 'Sanctuary / Holy Light Defense Deck',
    domain: 'Sanctuary',
    description: 'Defensive powerhouse centered on holy shields, radiant banishments, celestial regeneration, and adaptive weaponry.',
    championCardId: 'SAN-BST-001-LUMINARIS',
    cardIds: [
      'SAN-BST-001-LUMINARIS',
      'SAN-WEP-004-OPHANIM',
      'SAN-WEP-003-AURIC-BIND',
      'SAN-WEP-002-STAR-SLAYER',
      'SAN-SPL-001-RAISE-AEGIS',
      'SAN-SPL-001-RAISE-AEGIS',
      'ARC-ART-001-RING-ETERNITY',
      'VER-BST-003-MRIG',
      'ARC-SAN-001-TARO-OF-FATE',
      'VER-ARM-001-MANTLE'
    ],
    color: '#eab308',
    accent: '#facc15'
  },
  {
    id: 'deck-eldervale-wilds',
    name: 'Roots of the Eldervale',
    title: 'Verdance / Primordial Nature Deck',
    domain: 'Verdance',
    description: 'Swarm and sustain deck commanding living ironbark guardians, toxic basilisks, and primal beast spirits.',
    championCardId: 'VER-CHP-002-BRUMHORN',
    cardIds: [
      'VER-CHP-002-BRUMHORN',
      'SAN-ART-001-BROOCH',
      'VER-ARM-001-MANTLE',
      'VER-BST-004-BRIARMAW',
      'VER-BST-002-VENOMCREST',
      'VER-BST-003-MRIG',
      'VER-ARC-001-ATHENA-NATURE',
      'VER-CHP-003-DRUUN',
      'SAN-SPL-001-RAISE-AEGIS',
      'ARC-ART-002-BOOK-TALES'
    ],
    color: '#10b981',
    accent: '#84cc16'
  },
  {
    id: 'deck-cosmic-fate',
    name: 'Tapestry of the Cosmos',
    title: 'Arcane / Temporal Mastery Deck',
    domain: 'Arcane',
    description: 'Tactical control deck manipulating time rifts, prophetic insights, thunder deities, and reality rewriting.',
    championCardId: 'ARC-CHP-001-TARANIS',
    cardIds: [
      'ARC-CHP-001-TARANIS',
      'ARC-CHP-002-MIMIR',
      'ARC-ART-001-RING-ETERNITY',
      'ARC-ART-002-BOOK-TALES',
      'ARC-SAN-001-TARO-OF-FATE',
      'ARC-WEP-002-GROMCOIL',
      'ARC-DIV-001-LEVIATHAN',
      'ARC-SPL-001-FATE-COLLAPSE',
      'RAD-REL-001-MJOLNIR',
      'SAN-WEP-002-STAR-SLAYER'
    ],
    color: '#3b82f6',
    accent: '#a855f7'
  },
  {
    id: 'deck-abyssal-covenant',
    name: 'Shadows of the Void',
    title: 'Abyss / Dark Entity Mastery Deck',
    domain: 'Abyss',
    description: 'High-risk ruthless deck executing soul drains, cursed katanas, enforcer concrete armor, and boundless void entities.',
    championCardId: 'ABY-CHP-001-DAMYAN',
    cardIds: [
      'ABY-CHP-001-DAMYAN',
      'ABY-CHP-002-VIKTOR-GREYMANTLE',
      'ABY-WEP-001-AME-NO-HABAKIRI',
      'ABY-SPL-001-SOULSTORM',
      'ABY-SPL-001-SOULSTORM',
      'ARC-DIV-001-LEVIATHAN',
      'RAD-WEP-001-WARPICK',
      'VER-BST-002-VENOMCREST',
      'ARC-SPL-001-FATE-COLLAPSE',
      'RAD-CHP-001-MAGMA-JORMUNGANDR'
    ],
    color: '#a855f7',
    accent: '#ef4444'
  },
  {
    id: 'deck-molten-overgrowth',
    name: 'Molten Overgrowth',
    title: 'Radiance x Verdance Hybrid Deck',
    domain: 'Radiance',
    description: 'A deadly fusion of volcanic slag and primordial root regeneration. Punishes enemies with continuous burn while beasts heal through the slag.',
    championCardId: 'RAD-CHP-001-MAGMA-JORMUNGANDR',
    cardIds: [
      'RAD-CHP-001-MAGMA-JORMUNGANDR',
      'VER-CHP-002-BRUMHORN',
      'VER-BST-004-BRIARMAW',
      'RAD-WEP-001-WARPICK',
      'RAD-SPL-001-MOLTEN-ERUPTION',
      'VER-BST-002-VENOMCREST',
      'VER-ARM-001-MANTLE',
      'SAN-SPL-001-RAISE-AEGIS',
      'RAD-REL-001-MJOLNIR',
      'VER-BST-003-MRIG'
    ],
    color: '#f97316',
    accent: '#10b981'
  },
  {
    id: 'deck-chrono-paladin',
    name: 'Chrono-Templar Aegis',
    title: 'Sanctuary x Arcane Hybrid Deck',
    domain: 'Sanctuary',
    description: 'Impenetrable holy barriers backed by temporal rewinds and reality-bending artifacts.',
    championCardId: 'SAN-BST-001-LUMINARIS',
    cardIds: [
      'SAN-BST-001-LUMINARIS',
      'ARC-CHP-001-TARANIS',
      'SAN-WEP-004-OPHANIM',
      'ARC-ART-001-RING-ETERNITY',
      'SAN-SPL-001-RAISE-AEGIS',
      'ARC-SPL-001-FATE-COLLAPSE',
      'SAN-WEP-002-STAR-SLAYER',
      'ARC-SAN-001-TARO-OF-FATE',
      'SAN-WEP-003-AURIC-BIND',
      'ARC-ART-002-BOOK-TALES'
    ],
    color: '#eab308',
    accent: '#3b82f6'
  },
  {
    id: 'deck-boss-titan-hydra',
    name: 'Infernal Hydra Boss Raid',
    title: 'Planar Boss Encounter Deck',
    domain: 'Radiance',
    description: 'High-threat boss deck utilizing magma hydra coils, unstoppable sweeping strikes, and cataclysmic volcanic spells.',
    championCardId: 'RAD-CHP-001-MAGMA-JORMUNGANDR',
    cardIds: [
      'RAD-CHP-001-MAGMA-JORMUNGANDR',
      'RAD-REL-001-MJOLNIR',
      'RAD-ARM-001-DESERT-DRAGON',
      'RAD-SPL-001-MOLTEN-ERUPTION',
      'RAD-SPL-001-MOLTEN-ERUPTION',
      'ARC-DIV-001-LEVIATHAN',
      'ABY-SPL-001-SOULSTORM',
      'RAD-WEP-001-WARPICK',
      'ABY-WEP-001-AME-NO-HABAKIRI',
      'ARC-SPL-001-FATE-COLLAPSE'
    ],
    color: '#dc2626',
    accent: '#7f1d1d'
  }
];

import { Card } from '../types';
import { UNIVERSAL_POWER_GLYPHS } from './powerGlyphsData';

/**
 * 30 Canonical Tempest Domain Cards
 * Converted and adapted from the historical Cloudshapers, Aethermancers, and Eternals of the Cyclone archives
 * Fully harmonized with Nexus TCG mechanics (Essence costs, Lane roles, Exhaust/Ready states, Veilform, Skyborn)
 */
export const TEMPEST_CARDS: Card[] = [
  // ==========================================
  // CLOUDSHAPERS (Weather Mages, Tempo & Freeze)
  // ==========================================
  {
    id: 'TMP-CS001-MISTBIND-ADEPT',
    name: 'Mistbind Adept',
    subtitle: 'CLOUDSHAPER INITIATE • TEMPEST COMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Human Cloudshaper Mage',
    cost: 2,
    rarity: 'Common',
    power: 2,
    defense: 3,
    speed: 6,
    laneRole: 'Support',
    quote: '"The mist whispers commands only she can hear."',
    lore: 'Trained atop the floating spires of Aethercloud, Adepts condense morning vapor into binding frost that freezes charging enemies in their tracks.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 4.0, durability: 5.0, mobility: 6.5, utility: 8.0, control: 8.0 },
    powerAttributes: { strength: 3.5, durability: 4.5, speed: 6.5, energyOutput: 7.0, fightingSkill: 5.0, intelligence: 7.5, control: 8.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[18] || UNIVERSAL_POWER_GLYPHS[0]],
    abilities: [
      {
        id: 'cs-1',
        name: 'Fogtouch Enervation',
        type: 'Action',
        iconType: 'wind',
        description: 'When Mistbind Adept enters the battlefield, Exhaust target enemy unit. It cannot attack or use activated abilities until readied.',
        charges: 'Entry Trigger'
      }
    ]
  },
  {
    id: 'TMP-CS002-CLOUDRUNE-MYSTIC',
    name: 'Cloudrune Mystic',
    subtitle: 'TEMPEST SPELL TAPPER • UNCOMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Cloud Mage',
    cost: 3,
    rarity: 'Uncommon',
    power: 2,
    defense: 4,
    speed: 5,
    laneRole: 'Center',
    quote: '"A single spell echoes across the sky."',
    lore: 'Weaving aerodynamic runes into storm currents, Mystics ensure that whenever arcane power is discharged, dense squalls suppress enemy vanguard lines.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 3.5, durability: 6.0, mobility: 5.5, utility: 8.5, control: 9.0 },
    powerAttributes: { strength: 3.0, durability: 5.5, speed: 5.5, energyOutput: 8.0, fightingSkill: 4.5, intelligence: 8.5, control: 9.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[19] || UNIVERSAL_POWER_GLYPHS[1]],
    abilities: [
      {
        id: 'cs-2',
        name: 'Drizzle Seal',
        type: 'Passive',
        iconType: 'hourglass',
        description: 'At the beginning of your End Phase, if you played a Spell or Fast Reaction this turn, Exhaust target enemy unit.',
        charges: 'Turn Trigger'
      }
    ]
  },
  {
    id: 'TMP-CS003-NIMBUS-CLOAKER',
    name: 'Nimbus Cloaker',
    subtitle: 'AETHER SHROUD BEAST • COMMON',
    domain: 'Tempest',
    cardType: 'Beast',
    subtype: 'Cloud Elemental',
    cost: 3,
    rarity: 'Common',
    power: 2,
    defense: 4,
    speed: 7,
    laneRole: 'Flank',
    quote: '"The clouds conceal what the storm cannot shield."',
    lore: 'Condensed water vapor and ionized air coalesced into a sentient phantom, cloaking allied champions from enemy projectile spells.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 4.0, durability: 6.5, mobility: 8.0, utility: 8.0, control: 6.0 },
    powerAttributes: { strength: 4.0, durability: 6.0, speed: 8.0, energyOutput: 7.0, fightingSkill: 5.5, intelligence: 6.0, control: 7.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[20] || UNIVERSAL_POWER_GLYPHS[2]],
    abilities: [
      {
        id: 'cs-3',
        name: 'Veilform Shroud',
        type: 'Reaction',
        iconType: 'shield',
        description: 'When this enters play, target allied unit gains Veilform (cannot be targeted by enemy spells or targeted reactions) until the end of the turn.',
        charges: 'On Entry'
      }
    ]
  },
  {
    id: 'TMP-CS004-TEMPESTRIDE-EVOKER',
    name: 'Tempestride Evoker',
    subtitle: 'STORM COMBAT CONTROL • UNCOMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Storm Mage',
    cost: 4,
    rarity: 'Uncommon',
    power: 3,
    defense: 4,
    speed: 6,
    laneRole: 'Center',
    quote: '"Stillness before the thunder is no mercy."',
    lore: 'Riding charged updrafts on wings of glass, the Evoker freezes enemy momentum, ensuring their weapons remain locked in frost.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 5.0, durability: 5.5, mobility: 6.5, utility: 7.5, control: 9.0 },
    powerAttributes: { strength: 4.5, durability: 5.5, speed: 6.5, energyOutput: 8.0, fightingSkill: 6.0, intelligence: 8.0, control: 9.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[21] || UNIVERSAL_POWER_GLYPHS[3]],
    abilities: [
      {
        id: 'cs-4',
        name: 'Cloud Pulse Frost-Lock',
        type: 'Action',
        iconType: 'zap',
        description: 'At the start of combat, freeze target Exhausted unit. It cannot Ready during its controller\'s next Ready Phase.',
        charges: 'Pre-Combat'
      }
    ]
  },
  {
    id: 'TMP-CS005-HAZEFORM-WEAVER',
    name: 'Hazeform Weaver',
    subtitle: 'SKYBORN AURA SPIRIT • COMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Cloud Spirit',
    cost: 2,
    rarity: 'Common',
    power: 1,
    defense: 5,
    speed: 6,
    laneRole: 'Support',
    quote: '"The sky weaves armor as soft as breath."',
    lore: 'Drifting serenely through squall fronts, the Weaver cushions friendly flyers with buoyant vapor armor.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 2.0, durability: 7.5, mobility: 6.5, utility: 9.0, control: 6.0 },
    powerAttributes: { strength: 2.0, durability: 7.0, speed: 6.5, energyOutput: 7.5, fightingSkill: 4.0, intelligence: 7.0, control: 7.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[22] || UNIVERSAL_POWER_GLYPHS[4]],
    abilities: [
      {
        id: 'cs-5',
        name: 'Cloudbond Ward',
        type: 'Passive',
        iconType: 'wind',
        description: 'Allied units with Skyborn (Flying) get +2 Defense and cannot be reduced below 1 HP by non-combat Hazard damage.',
        charges: 'Continuous Aura'
      }
    ]
  },
  {
    id: 'TMP-CS006-CLOUDVEIL-ENFORCER',
    name: 'Cloudveil Enforcer',
    subtitle: 'SKY GUARD BASTION • RARE',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Sky Guard Sentinel',
    cost: 4,
    rarity: 'Rare',
    power: 4,
    defense: 5,
    speed: 5,
    laneRole: 'Center',
    quote: '"Storms respect her passage. Enemies do not."',
    lore: 'Commander of the upper squall garrisons. Her heavy storm-metal halberd grounds incoming aerial charges instantly.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 6.5, durability: 7.5, mobility: 5.5, utility: 7.0, control: 9.5 },
    powerAttributes: { strength: 7.0, durability: 7.5, speed: 5.5, energyOutput: 6.5, fightingSkill: 8.0, intelligence: 6.5, control: 9.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[23] || UNIVERSAL_POWER_GLYPHS[5]],
    abilities: [
      {
        id: 'cs-6',
        name: 'Aether Grounding Field',
        type: 'Passive',
        iconType: 'shield',
        description: 'Enemy units deployed into this lane enter Exhausted and cannot initiate attacks on their deployment round.',
        charges: 'Continuous Lane Aura'
      }
    ]
  },
  {
    id: 'TMP-CS007-SKYFROST-MEDDLER',
    name: 'Skyfrost Meddler',
    subtitle: 'FREEZE TACTICIAN • UNCOMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Elemental Wizard',
    cost: 3,
    rarity: 'Uncommon',
    power: 2,
    defense: 4,
    speed: 6,
    laneRole: 'Flank',
    quote: '"Each word condenses the air into restraint."',
    lore: 'Meddlers specialize in tactical disruption, dropping temperatures to absolute zero to freeze enemy equipment and weapon triggers.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 3.5, durability: 6.0, mobility: 7.0, utility: 8.5, control: 8.5 },
    powerAttributes: { strength: 3.0, durability: 6.0, speed: 7.0, energyOutput: 7.5, fightingSkill: 5.0, intelligence: 8.5, control: 8.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[24] || UNIVERSAL_POWER_GLYPHS[6]],
    abilities: [
      {
        id: 'cs-7',
        name: 'Cryo-Counter',
        type: 'Action',
        iconType: 'hourglass',
        description: 'When this enters play, attach a Freeze counter to target enemy unit. It skips its next Ready Phase and cannot counterattack.',
        charges: 'On Entry'
      }
    ]
  },
  {
    id: 'TMP-CS008-AETHERCLOUD-CHANNELER',
    name: 'Aethercloud Channeler',
    subtitle: 'DUAL-TARGET BINDER • RARE',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Storm Mage',
    cost: 5,
    rarity: 'Rare',
    power: 3,
    defense: 6,
    speed: 5,
    laneRole: 'Support',
    quote: '"Clouds swirl to bind the storm’s will."',
    lore: 'Drawing deep currents from the Stratospheric Conduit, this channeler weaves dual cyclones that encircle two enemy lanes at once.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 5.0, durability: 7.5, mobility: 6.0, utility: 8.5, control: 10.0 },
    powerAttributes: { strength: 4.5, durability: 7.5, speed: 5.5, energyOutput: 8.5, fightingSkill: 6.0, intelligence: 9.0, control: 9.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[25] || UNIVERSAL_POWER_GLYPHS[7]],
    abilities: [
      {
        id: 'cs-8',
        name: 'Dual Stormbind',
        type: 'Action',
        iconType: 'wind',
        description: 'At the start of your End Phase, choose and Exhaust up to two target enemy units across any lanes.',
        charges: 'End Phase'
      }
    ]
  },
  {
    id: 'TMP-CS009-STORMVEIL-BINDER',
    name: 'Stormveil Binder',
    subtitle: 'TAP LOCK SPECIALIST • UNCOMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Cloud Mage',
    cost: 4,
    rarity: 'Uncommon',
    power: 3,
    defense: 3,
    speed: 6,
    laneRole: 'Center',
    quote: '"What is frozen once may freeze again."',
    lore: 'Specializes in chaining stasis fields. While the Binder chants, enemies trapped in exhaustion remain pinned under atmospheric pressure.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 5.0, durability: 4.5, mobility: 6.5, utility: 7.5, control: 10.0 },
    powerAttributes: { strength: 4.0, durability: 4.5, speed: 6.5, energyOutput: 8.0, fightingSkill: 5.5, intelligence: 8.5, control: 9.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[26] || UNIVERSAL_POWER_GLYPHS[8]],
    abilities: [
      {
        id: 'cs-9',
        name: 'Seal of Stillness',
        type: 'Passive',
        iconType: 'hourglass',
        description: 'Exhausted enemy units cannot Ready during their next turn\'s Ready Step while Stormveil Binder is active.',
        charges: 'Passive Stasis'
      }
    ]
  },
  {
    id: 'TMP-CS010-STORMWATCH-CONJURER',
    name: 'Stormwatch Conjurer',
    subtitle: 'WEATHER SENTINEL • LEGENDARY CHAMPION',
    domain: 'Tempest',
    cardType: 'Champion',
    subtype: 'Legendary Weather Mage',
    cost: 6,
    rarity: 'Legendary',
    power: 5,
    defense: 7,
    speed: 7,
    divineRank: 4,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Universal',
    affiliation: 'Stormwatch High Directorate',
    primaryPower: 'Mass Squall Generation / Stratospheric Lockdown',
    quote: '"No storm escapes the sight of the sky’s sentinel."',
    lore: 'Grand Conjurer of the Great Atmospheric Spire. With a wave of her charged glass scepter, she summons cloudbursts that immobilize entire armies.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 7.5, durability: 8.5, mobility: 7.5, utility: 9.5, control: 10.0 },
    powerAttributes: { strength: 6.5, durability: 8.0, speed: 7.5, energyOutput: 9.5, fightingSkill: 8.0, intelligence: 9.5, control: 10.0 },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[27] || UNIVERSAL_POWER_GLYPHS[9],
      UNIVERSAL_POWER_GLYPHS[28] || UNIVERSAL_POWER_GLYPHS[10]
    ],
    abilities: [
      {
        id: 'cs-10-1',
        name: 'Tempest Cage',
        type: 'Action',
        iconType: 'zap',
        description: 'At the start of combat, Exhaust all enemy units with status, damage, or freeze counters on them.',
        damageDice: '3d8 Lightning Surge'
      },
      {
        id: 'cs-10-2',
        name: 'Barometric Collapse',
        type: 'Ultimate',
        iconType: 'wind',
        description: 'Trigger a massive pressure drop across the entire board. All enemy units lose 2 Power and are Exhausted for 1 round.',
        damageDice: '5d10 Sky Fall'
      }
    ]
  },

  // ==========================================
  // AETHERMANCERS (Spell Chaining & Storm Surge)
  // ==========================================
  {
    id: 'TMP-AM001-AETHER-SPARK-INITIATE',
    name: 'Aether Spark Initiate',
    subtitle: 'STORM SURGE AGGRO • COMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Aether Mage',
    cost: 1,
    rarity: 'Common',
    power: 1,
    defense: 2,
    speed: 7,
    laneRole: 'Flank',
    quote: '"Every spell cast is another beat of the storm’s heart."',
    lore: 'Youthful novitiates who harness electrostatic static in their cloaks, bursting with lethal current each time an incantation is voiced.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 6.0, durability: 3.5, mobility: 7.5, utility: 6.5, control: 4.5 },
    powerAttributes: { strength: 3.0, durability: 3.5, speed: 7.5, energyOutput: 7.0, fightingSkill: 4.5, intelligence: 6.5, control: 5.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[0]],
    abilities: [
      {
        id: 'am-1',
        name: 'Storm Surge',
        type: 'Passive',
        iconType: 'zap',
        description: 'Whenever you play a Spell or Action card, this gains +1 Power until the end of the turn (stacks infinitely).',
        charges: 'Spell Trigger'
      }
    ]
  },
  {
    id: 'TMP-AM002-CHAINFLARE-SAVANT',
    name: 'Chainflare Savant',
    subtitle: 'SPELLBURST CYCLER • UNCOMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Aether Wizard',
    cost: 3,
    rarity: 'Uncommon',
    power: 2,
    defense: 4,
    speed: 6,
    laneRole: 'Support',
    quote: '"The mind brightens after the second strike."',
    lore: 'Masters of cascade theory who draw cognitive inspiration from chain lightning discharges.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 4.0, durability: 5.5, mobility: 6.5, utility: 9.0, control: 6.5 },
    powerAttributes: { strength: 3.0, durability: 5.0, speed: 6.5, energyOutput: 7.5, fightingSkill: 5.0, intelligence: 8.5, control: 7.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[1]],
    abilities: [
      {
        id: 'am-2',
        name: 'Spellburst Intellect',
        type: 'Passive',
        iconType: 'book',
        description: 'Whenever you play your second Spell or Action in a turn, draw a card from your deck immediately.',
        charges: 'Once/Turn'
      }
    ]
  },
  {
    id: 'TMP-AM003-ESSENCEWEAVER-ARCANIST',
    name: 'Essenceweaver Arcanist',
    subtitle: 'STORM RAMP ENGINE • UNCOMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Aether Caster',
    cost: 2,
    rarity: 'Uncommon',
    power: 2,
    defense: 3,
    speed: 6,
    laneRole: 'Support',
    quote: '"She draws from the storm to fuel the mind’s fire."',
    lore: 'Recycling ambient aetheric runoff to provide immediate energy for follow-up incantations.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 4.5, durability: 4.5, mobility: 6.5, utility: 9.5, control: 5.5 },
    powerAttributes: { strength: 3.0, durability: 4.5, speed: 6.5, energyOutput: 8.5, fightingSkill: 5.0, intelligence: 8.5, control: 7.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[2]],
    abilities: [
      {
        id: 'am-3',
        name: 'Manaflow Reflex',
        type: 'Passive',
        iconType: 'sparkles',
        description: 'Whenever you play a Spell, gain +1 temporary Momentum. This Momentum must be spent on Spells during this turn.',
        charges: 'Spell Trigger'
      }
    ]
  },
  {
    id: 'TMP-AM004-TEMPEST-ECHOCHANTER',
    name: 'Tempest Echochanter',
    subtitle: 'COMBAT DISRUPTOR • RARE',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Echo Mage',
    cost: 4,
    rarity: 'Rare',
    power: 3,
    defense: 5,
    speed: 7,
    laneRole: 'Flank',
    quote: '"Each echo unbinds a path to victory."',
    lore: 'Chanting in sonic resonance that disrupts the equilibrium of defensive wardens.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 6.0, durability: 6.5, mobility: 7.5, utility: 8.0, control: 8.5 },
    powerAttributes: { strength: 4.5, durability: 6.5, speed: 7.5, energyOutput: 8.0, fightingSkill: 6.5, intelligence: 8.0, control: 8.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[3]],
    abilities: [
      {
        id: 'am-4',
        name: 'Storm Echo Disorientation',
        type: 'Action',
        iconType: 'wind',
        description: 'Whenever you cast a Spell, target enemy unit cannot block or defend during combat this turn.',
        charges: 'Repeatable'
      }
    ]
  },
  {
    id: 'TMP-AM005-AETHER-CHANNEL-INITIATE',
    name: 'Aether Channel Initiate',
    subtitle: 'SPELL RECURSION • COMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Spell Slinger',
    cost: 2,
    rarity: 'Common',
    power: 1,
    defense: 4,
    speed: 6,
    laneRole: 'Support',
    quote: '"The storm remembers all who speak its tongue."',
    lore: 'Retrieving dispersed incantations from the ozone before their magical echoes fade into the troposphere.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 3.0, durability: 5.5, mobility: 6.5, utility: 8.5, control: 5.0 },
    powerAttributes: { strength: 2.5, durability: 5.0, speed: 6.5, energyOutput: 7.0, fightingSkill: 4.0, intelligence: 7.5, control: 6.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[4]],
    abilities: [
      {
        id: 'am-5',
        name: 'Aether Recovery Link',
        type: 'Action',
        iconType: 'book',
        description: 'When this enters play, return an Action or Spell card from your Crypt/Discard pile to your active hand.',
        charges: 'On Entry'
      }
    ]
  },
  {
    id: 'TMP-AM006-STORMLINK-ARTIFICER',
    name: 'Stormlink Artificer',
    subtitle: 'CHARGE BATTERY CRAFTER • UNCOMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Aether Crafter',
    cost: 3,
    rarity: 'Uncommon',
    power: 2,
    defense: 4,
    speed: 5,
    laneRole: 'Support',
    quote: '"He binds the very storm into memory."',
    lore: 'Engineering charged glass capacitors that store excess electrostatic discharge for strategic bursts.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 4.0, durability: 6.0, mobility: 5.5, utility: 9.0, control: 6.5 },
    powerAttributes: { strength: 3.5, durability: 6.0, speed: 5.5, energyOutput: 8.0, fightingSkill: 5.0, intelligence: 8.5, control: 7.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[5]],
    abilities: [
      {
        id: 'am-6',
        name: 'Weavecharge Battery',
        type: 'Action',
        iconType: 'sparkles',
        description: 'Whenever you cast a Spell, gain 1 Charge counter. Remove 3 Charge counters: Draw a card and gain +1 Momentum.',
        charges: 'Battery'
      }
    ]
  },
  {
    id: 'TMP-AM007-RUNESURGE-EVOKER',
    name: 'Runesurge Evoker',
    subtitle: 'TEAM ANTHEM CASTER • RARE',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Runecaster',
    cost: 4,
    rarity: 'Rare',
    power: 3,
    defense: 4,
    speed: 7,
    laneRole: 'Center',
    quote: '"The runes glow brightest in a cascade of words."',
    lore: 'Imbuing the frontline with gale-force adrenaline whenever a cascade of twin incantations illuminates the sky.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 6.5, durability: 5.5, mobility: 7.5, utility: 8.5, control: 6.0 },
    powerAttributes: { strength: 4.5, durability: 5.5, speed: 7.5, energyOutput: 8.5, fightingSkill: 6.5, intelligence: 8.5, control: 7.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[6]],
    abilities: [
      {
        id: 'am-7',
        name: 'Spellstorm Anthem',
        type: 'Passive',
        iconType: 'flame',
        description: 'If you have played two or more Spells this turn, all allied units gain +1 Power and +1 Defense until the end of the round.',
        charges: 'Threshold Trigger'
      }
    ]
  },
  {
    id: 'TMP-AM008-CYCLING-THOUGHTMAGE',
    name: 'Cycling Thoughtmage',
    subtitle: 'FLASHCAST INFILTRATOR • COMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Elemental Wizard',
    cost: 3,
    rarity: 'Common',
    power: 2,
    defense: 3,
    speed: 8,
    laneRole: 'Flank',
    quote: '"Thinking is reacting—faster than thought itself."',
    lore: 'Moving as fast as an electrical synapse, the Thoughtmage deploys instantly in the wake of an ally\'s spell.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 5.0, durability: 4.5, mobility: 8.5, utility: 7.0, control: 5.5 },
    powerAttributes: { strength: 3.5, durability: 4.5, speed: 8.5, energyOutput: 7.0, fightingSkill: 5.5, intelligence: 8.0, control: 6.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[7]],
    abilities: [
      {
        id: 'am-8',
        name: 'Flashcast Ambush',
        type: 'Reaction',
        iconType: 'zap',
        description: 'You may cast this card as a Fast Reaction during an opponent\'s turn if you have already cast a Spell or triggered an Action this round.',
        charges: 'Fast Reaction'
      }
    ]
  },
  {
    id: 'TMP-AM009-TEMPEST-LOREBINDER',
    name: 'Tempest Lorebinder',
    subtitle: 'CHRONO-SPELL SEER • LEGENDARY CHAMPION',
    domain: 'Tempest',
    cardType: 'Champion',
    subtype: 'Legendary Aether Seer',
    cost: 6,
    rarity: 'Legendary',
    power: 5,
    defense: 6,
    speed: 7,
    divineRank: 4,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Universal',
    affiliation: 'Order of the Cyclone Codex',
    primaryPower: 'Spell Cascade / Momentum Cost Reduction',
    quote: '"Each word spoken rides the wind of the last."',
    lore: 'Keeper of the Ancient Tempest Codex. Under her guidance, the mental cost of casting spells dissolves as winds carry words across the cosmos.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 8.0, durability: 7.5, mobility: 7.5, utility: 10.0, control: 8.5 },
    powerAttributes: { strength: 5.5, durability: 7.0, speed: 7.5, energyOutput: 9.5, fightingSkill: 7.5, intelligence: 10.0, control: 9.0 },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[8],
      UNIVERSAL_POWER_GLYPHS[9]
    ],
    abilities: [
      {
        id: 'am-9-1',
        name: 'Cascade Reduction Mastery',
        type: 'Passive',
        iconType: 'sparkles',
        description: 'Spells and Actions you cast cost 1 less Momentum for each other Spell you have cast this turn (minimum 1).',
        charges: 'Continuous'
      },
      {
        id: 'am-9-2',
        name: 'Typhoon Codex Overload',
        type: 'Ultimate',
        iconType: 'zap',
        description: 'Release all stored cascade energy in a vortex. Deals 4d8 lightning damage across all enemy lanes and refills 3 Momentum.',
        damageDice: '4d8 Lightning Vortex'
      }
    ]
  },
  {
    id: 'TMP-AM010-ECHOFORM-CHANNELER',
    name: 'Echoform Channeler',
    subtitle: 'SPELL DUPLICATOR • UNCOMMON',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Illusionist Spellshaper',
    cost: 2,
    rarity: 'Uncommon',
    power: 2,
    defense: 3,
    speed: 7,
    laneRole: 'Support',
    quote: '"The storm speaks in many tongues—he echoes them all."',
    lore: 'A master illusionist who creates acoustic and kinetic reflections of every spell, striking two targets with one bolt.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 5.0, durability: 4.5, mobility: 7.5, utility: 9.0, control: 7.0 },
    powerAttributes: { strength: 3.5, durability: 4.5, speed: 7.5, energyOutput: 8.0, fightingSkill: 5.5, intelligence: 8.5, control: 8.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[10]],
    abilities: [
      {
        id: 'am-10',
        name: 'Mirror Spell Refraction',
        type: 'Action',
        iconType: 'sparkles',
        description: 'Whenever you cast a targeted Spell, you may spend 1 Momentum to copy it. You may choose a new target for the copy.',
        charges: 'Echo Trigger'
      }
    ]
  },

  // ==========================================
  // ETERNALS OF THE CYCLONE (Legendary Beings & Avatars)
  // ==========================================
  {
    id: 'TMP-EC001-AETHERSTORM-HERALD',
    name: 'Aetherstorm Herald',
    subtitle: 'STORM ECHO AVATAR • LEGENDARY',
    domain: 'Tempest',
    cardType: 'Champion',
    subtype: 'Legendary Elemental Avatar',
    cost: 6,
    rarity: 'Legendary',
    power: 5,
    defense: 6,
    speed: 8,
    divineRank: 4,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Flank',
    affiliation: 'Eternals of the Cyclone',
    primaryPower: 'Gale Dispersion / Lane Recoil',
    quote: '"The storm listens to none but its own echoes."',
    lore: 'Herald of the primordial storm winds. Its roar creates reverse gravitational vortices that lift enemy structures into the sky.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 7.5, durability: 7.5, mobility: 8.5, utility: 9.0, control: 9.0 },
    powerAttributes: { strength: 6.5, durability: 7.0, speed: 8.5, energyOutput: 9.0, fightingSkill: 7.5, intelligence: 8.5, control: 9.0 },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[11],
      UNIVERSAL_POWER_GLYPHS[12]
    ],
    abilities: [
      {
        id: 'ec-1',
        name: 'Cyclone Channel Recoil',
        type: 'Action',
        iconType: 'wind',
        description: 'Whenever you cast your second spell each turn, you may return target non-fortress enemy unit to its owner\'s hand.',
        charges: 'Turn Trigger'
      }
    ]
  },
  {
    id: 'TMP-EC002-TEMPEST-INCARNATE',
    name: 'Tempest Incarnate',
    subtitle: 'AVATAR OF THE LIVING SQUALL • MYTHIC',
    domain: 'Tempest',
    cardType: 'Beast',
    subtype: 'Elemental Avatar of Air',
    cost: 7,
    rarity: 'Mythic',
    power: 7,
    defense: 7,
    speed: 8,
    divineRank: 5,
    powerStars: 10,
    powerLevelTier: 'TIER S+',
    laneRole: 'Center',
    affiliation: 'Primordial Cyclones',
    primaryPower: 'Total Stratospheric Aerial Domination',
    quote: '"Its rage thunders through the helpless below."',
    lore: 'The living manifestation of the eternal hurricane that encircles the floating capitals of Tempest. Ground armies are flayed by its microbursts.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 9.5, durability: 8.5, mobility: 9.0, utility: 7.5, control: 9.5 },
    powerAttributes: { strength: 9.0, durability: 8.5, speed: 9.0, energyOutput: 9.5, fightingSkill: 8.5, intelligence: 7.0, control: 9.0 },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[13],
      UNIVERSAL_POWER_GLYPHS[14]
    ],
    abilities: [
      {
        id: 'ec-2-1',
        name: 'Skyborn Flight',
        type: 'Passive',
        iconType: 'wind',
        description: 'Skyborn (Flying). Cannot be blocked by units without Skyborn or Reach.',
        charges: 'Continuous'
      },
      {
        id: 'ec-2-2',
        name: 'Stormpulse Tremor',
        type: 'Reaction',
        iconType: 'zap',
        description: 'Whenever any Spell is cast, deal 1 direct damage to all ground units without Skyborn across the battlefield.',
        damageDice: '1 Global Shock'
      }
    ]
  },
  {
    id: 'TMP-EC003-EYE-OF-THE-MAELSTROM',
    name: 'Eye of the Maelstrom',
    subtitle: 'SILENT ARBITER • LEGENDARY',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Legendary Spirit of the Core',
    cost: 5,
    rarity: 'Legendary',
    power: 4,
    defense: 6,
    speed: 7,
    divineRank: 4,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Support',
    affiliation: 'Maelstrom Citadel',
    primaryPower: 'Atmospheric Spell Taxing',
    quote: '"At the storm\'s center lies utter silence—and judgment."',
    lore: 'Hovering in the zero-pressure eye of the great maelstrom, imposing absolute silence upon enemy casters.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 5.5, durability: 8.0, mobility: 7.0, utility: 9.5, control: 9.5 },
    powerAttributes: { strength: 4.5, durability: 7.5, speed: 7.0, energyOutput: 9.0, fightingSkill: 6.5, intelligence: 9.5, control: 9.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[15]],
    abilities: [
      {
        id: 'ec-3',
        name: 'Storm Calm Suppression',
        type: 'Passive',
        iconType: 'shield',
        description: 'Spells and Fast Reactions your opponents cast during your turn cost +2 additional Momentum to activate.',
        charges: 'Opponent Turn Tax'
      }
    ]
  },
  {
    id: 'TMP-EC004-CYCLONE-SOVEREIGN',
    name: 'Cyclone Sovereign',
    subtitle: 'PRIMORDIAL TITAN OF FREEZING AIR • DIVINE BOUNDLESS',
    domain: 'Tempest',
    cardType: 'Champion',
    subtype: 'Primordial Elemental Titan',
    cost: 8,
    rarity: 'Divine Boundless',
    power: 7,
    defense: 9,
    speed: 8,
    divineRank: 5,
    powerStars: 10,
    powerLevelTier: 'TIER S+',
    laneRole: 'Center',
    affiliation: 'Eternals of the Cyclone',
    primaryPower: 'Universal Sub-Zero Flash Freeze',
    quote: '"Every heartbeat in the storm belongs to it."',
    lore: 'The sovereign entity that governs atmospheric pressure across the entire Realm. When it descends, the world halts in freezing stasis.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 9.0, durability: 10.0, mobility: 8.0, utility: 9.0, control: 10.0 },
    powerAttributes: { strength: 9.0, durability: 10.0, speed: 8.0, energyOutput: 10.0, fightingSkill: 8.5, intelligence: 9.0, control: 10.0 },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[16],
      UNIVERSAL_POWER_GLYPHS[17]
    ],
    abilities: [
      {
        id: 'ec-4-1',
        name: 'Unstoppable Surge',
        type: 'Action',
        iconType: 'hourglass',
        description: 'When Cyclone Sovereign enters play, Exhaust all other units on the battlefield. They do not Ready during their next turn.',
        charges: 'On Entry Board Freeze'
      },
      {
        id: 'ec-4-2',
        name: 'Glacial Shatter',
        type: 'Ultimate',
        iconType: 'sword',
        description: 'Strike target frozen or exhausted enemy unit, shattering it into crystalline dust. Deals lethal damage.',
        damageDice: '8d10 Shatter'
      }
    ]
  },
  {
    id: 'TMP-EC005-SKYWRATH-AVATAR',
    name: 'Skywrath Avatar',
    subtitle: 'AVATAR OF WINDS • LEGENDARY',
    domain: 'Tempest',
    cardType: 'Beast',
    subtype: 'Avatar of Air',
    cost: 6,
    rarity: 'Legendary',
    power: 6,
    defense: 5,
    speed: 9,
    divineRank: 4,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Flank',
    affiliation: 'Eternals of the Cyclone',
    primaryPower: 'Aerial Vortex Strike',
    quote: '"Even the wind flees its wings."',
    lore: 'Wings spanning cloudbanks, the Skywrath Avatar creates localized micro-tornadoes that scoop up defending blockers and hurl them back into reserves.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 8.5, durability: 6.5, mobility: 9.5, utility: 7.5, control: 8.5 },
    powerAttributes: { strength: 7.5, durability: 6.5, speed: 9.5, energyOutput: 8.5, fightingSkill: 8.0, intelligence: 7.0, control: 8.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[18] || UNIVERSAL_POWER_GLYPHS[0]],
    abilities: [
      {
        id: 'ec-5',
        name: 'Vortex Sweep',
        type: 'Action',
        iconType: 'wind',
        description: 'Skyborn. When Skywrath Avatar attacks, return target Exhausted defending unit to its owner\'s hand before damage resolves.',
        charges: 'Attack Trigger'
      }
    ]
  },
  {
    id: 'TMP-EC006-WHIRLWIND-PARAGON',
    name: 'Whirlwind Paragon',
    subtitle: 'SWIFTSTORM DJINN • LEGENDARY',
    domain: 'Tempest',
    cardType: 'Champion',
    subtype: 'Legendary Djinn of the North Wind',
    cost: 5,
    rarity: 'Legendary',
    power: 5,
    defense: 4,
    speed: 9,
    divineRank: 4,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Flank',
    affiliation: 'Sky Djinn Coalition',
    primaryPower: 'High-Velocity Nexus Infiltration',
    quote: '"Swift as lightning, sly as the wind."',
    lore: 'Born from supersonic wind currents, the Paragon strikes instantly upon deployment, siphoning tactical intelligence directly into the player\'s hand.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 8.0, durability: 5.5, mobility: 10.0, utility: 8.5, control: 6.5 },
    powerAttributes: { strength: 6.5, durability: 5.0, speed: 10.0, energyOutput: 8.0, fightingSkill: 8.5, intelligence: 8.0, control: 7.0 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[19] || UNIVERSAL_POWER_GLYPHS[1]],
    abilities: [
      {
        id: 'ec-6',
        name: 'Swiftstorm Nexus Infiltration',
        type: 'Action',
        iconType: 'zap',
        description: 'Swift (attacks immediately on deployment turn). Skyborn. Whenever this deals combat damage to the enemy Nexus core, draw a card.',
        charges: 'Nexus Hit Trigger'
      }
    ]
  },
  {
    id: 'TMP-EC007-STORMWROUGHT-TITAN',
    name: 'Stormwrought Titan',
    subtitle: 'TEMPORAL GALE GIANT • LEGENDARY',
    domain: 'Tempest',
    cardType: 'Champion',
    subtype: 'Elemental Giant of Thunder',
    cost: 7,
    rarity: 'Legendary',
    power: 7,
    defense: 8,
    speed: 6,
    divineRank: 4,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Center',
    affiliation: 'Eternals of the Cyclone',
    primaryPower: 'Chronal Storm Stride',
    quote: '"Even time yields to the storm’s titan."',
    lore: 'Carved from charged stormstone and lightning conduits, this titan accelerates the passage of time around its lane.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 9.0, durability: 9.5, mobility: 6.0, utility: 9.0, control: 8.0 },
    powerAttributes: { strength: 9.5, durability: 9.5, speed: 6.0, energyOutput: 9.0, fightingSkill: 8.5, intelligence: 7.5, control: 8.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[20] || UNIVERSAL_POWER_GLYPHS[2]],
    abilities: [
      {
        id: 'ec-7',
        name: 'Stormforge Stride',
        type: 'Action',
        iconType: 'hourglass',
        description: 'When deployed, if you have cast at least two Spells this turn, gain an extra immediate Main Action Phase before combat resolves.',
        charges: 'On Entry Trigger'
      }
    ]
  },
  {
    id: 'TMP-EC008-ECHO-OF-THE-GALE',
    name: 'Echo of the Gale',
    subtitle: 'PHANTOM WIND SEER • LEGENDARY',
    domain: 'Tempest',
    cardType: 'Character',
    subtype: 'Legendary Illusion Spirit',
    cost: 4,
    rarity: 'Legendary',
    power: 3,
    defense: 4,
    speed: 8,
    divineRank: 3,
    powerStars: 8,
    powerLevelTier: 'TIER A+',
    laneRole: 'Support',
    affiliation: 'Driftveil Spirits',
    primaryPower: 'Phasing & Information Draw',
    quote: '"You hear its voice long after it\'s gone."',
    lore: 'An intangible illusion born of mountain winds that slips between dimensional frequencies to scout enemy decks.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 5.0, durability: 6.5, mobility: 9.5, utility: 9.5, control: 6.5 },
    powerAttributes: { strength: 3.5, durability: 6.0, speed: 9.5, energyOutput: 8.0, fightingSkill: 5.5, intelligence: 9.0, control: 7.5 },
    powerGlyphs: [UNIVERSAL_POWER_GLYPHS[21] || UNIVERSAL_POWER_GLYPHS[3]],
    abilities: [
      {
        id: 'ec-8',
        name: 'Phantomwind Phasing',
        type: 'Passive',
        iconType: 'eye',
        description: 'At the beginning of your turn, Phase this card out (immune to damage and targeting), then draw 1 card. Returns at end of turn.',
        charges: 'Turn Phase Cycle'
      }
    ]
  },
  {
    id: 'TMP-EC009-STORMSHAPER-ASCENDANT',
    name: 'Stormshaper Ascendant',
    subtitle: 'SKYBORN QUEEN • LEGENDARY CHAMPION',
    domain: 'Tempest',
    cardType: 'Champion',
    subtype: 'Legendary Skyborn Sovereign',
    cost: 5,
    rarity: 'Legendary',
    power: 4,
    defense: 6,
    speed: 8,
    divineRank: 4,
    powerStars: 9,
    powerLevelTier: 'TIER S',
    laneRole: 'Universal',
    affiliation: 'Stormshaper Sovereignty',
    primaryPower: 'Aerial Swarm Command',
    quote: '"She rises and the wind obeys."',
    lore: 'Supreme commander of the aerial sky-fleets of Tempest, whose sonic commands boost the flight speed and lethality of all winged allies.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 7.0, durability: 8.0, mobility: 8.5, utility: 9.0, control: 8.0 },
    powerAttributes: { strength: 5.5, durability: 7.5, speed: 8.5, energyOutput: 8.5, fightingSkill: 8.0, intelligence: 9.0, control: 8.5 },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[22] || UNIVERSAL_POWER_GLYPHS[4],
      UNIVERSAL_POWER_GLYPHS[23] || UNIVERSAL_POWER_GLYPHS[5]
    ],
    abilities: [
      {
        id: 'ec-9',
        name: 'Ascendstorm Flight Command',
        type: 'Action',
        iconType: 'wind',
        description: 'At the start of combat, all allied Skyborn units gain +2 Power and +1 Speed until the end of the round.',
        charges: 'Combat Start'
      }
    ]
  },
  {
    id: 'TMP-EC010-EYE-OF-INFINITY',
    name: 'Eye of Infinity',
    subtitle: 'GENESIS OF THE STORM • DIVINE BOUNDLESS',
    domain: 'Tempest',
    cardType: 'Champion',
    subtype: 'Primordial Deity of Cosmic Wind',
    cost: 10,
    rarity: 'Divine Boundless',
    power: 9,
    defense: 9,
    speed: 10,
    divineRank: 5,
    powerStars: 10,
    powerLevelTier: 'TIER S+',
    laneRole: 'Universal',
    affiliation: 'Primordial Genesis',
    primaryPower: 'Infinite Cosmic Whirlwind / Complete Turn Reset',
    quote: '"It is the storm before the storm—and after."',
    lore: 'The primordial vortex from which all motion and air in the Realm of Nexus originated. Its arrival shatters reality into an infinite spiral of raw possibilities.',
    aestheticTheme: 'astral-sapphire',
    attributes: { damage: 10.0, durability: 10.0, mobility: 10.0, utility: 10.0, control: 10.0 },
    powerAttributes: { strength: 10.0, durability: 10.0, speed: 10.0, energyOutput: 10.0, fightingSkill: 10.0, intelligence: 10.0, control: 10.0 },
    powerGlyphs: [
      UNIVERSAL_POWER_GLYPHS[24] || UNIVERSAL_POWER_GLYPHS[6],
      UNIVERSAL_POWER_GLYPHS[25] || UNIVERSAL_POWER_GLYPHS[7],
      UNIVERSAL_POWER_GLYPHS[26] || UNIVERSAL_POWER_GLYPHS[8]
    ],
    abilities: [
      {
        id: 'ec-10-1',
        name: 'Eternal Spiral Infallibility',
        type: 'Passive',
        iconType: 'crown',
        description: 'This spell cannot be countered, interrupted, or delayed. Enters play with absolute priority.',
        charges: 'Absolute'
      },
      {
        id: 'ec-10-2',
        name: 'Genesis Convergence',
        type: 'Ultimate',
        iconType: 'sparkles',
        description: 'When this enters play, draw 3 cards, Ready all exhausted allied permanents, and refill your Momentum pool to maximum.',
        damageDice: '10d10 Cosmic Tempest'
      }
    ]
  }
];

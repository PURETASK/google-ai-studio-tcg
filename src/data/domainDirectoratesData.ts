// Stage F: The Five Domain Directorates & Inter-Domain Pairings
// Authoritative Data & Domain Systems

export interface DomainDirectorate {
  domainKey: 'Radiant' | 'Verdant' | 'Abyssal' | 'Temporal' | 'Sanctum';
  directorCode: string;
  directorName: string;
  colorHex: string;
  philosophicalPillar: string;
  mechanicalIdentities: string[];
  signatureKeywords: string[];
  forbiddenMechanics: string[];
  coreAgents: { code: string; name: string; focus: string }[];
  specialists: { code: string; name: string; focus: string }[];
}

export interface InterDomainPairing {
  pairId: string;
  domains: ['Radiant' | 'Verdant' | 'Abyssal' | 'Temporal' | 'Sanctum', 'Radiant' | 'Verdant' | 'Abyssal' | 'Temporal' | 'Sanctum'];
  pairName: string;
  matchupDynamics: string;
  favoredDomain: string;
  hybridSplashArchetype: string;
  hybridMechanicSynthesis: string;
  sampleDeckTitle: string;
}

export const DOMAIN_DIRECTORATES: DomainDirectorate[] = [
  {
    domainKey: 'Radiant',
    directorCode: 'RAD-DIR',
    directorName: 'Radiant Domain Directorate Lead',
    colorHex: '#f59e0b',
    philosophicalPillar: 'Divine Order, Solar Fortification, Unyielding Dawn, Collective Unity.',
    mechanicalIdentities: [
      'Lane Fortification & Multi-Unit Formations',
      'Continuous Buff Auras & Stat Augmentation',
      'Guarded Vanguard Defenses & Direct Retribution Damage'
    ],
    signatureKeywords: ['Guard', 'Radiance', 'Aegis', 'Daylight Dawn'],
    forbiddenMechanics: ['Random Hand Discard', 'Sacrificing Own Units for Value', 'Time Skipping'],
    coreAgents: [
      { code: 'RAD-01', name: 'Dawn Formation Tactician', focus: 'Multi-unit lane formation bonuses' },
      { code: 'RAD-02', name: 'Solar Aegis Armorer', focus: 'Armor shields and passive damage reduction' },
      { code: 'RAD-03', name: 'Sunburst Ballistics Engineer', focus: 'Piercing light attacks and anti-air strikes' },
      { code: 'RAD-04', name: 'Sanctified Field Medic', focus: 'Nexus core healing and status cleansing' },
      { code: 'RAD-05', name: 'Lumen Herald Synergist', focus: 'Low-cost enablers and dawn herald synergy' },
      { code: 'RAD-06', name: 'High Solar Inquisitor', focus: 'Punishing enemy spellcasts and stealth reveal' },
      { code: 'RAD-07', name: 'Radiant Paragon Finisher', focus: 'Late-game celestial titans and lethal formations' }
    ],
    specialists: [
      { code: 'RAD-SPEC-1', name: 'Solar Zenith Specialist', focus: 'Peak turn Essence bonus mechanics' },
      { code: 'RAD-SPEC-2', name: 'Bastion Architecture Lead', focus: 'Lane fortification durability rules' },
      { code: 'RAD-SPEC-3', name: 'Righteous Vow Auditor', focus: 'Moral flavor and oath-bound clauses' },
      { code: 'RAD-SPEC-4', name: 'Daylight Engine Modeler', focus: 'Dawn/Dusk transition triggers' }
    ]
  },
  {
    domainKey: 'Verdant',
    directorCode: 'VER-DIR',
    directorName: 'Verdant Domain Directorate Lead',
    colorHex: '#10b981',
    philosophicalPillar: 'Wild Growth, Exponential Adaptation, Primeval Swarms, Symbiotic Life.',
    mechanicalIdentities: [
      'Token Sporeling Multiplication & Wide Board Flooding',
      'Rapid Essence Ramping & Mana Surge acceleration',
      'Colossal Trampling Beasts & Regeneration'
    ],
    signatureKeywords: ['Spore Swarm', 'Regenerate', 'Overgrowth', 'Trample'],
    forbiddenMechanics: ['Counterspells', 'Direct Spell Burn to Nexus', 'Permanent Card Banishment'],
    coreAgents: [
      { code: 'VER-01', name: 'Spore Colony Architect', focus: '1/1 Sporeling tokens and wide swarm engines' },
      { code: 'VER-02', name: 'Primeval Behemoth Shaper', focus: 'Colossal 7+ cost apex predators' },
      { code: 'VER-03', name: 'Worldroot Ramping Mystic', focus: 'Essence gem acceleration and land surging' },
      { code: 'VER-04', name: 'Adaptation Gene-Weaver', focus: 'Reactive stat counters and beast morphing' },
      { code: 'VER-05', name: 'Canopy Ambush Stalker', focus: 'Lane-jumping beasts and camouflage strikes' },
      { code: 'VER-06', name: 'Symbiotic Blossom Cultivator', focus: 'Shared buffs across all token units' },
      { code: 'VER-07', name: 'Primal Apex Finisher', focus: 'Trample overruns that burst through blockers' }
    ],
    specialists: [
      { code: 'VER-SPEC-1', name: 'Sporeling Mass Modeler', focus: 'Memory optimization for 6+ token states' },
      { code: 'VER-SPEC-2', name: 'Overgrowth Velocity Lead', focus: 'Turn-3 ramp threshold balance' },
      { code: 'VER-SPEC-3', name: 'Apex Predator Taxonomist', focus: 'Beast typing and evolutionary trees' },
      { code: 'VER-SPEC-4', name: 'Primeval Roar SFX Lead', focus: 'Dynamic organic creature voice lines' }
    ]
  },
  {
    domainKey: 'Abyssal',
    directorCode: 'ABY-DIR',
    directorName: 'Abyssal Domain Directorate Lead',
    colorHex: '#a855f7',
    philosophicalPillar: 'Dark Bargains, Soul Harvesting, Inevitable Decay, Necrotic Rebirth.',
    mechanicalIdentities: [
      'Graveyard Reanimation & Recursive Undead Engines',
      'Unit Sacrifice for Explosive Power & Mana Bursts',
      'Targeted Removal, Curses & Persistent Wither Counters'
    ],
    signatureKeywords: ['Soulbound', 'Soul Harvest', 'Wither', 'Reanimate'],
    forbiddenMechanics: ['Healing the Nexus to Max HP', 'Pure Protective Wards', 'Cooperative Symbiosis'],
    coreAgents: [
      { code: 'ABY-01', name: 'Crypt Reanimator Lead', focus: 'Graveyard-to-battlefield resurrection lines' },
      { code: 'ABY-02', name: 'Soul Harvest Altar Master', focus: 'Sacrificing allied units for cards and Essence' },
      { code: 'ABY-03', name: 'Wither & Decay Toxicologist', focus: 'Permanent negative -X/-X attack reduction' },
      { code: 'ABY-04', name: 'Dread Bargain Synergist', focus: 'Trading Nexus HP for high-tempo advantages' },
      { code: 'ABY-05', name: 'Vortex Mill Inquisitor', focus: 'Depleting enemy deck into the Graveyard' },
      { code: 'ABY-06', name: 'Shadowstealth Assassin', focus: 'Direct lane breach and unblockable strikes' },
      { code: 'ABY-07', name: 'Abyssal Nether Titan Finisher', focus: 'Catastrophic reanimated board dominators' }
    ],
    specialists: [
      { code: 'ABY-SPEC-1', name: 'Grave-Loop Containment Auditor', focus: 'Prevents infinite sacrifice recursion (GLO-14 link)' },
      { code: 'ABY-SPEC-2', name: 'Soul-Cost Mathematical Modeler', focus: 'HP-to-Essence conversion ratios' },
      { code: 'ABY-SPEC-3', name: 'Necrotic Lore Custodian', focus: 'Underworld hierarchy and demon pacts' },
      { code: 'ABY-SPEC-4', name: 'Tilt Discard Filter Lead', focus: 'Audits hand attack to prevent N4 tilt' },
      { code: 'ABY-SPEC-5', name: 'Void Animation Engineer', focus: 'Dark particle VFX and spectral dissipation' }
    ]
  },
  {
    domainKey: 'Temporal',
    directorCode: 'TMP-DIR',
    directorName: 'Temporal Domain Directorate Lead',
    colorHex: '#06b6d4',
    philosophicalPillar: 'Chronal Manipulation, Alternate Timelines, Echo Duplication, Precognition.',
    mechanicalIdentities: [
      'Phase Shifting Units Out of Time to Evade Removal',
      'Echo Spell Copies & Fast-Action Chain Duplications',
      'Bouncing Units to Hand & Turn Rewind Tempo Swings'
    ],
    signatureKeywords: ['Phase Shift', 'Echo', 'Rewind', 'Precognition'],
    forbiddenMechanics: ['Permanent Stat Ramping', 'Unconditional Hard Board Wipes', 'Raw Graveyard Reanimation'],
    coreAgents: [
      { code: 'TMP-01', name: 'Phase Shift Chronomancer', focus: 'Temporal exile and timed lane returns' },
      { code: 'TMP-02', name: 'Echo Weaver Specialist', focus: 'Single-turn duplicated spell casting' },
      { code: 'TMP-03', name: 'Chronal Rewind Tactician', focus: 'Resetting units to previous turn states' },
      { code: 'TMP-04', name: 'Priority Fast-Action Master', focus: 'Stack-based counterplay and timing traps' },
      { code: 'TMP-05', name: 'Precognition Deck Augur', focus: 'Scrying deck order and predictive triggers' },
      { code: 'TMP-06', name: 'Time-Rift Disrupter', focus: 'Cost manipulation and turn delay triggers' },
      { code: 'TMP-07', name: 'Paradox Sovereign Finisher', focus: 'Infinite time-loop win conditions' }
    ],
    specialists: [
      { code: 'TMP-SPEC-1', name: 'LIFO Priority Stack Checker', focus: 'Zero-latency fast action chains' },
      { code: 'TMP-SPEC-2', name: 'Phase Return Collision Lead', focus: 'Occupied lane return priority rules' },
      { code: 'TMP-SPEC-3', name: 'Paradox Loop Red-Teamer', focus: 'Prevents infinite turn lockouts' },
      { code: 'TMP-SPEC-4', name: 'Chrono-Visual Warp Designer', focus: 'Distortion shaders and timeline HUDs' }
    ]
  },
  {
    domainKey: 'Sanctum',
    directorCode: 'SAN-DIR',
    directorName: 'Sanctum Domain Directorate Lead',
    colorHex: '#6366f1',
    philosophicalPillar: 'Absolute Truth, Divine Reflection, Unassailable Fortress, Karmic Balance.',
    mechanicalIdentities: [
      'Divine Wards & Absolute Damage Absorption',
      'Reflective Karmic Damage (Spell & Attack Rebound)',
      'Stasis Locks, Taxing Auras & Absolute Rule Enforcement'
    ],
    signatureKeywords: ['Divine Ward', 'Karmic Rebound', 'Stasis', 'Purity Tax'],
    forbiddenMechanics: ['Sacrificing Allied Units', 'Unprovoked Aggressive Rush', 'Graveyard Looting'],
    coreAgents: [
      { code: 'SAN-01', name: 'Divine Ward Mason', focus: 'Layered absorption barriers and spell shields' },
      { code: 'SAN-02', name: 'Karmic Mirror Duelist', focus: 'Reflecting incoming combat and spell damage' },
      { code: 'SAN-03', name: 'Stasis Seal Inquisitor', focus: 'Freezing enemy units and suppressing activated abilities' },
      { code: 'SAN-04', name: 'Purity Tax Magistrate', focus: 'Increasing opponent Essence costs for fast actions' },
      { code: 'SAN-05', name: 'Truth-Sight Oracle', focus: 'Revealing hidden traps and disabling stealth' },
      { code: 'SAN-06', name: 'Sanctuary Guardian', focus: 'Unbreakable center-lane bastion defense' },
      { code: 'SAN-07', name: 'Avatar of Divine Law Finisher', focus: 'Symmetric justice board wipe and stasis victory' }
    ],
    specialists: [
      { code: 'SAN-SPEC-1', name: 'Ward Absorption Layer Modeler', focus: 'Prevents negative damage underflows' },
      { code: 'SAN-SPEC-2', name: 'Tax Balance Mathematician', focus: 'Ensures tax effects do not cause hard locks' },
      { code: 'SAN-SPEC-3', name: 'Prism Light Stylist', focus: 'Sacred geometry and cathedral architecture' },
      { code: 'SAN-SPEC-4', name: 'Judicial Grammar Lead', focus: 'Legalistic card text precision' }
    ]
  }
];

export const INTER_DOMAIN_PAIRINGS: InterDomainPairing[] = [
  {
    pairId: 'PAIR-01',
    domains: ['Radiant', 'Verdant'],
    pairName: 'Sun-Root Alliance (Radiant + Verdant)',
    matchupDynamics: 'Radiant provides armored single-target formations, while Verdant floods wide token swarms.',
    favoredDomain: 'Slight Radiant advantage against pure Verdant (Auras clear tokens).',
    hybridSplashArchetype: 'Dawn-Overgrowth Swarm',
    hybridMechanicSynthesis: 'Every 1/1 Sporeling token summoned into a Radiant fortified lane gains +1/+1 and Guard.',
    sampleDeckTitle: 'Sovereign Canopy Bastion'
  },
  {
    pairId: 'PAIR-02',
    domains: ['Radiant', 'Abyssal'],
    pairName: 'Eclipse Polarization (Radiant + Abyssal)',
    matchupDynamics: 'Supreme ideological clash. Radiant heals and fortifies; Abyssal withers and reanimates.',
    favoredDomain: '50/50 Skill Matchup (Radiant cleanses withers; Abyssal bypasses guards via sacrifice).',
    hybridSplashArchetype: 'Twilight Martyrdom',
    hybridMechanicSynthesis: 'Sacrifice fortified Radiant units to trigger massive Abyssal Soul Harvest bursts and revive them at Dawn.',
    sampleDeckTitle: 'Order of the Black Sun'
  },
  {
    pairId: 'PAIR-03',
    domains: ['Radiant', 'Temporal'],
    pairName: 'Solar Horizon (Radiant + Temporal)',
    matchupDynamics: 'Radiant lane stability meets Temporal timing manipulation.',
    favoredDomain: 'Temporal favors against slow Radiant setups via phase disruption.',
    hybridSplashArchetype: 'Chronal Vanguard',
    hybridMechanicSynthesis: 'Phase Shift Radiant titans to avoid removal, returning them with permanent double Dawn auras.',
    sampleDeckTitle: 'Timeless Dawn Guard'
  },
  {
    pairId: 'PAIR-04',
    domains: ['Radiant', 'Sanctum'],
    pairName: 'High Seraph Bastion (Radiant + Sanctum)',
    matchupDynamics: 'Fortress vs Fortress. The most resilient defensive mirror match in the game.',
    favoredDomain: 'Sanctum favors late-game via Stasis locks.',
    hybridSplashArchetype: 'Unassailable Law',
    hybridMechanicSynthesis: 'Combines Guard formations with Divine Wards, making units completely immune to first 2 attacks.',
    sampleDeckTitle: 'Cathedral of Perpetual Dawn'
  },
  {
    pairId: 'PAIR-05',
    domains: ['Verdant', 'Abyssal'],
    pairName: 'Rot & Bloom (Verdant + Abyssal)',
    matchupDynamics: 'Infinite biological growth meets necrotic decomposition.',
    favoredDomain: 'Abyssal favors via Wither wiping 1 HP token swarms.',
    hybridSplashArchetype: 'Fungal Necromancy',
    hybridMechanicSynthesis: 'Sacrifice 1/1 Sporelings to instantly reanimate colossal 8-cost Primeval Behemoths from the Graveyard.',
    sampleDeckTitle: 'Crumbling Worldroot Cult'
  },
  {
    pairId: 'PAIR-06',
    domains: ['Verdant', 'Temporal'],
    pairName: 'Primeval Echoes (Verdant + Temporal)',
    matchupDynamics: 'Rapid mana ramp meets spell duplication.',
    favoredDomain: 'Verdant favors early; Temporal dominates late turns.',
    hybridSplashArchetype: 'Accelerated Evolution',
    hybridMechanicSynthesis: 'Echo spell duplication cast on mana ramp spells, reaching 10 Essence by Turn 4.',
    sampleDeckTitle: 'Paradox Grove Druids'
  },
  {
    pairId: 'PAIR-07',
    domains: ['Verdant', 'Sanctum'],
    pairName: 'Sanctified Eden (Verdant + Sanctum)',
    matchupDynamics: 'Organic swarm vs strict crystal stasis.',
    favoredDomain: 'Verdant overwhelms single-target Sanctum wards.',
    hybridSplashArchetype: 'Living Fortress',
    hybridMechanicSynthesis: 'Sporelings gain Divine Wards, creating an impenetrable wide wall of protected blockers.',
    sampleDeckTitle: 'Prismatic Grove Keepers'
  },
  {
    pairId: 'PAIR-08',
    domains: ['Abyssal', 'Temporal'],
    pairName: 'Void Paradox (Abyssal + Temporal)',
    matchupDynamics: 'Graveyard recursion meets chronal rewind.',
    favoredDomain: 'Highly competitive 51/49 Temporal advantage.',
    hybridSplashArchetype: 'Death Rewind Loop',
    hybridMechanicSynthesis: 'Rewind friendly dead units directly to the battlefield without consuming standard Graveyard mana costs.',
    sampleDeckTitle: 'Entropy Timeweavers'
  },
  {
    pairId: 'PAIR-09',
    domains: ['Abyssal', 'Sanctum'],
    pairName: 'Karmic Judgment (Abyssal + Sanctum)',
    matchupDynamics: 'Dark curses encounter reflective holy mirrors.',
    favoredDomain: 'Sanctum reflects targeted Abyssal curses back to caster.',
    hybridSplashArchetype: 'Purgatory Inquisitors',
    hybridMechanicSynthesis: 'Reflect combat damage while draining opponent Nexus HP to heal your own core.',
    sampleDeckTitle: 'Judges of the Obsidian Gate'
  },
  {
    pairId: 'PAIR-10',
    domains: ['Temporal', 'Sanctum'],
    pairName: 'Chronal Stasis (Temporal + Sanctum)',
    matchupDynamics: 'Pure control vs pure tempo manipulation.',
    favoredDomain: 'Temporal edges out via fast-action stack priority.',
    hybridSplashArchetype: 'Absolute Time Freeze',
    hybridMechanicSynthesis: 'Stasis freezes enemy units while Phase Shift keeps allied units safely out of danger.',
    sampleDeckTitle: 'Monks of the Frozen Epoch'
  }
];

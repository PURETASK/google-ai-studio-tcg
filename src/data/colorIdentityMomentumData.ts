import { Domain } from '../types';

export interface ConceptAuditItem {
  id: string;
  originalConcept: string;
  originalDomain: string;
  classification: 'KEEP' | 'MODIFY' | 'MERGE' | 'REJECT' | 'PROTOTYPE';
  reasoning: string;
  evolutionToNexus: string;
}

export interface FactionPhilosophy {
  domain: string;
  traditionalExpectation: string;
  invertedNexusIdentity: string;
  philosophy: string;
  desire: string;
  method: string;
  strengths: string[];
  weaknesses: string[];
  resourceBehavior: string;
  combatBehavior: string;
  cardAdvantage: string;
  interaction: string;
  recovery: string;
  finishers: string;
  riskProfile: string;
  playerFantasy: string;
  signatureVerbs: string[];
  momentumInteraction: string;
  terrainInteraction: string;
  hazardInteraction: string;
  idealArchetypes: string[];
  naturalAllies: string[];
  naturalEnemies: string[];
}

export interface MomentumPrototype {
  id: string;
  name: string;
  modelType: 'Action' | 'Track' | 'Faction-Specific' | 'Contested Tug-of-War' | 'Event' | 'Combo Chain' | 'State';
  tagline: string;
  rulesExplanation: string[];
  generationMechanisms: string[];
  spendingMechanisms: string[];
  limitsAndCaps: string;
  decayRules: string;
  timingWindows: string;
  factionInteractions: Record<string, string>;
  sampleCards: { name: string; cost: string; type: string; rule: string; role: string }[];
  advantages: string[];
  disadvantages: string[];
  exploitRisks: string[];
  snowballRisks: string[];
  bookkeepingComplexity: 'Low' | 'Medium' | 'High' | 'Severe';
  digitalDifficulty: 'Trivial' | 'Moderate' | 'Complex';
  tabletopDifficulty: 'Trivial' | 'Easy' | 'Moderate' | 'Heavy';
  status: 'PROVISIONAL' | 'EXPERIMENTAL' | 'RECOMMENDED_PLAYTEST' | 'BENCHMARKED';
}

export interface MechanicPrototypeSpec {
  id: string;
  name: string;
  associatedDomain: string;
  coreThesis: string;
  formalRulesClauses: string[];
  tabletopExecution: string;
  digitalExecution: string;
  counterplayVectors: string[];
  pitfallsAvoided: string[];
  sampleCards: { name: string; cost: number; domain: Domain; type: string; stats?: string; text: string }[];
}

export interface CrossDomainSynergy {
  pair: string;
  domains: [string, string];
  synergyThesis: string;
  mechanicCollision: string;
  emergentArchetype: string;
  riskSeverity: 'Low' | 'Moderate' | 'High' | 'Severe (Red-Team Priority)';
  redTeamWarning: string;
  sampleCard: { name: string; cost: string; effect: string };
}

export interface CounterplayMatrixEntry {
  domainA: string;
  domainB: string;
  favored: string;
  matchupRatio: string;
  tacticalTension: string;
  domainAKeyTools: string[];
  domainBKeyTools: string[];
  counterplayAdvice: string;
}

export interface BibleSection {
  sectionNumber: number;
  title: string;
  slug: string;
  category: 'Philosophy & Audit' | 'Domain Identities' | 'Momentum Framework' | 'Mechanics Prototypes' | 'Archetypes & Synergies' | 'Balance, Exploit & Testing';
  summary: string;
  status: 'LOCKED' | 'PROVISIONAL' | 'EXPERIMENTAL' | 'OPEN QUESTION';
}

// ---------------- 1. ORIGINAL CONCEPTS AUDIT (Section 2) ----------------
export const CONCEPTS_AUDIT: ConceptAuditItem[] = [
  {
    id: 'aud-01',
    originalConcept: 'Illusionist Manipulation (Decoys, Characteristic Mimicry, False Info)',
    originalDomain: 'Blue / Arcane',
    classification: 'PROTOTYPE',
    reasoning: 'Provides deep mind-game interaction that disrupts linear targeting without needing counterspells. Must be designed with clear tabletop physical token indicators to prevent hidden-information illegalities.',
    evolutionToNexus: 'Evolved into the Mirage & Decoy Keyword System (Stage 18) where Illusions carry physical Decoy tokens that absorb targeted spells or redirect flank combat declarations.'
  },
  {
    id: 'aud-02',
    originalConcept: 'Mind Over Matter (Tap creatures to counter/disrupt spells)',
    originalDomain: 'Blue / Arcane',
    classification: 'MODIFY',
    reasoning: 'Pure unconditional spell countering leads to non-games and frustration. Modifying from hard counters to Disruption Taxes and Priority Interrupt Speed Clashes.',
    evolutionToNexus: 'Transformed into Tempest "Speed Clash" and "Echo Interference" where exhausting units forces opponents to pay Momentum or delay resolution until end of phase.'
  },
  {
    id: 'aud-03',
    originalConcept: 'Temporal Insight (Topdeck manipulation, predictive draw)',
    originalDomain: 'Blue / Arcane',
    classification: 'MERGE',
    reasoning: 'Merged with Tempest Forecast and Atmospheric Hazard manipulation. Looking ahead must interact with the living board, not just pure hand size.',
    evolutionToNexus: 'Merged into the Forecast mechanic: Predict upcoming Hazard Cataclysms and rearrange upcoming Grimoire cards to prepare for planar shifts.'
  },
  {
    id: 'aud-04',
    originalConcept: 'Fiery Assault & Chaotic Instincts (Uncontrolled burn & coin flips)',
    originalDomain: 'Red / Radiance',
    classification: 'REJECT',
    reasoning: 'Completely rejected the trope of mindless coin-flip randomness for fire. Radiance represents high-discipline martial forge engineering and controlled heat routing.',
    evolutionToNexus: 'Inverted into "Disciplined Heat Engine" and "Pyraxis Mark": Precision kill zones, deliberate damage allocation, and accumulated restraint bonuses.'
  },
  {
    id: 'aud-05',
    originalConcept: 'Nature Growth & Beastial Swarm (Ramp into big creatures, +1/+1 token flood)',
    originalDomain: 'Green / Verdance',
    classification: 'MODIFY',
    reasoning: 'Generic +1/+1 swarm creates arithmetic slogs. Verdance is an unforgiving living ecosystem characterized by scarcity, predation, symbiosis, and adaptive evolution.',
    evolutionToNexus: 'Replaced with "Predatory Adaptation" and "Mycelial Network": Units evolve when surviving combat by gaining specific combat traits from fallen foes.'
  },
  {
    id: 'aud-06',
    originalConcept: 'Dark Bargains & Mindless Graveyard Recursion (Sacrifice for value)',
    originalDomain: 'Black / Abyss',
    classification: 'MODIFY',
    reasoning: 'Reckless self-sacrifice is generic. The Abyss is about Soul preservation, Necrosteel construct augmentation, and the solemn refusal to let souls dissipate into nothingness.',
    evolutionToNexus: 'Transformed into "Soulbinding & Preservation": Souls are finite, precious resources stored in Soul Vats and bound to constructs rather than disposable fodder.'
  },
  {
    id: 'aud-07',
    originalConcept: 'Rigid Law & Holy Knights (White Order & Pacifism)',
    originalDomain: 'White / Sanctuary',
    classification: 'MODIFY',
    reasoning: 'Sanctuary combines deep sacred protection and resonant harmony with an underlying danger of authoritarian forced unity and shield-locking control.',
    evolutionToNexus: 'Evolved into "Aegis Redirection" and "Resonance Oaths": Sacred barriers that reflect force, coordinated formations, and harmonic bell resonance.'
  },
  {
    id: 'aud-08',
    originalConcept: 'Generic Colorless Utility Artifacts (Universal splash staples)',
    originalDomain: 'Colorless / Neutral',
    classification: 'REJECT',
    reasoning: 'Universal colorless staples homogenize formats by being played in every deck. Colorless must represent rigid specialization and precision modular engineering.',
    evolutionToNexus: 'Replaced with "Modular Frame + Core + Weapon" assembly: Specialized machinery that requires multi-part component assembly to reach full power.'
  },
  {
    id: 'aud-09',
    originalConcept: 'Historical 30-Card Tempest Archive (Cloudshapers, Aethermancers, Eternals of the Cyclone)',
    originalDomain: 'Blue / Tempest',
    classification: 'KEEP',
    reasoning: 'The 30 legacy cards define essential weather-control tempo, rapid spellburst cascades, and unyielding cyclone avatars. However, the original document used MTG-style mana (2U, 3U), untap steps, and untargeted board wipes that clashed with Nexus spatial lanes and the Exhaust/Ready system.',
    evolutionToNexus: 'Fully adapted and implemented into the canonical Tempest domain as 30 official cards (TMP-CS001 through TMP-EC010). Converted to 1-10 Essence costs, assigned 7-slot Lane Roles (Center, Flank, Support), and codified signature keywords: Fogtouch Exhaust, Spellburst Cascades, Freeze-Lock Stasis, and Skyborn Flight.'
  },
  {
    id: 'aud-10',
    originalConcept: 'Hard Counterspells (Negate any spell cast without counter-play)',
    originalDomain: 'Blue / Arcane',
    classification: 'MODIFY',
    reasoning: 'Unconditional hard counterspells remove player agency and induce severe cognitive salt. In a tactical lane game with 11-7 hand limits, hard counters create uninteractive non-games.',
    evolutionToNexus: 'Replaced with Dynamic Priority Interrupts, Momentum Taxes (e.g. Eye of the Maelstrom +2 tax), and Echo Redirections (Mirror Spell Refraction) where spells can be diverted or delayed, but not unconditionally vaporized.'
  },
  {
    id: 'aud-11',
    originalConcept: 'Single-Resource Ramping (Land-drop curve dominance)',
    originalDomain: 'Universal / All Domains',
    classification: 'MODIFY',
    reasoning: 'Single ramping resources cause topdeck variance and curve-out staleness where whoever draws high-cost bombs on curve automatically wins.',
    evolutionToNexus: 'Replaced with the dual-system of deterministic 1-10 Essence base ramping paired with the dynamic Momentum dice track and Kinetic Stash reserves, enabling deep tactical timing choices.'
  },
  {
    id: 'aud-12',
    originalConcept: 'Unrestricted Infinite Sacrifice Loops',
    originalDomain: 'Black / Abyss',
    classification: 'REJECT',
    reasoning: 'Uncapped self-sacrifice loops (sacrificing tokens at 0 cost to trigger infinite triggers) violate GLO-14 Red-Team safety rules and create degenerate game states.',
    evolutionToNexus: 'Strictly prohibited. All Abyss death interactions are bounded by finite Soul Vats with hard per-round capacity limits and construct attunements, ensuring mathematical determinism.'
  }
];

// ---------------- 2. FACTION & DOMAIN PHILOSOPHY (Section 3 & 4) ----------------
export const FACTION_PHILOSOPHIES: FactionPhilosophy[] = [
  {
    domain: 'Radiance (Inverted Red: Discipline & Precision)',
    traditionalExpectation: 'Uncontrolled impulsive burn, hasty reckless attacks, chaotic coin flips.',
    invertedNexusIdentity: 'Calculated lethality, civic forge engineering, disciplined restraint, and coordinated tactical marks.',
    philosophy: 'Fire is not an untamed wild beast; it is the supreme tool of civilization, metallurgical precision, and unbreakable martial order.',
    desire: 'Absolute thermal mastery, structural perfection, and the systematic dismantling of enemy defenses through measured force.',
    method: 'Channeling heat through Inferium conduits, marking priority targets, holding units in reserve to build kinetic potential, and executing synchronized strikes.',
    strengths: ['Piercing armor/shields', 'Targeted damage allocation', 'Weapon and equipment mastery', 'Anti-structure demolition', 'High single-turn burst via Preparation'],
    weaknesses: ['Vulnerable if rushed before preparation', 'Lacks raw unit swarm count', 'Limited reactive disruption during enemy turns'],
    resourceBehavior: 'Concentrates Essence into Forge Wells; converts held turn actions into kinetic strike tokens.',
    combatBehavior: 'Units gain massive stat bonuses when they refrain from attacking on the initial turn (The "Prepared" State).',
    cardAdvantage: 'Forges tactical armaments directly from the Armory; recovers spent weapons from the Crucible.',
    interaction: 'Marks enemy units with "Pyraxis Sights", allowing all allied units to bypass Taunt and focus fire.',
    recovery: 'The Phoenix Rebirth protocol: Elite champions rise once per match from the Ash Well with cleansed stats.',
    finishers: 'Crucible Siege Engine, Sunforged Cataclysm, Synchronized Vanguard Cleave.',
    riskProfile: 'Investing multiple turns into heavy equipment or preparation leaves early flank lanes exposed.',
    playerFantasy: 'A master blacksmith-general directing a precision legion of gleaming sunstone warriors and siege engines.',
    signatureVerbs: ['PREPARE', 'MARK', 'FORGE', 'IGNITE', 'EXECUTE'],
    momentumInteraction: 'Generates Momentum by holding units in restraint, landing lethal marks, and maintaining forge infrastructure.',
    terrainInteraction: 'Transforms terrain into Molten Slag and Forge Basins that damage enemy intruders.',
    hazardInteraction: 'Harnesses Ash Storms and Solar Flares to overcharge equipment while allies take mitigated fire damage.',
    idealArchetypes: ['Pyraxis Mark Aggro', 'Disciplined Midrange Control', 'Inferium Forge Assembly', 'Phoenix Rebirth Recursion'],
    naturalAllies: ['Sanctuary (Defensive fortresses amplify forge safety)', 'Arcane (Spell weaving complements equipment precision)'],
    naturalEnemies: ['Abyss (Soulbinding bypasses physical armor)', 'Verdance (Exponential biomass outlasts single-target marks)']
  },
  {
    domain: 'Tempest / Arcane (Inverted Blue: Instinct & Volatility)',
    traditionalExpectation: 'Passive card draw, slow counterspells, hyper-cautious reactive control.',
    invertedNexusIdentity: 'Primal atmospheric fury, lightning speed clashes, sudden unpredictable shifts, and high-risk instinct.',
    philosophy: 'The storm does not meditate; it strikes where potential difference is greatest. Knowledge without swift execution is dust.',
    desire: 'Sudden tempo inversion, overwhelming the opponent’s reaction stack, and manipulating atmospheric entropy.',
    method: 'Speed Clashes, instant-speed phase shifts, sudden lane swaps, and casting spells by discarding cards in explosive bursts.',
    strengths: ['Highest priority reaction speed', 'Stack manipulation & redirection', 'Spatial lane teleportation', 'Chain combo scaling'],
    weaknesses: ['Rapidly empties hand size', 'Fragile creature toughness', 'High variance if dice rolls fail'],
    resourceBehavior: 'Surges Essence in temporary bursts; generates temporary Sparks that dissipate at turn end.',
    combatBehavior: 'Units strike first in Speed Clashes; can swap positions with Mirage decoys mid-assault.',
    cardAdvantage: 'High-velocity "Impulse Draw" (discard 1, draw 2 temporary cards that must be played this phase).',
    interaction: 'Echo Redirection (redirects spells to another target rather than passively countering them).',
    recovery: 'Rewinds the turn stack 1 step via Temporal Slip, reclaiming a recently destroyed spell.',
    finishers: 'Chain Lightning Supercell, Tempest Conduit Overload, Gale Sovereign Vortex.',
    riskProfile: 'Gambling on high-variance dice rolls and burning Grimoire resources too rapidly.',
    playerFantasy: 'A storm-caller riding the lightning, making split-second tactical improvisations that leave enemies dizzy.',
    signatureVerbs: ['SURGE', 'MISDIRECT', 'SHIFT', 'CLASH', 'OVERLOAD'],
    momentumInteraction: 'Gains rapid Momentum by casting chains of 3+ spells in a single turn and winning Speed Clashes.',
    terrainInteraction: 'Floods lanes with Mist & Charged Air, granting concealment and evasion against ranged attacks.',
    hazardInteraction: 'Forecasts and alters upcoming Hazards, steering planar rifts toward enemy clusters.',
    idealArchetypes: ['Storm-Chain Tempo', 'Mirage Illusion Combo', 'Speed Clash Aggro', 'Atmospheric Control'],
    naturalAllies: ['Verdance (Living creatures gain lightning mobility)', 'Radiance (Heat + Storm creates thermal storms)'],
    naturalEnemies: ['Sanctuary (Aegis barriers absorb burst lightning)', 'Abyss (Death triggers punish fast kills)']
  },
  {
    domain: 'Verdance (Inverted Green: Predation & Scarcity)',
    traditionalExpectation: 'Peaceful harmony, abundance of mana, generic token swarms, gentle herbalism.',
    invertedNexusIdentity: 'Ruthless ecological predation, biological scarcity, survival of the fittest, and adaptive evolution.',
    philosophy: 'The wild is not gentle; it is an unforgiving arena of teeth, spores, and relentless adaptation. To survive, you must consume.',
    desire: 'Dominance through biological superiority, parasitism, and evolving immunity to enemy strategies.',
    method: 'Hunting wounded targets, absorbing enemy traits upon kills, spreading mycelial decay, and cultivating monstrous predators.',
    strengths: ['Adaptive stat growth based on surviving combat', 'Deathtouch and Poison counters', 'Mycelial network board recovery', 'High unit resilience'],
    weaknesses: ['Poor ranged direct damage', 'Struggles against fortified structures', 'Self-damaging parasitic costs'],
    resourceBehavior: 'Extracts biomass from fallen combatants; starves opponent resource nodes via Root Strangulation.',
    combatBehavior: 'Units gain persistent mutation choices (Armor, Reach, Acidic Spores) each time they survive combat.',
    cardAdvantage: 'Predatory Scavenging: Draw cards whenever an enemy unit is destroyed in combat.',
    interaction: 'Parasitic Spores (infects enemy units, draining 1 Power/Defense each upkeep to feed the hive).',
    recovery: 'Mycelial Spore Bloom: Destroyed units leave behind fungal pods that hatch into new organisms next dawn.',
    finishers: 'Apex Leviathan Awakening, Worldroot Strangler, Primal Swarm Overrun.',
    riskProfile: 'Requires combat survival to scale; hard removal before units adapt leaves the board weak.',
    playerFantasy: 'An ancient apex predator directing an evolving biological swarm that adapts dynamically to whatever the opponent does.',
    signatureVerbs: ['HUNT', 'CONSUME', 'MUTATE', 'INFEST', 'EVOLVE'],
    momentumInteraction: 'Gains Momentum when allied creatures survive lethal damage and when consuming enemy units.',
    terrainInteraction: 'Grows Living Groves and Briar Walls that restrict enemy lane movement and feed allied beasts.',
    hazardInteraction: 'Feeds upon Blight and Toxic Rain hazards, converting environmental damage into mutation counters.',
    idealArchetypes: ['Apex Adaptation Midrange', 'Mycelial Swarm Attrition', 'Predatory Beastbond', 'Root Control'],
    naturalAllies: ['Abyss (Decay and soul extraction feed fungal networks)', 'Tempest (Rapid rain accelerates spore growth)'],
    naturalEnemies: ['Radiance (Inferium fire cleanses mycelium and burns briars)', 'Sanctuary (Cleansing auras nullify spores)']
  },
  {
    domain: 'Abyss (Inverted Black: Preservation & Refusal to Die)',
    traditionalExpectation: 'Suicidal creature sacrifice, self-mutilation, wanton destruction, selfish cruelty.',
    invertedNexusIdentity: 'Sacred preservation of souls, monumental construct engineering, necromantic stewardship, and refusal to let memory perish.',
    philosophy: 'Death is not an end or an excuse for waste; it is the ultimate repository of wisdom. We preserve what the living carelessly discard.',
    desire: 'Eternal continuity, binding ancestral souls to imperishable Necrosteel vessels, and outlasting all mortal empires.',
    method: 'Storing departed souls in Soul Vats, binding souls to construct bodies, harvesting spiritual resonance, and refusing to concede.',
    strengths: ['Indestructible construct anchoring', 'Soul currency economy', 'Exhaustive endgame attrition', 'Debuffing enemy spirit'],
    weaknesses: ['Slow early game setup', 'Vulnerable to spiritual banishment/exile', 'Heavy dependency on Soul Vat permanents'],
    resourceBehavior: 'Dual-economy of Essence and harvested Soul Tokens; can spend Souls to mitigate lethal damage.',
    combatBehavior: 'Constructs fight with cold mechanical endurance; fallen champions transfer their essence into Soul Vats.',
    cardAdvantage: 'Soul Archive: Reclaim cards and abilities used in previous turns by replaying them as spiritual echoes.',
    interaction: 'Grave Binding (locks an enemy unit in stasis, preventing untapping or ability triggers).',
    recovery: 'Soul Transfer: When a unit is destroyed, immediately attach its Soul Token to an empty Necrosteel Shell on the field.',
    finishers: 'Dread Sovereign of Mordavar, Tomb-Colossus Awakening, The Endless Reliquary.',
    riskProfile: 'If Soul Vats are targeted and shattered, accumulated soul reserves vanish.',
    playerFantasy: 'A solemn necromantic architect presiding over an undying citadel of gilded bone, clockwork soul-vessels, and ancient memory.',
    signatureVerbs: ['PRESERVE', 'BIND', 'HARVEST', 'ANCHOR', 'ENDURE'],
    momentumInteraction: 'Gains Momentum whenever a unit is saved from destruction or when a Soul Vat reaches full capacity.',
    terrainInteraction: 'Consecrates land into Ossuary Grounds where destroyed units automatically yield bonus Soul Tokens.',
    hazardInteraction: 'Immune to planar death rifts; converts Void Cataclysms into pure Soul Essence.',
    idealArchetypes: ['Soul Vat Reanimator', 'Necrosteel Construct Engine', 'House Mordavar Attrition', 'Spiritual Stasis Control'],
    naturalAllies: ['Sanctuary (Both value preservation and duty)', 'Verdance (Symbiosis between bone soil and fungal growth)'],
    naturalEnemies: ['Radiance (Purifying solar fire burns away soul attachments)', 'Tempest (Fast tempo bypasses construct setup)']
  },
  {
    domain: 'Sanctuary (Inverted White: Anarchy & Radical Freedom / Sacred Aegis)',
    traditionalExpectation: 'Strict rigid hierarchy, bureaucratic law, small white weenies, boring pacifism.',
    invertedNexusIdentity: 'Resonant Aegis force reflection, sacred vow defiance, breaking tyrannical chains, and harmonious sound architecture.',
    philosophy: 'True protection is not bondage; it is the absolute freedom of the soul to stand unbent before tyrants and gods.',
    desire: 'Unbreakable collective resilience, acoustic resonance purification, and the liberation of the oppressed.',
    method: 'Weaving Aegis energy barriers that reflect incoming force, ringing sacred Resonance Bells, and forming unbreakable shield-walls.',
    strengths: ['Force redirection and barrier reflection', 'Cleansing curses and debuffs', 'Sustained endurance and team shielding', 'Punishing aggressive overextension'],
    weaknesses: ['Low unconditional offensive burst', 'Dependent on formation proximity', 'Weak when units are isolated across lanes'],
    resourceBehavior: 'Generates Harmony counters through coordinated unit positioning; spends Harmony to cast free defensive reactions.',
    combatBehavior: 'Aegis Vanguard units absorb damage meant for adjacent allies and reflect 50% back to the attacker.',
    cardAdvantage: 'Hymn of the Dawn: Draws cards whenever an allied barrier successfully prevents 5+ damage in a single combat.',
    interaction: 'Bell of Absolute Peace (suspends all attacking units for 1 round; damages units that violate the truce).',
    recovery: 'Mercy Engines: Fully restores health and cleanses status effects from all wounded allies at the start of upkeep.',
    finishers: 'Archon of the Resonant Zenith, The Unbroken Bulwark, Celestial Liberation Chorus.',
    riskProfile: 'If the opponent avoids attacking and builds an unblockable single-turn combo, defensive shields find no damage to reflect.',
    playerFantasy: 'A radiant herald ringing golden cathedral bells, deflecting colossal enemy strikes with shimmering shields, and leading a defiant liberation.',
    signatureVerbs: ['SHIELD', 'REFLECT', 'RESONATE', 'CLEANSE', 'LIBERATE'],
    momentumInteraction: 'Gains Momentum whenever an Aegis barrier reflects damage or when all lane positions remain defended.',
    terrainInteraction: 'Erects Sanctuary Sanctorums and Peace Beacons that disable hostile aura abilities in that lane.',
    hazardInteraction: 'Deploys Dome of Grace that shields the entire allied battlefield from global Hazard damage.',
    idealArchetypes: ['Aegis Reflection Control', 'Harmonic Bell Combo', 'Liberation Token Vanguard', 'Mercy Engine Attrition'],
    naturalAllies: ['Radiance (Shields protect forge workers; forge arms holy defenders)', 'Abyss (Shared reverence for sacred vows)'],
    naturalEnemies: ['Tempest (Lightning strikes around physical barriers)', 'Verdance (Spore infiltration bypasses rigid energy walls)']
  },
  {
    domain: 'Neutral / Constructs (Specialization & Engineered Rigidity)',
    traditionalExpectation: 'Generic colorless filler, splashable mana rocks, universal blandness.',
    invertedNexusIdentity: 'Extreme mechanical specialization, multi-part modular assembly, and engineered certainty with zero variance.',
    philosophy: 'Chaos and emotion are design flaws. The universe is a clockwork engine governed by deterministic tolerances.',
    desire: 'Total optimization, perfect functional synergy, and the complete elimination of probabilistic failure.',
    method: 'Assembling Modular Frames with specialized Cores and Weapons; locking battlefield rules into deterministic equations.',
    strengths: ['Zero reliance on luck/dice', 'Massive scaling when components assemble', 'Immunity to psychological/curse mechanics', 'Universal color compatibility with strict component requirements'],
    weaknesses: ['Components are useless individually', 'Vulnerable to targeted equipment removal', 'Predictable play patterns'],
    resourceBehavior: 'Calibrated Energy Cells: Pay upfront construction costs over multiple turns.',
    combatBehavior: 'Constructs have locked mathematical damage; cannot crit but cannot miss.',
    cardAdvantage: 'Schematic Blueprint: Search Grimoire specifically for missing construct components.',
    interaction: 'Dimensional Anchor: Disables all teleportation, phase-shifting, and instant-speed stack shenanigans.',
    recovery: 'Modular Salvage: When a construct is destroyed, detach its Core and Weapon back to your hand.',
    finishers: 'The Apex Clockwork Titan (Frame + 3 Cores + 2 Weapons), Planar Lockdown Array.',
    riskProfile: 'Opponents destroying the Frame before Cores attach leaves expensive parts stranded.',
    playerFantasy: 'A master automaton engineer methodically piecing together a monolithic war machine while shutting down enemy tricks.',
    signatureVerbs: ['ASSEMBLE', 'CALIBRATE', 'ANCHOR', 'LOCKDOWN', 'OPTIMIZE'],
    momentumInteraction: 'Gains Momentum upon completing each stage of a multi-component construct blueprint.',
    terrainInteraction: 'Lays Paved Pylons that eliminate all terrain penalties and boost construct speed.',
    hazardInteraction: 'Ignores Hazard effects through Reinforced Plating; anchors the planar rift to prevent spreading.',
    idealArchetypes: ['Modular Titan Assembly', 'Dimensional Lockdown Control', 'Engineered Synergy Midrange'],
    naturalAllies: ['Radiance (Forge materials provide metal frames)', 'Abyss (Necrosteel integration with soul engines)'],
    naturalEnemies: ['Tempest (Electrical overloads disrupt calibration)', 'Sanctuary (Forced pacifism stalls mechanical clocks)']
  }
];

// ---------------- 3. MOMENTUM SYSTEM PROTOTYPES (Sections 9-13) ----------------
export const MOMENTUM_PROTOTYPES: MomentumPrototype[] = [
  {
    id: 'mom-proto-a',
    name: 'Prototype A: Action-Currency Momentum',
    modelType: 'Action',
    tagline: 'Earn Momentum Points through tactical actions; spend them on secondary ability surges.',
    rulesExplanation: [
      'Each player has an independent Momentum Pool (0 to 10 points).',
      'Players earn 1 MP when: declaring an attack (+1), destroying an enemy unit (+2), successfully blocking (+1), or casting a spell that costs 4+ Essence (+1).',
      'Momentum can be spent at Instant Speed during priority windows to: Surge an ability (+2 MP), give a unit +1 Power this combat (+1 MP), or draw a card during End Phase (+3 MP).',
      'At the end of each round, 50% of unspent Momentum decays (rounded down).'
    ],
    generationMechanisms: ['Attacking', 'Destroying units', 'Blocking', 'High-cost spells'],
    spendingMechanisms: ['Ability Surges', 'Combat Stat Buffs', 'End Phase Card Draw'],
    limitsAndCaps: 'Capped at 10 MP maximum per player.',
    decayRules: '50% decay per round (e.g. 8 MP decays to 4 MP at End Phase).',
    timingWindows: 'Instant speed spending during Main Action or Combat Clash windows.',
    factionInteractions: {
      Radiance: 'Spends MP to add +2 Piercing Damage to marked attacks.',
      Tempest: 'Generates double MP from casting chains of spells.',
      Verdance: 'Spends 2 MP to instantly mutate a surviving beast.',
      Abyss: 'Converts 2 MP into a permanent Soul Token in the Soul Vat.',
      Sanctuary: 'Spends 3 MP to cast an emergency Aegis barrier on an ally.'
    },
    sampleCards: [
      { name: 'Pyraxis Momentum Lancer', cost: '3 Essence', type: 'Champion', rule: 'Surge (2 MP): Gain First Strike and +2 Power this combat.', role: 'Aggressive burst' },
      { name: 'Vortex Surge Accelerator', cost: '2 Essence', type: 'Relic', rule: 'Whenever you spend 3+ MP in a turn, draw a card.', role: 'Engine enabler' }
    ],
    advantages: ['Intuitive currency system familiar to gamers', 'Provides tactical micro-decisions every turn', 'Rewards active engagement over passive stalling'],
    disadvantages: ['High bookkeeping with token dice', 'Potential for runaway snowball if winning player earns too many points', 'Can feel like a second mana pool'],
    exploitRisks: ['Cheap attack loops that generate endless MP without risking units.'],
    snowballRisks: ['High risk: Player with board advantage gets more kills, thus more MP, thus more board advantage.'],
    bookkeepingComplexity: 'Medium',
    digitalDifficulty: 'Trivial',
    tabletopDifficulty: 'Moderate',
    status: 'PROVISIONAL'
  },
  {
    id: 'mom-proto-b',
    name: 'Prototype B: Threshold State Track (Passive Tiers)',
    modelType: 'Track',
    tagline: 'Momentum is a dial (0-10) that unlocks passive power tiers without spending.',
    rulesExplanation: [
      'Each player has a Momentum Gauge numbered 0 to 10 with 4 Tiers: Tier 0: Dormant (0-2), Tier 1: Building (3-5), Tier 2: Surging (6-8), Tier 3: Dominant (9-10).',
      'Cards have passive abilities that automatically turn on when your track reaches a required Tier (e.g. "[Surging]: +2 Defense and Trample").',
      'Momentum rises when you achieve tactical goals (holding lanes, casting cards) and drops when your units die or you pass without acting.',
      'Momentum is NOT spent as currency; it represents your army’s morale and tempo state.'
    ],
    generationMechanisms: ['Controlling lanes (+1/round)', 'Dealing combat damage (+2)', 'Equipping weapons (+1)'],
    spendingMechanisms: ['No spending; acts as passive threshold lock/unlock.'],
    limitsAndCaps: 'Fixed 0-10 track.',
    decayRules: 'Loses 2 points whenever an allied Champion dies; loses 1 point if you take direct Nexus Core damage.',
    timingWindows: 'Continuous static state checking.',
    factionInteractions: {
      Radiance: 'Gains +2 Momentum if a unit held its attack for 1 turn (Patience payoff).',
      Tempest: 'Can temporarily leap 1 Tier higher for 1 round via Overload spells.',
      Verdance: 'Beasts gain ferocious passive keywords at Tier 2 and Tier 3.',
      Abyss: 'Operates efficiently even at Tier 0; gains bonuses when dropping Tiers.',
      Sanctuary: 'Maintains Tier 2 easily through impenetrable formations.'
    },
    sampleCards: [
      { name: 'Sunstone Vanguard Centurion', cost: '4 Essence', type: 'Champion', rule: '[Surging]: Gains Aegis 2. [Dominant]: Attacks hit both Vanguard and Flank lanes.', role: 'Midrange powerhouse' },
      { name: 'Bulwark of the Stalwart', cost: '3 Essence', type: 'Armor', rule: 'While you are at Tier 1 or lower, all incoming damage is reduced by 2.', role: 'Comeback stabilizer' }
    ],
    advantages: ['Low arithmetic burden during combat', 'Cards feel exciting when crossing thresholds', 'Easy to track with a single sliding dial'],
    disadvantages: ['Can create "win-more" states where dominant player stays dominant', 'Less immediate tactical burst choices'],
    exploitRisks: ['Turtle decks holding Tier 3 forever with defensive blockers.'],
    snowballRisks: ['Moderate: Track drops upon losing units, providing built-in comeback friction.'],
    bookkeepingComplexity: 'Low',
    digitalDifficulty: 'Trivial',
    tabletopDifficulty: 'Easy',
    status: 'PROVISIONAL'
  },
  {
    id: 'mom-proto-c',
    name: 'Prototype C: Asymmetric Faction-Specific Generation (RECOMMENDED)',
    modelType: 'Faction-Specific',
    tagline: 'Every Domain generates Momentum through its own philosophical verbs, preventing homogenization.',
    rulesExplanation: [
      'Universal Momentum Pool (0-8) with universal spending options (Surge, Boost, Cycle).',
      'HOW Momentum is generated is strictly unique per Domain:',
      '• Radiance generates Momentum by PREPARATION (holding units back) and executing MARKED targets.',
      '• Tempest generates Momentum by SPEED (casting fast-chains and winning Speed Clashes).',
      '• Verdance generates Momentum by SURVIVAL (when creatures survive combat damage and consume prey).',
      '• Abyss generates Momentum by PRESERVATION (preventing deaths and storing Souls in Vats).',
      '• Sanctuary generates Momentum by HARMONY (reflecting attacks via Aegis and maintaining unbroken formations).',
      '• Neutral Constructs generate Momentum by ASSEMBLY (attaching Cores and Weapons to Frames).'
    ],
    generationMechanisms: ['Domain-specific verbs and tactical behaviors.'],
    spendingMechanisms: ['Domain-specific Surges + Universal +1 Combat Mod / 1-Card Cycle.'],
    limitsAndCaps: 'Cap of 8 MP.',
    decayRules: 'Decays by 2 MP at start of each Upkeep (keeps pressure on maintaining faction verbs).',
    timingWindows: 'Both reactive and proactive priority windows.',
    factionInteractions: {
      Radiance: 'Holding an attack: +2 MP. Slaying a Marked target: +2 MP.',
      Tempest: 'Casting 2nd spell in turn: +1 MP. Casting 3rd spell: +2 MP.',
      Verdance: 'Creature survives combat with 1-2 HP: +2 MP.',
      Abyss: 'Soul transferred to Vat: +1 MP. Unit revived from grave: +2 MP.',
      Sanctuary: 'Aegis reflects 3+ damage: +2 MP. All 3 lanes occupied: +1 MP.'
    },
    sampleCards: [
      { name: 'Pyraxis Hearth-Keeper', cost: '3 Essence', type: 'Champion', rule: 'Preparation: If this unit did not attack this turn, gain 2 MP and forge 1 Ember.', role: 'Engine card' },
      { name: 'Spore-Caller Myconid', cost: '2 Essence', type: 'Beast', rule: 'Whenever this unit survives combat damage, gain 2 MP and spawn a 1/1 Spore Token.', role: 'Adaptive scaler' }
    ],
    advantages: ['Deepest thematic cohesion—playing Radiance FEELS completely different from playing Tempest', 'Massive strategic variety across matchups', 'Impossible for one generic strategy to dominate all factions'],
    disadvantages: ['Requires players to learn 5 different generation rules', 'Higher balancing matrix complexity for designers'],
    exploitRisks: ['Certain factions might generate MP too easily in specific lane matchups.'],
    snowballRisks: ['Low to Moderate: Natural 2 MP upkeep decay forces continuous effort.'],
    bookkeepingComplexity: 'Medium',
    digitalDifficulty: 'Moderate',
    tabletopDifficulty: 'Moderate',
    status: 'RECOMMENDED_PLAYTEST'
  },
  {
    id: 'mom-proto-d',
    name: 'Prototype D: Contested Tug-of-War Battlefield Track',
    modelType: 'Contested Tug-of-War',
    tagline: 'A single shared -5 to +5 center track where one player’s gain is the other’s direct loss.',
    rulesExplanation: [
      'A single physical track sits between the two players: [-5] [ -4] [-3] [-2] [-1] [0] [+1] [+2] [+3] [+4] [+5].',
      'Center (0) is Neutral. Moving the marker to your positive side grants escalating bonuses; being on the negative side grants Underdog Comeback tools.',
      'Winning a combat clash shifts the marker +1 toward you; losing a Champion shifts it -1 away from you.',
      'Controlling 2 of 3 Spire Nodes shifts the marker +1 at round end.',
      'If the marker reaches +5, the dominant player enters "Momentum Ascendance" (free ability triggers), but the defending player gains "Desperation Fury" (all cards cost 1 less Essence).'
    ],
    generationMechanisms: ['Winning combats', 'Controlling Spire Nodes', 'Executing combo finishes'],
    spendingMechanisms: ['No spending; pure shared tug-of-war position.'],
    limitsAndCaps: 'Hard clamped at -5 and +5.',
    decayRules: 'At the end of each round, the marker naturally gravitates 1 step back toward Center (0).',
    timingWindows: 'Real-time shift upon game event resolutions.',
    factionInteractions: {
      Radiance: 'Can expend 1 Ember to lock the marker from moving backward for 1 phase.',
      Tempest: 'Spells have effects like "Shift the Momentum track 1 step toward you".',
      Verdance: 'Gains massive stat boosts when fighting on the negative (Underdog) side of the track.',
      Abyss: 'Can sacrifice a Soul Token to instantly reset the track to Center (0).',
      Sanctuary: 'Aegis reflections push the marker toward the defender.'
    },
    sampleCards: [
      { name: 'Planar Tether Warden', cost: '3 Essence', type: 'Champion', rule: 'While Momentum is on your opponent’s side, this unit has +3 Power and Taunt.', role: 'Comeback anchor' },
      { name: 'Tide-Shifter Sorcerer', cost: '4 Essence', type: 'Champion', rule: 'Action (Once/Turn): Shift the Contested Momentum marker 1 step toward your side.', role: 'Tug-of-war manipulator' }
    ],
    advantages: ['Dramatic high-stakes psychological tension on the table', 'Built-in comeback mechanic (Underdog buffs prevent blowout games)', 'Single token to track for the entire match'],
    disadvantages: ['Can cause sudden swings that feel volatile if not calibrated', 'Requires strict turn-order clamping'],
    exploitRisks: ['Decks that deliberately stall at -1 to exploit underdog card discounts.'],
    snowballRisks: ['Extremely Low: Built-in rubber-banding and natural center decay prevent permanent lockouts.'],
    bookkeepingComplexity: 'Low',
    digitalDifficulty: 'Trivial',
    tabletopDifficulty: 'Trivial',
    status: 'EXPERIMENTAL'
  }
];

// ---------------- 4. SIGNATURE MECHANIC PROTOTYPES (Sections 14-22) ----------------
export const MECHANIC_PROTOTYPES: MechanicPrototypeSpec[] = [
  {
    id: 'mech-illusion',
    name: 'Mirage Decoy & Misdirection System (Tempest / Arcane)',
    associatedDomain: 'Arcane',
    coreThesis: 'Illusions are not weak 1/1 tokens; they are dynamic shell games that misdirect combat declarations and absorb targeted enemy removal.',
    formalRulesClauses: [
      '140.1: An "Illusion Token" is placed face-down or paired with a genuine Champion as a Decoy.',
      '140.2: When an enemy declares an attack or casts a single-target spell at a Decoy-paired unit, the Tempest player may reveal the Decoy: the spell/attack hits the Decoy (destroying it harmlessly) while the genuine Champion takes 0 damage.',
      '140.3: Echo Mimicry: An Illusion may temporarily copy the Power and Keywords of any non-Legendary unit on the field until end of combat clash.'
    ],
    tabletopExecution: 'Uses double-sided Decoy Coins placed under unit cards. Opponent does not know which coin has the Sigil until targeting occurs.',
    digitalExecution: 'Hidden client state with automated reveal animation upon targeting resolution.',
    counterplayVectors: ['Area-of-Effect (AoE) spells destroy all Decoys simultaneously.', 'True Sight keyword reveals Decoys before targeting.', 'Direct Nexus attacks ignore lane Decoys.'],
    pitfallsAvoided: ['Avoided frustrating 100% untargetability by limiting Decoy charges to 1-time uses.'],
    sampleCards: [
      { name: 'Aetherial Mirage Weaver', cost: 3, domain: 'Arcane', type: 'Champion', stats: '2/3', text: 'When deployed, create a Decoy Token paired with an allied Champion. (Decoy absorbs the next targeted attack or spell).' },
      { name: 'Hall of Shifting Reflections', cost: 4, domain: 'Arcane', type: 'Relic', stats: '0/5', text: 'Once per round, you may swap the physical lane positions of a genuine Champion and a Decoy Token.' }
    ]
  },
  {
    id: 'mech-preparation',
    name: 'Disciplined Preparation Engine (Radiance)',
    associatedDomain: 'Radiance',
    coreThesis: 'Restraint equals lethality. A unit that refrains from attacking accumulates kinetic heat tokens, transforming its next attack into an unblockable execution.',
    formalRulesClauses: [
      '150.1: A unit with the "Preparation" keyword enters the PREPARED state if it was capable of attacking during the Combat Phase but was deliberately held back.',
      '150.2: While Prepared, the unit gains +2 Armor and Taunt against enemy flank attacks.',
      '150.3: When a Prepared unit attacks on a subsequent turn, it expends its Prepared state to trigger its EXECUTE clause (e.g. "+4 Piercing Damage", "Ignores Armor", or "Cleaves adjacent lanes").'
    ],
    tabletopExecution: 'Rotate card 45 degrees to indicate "Prepared Stance" with a gold Ember token placed on it.',
    digitalExecution: 'Glowing radiant aura surrounding the unit card with an interactive "Execute Ready" badge.',
    counterplayVectors: ['Stun or Stasis effects force the unit to lose its Prepared state.', 'Forced movement/knockback breaks the stance.', 'Rushing the flank before the unit executes.'],
    pitfallsAvoided: ['Prevented stall games by requiring the unit to be physically deployed and vulnerable on the board.'],
    sampleCards: [
      { name: 'Pyraxis Hearth-Knight', cost: 3, domain: 'Radiance', type: 'Champion', stats: '3/4', text: 'Preparation. Execute: Deal 6 damage to target unit and 2 damage to its adjacent Sovereign Spire.' },
      { name: 'Crucible Siege-Master', cost: 5, domain: 'Radiance', type: 'Champion', stats: '4/6', text: 'Preparation. While Prepared, allied units in this lane take -2 damage from all sources. Execute: Annihilate target barrier or fortification.' }
    ]
  },
  {
    id: 'mech-adaptation',
    name: 'Predatory Adaptation & Mutation (Verdance)',
    associatedDomain: 'Verdance',
    coreThesis: 'Creatures evolve based on what they survive. Surviving combat allows the player to choose physical mutation traits that permanently alter the card.',
    formalRulesClauses: [
      '160.1: When a unit with "Adaptation" survives combat where it took damage, the player chooses 1 of 3 Mutation Traits to engrave onto the card:',
      '• Chitinous Carapace (+2 Defense & Armor 1)',
      '• Venomous Fangs (+1 Power & Deathtouch)',
      '• Spore Sprinter (+1 Speed & Flank Evasion)',
      '160.2: A unit may hold a maximum of 3 Mutation Traits (Apex Form).'
    ],
    tabletopExecution: 'Small snap-on trait chips or dry-erase sleeve marking on the card template.',
    digitalExecution: 'Interactive 3D mutation tree overlay popping up upon combat resolution.',
    counterplayVectors: ['Instant hard removal (Assassinate / Obliterate) kills the unit before it survives combat.', 'Damage amplifiers ensure lethal damage in one blow.'],
    pitfallsAvoided: ['Limited to 3 mutations max to prevent mathematical calculation bloat on single cards.'],
    sampleCards: [
      { name: 'Apex Stalker of Everwood', cost: 4, domain: 'Verdance', type: 'Beast', stats: '4/4', text: 'Predatory Adaptation. Whenever this unit slays an enemy, it heals to full health and gains your choice of Mutation.' },
      { name: 'Rootspire Symbiote', cost: 2, domain: 'Verdance', type: 'Beast', stats: '1/3', text: 'When deployed, attach to an allied Champion. That Champion inherits all Adaptations this Symbiote achieves.' }
    ]
  },
  {
    id: 'mech-preservation',
    name: 'Sacred Soulbinding & Preservation (Abyss)',
    associatedDomain: 'Abyss',
    coreThesis: 'Death is not discarded; souls are extracted into Soul Vats and bound into immortal Necrosteel vessels, turning survival into an engine.',
    formalRulesClauses: [
      '170.1: When an allied mortal unit is destroyed, its Soul does not enter the discard pile; it becomes a "Soul Token" housed in your active Soul Vat.',
      '170.2: Soul Vats have a capacity of 1-5 Souls.',
      '170.3: Soulbinding: Pay 1 Soul Token to awaken an empty Necrosteel Shell on the field, giving it the Power, Defense, and Abilities of the stored Soul.'
    ],
    tabletopExecution: 'Purple crystal tokens stored in a dedicated Soul Vat relic card on the command row.',
    digitalExecution: 'Soul Well gauge with animated soul-transfer wisps connecting the graveyard and battlefield.',
    counterplayVectors: ['Targeting and destroying the Soul Vat destroys all banked Souls.', 'Banish / Void exile effects remove cards without yielding Souls.'],
    pitfallsAvoided: ['Prevented infinite sacrifice loops by capping Soul Vat storage capacity.'],
    sampleCards: [
      { name: 'Soul-Steward of House Mordavar', cost: 3, domain: 'Abyss', type: 'Champion', stats: '2/4', text: 'Preservation. Whenever an allied unit would die, you may spend 1 Soul to restore it to 1 HP instead.' },
      { name: 'Necrosteel Dreadnought Shell', cost: 4, domain: 'Abyss', type: 'Construct', stats: '0/7', text: 'Dormant. Soulbinding (2 Souls): Awaken this unit. It gains +5 Power, Armor 2, and the abilities of the bound souls.' }
    ]
  },
  {
    id: 'mech-assembly',
    name: 'Modular Frame + Core + Weapon Assembly (Construct / Neutral)',
    associatedDomain: 'Arcane',
    coreThesis: 'Machines are not single cards; they are assembled multi-part juggernauts with customized Frames, Energy Cores, and Siege Weapons.',
    formalRulesClauses: [
      '180.1: A "Frame" is a base chassis with 0 Power, high Defense, and 2 Attachment Sockets (Core Socket + Weapon Socket).',
      '180.2: A "Core" provides passive aura abilities, energy generation, and special keywords.',
      '180.3: A "Weapon" provides Power stats, attack triggers, and range values.',
      '180.4: When assembled, the Frame, Core, and Weapon function as a single consolidated Mega-Unit with unified stats and multi-triggers.'
    ],
    tabletopExecution: 'Cards physically slide underneath the Frame card with visible stat headers poking out.',
    digitalExecution: 'Modular 3D assembly animation locking parts into place on the lane board.',
    counterplayVectors: ['Targeted artifact removal can target the Weapon or Core specifically to disarm the Frame.', 'Stasis locks disable the entire assembly.'],
    pitfallsAvoided: ['Ensured individual components have minor standalone utility so they are not totally dead cards if drawn alone.'],
    sampleCards: [
      { name: 'Clockwork Titan Chassis', cost: 4, domain: 'Arcane', type: 'Construct', stats: '0/8', text: 'Modular Frame (1 Core Socket, 1 Weapon Socket). Takes -1 damage from all attacks.' },
      { name: 'Overcharged Arcane Reactor', cost: 2, domain: 'Arcane', type: 'Artifact', stats: '0/0', text: 'Modular Core. Attached Frame gains +2 Speed and generates 1 bonus Essence each turn.' },
      { name: 'Inferium Siege Cannon', cost: 3, domain: 'Radiance', type: 'Weapon', stats: '+5 ATK', text: 'Modular Weapon. Attached Frame gains +5 Power, Range: Global, and attacks cleave adjacent Spire Nodes.' }
    ]
  },
  {
    id: 'mech-mental-duel',
    name: 'Mental Duel: Tactical Clashes & Hidden Bids (Tempest / Universal)',
    associatedDomain: 'Arcane',
    coreThesis: 'Speed and prediction clashes where both players secretly select a Tactical Stance (Strike, Parrying Guard, or Arcane Feint) with high-stakes deterministic resolution.',
    formalRulesClauses: [
      '190.1: When two Champions clash in a Speed Duel, both players place a hidden Stance Card face-down: Strike ⚔️, Guard 🛡️, or Feint 🌀.',
      '190.2: Simultaneous Reveal Resolution:',
      '• Strike beats Feint (Strike lands with +3 Bonus Critical Damage).',
      '• Feint beats Guard (Bypasses all armor/shields and deals direct damage).',
      '• Guard beats Strike (Reflects 100% of damage back to the attacker and disarms).',
      '• Stance Tie (Normal combat math applies).'
    ],
    tabletopExecution: 'Each player has 3 dedicated mini-cards (Strike, Guard, Feint) kept in hand.',
    digitalExecution: 'Interactive 3-button modal popping up for 8 seconds during Speed Clash.',
    counterplayVectors: ['Prediction tools and cards that reveal the opponent’s choice before you lock in.', 'Disciplined units that ignore Feints.'],
    pitfallsAvoided: ['Only triggers on specific Duel-keyword cards so standard combat remains fast and deterministic.'],
    sampleCards: [
      { name: 'Duelist of the High Peak', cost: 3, domain: 'Arcane', type: 'Champion', stats: '3/3', text: 'Speed Duel. Whenever this unit attacks, initiate a Mental Duel Stance Clash with the defender.' }
    ]
  }
];

// ---------------- 5. CROSS-DOMAIN SYNERGY MATRIX (Section 24) ----------------
export const CROSS_DOMAIN_SYNERGIES: CrossDomainSynergy[] = [
  {
    pair: 'Radiance + Abyss',
    domains: ['Radiance', 'Abyss'],
    synergyThesis: 'Phoenix Rebirth + Soulbinding. When a Radiance champion dies and triggers Rebirth, Abyss captures its departing Soul in the Vat while the physical body resurrects, doubling resource generation.',
    mechanicCollision: 'High-risk sacrifice of high-value forge units to fill soul vats and immediately rearm them.',
    emergentArchetype: 'Ash-Soul Forge Reanimator (Sacrifices prepared units for massive Soul yields, then recalls them from ashes).',
    riskSeverity: 'Severe (Red-Team Priority)',
    redTeamWarning: 'Must ensure Rebirth token tags prevent infinite death loops when combined with Soul Vat triggers.',
    sampleCard: { name: 'Ashen Soul Smith', cost: '3 Essence (1 Rad / 1 Aby)', effect: 'Whenever an allied unit triggers Rebirth, place 2 Soul Tokens into your Soul Vat.' }
  },
  {
    pair: 'Verdance + Sanctuary',
    domains: ['Verdance', 'Sanctuary'],
    synergyThesis: 'Adaptation + Aegis Shielding. Aegis barriers protect Verdance beasts from taking lethal damage while allowing them to take 1 chip damage, consistently triggering full Predatory Adaptations every combat.',
    mechanicCollision: 'Impenetrable wall of evolving monsters that absorb damage and evolve every round.',
    emergentArchetype: 'Living Fortress Bastion (Unkillable frontline evolving tanks protecting harmonic bell engines).',
    riskSeverity: 'High',
    redTeamWarning: 'Watch for complete stall-fests where the opponent cannot interact with the board.',
    sampleCard: { name: 'Aegis-Bark Treant', cost: '5 Essence (2 Ver / 2 Sanc)', effect: 'Aegis 3. Whenever this unit absorbs damage for an ally, it triggers an instant Predatory Mutation.' }
  },
  {
    pair: 'Tempest + Abyss',
    domains: ['Arcane', 'Abyss'],
    synergyThesis: 'Mirage Decoys + Soulbinding. Sacrificing or losing temporary Illusion decoys counts as spiritual departure to trigger soul vats and instant-speed stack echoes.',
    mechanicCollision: 'Rapid spell chains that trigger graveyard soul generation without losing real board presence.',
    emergentArchetype: 'Spectral Storm-Weaver (High-tempo spell storm feeding necrotic soul engines).',
    riskSeverity: 'Moderate',
    redTeamWarning: 'Ensure Decoys do NOT produce Soul Tokens unless explicitly specified.',
    sampleCard: { name: 'Soul-Mirage Conduit', cost: '4 Essence (2 Arc / 1 Aby)', effect: 'When an Illusion Decoy is destroyed, you may cast an Echo spell from your graveyard for free.' }
  },
  {
    pair: 'Radiance + Sanctuary',
    domains: ['Radiance', 'Sanctuary'],
    synergyThesis: 'Prepared Stance + Shield Reflection. Sanctuary shields keep Radiance units completely safe during their turn of Preparation, ensuring 100% successful Execution strikes.',
    mechanicCollision: 'Fortified gunlines and artillery batteries that cannot be breached.',
    emergentArchetype: 'Holy Sunfire Phalanx (Heavy armor shield-wall protecting long-range siege executioners).',
    riskSeverity: 'Low',
    redTeamWarning: 'Standard linear synergy; highly interactive through AoE armor-piercing removal.',
    sampleCard: { name: 'Sun-Shield Templar', cost: '4 Essence (2 Rad / 1 Sanc)', effect: 'While adjacent to a Prepared ally, this unit grants that ally +3 Armor and Reflect 2.' }
  },
  {
    pair: 'Verdance + Tempest',
    domains: ['Verdance', 'Arcane'],
    synergyThesis: 'Predatory Beasts + Speed Clashes & Teleportation. Shifting heavy apex predators across lanes at instant speed to hunt vulnerable backline units.',
    mechanicCollision: 'Surprise flank strikes and rapid weather-accelerated biological mutations.',
    emergentArchetype: 'Gale-Stalker Predators (Unstoppable mobile beasts leaping across lanes).',
    riskSeverity: 'Moderate',
    redTeamWarning: 'Ensure high-power beasts have speed caps to prevent turn-1 direct Nexus strikes.',
    sampleCard: { name: 'Storm-Prowler Chimera', cost: '5 Essence (2 Ver / 2 Arc)', effect: 'Speed Clash. Can swap lanes before declaring attack. If it wins the Speed Clash, gains +3 Power.' }
  }
];

// ---------------- 6. COUNTERPLAY MATRIX (Section 25) ----------------
export const COUNTERPLAY_MATRIX: CounterplayMatrixEntry[] = [
  {
    domainA: 'Radiance (Discipline / Prep)',
    domainB: 'Sanctuary (Aegis / Reflection)',
    favored: 'Radiance (55 - 45)',
    matchupRatio: '55% Radiance Favored',
    tacticalTension: 'Radiance Piercing Weapons bypass Sanctuary Aegis shields, but Sanctuary Reflection can punish heavy single-target Execution strikes.',
    domainAKeyTools: ['Inferium Armor-Piercing Weapons', 'Pyraxis Target Marks', 'Structure Demolition'],
    domainBKeyTools: ['Force Reflection Barriers', 'Peace Stasis Bells', 'Mercy Engine Healing'],
    counterplayAdvice: 'Sanctuary should spread damage across multiple barriers rather than stacking on one champion. Radiance must save Execution burst until shields are exhausted.'
  },
  {
    domainA: 'Radiance (Discipline / Prep)',
    domainB: 'Tempest (Speed / Decoys)',
    favored: 'Tempest (58 - 42)',
    matchupRatio: '58% Tempest Favored',
    tacticalTension: 'Tempest speed clashes and lane-swaps disrupt Radiance’s stationary Preparation stance before execution strikes can land.',
    domainAKeyTools: ['Wide Cleave Attacks', 'Taunt Barriers', 'Prepared Armor Boosts'],
    domainBKeyTools: ['Mirage Decoys', 'Speed Clash Pre-Emptive Strikes', 'Echo Spells'],
    counterplayAdvice: 'Radiance must utilize Cleave weapons that hit both the Decoy and the genuine Champion simultaneously.'
  },
  {
    domainA: 'Verdance (Adaptation / Scarcity)',
    domainB: 'Abyss (Soulbinding / Endure)',
    favored: 'Verdance (52 - 48)',
    matchupRatio: '52% Verdance Favored',
    tacticalTension: 'Verdance consumes Abyss constructs to trigger mutations, but Abyss outlasts Verdance in extreme late-game attrition.',
    domainAKeyTools: ['Predatory Scavenging', 'Deathtouch Fangs', 'Mycelial Spores'],
    domainBKeyTools: ['Soul Vat Reanimation', 'Indestructible Shells', 'Grave Binding'],
    counterplayAdvice: 'Abyss must banish Verdance beasts with Void magic before they accumulate 3 mutations.'
  },
  {
    domainA: 'Tempest (Speed / Decoys)',
    domainB: 'Sanctuary (Aegis / Reflection)',
    favored: 'Sanctuary (60 - 40)',
    matchupRatio: '60% Sanctuary Favored',
    tacticalTension: 'Sanctuary’s passive Aegis auras completely absorb low-power Tempest multi-spells, neutralizing speed advantage.',
    domainAKeyTools: ['Echo Redirection', 'Overload Burst Spells', 'Phase Shifting'],
    domainBKeyTools: ['Aegis Vanguard Walls', 'Bell of Absolute Peace', 'Harmony Counters'],
    counterplayAdvice: 'Tempest must use Echo Redirection to redirect Sanctuary’s own reflection barriers back into their backline.'
  },
  {
    domainA: 'Verdance (Adaptation / Scarcity)',
    domainB: 'Radiance (Discipline / Prep)',
    favored: 'Radiance (54 - 46)',
    matchupRatio: '54% Radiance Favored',
    tacticalTension: 'Radiance high-burst Execution attacks deal lethal damage in single hits, preventing Verdance beasts from surviving to adapt.',
    domainAKeyTools: ['Chitinous Armor Mutation', 'Parasitic Spores', 'Root Strangulation'],
    domainBKeyTools: ['Execution Cleave', 'Inferium Fire', 'Thermal Hazard Routing'],
    counterplayAdvice: 'Verdance must bait out the Execution strike with disposable Symbiotes before sending in Apex beasts.'
  }
];

// ---------------- 7. COMPLETE 36-SECTION BIBLE REGISTRY ----------------
export const BIBLE_SECTIONS: BibleSection[] = [
  { sectionNumber: 1, title: 'Executive Design Philosophy & Core Tenets', slug: 'executive-philosophy', category: 'Philosophy & Audit', summary: 'Familiar strategic architecture + unfamiliar strategic identities. Rejecting generic MTG color-pie clones.', status: 'LOCKED' },
  { sectionNumber: 2, title: 'Original Concepts Comprehensive Audit', slug: 'concepts-audit', category: 'Philosophy & Audit', summary: 'Classification of all 8 core concepts into KEEP, MODIFY, MERGE, REJECT, and PROTOTYPE with full rationale.', status: 'LOCKED' },
  { sectionNumber: 3, title: 'Final Proposed Faction & Color Philosophy', slug: 'faction-philosophy', category: 'Domain Identities', summary: 'The 5 Inverted Domain Identities + Specialized Neutral Constructs defined across 12 deep dimensions.', status: 'LOCKED' },
  { sectionNumber: 4, title: 'Mechanical Identity Matrix', slug: 'mechanical-matrix', category: 'Domain Identities', summary: 'Primary, Secondary, Conditional, and Forbidden mechanics explicitly codified per Domain.', status: 'LOCKED' },
  { sectionNumber: 5, title: 'Signature Mechanical Verbs', slug: 'signature-verbs', category: 'Domain Identities', summary: 'Active gameplay loops built around 3-5 distinct mechanical verbs (PREPARE, SURGE, HUNT, PRESERVE, SHIELD, ASSEMBLE).', status: 'LOCKED' },
  { sectionNumber: 6, title: 'Strength, Weakness & Risk Profile Matrix', slug: 'strength-weakness-matrix', category: 'Domain Identities', summary: 'Asymmetrical design boundaries ensuring every Domain has fatal vulnerabilities and clear counterplay.', status: 'LOCKED' },
  { sectionNumber: 7, title: 'Resource Economy & Essence Interaction Matrix', slug: 'resource-matrix', category: 'Momentum Framework', summary: 'How each Domain generates, converts, stores, and starves Essence and tactical sub-currencies.', status: 'PROVISIONAL' },
  { sectionNumber: 8, title: 'Combat Behavior & Spatial Lane Identity', slug: 'combat-identity', category: 'Domain Identities', summary: 'How each faction engages in Vanguard, Flank, and Rearguard combat clashes.', status: 'PROVISIONAL' },
  { sectionNumber: 9, title: 'Momentum Prototype A: Action Currency', slug: 'momentum-proto-a', category: 'Momentum Framework', summary: 'Independent MP pools earned from tactical actions and spent on Instant Surges with 50% end-round decay.', status: 'PROVISIONAL' },
  { sectionNumber: 10, title: 'Momentum Prototype B: Threshold Track (Passive Tiers)', slug: 'momentum-proto-b', category: 'Momentum Framework', summary: '0-10 Gauge unlocking Tier 0 (Dormant) through Tier 3 (Dominant) passive abilities without spending.', status: 'PROVISIONAL' },
  { sectionNumber: 11, title: 'Momentum Prototype C: Faction-Specific Verbs (RECOMMENDED)', slug: 'momentum-proto-c', category: 'Momentum Framework', summary: 'Asymmetric generation tied to authentic Domain verbs with universal utility spending and 2 MP upkeep decay.', status: 'PROVISIONAL' },
  { sectionNumber: 12, title: 'Momentum Prototype D: Contested Tug-of-War Track', slug: 'momentum-proto-d', category: 'Momentum Framework', summary: 'Single shared -5 to +5 center track with built-in rubber-banding and Underdog comeback discounts.', status: 'EXPERIMENTAL' },
  { sectionNumber: 13, title: 'Recommended Momentum Playtest Candidate', slug: 'recommended-momentum', category: 'Momentum Framework', summary: 'Formal synthesis recommending Prototype C for primary Set 001 testing with Prototype D as Limited format backup.', status: 'PROVISIONAL' },
  { sectionNumber: 14, title: 'Illusion Prototype: Mirage Decoys & Misdirection', slug: 'illusion-prototype', category: 'Mechanics Prototypes', summary: 'Physical shell-game decoy tokens that absorb targeted spells and redirect combat without hard counterspells.', status: 'PROVISIONAL' },
  { sectionNumber: 15, title: 'Preparation Prototype: Restraint & Execution Stance', slug: 'preparation-prototype', category: 'Mechanics Prototypes', summary: 'Deliberate restraint transforms stationary units into high-armor anchors with lethal Execution burst.', status: 'PROVISIONAL' },
  { sectionNumber: 16, title: 'Adaptation Prototype: Predatory Evolution Trees', slug: 'adaptation-prototype', category: 'Mechanics Prototypes', summary: 'Surviving combat allows players to choose 1 of 3 permanent mutations, up to a 3-trait Apex limit.', status: 'PROVISIONAL' },
  { sectionNumber: 17, title: 'Preservation Prototype: Soulbinding & Construct Anchors', slug: 'preservation-prototype', category: 'Mechanics Prototypes', summary: 'Soul Vats capture fallen mortal spirits and bind them into imperishable Necrosteel Shells.', status: 'PROVISIONAL' },
  { sectionNumber: 18, title: 'Engineering Prototype: Modular Frame + Core + Weapon', slug: 'engineering-prototype', category: 'Mechanics Prototypes', summary: 'Zero-variance modular machine construction where 3 specialized components snap into a single Titan.', status: 'PROVISIONAL' },
  { sectionNumber: 19, title: 'Terrain & Environmental Transformation System', slug: 'terrain-system', category: 'Mechanics Prototypes', summary: 'Living battlefield tiles (Molten Slag, Mist, Living Groves, Ossuaries, Sanctorums) altering lane physics.', status: 'PROVISIONAL' },
  { sectionNumber: 20, title: 'Mental Duel Prototype: Speed Clashes & Stances', slug: 'mental-duel-prototype', category: 'Mechanics Prototypes', summary: 'Simultaneous hidden stance selection (Strike, Guard, Feint) creating dramatic psychological micro-duels.', status: 'EXPERIMENTAL' },
  { sectionNumber: 21, title: 'Hazard System Interaction & Planetary Destabilization', slug: 'hazard-interaction', category: 'Mechanics Prototypes', summary: 'How the living world interacts with player strategies via Ash Storms, Blight, and Planar Cataclysms.', status: 'LOCKED' },
  { sectionNumber: 22, title: 'Dimensional Mechanics: Phasing & Anchor Constructs', slug: 'dimensional-mechanics', category: 'Mechanics Prototypes', summary: 'Temporary dimensional phasing and anti-teleportation Dimensional Anchor constructs.', status: 'PROVISIONAL' },
  { sectionNumber: 23, title: 'Domain Core Archetypes (3-4 Decks Per Domain)', slug: 'domain-archetypes', category: 'Archetypes & Synergies', summary: 'Over 20 distinct strategic deck archetypes ensuring every Domain supports Aggro, Midrange, Control, and Combo.', status: 'PROVISIONAL' },
  { sectionNumber: 24, title: 'Cross-Domain Synergy & Mechanical Collision Matrix', slug: 'cross-domain-synergies', category: 'Archetypes & Synergies', summary: '10 Domain pairings analyzed for emergent synergy packages and Red-Team combo vulnerabilities.', status: 'PROVISIONAL' },
  { sectionNumber: 25, title: 'Comprehensive Counterplay & Matchup Matrix', slug: 'counterplay-matrix', category: 'Archetypes & Synergies', summary: '10 two-way matchup profiles with win-rate expectations, tactical tensions, and strategic advice.', status: 'PROVISIONAL' },
  { sectionNumber: 26, title: 'Prototype Test Card Set (Cards 01-30)', slug: 'prototype-card-set', category: 'Archetypes & Synergies', summary: '30 playable testing cards across all 6 factions specifically constructed to validate new mechanics.', status: 'PROVISIONAL' },
  { sectionNumber: 27, title: 'Balance Mathematics & Power Budget Baselines', slug: 'balance-mathematics', category: 'Balance, Exploit & Testing', summary: 'Essence-to-stat ratios, removal cost baselines, and momentum efficiency curves.', status: 'PROVISIONAL' },
  { sectionNumber: 28, title: 'Red-Team Exploit & Infinite Loop Audit', slug: 'exploit-audit', category: 'Balance, Exploit & Testing', summary: 'Hostile testing of sacrifice loops, infinite rebirths, zero-cost cascades, and stack deadlocks.', status: 'LOCKED' },
  { sectionNumber: 29, title: 'Snowball & Runaway Leader Mitigation Analysis', slug: 'snowball-analysis', category: 'Balance, Exploit & Testing', summary: 'Underdog Momentum, Upkeep Decay, and Spire Node comeback mechanics protecting match tension.', status: 'LOCKED' },
  { sectionNumber: 30, title: 'Cognitive Load & Tabletop Physical Tracking Audit', slug: 'cognitive-load-audit', category: 'Balance, Exploit & Testing', summary: 'Verification that all mechanics can be cleanly tracked with physical dice, tokens, and dials.', status: 'LOCKED' },
  { sectionNumber: 31, title: 'Comprehensive Playtest & Simulation Protocol', slug: 'playtest-protocol', category: 'Balance, Exploit & Testing', summary: 'Structured 100-match computational test matrices and human playtest feedback protocols.', status: 'PROVISIONAL' },
  { sectionNumber: 32, title: 'Core Statistical Metrics to Record', slug: 'metrics-to-record', category: 'Balance, Exploit & Testing', summary: 'Turn velocity, first-player win rates, momentum spent/turn, and agency scoring metrics.', status: 'LOCKED' },
  { sectionNumber: 33, title: 'CMD-02 Question Tree & Unresolved Questions', slug: 'unresolved-questions', category: 'Balance, Exploit & Testing', summary: 'Active questions escalated to CMD-02 Question Architect and Global Councils.', status: 'OPEN QUESTION' },
  { sectionNumber: 34, title: 'Officially Rejected Concepts & Archival Rationale', slug: 'rejected-concepts', category: 'Balance, Exploit & Testing', summary: 'Permanent record of discarded mechanics (Coin-flips, Hard Counterspells, Generic Artifact rocks).', status: 'LOCKED' },
  { sectionNumber: 35, title: 'Decisions Requiring Human Project Owner Approval (E4/E5)', slug: 'human-approval-decisions', category: 'Balance, Exploit & Testing', summary: 'Core philosophical crossroads requiring explicit Creative Director ratification.', status: 'OPEN QUESTION' },
  { sectionNumber: 36, title: 'Recommended Next Development Stage (Stage B Completion)', slug: 'next-development-stage', category: 'Balance, Exploit & Testing', summary: 'Transition plan to finalize CMD-02 Question Architect and build Foundational Council (GLO-01 to GLO-06).', status: 'LOCKED' }
];

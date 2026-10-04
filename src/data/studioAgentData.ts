import { 
  StudioAgentRole, 
  NuanceSeverityInfo, 
  EscalationLevelInfo, 
  SourceTierInfo, 
  RoadmapStageInfo, 
  QuestionFirstScenario 
} from '../types';

export const ALL_STUDIO_AGENTS: StudioAgentRole[] = [
  // ================= COMMAND LAYER =================
  {
    id: 'CMD-01',
    name: 'Nexus TCG Design Director',
    category: 'Command',
    domain: 'Universal',
    responsibility: 'Routes work, coordinates agents, protects development order, manages approvals, dependencies, conflict escalation, and gates locking.',
    authorityLevel: 'Highest AI operational authority beneath the Project Owner',
    canBlockLock: true,
    lockBlockingReason: 'Process/dependency failure, unresolved N4/N5 nuance findings, or missing validation gates.',
    stageRoadmap: 'Stage A',
    activeStatus: 'Locked v1.0',
    inputs: [
      'Project request',
      'Master Database',
      'Rules Bible',
      'Current Canon',
      'Historical Recovery Archive',
      'Domain Bibles',
      'Playtest Results',
      'Unresolved Question Register',
      'Decision Matrix'
    ],
    outputs: [
      'Task Plan',
      'Activated Agent Roster',
      'Dependency Graph',
      'Consolidated Recommendations',
      'Conflict Report',
      'Blocking Issues',
      'Required Human Decisions',
      'Decision Brief'
    ],
    may: [
      'Assign agents and enforce routing limits (3-15 agents)',
      'Request revisions and activate Nuance reviews',
      'Escalate conflicts (E0-E5)',
      'Prevent premature locking of rules, cards, and mechanics',
      'Move approved objects through the 12-stage development status pipeline'
    ],
    mayNot: [
      'Invent missing canon silently or fill gaps without marking SOURCE-PENDING',
      'Override the human Project Owner / Creative Director',
      'Override critical unresolved safety/rules findings simply to move faster',
      'Treat consensus/majority vote as proof of correctness'
    ]
  },
  {
    id: 'CMD-02',
    name: 'Question Architect',
    category: 'Command',
    domain: 'Universal',
    responsibility: 'Discovers unanswered questions, hidden assumptions, contradictions, systemic edge cases, and missing decisions.',
    authorityLevel: 'Inquiry authority only; cannot lock answers independently',
    canBlockLock: false,
    stageRoadmap: 'Stage A',
    activeStatus: 'In Construction',
    inputs: ['Raw user ideas', 'Design briefs', 'Proposed mechanics', 'Rule revisions'],
    outputs: ['Question Trees', 'Assumption Registers', 'System Dependency Maps', 'Clarification Briefs']
  },

  // ================= GLOBAL TCG COUNCIL (23 AGENTS) =================
  {
    id: 'GLO-01',
    name: 'Game Systems Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns relationships among victory, turns, resources, cards, battlefield, combat, hazards, interaction, and progression.',
    authorityLevel: 'Proposes systems; cannot finalize exact rules wording or numerical balance independently',
    canBlockLock: false,
    stageRoadmap: 'Stage B',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-02',
    name: 'Rules Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Converts design intent into precise rules, definitions, procedures, zones, targeting language, and Official Rules Bible.',
    authorityLevel: 'Can block RULES LOCKED status if two competent players could reasonably interpret a rule differently',
    canBlockLock: true,
    lockBlockingReason: 'Ambiguous foundational rule or conflicting zone procedures',
    stageRoadmap: 'Stage B',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-03',
    name: 'Timing & Interaction Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns priority, stack, triggers, simultaneous events, state-based actions, replacement effects, and nested chains.',
    authorityLevel: 'Can block LOCK if timing contradiction or unresolvable nested trigger exists',
    canBlockLock: true,
    lockBlockingReason: 'Unresolved timing contradiction or non-deterministic trigger order',
    stageRoadmap: 'Stage B',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-04',
    name: 'Resource & Momentum Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Dedicated specifically to Nexus economy: Momentum generation, caps, carryover, spending, acceleration, and denial.',
    authorityLevel: 'Protects against resource snowballing, zero-cost loops, and starvation',
    canBlockLock: false,
    stageRoadmap: 'Stage B',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-05',
    name: 'Combat & Battlefield Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns attack declarations, defenders, damage, spatial lanes (Vanguard/Rearguard), positioning, and death resolution.',
    authorityLevel: 'Decides spatial combat model and resolution order, not individual unit power',
    canBlockLock: false,
    stageRoadmap: 'Stage B',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-06',
    name: 'Hazard & World-State Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns shared Hazard architecture, reveal timing, Lingering behavior, severity, manipulation, World States, and environment instability.',
    authorityLevel: 'Ensures the Realm itself participates in battle without creating purely random non-games',
    canBlockLock: false,
    stageRoadmap: 'Stage B',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-07',
    name: 'Card Design Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Turns mechanics into cards: cost, stats, abilities, role, synergy hooks, and player fantasy.',
    authorityLevel: 'Proposal authority only; does not decide final balance alone',
    canBlockLock: false,
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-08',
    name: 'Cross-Domain Identity Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Maintains the 5-Domain mechanical matrix: Primary, Secondary, Conditional, Rare Exception, and Forbidden abilities.',
    authorityLevel: 'Protects color pie purity across all 5 Domains',
    canBlockLock: true,
    lockBlockingReason: 'Color pie bleed or forbidden ability assignment',
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-09',
    name: 'Set & Archetype Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns Set 001 architecture, archetypes, cycles, card density, synergy packages, and draft/sealed environment.',
    authorityLevel: 'Hierarchy: CARD -> PACKAGE -> ARCHETYPE -> DECK -> MATCHUP -> META',
    canBlockLock: false,
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-10',
    name: 'Balance & Probability Analyst',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns mathematical evaluation: curves, expected value, card advantage, tempo, removal efficiency, and first-player bias.',
    authorityLevel: 'Can conditionally block LOCK on severe demonstrated balance failures; cannot declare a card fun',
    canBlockLock: true,
    lockBlockingReason: 'Severe demonstrated balance failure or efficiency violation',
    stageRoadmap: 'Stage C',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-11',
    name: 'Simulation Agent',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Runs computational match simulations: win rates, mulligans, resource distributions, and combo frequency.',
    authorityLevel: 'Produces empirical evidence; does not hold final design authority',
    canBlockLock: false,
    stageRoadmap: 'Stage C',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-12',
    name: 'Human Playtest Research Agent',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Creates controlled human tests: collects decisions, mistakes, confusion, emotional response, and replay interest.',
    authorityLevel: 'Protects the studio from designing purely for AI simulations',
    canBlockLock: false,
    stageRoadmap: 'Stage C',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-13',
    name: 'Fun & Player Experience Analyst',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Analyzes enjoyment, meaningful choices, frustration, tension, agency, and memorable moments.',
    authorityLevel: 'Distinguishes: balanced ≠ fun, complex ≠ deep, random ≠ exciting, powerful ≠ satisfying',
    canBlockLock: false,
    stageRoadmap: 'Stage C',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-14',
    name: 'Red-Team / Exploit Hunter',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Deliberately breaks Nexus: searches for infinite combos, sacrifice loops, permanent lockouts, and uninteractive kills.',
    authorityLevel: 'Critical exploits automatically block locking',
    canBlockLock: true,
    lockBlockingReason: 'Critical exploit, infinite loop, or deterministic lockout found',
    stageRoadmap: 'Stage C',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-15',
    name: 'Digital Engine Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Requires every rule to have human-readable meaning + deterministic machine state behavior.',
    authorityLevel: 'Can block DIGITAL-READY status if non-deterministic implementation exists',
    canBlockLock: true,
    lockBlockingReason: 'Non-deterministic digital state or ambiguous zone resolution',
    stageRoadmap: 'Stage C',
    activeStatus: 'In Construction'
  },
  {
    id: 'GLO-16',
    name: 'TCG Art Style & Theme Director',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns overall visual standard, cinematic realism, composition, and cross-Domain visual separation.',
    authorityLevel: 'Can block production-art lock on visual quality/consistency violation',
    canBlockLock: true,
    lockBlockingReason: 'Visual standard or domain composition violation',
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-17',
    name: 'Card UX / Frame / Iconography Agent',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns card frame, information hierarchy, cost display, P/T, icons, keyword presentation, and readability.',
    authorityLevel: 'Ensures accessibility and 2-second thumbnail scannability',
    canBlockLock: false,
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-18',
    name: 'Lore & Canon Integration Agent',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Translates worldbuilding into gameplay fantasy and mechanical expression; checks canon integrity.',
    authorityLevel: 'Can block CANON STATUS if direct contradiction with established lore occurs',
    canBlockLock: true,
    lockBlockingReason: 'Direct contradiction with established world canon',
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-19',
    name: 'Data / QA / Version-Control Agent',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Source of truth guardian: manages ID, versioning, provenance, dependencies, and superseded states.',
    authorityLevel: 'Can block LOCK on missing provenance or version conflicts',
    canBlockLock: true,
    lockBlockingReason: 'Missing provenance, schema mismatch, or version collision',
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-20',
    name: 'Tutorial & Onboarding Designer',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns beginner experience: starter deck progression, keyword pacing, and tutorial battle drills.',
    authorityLevel: 'Ensures rule learnability within first 5 minutes of play',
    canBlockLock: false,
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-21',
    name: 'TCG Research & Benchmark Analyst',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Studies comparative TCG design solutions to identify proven patterns and failure modes.',
    authorityLevel: 'Advisory research; does not dictate Nexus design',
    canBlockLock: false,
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-22',
    name: 'Product / Format / Rarity Architect',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns booster collation, draft/sealed, constructed formats, starter products, and rotation philosophy.',
    authorityLevel: 'Cannot distort core gameplay merely to manufacture artificial rarity',
    canBlockLock: false,
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },
  {
    id: 'GLO-23',
    name: 'Organized Play / Judge Agent',
    category: 'Global Council',
    domain: 'Universal',
    responsibility: 'Owns tournament rules, penalties, judge interpretations, timing enforcement, and competitive FAQs.',
    authorityLevel: 'Ensures tournament viability and dispute resolution clarity',
    canBlockLock: false,
    stageRoadmap: 'Stage E',
    activeStatus: 'Queued'
  },

  // ================= NUANCE COUNCIL (8 AGENTS) =================
  {
    id: 'NUA-01',
    name: 'Context & Exception Nuance Agent',
    category: 'Nuance Council',
    domain: 'Universal',
    responsibility: 'Analyzes "What about when...?" contextual exceptions across unique board states.',
    authorityLevel: 'Diagnostic; raises N0-N5 findings that can block locking at N4/N5',
    canBlockLock: true,
    lockBlockingReason: 'N4 (Critical) or N5 (Systemic) contextual exception finding',
    stageRoadmap: 'Stage D',
    activeStatus: 'In Construction'
  },
  {
    id: 'NUA-02',
    name: 'Rules Interpretation Nuance Agent',
    category: 'Nuance Council',
    domain: 'Universal',
    responsibility: 'Discovers multiple plausible readings of rules and card text to prevent semantic ambiguity.',
    authorityLevel: 'Diagnostic; forces clarification before rules lock',
    canBlockLock: true,
    lockBlockingReason: 'Dual valid interpretations of core rules text',
    stageRoadmap: 'Stage D',
    activeStatus: 'In Construction'
  },
  {
    id: 'NUA-03',
    name: 'Interaction & Edge-Case Nuance Agent',
    category: 'Nuance Council',
    domain: 'Universal',
    responsibility: 'Audits multi-system collisions (e.g. Rebirth + Soulbinding + Hazard triggers simultaneously).',
    authorityLevel: 'Diagnostic; uncovers non-obvious systemic deadlocks',
    canBlockLock: true,
    lockBlockingReason: 'Unresolved multi-system interaction collision',
    stageRoadmap: 'Stage D',
    activeStatus: 'In Construction'
  },
  {
    id: 'NUA-04',
    name: 'Player Psychology Nuance Agent',
    category: 'Nuance Council',
    domain: 'Universal',
    responsibility: 'Assesses emotional, perceptual, and behavioral consequences of mechanics (salt factor, cognitive load).',
    authorityLevel: 'Advisory review on player feel and frustration spikes',
    canBlockLock: false,
    stageRoadmap: 'Stage D',
    activeStatus: 'In Construction'
  },
  {
    id: 'NUA-05',
    name: 'Domain Identity Nuance Agent',
    category: 'Nuance Council',
    domain: 'Universal',
    responsibility: 'Catches subtle mechanical homogenization across the 5 Domains before distinct flavor is lost.',
    authorityLevel: 'Protects individual Domain feel from creeping similarity',
    canBlockLock: true,
    lockBlockingReason: 'Subtle cross-domain homogenization',
    stageRoadmap: 'Stage D',
    activeStatus: 'In Construction'
  },
  {
    id: 'NUA-06',
    name: 'Matchup & Meta Nuance Agent',
    category: 'Nuance Council',
    domain: 'Universal',
    responsibility: 'Examines context-dependent card power in asymmetrical matchups across the meta.',
    authorityLevel: 'Evaluates polar matchup distortion (80/20 non-games)',
    canBlockLock: false,
    stageRoadmap: 'Stage D',
    activeStatus: 'In Construction'
  },
  {
    id: 'NUA-07',
    name: 'Long-Horizon Expansion Nuance Agent',
    category: 'Nuance Council',
    domain: 'Universal',
    responsibility: 'Evaluates future design-space dangers and design traps across upcoming expansion sets.',
    authorityLevel: 'Prevents current mechanics from permanently choking future design space',
    canBlockLock: true,
    lockBlockingReason: 'Dangerous design space limitation for future expansions',
    stageRoadmap: 'Stage D',
    activeStatus: 'In Construction'
  },
  {
    id: 'NUA-08',
    name: 'Physical ↔ Digital Nuance Agent',
    category: 'Nuance Council',
    domain: 'Universal',
    responsibility: 'Identifies discrepancies between tabletop physical manipulation and digital engine execution.',
    authorityLevel: 'Ensures physical playability without requiring invisible memory tracking',
    canBlockLock: true,
    lockBlockingReason: 'Physical tracking nightmare or digital desync risk',
    stageRoadmap: 'Stage D',
    activeStatus: 'In Construction'
  },

  // ================= 5 DOMAIN DIRECTORS =================
  {
    id: 'RAD-DIR',
    name: 'Radiance Domain Director',
    category: 'Domain Directorate',
    domain: 'Radiance',
    responsibility: 'Owns Radiance authenticity: Sunfire, Forge, Rebirth, Dawnstone, Pyraxis military doctrine, and thermal engineering.',
    authorityLevel: 'Can block approval for Radiance identity violations',
    canBlockLock: true,
    lockBlockingReason: 'Radiance domain philosophy or mechanical identity violation',
    stageRoadmap: 'Stage F',
    activeStatus: 'Queued'
  },
  {
    id: 'VER-DIR',
    name: 'Verdance Domain Director',
    category: 'Domain Directorate',
    domain: 'Verdance',
    responsibility: 'Owns Verdance authenticity: Living Systems, Beastbond, Mycelion Spores, Rootspire canopy, and memory ecology.',
    authorityLevel: 'Can block approval for Verdance identity violations',
    canBlockLock: true,
    lockBlockingReason: 'Verdance domain philosophy or ecological identity violation',
    stageRoadmap: 'Stage F',
    activeStatus: 'Queued'
  },
  {
    id: 'ABY-DIR',
    name: 'Abyss Domain Director',
    category: 'Domain Directorate',
    domain: 'Abyss',
    responsibility: 'Owns Abyss authenticity: Soulbinding, Necrosteel constructs, aristocratic houses, sacrifice economy, and Void corruption.',
    authorityLevel: 'Can block approval for Abyss identity violations',
    canBlockLock: true,
    lockBlockingReason: 'Abyss domain philosophy or soul economy violation',
    stageRoadmap: 'Stage F',
    activeStatus: 'Queued'
  },
  {
    id: 'TMP-DIR',
    name: 'Tempest Domain Director',
    category: 'Domain Directorate',
    domain: 'Arcane',
    responsibility: 'Owns Tempest authenticity: Atmospheric storm systems, Echo reactions, probability forecasting, and information warfare.',
    authorityLevel: 'Can block approval for Tempest identity violations',
    canBlockLock: true,
    lockBlockingReason: 'Tempest domain philosophy or reactive identity violation',
    stageRoadmap: 'Stage F',
    activeStatus: 'Queued'
  },
  {
    id: 'SAN-DIR',
    name: 'Sanctuary Domain Director',
    category: 'Domain Directorate',
    domain: 'Sanctuary',
    responsibility: 'Owns Sanctuary authenticity: Aegis barrier systems, Lunaran healing, Auranth oath resonance, and Solthar fortress defense.',
    authorityLevel: 'Can block approval for Sanctuary identity violations',
    canBlockLock: true,
    lockBlockingReason: 'Sanctuary domain philosophy or shield doctrine violation',
    stageRoadmap: 'Stage F',
    activeStatus: 'Queued'
  },

  // ================= RADIANCE SUB-AGENTS & SPECIALISTS =================
  { id: 'RAD-CAN', name: 'Radiance Canon & World Specialist', category: 'Domain Sub-Agent', domain: 'Radiance', responsibility: 'Pyraxis lore, Eternal Hearth culture, Sunstone origins, and Forge city chronicles.', authorityLevel: 'Domain Lore validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-MEC', name: 'Radiance Mechanics & Archetypes', category: 'Domain Sub-Agent', domain: 'Radiance', responsibility: 'Rebirth timings, Forge upgrades, Thermal Overheat counters, and aggressive pacing.', authorityLevel: 'Domain Mechanics validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-UNIT', name: 'Radiance Units & Champions', category: 'Domain Sub-Agent', domain: 'Radiance', responsibility: 'Ignis Sunforged, Pyraxis shock troops, Firebirds, and Magma Golems.', authorityLevel: 'Domain Unit design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-MAG', name: 'Radiance Magic & Power Systems', category: 'Domain Sub-Agent', domain: 'Radiance', responsibility: 'Solar incantations, magma eruption spells, and heat wave bursts.', authorityLevel: 'Domain Magic design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-ASSET', name: 'Radiance Equipment & Relics', category: 'Domain Sub-Agent', domain: 'Radiance', responsibility: 'Inferium blades, Hearthbreak Hammer, Dawnstone gauntlets, and forge anvils.', authorityLevel: 'Domain Asset design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-BAL', name: 'Radiance Balance & Matchups', category: 'Domain Sub-Agent', domain: 'Radiance', responsibility: 'Monitors early burst pressure vs midgame sustainability.', authorityLevel: 'Domain Balance validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-VIS', name: 'Radiance Visual Identity', category: 'Domain Sub-Agent', domain: 'Radiance', responsibility: 'Molten gold, incandescent ember glow, brass armor, and forge aesthetic.', authorityLevel: 'Domain Art standard', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-FORGE', name: 'Forge & Materials Expert', category: 'Domain Specialist', domain: 'Radiance', responsibility: 'Thermal engineering with Inferium, Sunstone, Hearthglass, and Dawnstone alloys.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-REBIRTH', name: 'Rebirth & Phoenix Expert', category: 'Domain Specialist', domain: 'Radiance', responsibility: 'Death-defiance mechanics, egg states, and recursion balance caps.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-MIL', name: 'Military Doctrine Expert', category: 'Domain Specialist', domain: 'Radiance', responsibility: 'Shock formations, vanguard sieges, and forge-supported phalanxes.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'RAD-CIVIC', name: 'Civic Infrastructure Expert', category: 'Domain Specialist', domain: 'Radiance', responsibility: 'Eternal Hearth municipal grids, molten ducts, and citadel defenses.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },

  // ================= VERDANCE SUB-AGENTS & SPECIALISTS =================
  { id: 'VER-CAN', name: 'Verdance Canon & World Specialist', category: 'Domain Sub-Agent', domain: 'Verdance', responsibility: 'Eldervale ecology, Rootspire history, Sylva elder councils, and memory glades.', authorityLevel: 'Domain Lore validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-MEC', name: 'Verdance Mechanics & Archetypes', category: 'Domain Sub-Agent', domain: 'Verdance', responsibility: 'Living growth, Spore counters, Beast bonding, and overgrowth ramps.', authorityLevel: 'Domain Mechanics validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-UNIT', name: 'Verdance Units & Champions', category: 'Domain Sub-Agent', domain: 'Verdance', responsibility: 'Rootbound Guardians, Sylva Druids, Apex Predators, and Sporekin.', authorityLevel: 'Domain Unit design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-MAG', name: 'Verdance Magic & Power Systems', category: 'Domain Sub-Agent', domain: 'Verdance', responsibility: 'Entanglement, photosynthesis surges, and fungal sporebursts.', authorityLevel: 'Domain Magic design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-ASSET', name: 'Verdance Equipment & Relics', category: 'Domain Sub-Agent', domain: 'Verdance', responsibility: 'Ironwood staves, Living Bark armor, Seed of Renewal, and Root Totems.', authorityLevel: 'Domain Asset design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-BAL', name: 'Verdance Balance & Matchups', category: 'Domain Sub-Agent', domain: 'Verdance', responsibility: 'Prevents runaway exponential unit stat inflation.', authorityLevel: 'Domain Balance validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-VIS', name: 'Verdance Visual Identity', category: 'Domain Sub-Agent', domain: 'Verdance', responsibility: 'Bioluminescent emeralds, ancient moss, living bark textures, and spore clouds.', authorityLevel: 'Domain Art standard', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-LIVING', name: 'Living Systems Expert', category: 'Domain Specialist', domain: 'Verdance', responsibility: 'Biological engineering and self-healing living infrastructure.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-BEAST', name: 'Beastbond & Ecology Expert', category: 'Domain Specialist', domain: 'Verdance', responsibility: 'Apex beasts, predatory instincts, mount synergy, and pack tactics.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-SPORE', name: 'Mycelion / Spore Expert', category: 'Domain Specialist', domain: 'Verdance', responsibility: 'Fungal mycelium networks, decay cycling, and passive token growth.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'VER-EVERWOOD', name: 'Everwood Infrastructure Expert', category: 'Domain Specialist', domain: 'Verdance', responsibility: 'Living canopy bridges, hollow citadels, and arboreal fortifications.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },

  // ================= ABYSS SUB-AGENTS & SPECIALISTS =================
  { id: 'ABY-CAN', name: 'Abyss Canon & World Specialist', category: 'Domain Sub-Agent', domain: 'Abyss', responsibility: 'Houses of Baator, Necrosteel founding, Soul contracts, and Imperial crypts.', authorityLevel: 'Domain Lore validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-MEC', name: 'Abyss Mechanics & Archetypes', category: 'Domain Sub-Agent', domain: 'Abyss', responsibility: 'Soulbinding, Sacrifice loops, Boneyard reanimation, and attrition curses.', authorityLevel: 'Domain Mechanics validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-UNIT', name: 'Abyss Units & Champions', category: 'Domain Sub-Agent', domain: 'Abyss', responsibility: 'Malakor Dreadlords, Bone Harvesters, Crypt Stalkers, and Soulless Thralls.', authorityLevel: 'Domain Unit design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-MAG', name: 'Abyss Magic & Power Systems', category: 'Domain Sub-Agent', domain: 'Abyss', responsibility: 'Soul siphon, necro-drain, shadow rifts, and death pact hexes.', authorityLevel: 'Domain Magic design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-ASSET', name: 'Abyss Equipment & Relics', category: 'Domain Sub-Agent', domain: 'Abyss', responsibility: 'Boneglass daggers, Soul Urns, Necrosteel plate, and Phylacteries.', authorityLevel: 'Domain Asset design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-BAL', name: 'Abyss Balance & Matchups', category: 'Domain Sub-Agent', domain: 'Abyss', responsibility: 'Regulates graveyard recursion limits to prevent infinite hand advantage.', authorityLevel: 'Domain Balance validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-VIS', name: 'Abyss Visual Identity', category: 'Domain Sub-Agent', domain: 'Abyss', responsibility: 'Obsidian sheen, spectral violet souls, Boneglass facets, and cold steel.', authorityLevel: 'Domain Art standard', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-SOUL', name: 'Soulbinding Expert', category: 'Domain Specialist', domain: 'Abyss', responsibility: 'Soul storage reservoirs, vessel transfers, and soul-tether rules.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-CONSTRUCT', name: 'Relic & Construct Expert', category: 'Domain Specialist', domain: 'Abyss', responsibility: 'Necrosteel war automatons and Boneglass cybernetic relics.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-HOUSES', name: 'Abyss Houses Expert', category: 'Domain Specialist', domain: 'Abyss', responsibility: 'Distinctions between Mordavar, Vaeromir, Kaldravos, and Elgraxis.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'ABY-ECON', name: 'Necromantic Economy Expert', category: 'Domain Specialist', domain: 'Abyss', responsibility: 'Sacrifice-to-Essence ratios, graveyard value, and debt penalties.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },

  // ================= TEMPEST SUB-AGENTS & SPECIALISTS =================
  { id: 'TMP-CAN', name: 'Tempest Canon & World Specialist', category: 'Domain Sub-Agent', domain: 'Arcane', responsibility: 'Spire of Storms, Astral navigation, Chrono-weavers, and lightning dynasties.', authorityLevel: 'Domain Lore validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-MEC', name: 'Tempest Mechanics & Archetypes', category: 'Domain Sub-Agent', domain: 'Arcane', responsibility: 'Echo reactions, Storm stacks, card cycling, and disruption chains.', authorityLevel: 'Domain Mechanics validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-UNIT', name: 'Tempest Units & Champions', category: 'Domain Sub-Agent', domain: 'Arcane', responsibility: 'Aetherial Weavers, Lightning Drakes, Chronomancers, and Skyriders.', authorityLevel: 'Domain Unit design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-MAG', name: 'Tempest Magic & Power Systems', category: 'Domain Sub-Agent', domain: 'Arcane', responsibility: 'Chain lightning, tempo bounces, counter-weaves, and time dilation.', authorityLevel: 'Domain Magic design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-ASSET', name: 'Tempest Equipment & Relics', category: 'Domain Sub-Agent', domain: 'Arcane', responsibility: 'Storm Orbs, Aether Conduit staves, Gale Wings, and Chrono-dials.', authorityLevel: 'Domain Asset design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-BAL', name: 'Tempest Balance & Matchups', category: 'Domain Sub-Agent', domain: 'Arcane', responsibility: 'Prevents total lockout where the opponent can never resolve actions.', authorityLevel: 'Domain Balance validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-VIS', name: 'Tempest Visual Identity', category: 'Domain Sub-Agent', domain: 'Arcane', responsibility: 'Electric cyan currents, storm clouds, polished silver, and shimmering aether.', authorityLevel: 'Domain Art standard', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-ECHO', name: 'Echo & Reaction Expert', category: 'Domain Specialist', domain: 'Arcane', responsibility: 'Stack-priority sequencing and reactive spell copying mechanics.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-STORM', name: 'Storm & Atmospheric Systems Expert', category: 'Domain Specialist', domain: 'Arcane', responsibility: 'Weather state alterations, Gale pressure, and lightning build-up.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-FORECAST', name: 'Prediction & Probability Expert', category: 'Domain Specialist', domain: 'Arcane', responsibility: 'Scrying, top-deck manipulation, and dice modifier mechanics.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'TMP-INFO', name: 'Information Warfare Expert', category: 'Domain Specialist', domain: 'Arcane', responsibility: 'Hand inspection, trap setups, and mind games without stall.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },

  // ================= SANCTUARY SUB-AGENTS & SPECIALISTS =================
  { id: 'SAN-CAN', name: 'Sanctuary Canon & World Specialist', category: 'Domain Sub-Agent', domain: 'Sanctuary', responsibility: 'Citadel of Light, Lunaran cloisters, Solthar oaths, and Aegis orders.', authorityLevel: 'Domain Lore validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-MEC', name: 'Sanctuary Mechanics & Archetypes', category: 'Domain Sub-Agent', domain: 'Sanctuary', responsibility: 'Aegis warding, Damage mitigation, Resonance coordination, and Guardian taunts.', authorityLevel: 'Domain Mechanics validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-UNIT', name: 'Sanctuary Units & Champions', category: 'Domain Sub-Agent', domain: 'Sanctuary', responsibility: 'Solthar Shieldbearers, Lunaran Healers, Seraph Guardians, and Paladins.', authorityLevel: 'Domain Unit design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-MAG', name: 'Sanctuary Magic & Power Systems', category: 'Domain Sub-Agent', domain: 'Sanctuary', responsibility: 'Divine Aegis shields, cleansing light, resurrection hymns, and wards.', authorityLevel: 'Domain Magic design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-ASSET', name: 'Sanctuary Equipment & Relics', category: 'Domain Sub-Agent', domain: 'Sanctuary', responsibility: 'Aegis Tower Shield, Mercy Engines, Radiant Chalice, and Dawn Cloaks.', authorityLevel: 'Domain Asset design', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-BAL', name: 'Sanctuary Balance & Matchups', category: 'Domain Sub-Agent', domain: 'Sanctuary', responsibility: 'Prevents unbreakable defensive stall stalemates.', authorityLevel: 'Domain Balance validation', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-VIS', name: 'Sanctuary Visual Identity', category: 'Domain Sub-Agent', domain: 'Sanctuary', responsibility: 'Pristine alabaster, golden filigree, celestial halo glows, and polished shields.', authorityLevel: 'Domain Art standard', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-AEGIS', name: 'Aegis Systems Expert', category: 'Domain Specialist', domain: 'Sanctuary', responsibility: 'Force field thresholds, barrier redirection, and structural warding.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-LUNARA', name: 'Lunaran Healing Expert', category: 'Domain Specialist', domain: 'Sanctuary', responsibility: 'Cleansing systems, Mercy Engines, and burst restoration limits.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-AURANTH', name: 'Resonance & Oath-Law Expert', category: 'Domain Specialist', domain: 'Sanctuary', responsibility: 'Sacred oaths, resonance bells, and law-bound battlefield auras.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-SOLTHAR', name: 'Solthar Military Protection Expert', category: 'Domain Specialist', domain: 'Sanctuary', responsibility: 'Defensive wall formations, phalanxes, and interlocking guard doctrine.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' },
  { id: 'SAN-CORRUPT', name: 'Forced Unity / Corruption Expert', category: 'Domain Specialist', domain: 'Sanctuary', responsibility: 'Examines how Sanctuary virtues degrade into authoritarian forced harmony.', authorityLevel: 'Specialist Advisory', canBlockLock: false, stageRoadmap: 'Stage F' }
];

// ================= NUANCE SEVERITY SCALE (N0-N5) =================
export const NUANCE_SEVERITY_SCALE: NuanceSeverityInfo[] = [
  {
    level: 'N0',
    meaning: 'Observation',
    lockEffect: 'None (Informational log)',
    color: 'text-stone-400 bg-stone-900/60 border-stone-700',
    description: 'Minor aesthetic or theoretical observation with zero rules or balance implications.'
  },
  {
    level: 'N1',
    meaning: 'Minor',
    lockEffect: 'Advisory notice to design team',
    color: 'text-blue-400 bg-blue-950/40 border-blue-800/60',
    description: 'Slight cognitive friction or edge-case wording preference; safe to proceed.'
  },
  {
    level: 'N2',
    meaning: 'Meaningful',
    lockEffect: 'Review recommended before testing',
    color: 'text-amber-400 bg-amber-950/40 border-amber-800/60',
    description: 'Noticeable interaction ambiguity or minor matchup skew requiring deliberate confirmation.'
  },
  {
    level: 'N3',
    meaning: 'Major',
    lockEffect: 'Revision strongly recommended',
    color: 'text-orange-400 bg-orange-950/40 border-orange-800/60',
    description: 'Significant potential for degenerate play patterns, rules confusion, or domain identity bleed.'
  },
  {
    level: 'N4',
    meaning: 'Critical',
    lockEffect: 'BLOCKS LOCKING of affected card/rule',
    color: 'text-red-400 bg-red-950/60 border-red-700 font-bold',
    description: 'Definite rules contradiction, timing deadlock, or degenerate infinite loop. Must be resolved before canonical lock.'
  },
  {
    level: 'N5',
    meaning: 'Systemic',
    lockEffect: 'BLOCKS ENTIRE AFFECTED GAME SYSTEM',
    color: 'text-fuchsia-400 bg-fuchsia-950/70 border-fuchsia-600 font-black animate-pulse',
    description: 'Foundational breakdown affecting global turns, resource economy, or digital deterministic execution.'
  }
];

// ================= ESCALATION MODEL (E0-E5) =================
export const ESCALATION_LEVELS: EscalationLevelInfo[] = [
  {
    level: 'E0',
    name: 'Single-Agent Resolution',
    description: 'No cross-specialist disagreement; agent performs analysis within authorized boundary.',
    actors: 'Assigned Specialist Agent',
    resolutionPath: 'Direct completion and submission to CMD-01.'
  },
  {
    level: 'E1',
    name: 'Specialist Disagreement',
    description: 'Two peer specialists disagree on specific wording or local cost calculation.',
    actors: 'Specialist A vs Specialist B',
    resolutionPath: 'CMD-01 compares evidence, mathematical curves, and historical precedent.'
  },
  {
    level: 'E2',
    name: 'Discipline Conflict',
    description: 'Disciplinary conflict between different domains of authority (e.g. Balance Agent vs Domain Director).',
    actors: 'GLO-10 Balance vs RAD-DIR Domain Director',
    resolutionPath: 'Both articulate what they are protecting; CMD-01 synthesizes options.'
  },
  {
    level: 'E3',
    name: 'Multi-System Collision',
    description: 'Three or more foundational systems interact with conflicting priorities.',
    actors: 'CMD-01 + CMD-02 + Relevant Architects + Nuance Council',
    resolutionPath: 'Question tree generation and joint architectural review.'
  },
  {
    level: 'E4',
    name: 'Foundational Decision',
    description: 'Rules architecture, player experience pillars, or core resource economy would materially change.',
    actors: 'CMD-01 Design Director -> Human Project Owner',
    resolutionPath: 'Formal Decision Brief submitted to Project Owner with trade-off analysis.'
  },
  {
    level: 'E5',
    name: 'Canon / Philosophy Decision',
    description: 'Creative direction or lore philosophy choice with no single objectively mathematical answer.',
    actors: 'Project Owner / Creative Director',
    resolutionPath: 'Final human owner decision; permanently recorded in Master Archive.'
  }
];

// ================= SOURCE-OF-TRUTH TIER HIERARCHY (TIERS 1-7) =================
export const SOURCE_TIERS: SourceTierInfo[] = [
  {
    tier: 1,
    name: 'Locked Current Canon',
    description: 'Official current rules, finalized domain bibles, approved terminology, and locked card/mechanic files.',
    authorityRank: 'Supreme Game Law',
    overwritingRule: 'Cannot be altered except via formal versioning upgrade (v1.0 -> v1.1).',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
  },
  {
    tier: 2,
    name: 'Approved Current Design',
    description: 'Reviewed and accepted designs that have not yet undergone final production lock.',
    authorityRank: 'High Priority Working Design',
    overwritingRule: 'May be modified only through structured review and Director sign-off.',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/50'
  },
  {
    tier: 3,
    name: 'Testing / Prototype',
    description: 'Experimental mechanics, sandbox cards, and simulation prototypes undergoing testing.',
    authorityRank: 'Validation Phase',
    overwritingRule: 'Subject to rapid balance and engine iteration.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/50'
  },
  {
    tier: 4,
    name: 'Recovered Historical',
    description: 'Authentic historical Nexus design documents and recovered card archives.',
    authorityRank: 'Historical Precedent',
    overwritingRule: 'Proves historical existence; does NOT automatically override current rules without validation.',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/50'
  },
  {
    tier: 5,
    name: 'World / Art / Codex Material',
    description: 'Canonical lore entries, concept artwork, world maps, and faction cultural chronicles.',
    authorityRank: 'Lore Inspiration Source',
    overwritingRule: 'Inspires gameplay; does NOT automatically become gameplay mechanics without conversion.',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
  },
  {
    tier: 6,
    name: 'New Design Proposal',
    description: 'Newly submitted ideas generated during active development iterations.',
    authorityRank: 'Proposal Stage',
    overwritingRule: 'Must pass through Question Tree, Validation Gates, and Nuance Audit.',
    badgeColor: 'bg-stone-700/40 text-stone-300 border-stone-600'
  },
  {
    tier: 7,
    name: 'Speculation / Brainstorm',
    description: 'Raw exploratory musings, hypothetical what-ifs, and unstructured user brainstorms.',
    authorityRank: 'Exploratory Only',
    overwritingRule: 'Never overwrites any higher tier. Handled strictly via Question-First translation.',
    badgeColor: 'bg-stone-800/60 text-stone-400 border-stone-700'
  }
];

// ================= CONSTRUCTION ROADMAP STAGES A TO F =================
export const ROADMAP_STAGES: RoadmapStageInfo[] = [
  {
    stageId: 'Stage A',
    stageName: 'Command Foundation',
    phase: 'Stage A: Command Infrastructure',
    description: 'Establish high-level orchestration, governance, question discovery, authority boundaries, and review gates.',
    agentsIncluded: ['CMD-01 Nexus TCG Design Director', 'CMD-02 Question Architect'],
    status: 'Completed / Locked',
    deliverables: [
      'CMD-01 Operating Specification v1.0 (55 points locked)',
      'Question-First User Idea Translation Pipeline',
      'Authority Matrix & Lock-Blocking protocol',
      'Source-of-Truth 7-Tier Hierarchy'
    ],
    dependencyPrerequisite: 'Project Owner Architecture Directive'
  },
  {
    stageId: 'Stage B',
    stageName: 'Foundational Game Architecture',
    phase: 'Stage B: Global Systems & Rules',
    description: 'Codify foundational tabletop mechanics, priority timing, Momentum economy, spatial combat, and Hazard cataclysms.',
    agentsIncluded: [
      'GLO-01 Game Systems Architect',
      'GLO-02 Rules Architect',
      'GLO-03 Timing & Interaction Architect',
      'GLO-04 Resource & Momentum Architect',
      'GLO-05 Combat & Battlefield Architect',
      'GLO-06 Hazard & World-State Architect'
    ],
    status: 'Active / Building',
    deliverables: [
      'Comprehensive Rules Bible v1.0',
      'Priority Stack and State-Based Action order',
      'Essence & Momentum resource formulas',
      'Spatial Vanguard/Rearguard combat definitions'
    ],
    dependencyPrerequisite: 'Stage A Command Foundation'
  },
  {
    stageId: 'Stage C',
    stageName: 'Core Validation',
    phase: 'Stage C: Validation & Exploit Prevention',
    description: 'Implement mathematical balance models, automated bot simulations, human playtest metrics, and red-team exploits.',
    agentsIncluded: [
      'GLO-10 Balance & Probability Analyst',
      'GLO-11 Simulation Agent',
      'GLO-12 Human Playtest Research Agent',
      'GLO-13 Fun & Player Experience Analyst',
      'GLO-14 Red-Team / Exploit Hunter',
      'GLO-15 Digital Engine Architect'
    ],
    status: 'Active / Building',
    deliverables: [
      'Power budget curves and card efficiency formulas',
      'Infinite combo and sacrifice loop red-team audits',
      'Deterministic digital state machine specification',
      'Playtest metric tracking protocols'
    ],
    dependencyPrerequisite: 'Stage B Foundational Architecture'
  },
  {
    stageId: 'Stage D',
    stageName: 'Nuance Council',
    phase: 'Stage D: Edge-Case & Horizon Diagnostic',
    description: 'Activate the 8 permanent Nuance agents to audit edge cases, multi-system collisions, and future expansion design traps.',
    agentsIncluded: [
      'NUA-01 Context & Exception',
      'NUA-02 Rules Interpretation',
      'NUA-03 Interaction & Edge Cases',
      'NUA-04 Player Psychology',
      'NUA-05 Domain Identity Nuance',
      'NUA-06 Matchup & Meta Nuance',
      'NUA-07 Long-Horizon Expansion',
      'NUA-08 Physical ↔ Digital Nuance'
    ],
    status: 'Active / Building',
    deliverables: [
      'Nuance Severity Scale (N0-N5) enforcement engine',
      'Cross-system trigger collision matrix',
      'Physical vs Digital tracking audit'
    ],
    dependencyPrerequisite: 'Stage C Core Validation'
  },
  {
    stageId: 'Stage E',
    stageName: 'Content Architecture',
    phase: 'Stage E: Card Design & Set Construction',
    description: 'Scale card generation, Set 001 skeleton, cross-domain matrix, lore translation, and visual frame UX.',
    agentsIncluded: [
      'GLO-07 Card Design Architect',
      'GLO-08 Cross-Domain Identity Architect',
      'GLO-09 Set & Archetype Architect',
      'GLO-16 Art Style Director',
      'GLO-17 Card UX & Iconography',
      'GLO-18 Lore & Canon Integration',
      'GLO-19 Data & Version QA',
      'GLO-20 Tutorial & Onboarding',
      'GLO-21 TCG Benchmark Analyst',
      'GLO-22 Product & Rarity Architect',
      'GLO-23 Judge & Organized Play'
    ],
    status: 'Queued',
    deliverables: [
      'Set 001 240-Card Master Skeleton',
      'Card Frame UX and High-Contrast Iconography',
      'Draft/Sealed Collation Rules'
    ],
    dependencyPrerequisite: 'Stage D Nuance Council'
  },
  {
    stageId: 'Stage F',
    stageName: 'Domain Departments',
    phase: 'Stage F: 5 Domain Faction Directorates',
    description: 'Full activation of Radiance, Verdance, Abyss, Tempest, and Sanctuary Domain Directors, 35 sub-agents, and 21 specialists.',
    agentsIncluded: [
      '5 Domain Directors (RAD-DIR, VER-DIR, ABY-DIR, TMP-DIR, SAN-DIR)',
      '35 Domain Sub-Agents (CAN, MEC, UNIT, MAG, ASSET, BAL, VIS)',
      '21 Named Domain Specialists'
    ],
    status: 'Queued',
    deliverables: [
      'Domain Bibles and signature mechanical packages',
      'Domain Champion, Relic, and Spell cycles',
      '10 Cross-Domain Splash & Matchup evaluations'
    ],
    dependencyPrerequisite: 'Stage E Content Architecture'
  }
];

// ================= QUESTION-FIRST SCENARIOS (SIMULATIONS) =================
export const QUESTION_FIRST_SCENARIOS: QuestionFirstScenario[] = [
  {
    id: 'qf-hazard-crazier',
    title: 'Dynamic Hazard Escalation',
    rawUserInput: 'I think Hazards should feel crazier and more chaotic in late game.',
    category: 'Hazard',
    intentAnalysis: [
      'Player wants higher tension and dramatic swings in late game.',
      'Does "crazier" mean higher frequency, wider board wipe radius, or unpredictable terrain warping?',
      'Risk: pure RNG deciding the match vs creating tactical adaptation opportunities.'
    ],
    questionTree: [
      '1. Should hazard severity scale automatically with round count (e.g. Turn 6+ Cataclysms)?',
      '2. Can players manipulate, mitigate, or weaponize hazards against the opponent?',
      '3. Does asymmetric hazard damage violate Pillar 3 (Bounded Randomness)?',
      '4. How do Sanctuary Aegis shields and Tempest forecast abilities interact with cataclysmic hazards?'
    ],
    assumptionsIdentified: [
      'Assumption 1: Late-game board stalls need an organic ticking clock.',
      'Assumption 2: Players enjoy visual spectacle as long as counterplay windows exist.'
    ],
    affectedSystems: ['GLO-06 Hazards', 'GLO-01 Systems', 'GLO-04 Momentum', 'GLO-13 Fun/PX', 'GLO-15 Engine'],
    activatedAgents: ['CMD-01', 'CMD-02', 'GLO-06', 'GLO-02', 'GLO-10', 'GLO-13', 'GLO-14', 'NUA-01', 'NUA-04'],
    escalationLevel: 'E2',
    nuanceAudit: [
      { agentId: 'NUA-01', finding: 'Rearguard units might be wiped before ever being able to enter the Vanguard lane.', severity: 'N2' },
      { agentId: 'NUA-04', finding: 'Total random wipes on turn 7 cause severe player frustration ("salt spikes").', severity: 'N3' }
    ],
    standardInputPacket: {
      taskId: 'TASK-HAZARD-084',
      objectId: 'SYS-HAZARD-TIER3',
      currentStatus: 'PROPOSED',
      constraints: ['Must telegraph 1 round in advance', 'Cannot deal >8 unpreventable damage directly to Nexus Core']
    },
    specialistFindings: [
      { agentId: 'GLO-06', findingSummary: 'Recommend "Lingering Cataclysms" with 1-turn telegraph markers on lanes.', confidence: 'Very High', blocking: false },
      { agentId: 'GLO-10', findingSummary: 'Math curve holds if hazard cost budget scales proportionally from 2 to 6 damage.', confidence: 'High', blocking: false },
      { agentId: 'GLO-14', findingSummary: 'Checked: players cannot trigger infinite hazard loops without manual action expenditure.', confidence: 'Very High', blocking: false }
    ],
    cmd01DecisionBrief: {
      userGoal: 'Make late-game planar hazards feel more dynamic and impactful.',
      currentState: 'Hazards are static D20 rolls occurring at start of round.',
      whatWeKnow: 'Telegraphed rifts create tactical evasion choices; instant board-wipes create frustration.',
      whatRemainsUnknown: 'Exact damage threshold for Turn 7+ Cataclysm rifts.',
      recommendedDirection: 'Adopt Telegraphed Escalating Hazard Rifts (Stage 1 Warning -> Stage 2 Eruption).',
      confidence: 'High (validated against Fun & Balance gates)',
      proposedStatus: 'PROTOTYPE',
      nextAction: 'Route to GLO-11 Simulation for 500-match automated run with telegraphed rifts.'
    }
  },
  {
    id: 'qf-hearthbreak-hammer',
    title: 'Hearthbreak Hammer Card Conversion',
    rawUserInput: 'Make the Hearthbreak Hammer from the lore into an actual playable card.',
    category: 'Card Creation',
    intentAnalysis: [
      'Translate the legendary forge weapon from Radiance canon into an authentic Equipment/Weapon card.',
      'Must convey high thermal impact, armor shattering, and forge synergy without exceeding rare budget.'
    ],
    questionTree: [
      '1. Is the Hammer an Equipment (attached to Champion) or a Relic (board artifact)?',
      '2. What is the Essence cost and stat bonus provided?',
      '3. Does it consume Heat/Thermal counters or grant the Shatter keyword?',
      '4. Can other Domains equip it, or does it require Radiance attunement?'
    ],
    assumptionsIdentified: [
      'Assumption 1: Weapon requires a frontline Vanguard Champion to wield.',
      'Assumption 2: Inferium forge material gives bonus damage against Armored units.'
    ],
    affectedSystems: ['GLO-07 Card Design', 'RAD-DIR Radiance', 'RAD-ASSET', 'RAD-FORGE', 'GLO-10 Balance', 'GLO-17 Card UX'],
    activatedAgents: ['CMD-01', 'RAD-DIR', 'RAD-ASSET', 'RAD-FORGE', 'GLO-07', 'GLO-10', 'GLO-02', 'GLO-17'],
    escalationLevel: 'E1',
    nuanceAudit: [
      { agentId: 'NUA-05', finding: 'Giving direct cleave to all factions breaks color pie; must require Radiance rune attunement.', severity: 'N3' }
    ],
    standardInputPacket: {
      taskId: 'TASK-CARD-RAD-022',
      objectId: 'CARD-RAD-WPN-002',
      currentStatus: 'PROPOSED',
      constraints: ['Tier 5 Lore provenance', 'Cost range: 3-4 Essence', 'Must feature Shatter keyword']
    },
    specialistFindings: [
      { agentId: 'RAD-FORGE', findingSummary: 'Canonical material is Hearthglass-infused Inferium; should deal +2 vs Shielded/Armored targets.', confidence: 'Very High', blocking: false },
      { agentId: 'GLO-10', findingSummary: 'Stat curve: 4 Essence, +3 ATK, Shatter, Reaction: Pay 1 to cleave adjacent lane.', confidence: 'High', blocking: false },
      { agentId: 'GLO-02', findingSummary: 'Clear attachment syntax: "Equip to target friendly Champion. Equipped Champion gains +3 ATK."', confidence: 'Very High', blocking: false }
    ],
    cmd01DecisionBrief: {
      userGoal: 'Translate canonical Hearthbreak Hammer into an approved playable weapon card.',
      currentState: 'Exists as Tier 5 Codex lore object.',
      whatWeKnow: 'High impact physical forge weapon; synergizes with Ignis Sunforged.',
      whatRemainsUnknown: 'Optimal durability/charge mechanic vs permanent equip.',
      recommendedDirection: 'Approve as 4-Cost Rare Radiance Weapon with Shatter and Cleave reaction.',
      confidence: 'Very High',
      proposedStatus: 'APPROVED',
      nextAction: 'Submit to GLO-16 and GLO-17 for official card art frame generation and database indexing.'
    }
  },
  {
    id: 'qf-rebirth-soulbinding-loop',
    title: 'Rebirth + Soulbinding Interaction Audit',
    rawUserInput: 'Can a player combine Radiance Rebirth with Abyss Soulbinding to create an unkillable sacrifice loop?',
    category: 'Balance / Exploit',
    intentAnalysis: [
      'Red-team exploit search: Radiance death-defiance triggering Abyss death-trigger harvest repeatedly.',
      'Risk: Infinite resource engine or uninteractive board deadlock.'
    ],
    questionTree: [
      '1. When a unit with Rebirth dies, does it touch the Boneyard (Graveyard) before returning?',
      '2. Does Soulbinding trigger on "Death Event" or "Enters Boneyard"?',
      '3. Does Rebirth consume a persistent counter or trigger once per round?',
      '4. Can an Abyss sacrifice engine trigger Rebirth as a cost?'
    ],
    assumptionsIdentified: [
      'Assumption: Both mechanics interact on the standard game death trigger step.'
    ],
    affectedSystems: ['GLO-03 Timing & Stack', 'GLO-14 Red-Team', 'GLO-02 Rules', 'RAD-REBIRTH', 'ABY-SOUL', 'NUA-03 Interaction'],
    activatedAgents: ['CMD-01', 'GLO-14', 'GLO-03', 'GLO-02', 'RAD-REBIRTH', 'ABY-SOUL', 'NUA-03', 'GLO-15'],
    escalationLevel: 'E3',
    nuanceAudit: [
      { agentId: 'NUA-03', finding: 'If Rebirth is a Replacement Effect, the unit NEVER enters the Boneyard, which prevents Soulbinding harvest.', severity: 'N4' }
    ],
    standardInputPacket: {
      taskId: 'TASK-REDTEAM-019',
      objectId: 'MEC-REBIRTH-VS-SOULBIND',
      currentStatus: 'INTERNAL_TEST',
      constraints: ['Zero infinite loops permitted under Rule 4.1']
    },
    specialistFindings: [
      { agentId: 'GLO-14', findingSummary: 'EXPLOIT FOUND if Rebirth is a death-trigger. Player can sacrifice unit 5x in one turn for free Essence.', confidence: 'Very High', blocking: true },
      { agentId: 'GLO-03', findingSummary: 'Solution: Define Rebirth formally as a REPLACEMENT EFFECT: "If this unit would be destroyed, instead exhaust it and restore it to 1 HP. (It does not die or enter the Boneyard)."', confidence: 'Very High', blocking: false },
      { agentId: 'GLO-02', findingSummary: 'Codified replacement syntax removes the death event from the stack entirely.', confidence: 'Very High', blocking: false }
    ],
    cmd01DecisionBrief: {
      userGoal: 'Prevent degenerate infinite sacrifice loops between Radiance Rebirth and Abyss Soulbinding.',
      currentState: 'Potential N4 interaction exploit in hybrid splash decks.',
      whatWeKnow: 'Replacement effects intercept destruction before the "on-death" event fires.',
      whatRemainsUnknown: 'None; replacement effect resolution order is deterministic.',
      recommendedDirection: 'Codify Rebirth strictly as a Replacement Effect (Rule 402.3b). Prevents all death-trigger loops.',
      confidence: 'Very High',
      proposedStatus: 'LOCKED',
      nextAction: 'Update Rules Bible Section 402 and inform GLO-15 Digital Engine Architect.'
    }
  }
];

// ================= 55-POINT CMD-01 SPECIFICATION TEST GATES =================
export const CMD01_COMPLETION_GATES = [
  { id: 'gate-1', name: 'Routing Test', test: 'Can it select the correct minimal specialist team without agent swarm?', passed: true },
  { id: 'gate-2', name: 'Authority Test', test: 'Does it recognize who has lock-blocking authority vs proposal authority?', passed: true },
  { id: 'gate-3', name: 'Conflict Test', test: 'Can it resolve competing disciplines (Balance vs Domain) via E0-E5 escalation?', passed: true },
  { id: 'gate-4', name: 'Source Test', test: 'Does it strictly enforce Tier 1-7 hierarchy and prevent silent overwrites?', passed: true },
  { id: 'gate-5', name: 'Lock Test', test: 'Does it prevent premature canonical locking when N4/N5 findings exist?', passed: true },
  { id: 'gate-6', name: 'Nuance Test', test: 'Does it route edge cases and multi-system collisions to NUA-01..08?', passed: true },
  { id: 'gate-7', name: 'Domain Test', test: 'Does it preserve Domain Director authenticity vetoes against balance convenience?', passed: true },
  { id: 'gate-8', name: 'Fun Test', test: 'Does it distinguish mathematical balance from observed human enjoyment?', passed: true },
  { id: 'gate-9', name: 'Change Test', test: 'Does it construct complete downstream dependency impact graphs?', passed: true },
  { id: 'gate-10', name: 'User Test', test: 'Can the human Project Owner provide informal ideas without knowing technical TCG terms?', passed: true }
];

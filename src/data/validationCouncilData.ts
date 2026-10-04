// Stage C: Core Validation & Integrity Council (GLO-10 through GLO-15)
// Authoritative Data & Validation Engine Spec

export interface ValidationAgentProfile {
  id: string;
  code: string;
  name: string;
  role: string;
  tier: number;
  canBlockLock: boolean;
  coreDomain: string;
  primaryMandate: string;
  reviewGates: string[];
  blockingCriteria: string[];
  diagnosticTools: string[];
}

export interface ExploitTestCase {
  id: string;
  name: string;
  comboCards: string[];
  severity: 'N4_CRITICAL' | 'N5_SYSTEMIC' | 'N3_MAJOR' | 'N1_MINOR';
  loopType: 'Infinite Mana' | 'Infinite Damage' | 'Hard Lockout' | 'Draw-Out Deck Empty' | 'State Explosion';
  description: string;
  stepsToReproduce: string[];
  resolutionClause: string;
  status: 'BLOCKED' | 'RESOLVED_BY_RULE' | 'UNDER_REVIEW';
}

export interface ManaCurvePoint {
  essenceCost: number;
  recommendedStatBudget: number; // Attack + Defense
  baselineEffectValue: number; // Abstracted value in mana equivalents
  exampleCard: string;
  maxAllowableKeywords: number;
}

export interface MetaSimulationArchetype {
  id: string;
  name: string;
  domain: string;
  avgGameLengthTurns: number;
  winRatePct: number;
  favorableMatchups: string[];
  unfavorableMatchups: string[];
  tierRating: 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier';
}

export const VALIDATION_COUNCIL_AGENTS: ValidationAgentProfile[] = [
  {
    id: 'glo-10',
    code: 'GLO-10',
    name: 'Math & Mana Curve Architect',
    role: 'Quantitative Game Balance & Stat Budgeting',
    tier: 1,
    canBlockLock: true,
    coreDomain: 'Mathematical Equilibrium',
    primaryMandate: 'Enforces strict Essence-to-Stat conversion curves and resource efficiency ceilings to prevent mathematical power creep.',
    reviewGates: ['Gate 2 (Statistical Budget Verification)', 'Gate 4 (Curve Smoothness Audit)'],
    blockingCriteria: [
      'Stat budget exceeds (Cost * 2) + 1 without severe symmetric drawback',
      'Card generates more net mana than its cast cost on the turn of play without conditional threshold',
      'Damage-to-cost ratio exceeds 2.5 damage per 1 Essence on unconditional fast spells'
    ],
    diagnosticTools: ['Essence Efficiency Vector', 'Turn-4 Effective Board Value Projection', 'Mana Ramp Derivative Curve']
  },
  {
    id: 'glo-11',
    code: 'GLO-11',
    name: 'Game Balance & Power Budget Lead',
    role: 'Macro Power Distribution & Dominance Prevention',
    tier: 1,
    canBlockLock: true,
    coreDomain: 'System Balance',
    primaryMandate: 'Ensures no single archetype or domain exceeds 55% aggregate win rate in standard simulated pools, and no card exhibits >75% inclusion rate in its domain.',
    reviewGates: ['Gate 3 (Meta Diversity Audit)', 'Gate 5 (Pre-Lock Dominance Check)'],
    blockingCriteria: [
      'Auto-include card exceeding 75% adoption across all domain archetypes',
      'Polarizing matchup delta exceeding 75%/25% advantage against any core archetype',
      'Uncounterable Turn 3 lethal sequences'
    ],
    diagnosticTools: ['Gini Dominance Coefficient', 'Inclusion Saturation Heatmap', 'Archetype Polarization Matrix']
  },
  {
    id: 'glo-12',
    code: 'GLO-12',
    name: 'Meta Simulation & Deck Testing Bot Lead',
    role: 'Automated Monte Carlo Matchup Simulator',
    tier: 1,
    canBlockLock: true,
    coreDomain: 'Simulation Engine',
    primaryMandate: 'Executes high-volume simulated bot matches (1,000 to 100,000 games) to empirically map win rate distributions, average turn length, and board stall probabilities.',
    reviewGates: ['Gate 4 (Monte Carlo 10k Pass)', 'Gate 6 (Variance Stress Test)'],
    blockingCriteria: [
      'Simulated average game length falls below 5.5 turns (hyper-aggro collapse) or exceeds 16 turns (gridlock stalemate)',
      'First-player advantage exceeds 54.0% win rate under standard coin/draw conditions',
      'Board stall rate exceeds 22% of all simulated matches'
    ],
    diagnosticTools: ['Monte Carlo 10k Runner', 'Turn-to-Lethal Histogram', 'First-Player Advantage Delta']
  },
  {
    id: 'glo-13',
    code: 'GLO-13',
    name: 'Format Legality & Rotation Architect',
    role: 'Ecosystem Longevity & Format Boundary Enforcer',
    tier: 1,
    canBlockLock: false,
    coreDomain: 'Format Architecture',
    primaryMandate: 'Governs Standard, Eternal, Draft, and Nexus Ladder format boundaries, managing set rotation timelines and ban/restricted lists.',
    reviewGates: ['Gate 1 (Format Scope Classification)', 'Gate 5 (Draft Archetype Viability)'],
    blockingCriteria: [
      'Card invalidates draft archetype by being unpickable or an instant draft auto-win',
      'Eternal format cross-set interaction breaks legacy rules baseline'
    ],
    diagnosticTools: ['Draft Archetype Curve Balance', 'Eternal Cross-Set Synergy Scanner', 'Set Rotation Longevity Model']
  },
  {
    id: 'glo-14',
    code: 'GLO-14',
    name: 'Red-Team / Infinite Loop Exploit Hunter',
    role: 'Vulnerability Detection & Infinite Combo Blocker',
    tier: 1,
    canBlockLock: true,
    coreDomain: 'Adversarial Security',
    primaryMandate: 'Hostile adversarial auditing of card mechanics to detect infinite resource loops, deterministic game lockouts, memory state explosions, and uninteractive OTKs.',
    reviewGates: ['Gate 3 (Adversarial Loop Audit)', 'Gate 6 (Final Exploit Clearance)'],
    blockingCriteria: [
      'Self-referential trigger loops creating infinite state cycles without mandatory progress',
      '0-cost sacrifice and reanimate loops generating unbounded resources',
      'Total hand/board denial locks from which the opponent has 0 legal game actions'
    ],
    diagnosticTools: ['Graph Cycle Detection AST', 'State Explosion Depth Probe', 'Unbounded Recursion Fuzzer']
  },
  {
    id: 'glo-15',
    code: 'GLO-15',
    name: 'Edge-Case Combinatorics Matrix Architect',
    role: 'Multi-Card Interaction & Layer Resolution Master',
    tier: 1,
    canBlockLock: true,
    coreDomain: 'Combinatorial Rules Engineering',
    primaryMandate: 'Tests 3-way and 4-way simultaneous card interactions, layer dependency orders, timestamp conflicts, and continuous effect collisions.',
    reviewGates: ['Gate 4 (3+ Card Interaction Fuzzing)', 'Gate 5 (Simultaneous Trigger Matrix)'],
    blockingCriteria: [
      'Dependency loop where Effect A changes whether Effect B applies, while Effect B changes whether Effect A applies (Layer Paradox)',
      'Undefined trigger order when 4+ triggers occur at the exact same micro-priority window',
      'Continuous stat reduction colliding with maximum health aura calculation'
    ],
    diagnosticTools: ['Interaction Dependency Layer Graph', 'Simultaneous Event Fuzzing Matrix', 'Timestamp Collision Resolver']
  }
];

export const MANA_CURVE_STANDARDS: ManaCurvePoint[] = [
  { essenceCost: 1, recommendedStatBudget: 3, baselineEffectValue: 1.0, exampleCard: 'Sunlit Initiate (1/2 with Guard)', maxAllowableKeywords: 1 },
  { essenceCost: 2, recommendedStatBudget: 5, baselineEffectValue: 2.0, exampleCard: 'Sporeling Swarm (2/3 or 1/4 with Spore)', maxAllowableKeywords: 1 },
  { essenceCost: 3, recommendedStatBudget: 7, baselineEffectValue: 3.2, exampleCard: 'Echo Weaver (3/4 with Echo-1)', maxAllowableKeywords: 2 },
  { essenceCost: 4, recommendedStatBudget: 9, baselineEffectValue: 4.5, exampleCard: 'Chrono Warden (4/5 with Phase Shift)', maxAllowableKeywords: 2 },
  { essenceCost: 5, recommendedStatBudget: 11, baselineEffectValue: 6.0, exampleCard: 'Abyssal Reaver (5/6 with Soulbound)', maxAllowableKeywords: 3 },
  { essenceCost: 6, recommendedStatBudget: 13, baselineEffectValue: 7.5, exampleCard: 'Sanctum Arbiter (6/7 with Divine Ward)', maxAllowableKeywords: 3 },
  { essenceCost: 7, recommendedStatBudget: 15, baselineEffectValue: 9.2, exampleCard: 'Solar Aegis Titan (7/8 with Colossal & Radiant Aura)', maxAllowableKeywords: 4 },
  { essenceCost: 8, recommendedStatBudget: 17, baselineEffectValue: 11.0, exampleCard: 'Worldroot Behemoth (8/9 with Trample & Regenerate)', maxAllowableKeywords: 4 }
];

export const RED_TEAM_EXPLOIT_CASES: ExploitTestCase[] = [
  {
    id: 'EXP-001',
    name: 'Abyssal Grave-Loop Recursion Paradox',
    comboCards: ['Soulreaver Adept', 'Crypt Altar', 'Grave-Return Sigil'],
    severity: 'N5_SYSTEMIC',
    loopType: 'Infinite Mana',
    description: 'Sacrificing Soulreaver Adept to Crypt Altar generates 2 Essence. Grave-Return Sigil triggers on death to return the cheapest unit from Graveyard to hand at 1 Essence discount, allowing infinite recursion and unbounded Essence on Turn 3.',
    stepsToReproduce: [
      '1. Cast Soulreaver Adept (2 Essence, 2/2).',
      '2. Activate Crypt Altar (Sacrifice target unit -> Gain 2 Essence).',
      '3. Grave-Return Sigil triggers, placing Adept back into hand at 1 Essence cost.',
      '4. Recast Adept for 1 Essence, netting +1 Essence per iteration indefinitely.'
    ],
    resolutionClause: 'Rule 408.3 Amendment: Add mandatory clause: "This trigger can only resolve once per turn per card title (Hard Once-Per-Turn limit)."',
    status: 'RESOLVED_BY_RULE'
  },
  {
    id: 'EXP-002',
    name: 'Temporal Double-Echo Time Lockout',
    comboCards: ['Chrono-Mirror', 'Stutter Strike', 'Paradox Engine'],
    severity: 'N4_CRITICAL',
    loopType: 'Hard Lockout',
    description: 'Chrono-Mirror duplicates Stutter Strike which forces the opponent to skip their next Priority Fast-Action window. Combined with Paradox Engine untapping all Essence, the player can cast this every turn, permanently denying the opponent any legal fast actions.',
    stepsToReproduce: [
      '1. Control Chrono-Mirror and Paradox Engine.',
      '2. Cast Stutter Strike targeting opponent.',
      '3. Mirror replicates Stutter Strike to stack.',
      '4. Opponent priority window is erased for current and subsequent turn.'
    ],
    resolutionClause: 'Rule 304.7 Enactment: "Priority skip effects cannot stack and cannot reduce a player\'s priority windows to less than 1 per phase."',
    status: 'RESOLVED_BY_RULE'
  },
  {
    id: 'EXP-003',
    name: 'Verdant Sporeling Explosion Cycle',
    comboCards: ['Fungal Monarch', 'Spore Burst', 'Overgrowth Totem'],
    severity: 'N4_CRITICAL',
    loopType: 'State Explosion',
    description: 'When Fungal Monarch enters, it creates a 1/1 Sporeling. Spore Burst converts Sporelings into mana which Overgrowth Totem uses to spawn 2 more Sporelings, exceeding the lane capacity limit and overflowing memory arrays in the game client.',
    stepsToReproduce: [
      '1. Cast Fungal Monarch.',
      '2. Play Spore Burst.',
      '3. Sporelings spawn beyond 6 total battlefield units, violating 2-units-per-lane ceiling.'
    ],
    resolutionClause: 'Rule 502.1 Lane Enclosure: "If a unit creation effect exceeds lane capacity (max 2 per lane), excess units are sent directly to the Void without triggering entry/death abilities."',
    status: 'RESOLVED_BY_RULE'
  }
];

export const META_SIMULATION_DATA: MetaSimulationArchetype[] = [
  {
    id: 'meta-1',
    name: 'Radiant Dawn Midrange',
    domain: 'Radiant',
    avgGameLengthTurns: 7.8,
    winRatePct: 52.4,
    favorableMatchups: ['Abyssal Reanimator', 'Temporal Burn'],
    unfavorableMatchups: ['Sanctum Control', 'Verdant Swarm'],
    tierRating: 'A-Tier'
  },
  {
    id: 'meta-2',
    name: 'Verdant Overgrowth Swarm',
    domain: 'Verdant',
    avgGameLengthTurns: 6.2,
    winRatePct: 53.8,
    favorableMatchups: ['Radiant Dawn Midrange', 'Temporal Combo'],
    unfavorableMatchups: ['Abyssal Board-Wipe', 'Sanctum Stasis'],
    tierRating: 'S-Tier'
  },
  {
    id: 'meta-3',
    name: 'Abyssal Soul Harvest Control',
    domain: 'Abyssal',
    avgGameLengthTurns: 9.4,
    winRatePct: 51.1,
    favorableMatchups: ['Verdant Swarm', 'Radiant Vanguard'],
    unfavorableMatchups: ['Temporal Rewind', 'Sanctum Aegis'],
    tierRating: 'A-Tier'
  },
  {
    id: 'meta-4',
    name: 'Temporal Paradox Combo',
    domain: 'Temporal',
    avgGameLengthTurns: 8.1,
    winRatePct: 49.6,
    favorableMatchups: ['Abyssal Control', 'Sanctum Fortress'],
    unfavorableMatchups: ['Verdant Aggro', 'Radiant Rush'],
    tierRating: 'B-Tier'
  },
  {
    id: 'meta-5',
    name: 'Sanctum Divine Fortress',
    domain: 'Sanctum',
    avgGameLengthTurns: 11.2,
    winRatePct: 50.8,
    favorableMatchups: ['Radiant Midrange', 'Verdant Swarm'],
    unfavorableMatchups: ['Temporal Combo', 'Abyssal Mill'],
    tierRating: 'A-Tier'
  }
];

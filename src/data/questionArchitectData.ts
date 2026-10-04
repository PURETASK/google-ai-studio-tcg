import { 
  QuestionDimension, 
  HiddenAssumption, 
  DependencyNode, 
  QuestionTreeDecomposition, 
  FullQuestionAnalysisResult 
} from '../types';

export interface QuestionDimensionInfo {
  dimension: QuestionDimension;
  title: string;
  code: string;
  badgeColor: string;
  leadAgents: string[];
  focusDescription: string;
  keyKeywords: string[];
  sampleQuestions: string[];
}

export const QUESTION_DIMENSIONS: QuestionDimensionInfo[] = [
  {
    dimension: 'Foundational',
    title: 'Foundational Core Axioms',
    code: 'DIM-01',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    leadAgents: ['CMD-01', 'GLO-01', 'GLO-02'],
    focusDescription: 'Fundamental laws of the game: win/loss conditions, core turn loop, basic geometry, and non-negotiable axioms.',
    keyKeywords: ['win condition', 'core hp', 'turn structure', 'deck limit', 'stalemate', 'loss', 'axiom', 'fundamental'],
    sampleQuestions: [
      'What happens if both Nexus Cores hit 0 HP simultaneously?',
      'Can players lose the game from drawing from an empty library?',
      'Are core game rules modifiable by standard card effects?'
    ]
  },
  {
    dimension: 'System',
    title: 'Global Systems & Priority',
    code: 'DIM-02',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    leadAgents: ['GLO-03', 'GLO-04', 'GLO-05', 'GLO-06'],
    focusDescription: 'Timing stack (LIFO), priority windows, Essence resource curves, 3-lane combat layout, and living hazard state machines.',
    keyKeywords: ['stack', 'priority', 'fast action', 'reaction', 'lanes', 'combat', 'hazard', 'essence', 'momentum', 'surge'],
    sampleQuestions: [
      'Can a player cast a Fast Action during damage calculation?',
      'How does Momentum drain if a player skips playing cards for two consecutive turns?',
      'Does hazard damage trigger before or after unit lane combat declarations?'
    ]
  },
  {
    dimension: 'Card',
    title: 'Card Mechanics & Syntax',
    code: 'DIM-03',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    leadAgents: ['GLO-16', 'GLO-17', 'Domain Directors', 'NUA-02'],
    focusDescription: 'Card stats, costs, keyword formulations, trigger preconditions, target legality, and standard Rules Bible syntax.',
    keyKeywords: ['card', 'mana cost', 'stats', 'attack', 'hp', 'keyword', 'shatter', 'rebirth', 'overload', 'soulbinding', 'tidecall'],
    sampleQuestions: [
      'What is the precise syntax format for a targeted removal spell with a condition?',
      'Should high-cost 8+ Essence units always possess immediate entry impact (Surge/Battlecry)?',
      'How are persistent passive auras phrased to differentiate from triggered buffs?'
    ]
  },
  {
    dimension: 'Meta',
    title: 'Archetype Balance & Spread',
    code: 'DIM-04',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    leadAgents: ['GLO-10', 'GLO-11', 'GLO-14'],
    focusDescription: 'Dominant curve speed, archetype matchup polarities (Aggro / Midrange / Control / Combo), counterplay availability, and splash ratios.',
    keyKeywords: ['meta', 'tier list', 'aggro', 'control', 'midrange', 'combo', 'matchup', 'win rate', 'dominant', 'counterplay'],
    sampleQuestions: [
      'Is Radiance Tempo outpacing Abyss Control before turn 5 consistently?',
      'What tech cards exist in each domain to break heavy lane fortifications?',
      'Does a 2-Domain splash penalty sufficiently restrain good-stuff midrange piles?'
    ]
  },
  {
    dimension: 'Player Experience',
    title: 'Cognitive Load & Feel',
    code: 'DIM-05',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    leadAgents: ['GLO-13', 'GLO-08', 'NUA-06'],
    focusDescription: 'Visual legibility, mental arithmetic burden, "feel-bad" blowout avoidance, tempo excitement, and game duration targets (8-14 mins).',
    keyKeywords: ['fun', 'feel', 'cognitive', 'clarity', 'board state', 'arithmetic', 'frustration', 'duration', 'excitement', 'beginner'],
    sampleQuestions: [
      'Does tracking 4 simultaneous trigger auras exceed acceptable mental memory limit?',
      'How does the player feel when a Hazard destroys their developed unit before it can act?',
      'Is the 3-lane battlefield readable at a glance without zooming in on small mobile screens?'
    ]
  },
  {
    dimension: 'Technical',
    title: 'Engine Determinism & Digital Sync',
    code: 'DIM-06',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    leadAgents: ['GLO-15', 'GLO-12', 'NUA-08'],
    focusDescription: 'Digital server-client state determinism, simultaneous event resolution, physical cardboard tabletop parity, and RNG seeding.',
    keyKeywords: ['engine', 'deterministic', 'client', 'server', 'sync', 'physical', 'digital', 'state machine', 'rng', 'seed'],
    sampleQuestions: [
      'Can the priority stack be serialized into JSON packets without race conditions?',
      'How are physical dice/counter mechanics translated to digital UI without losing tactile appeal?',
      'Does asynchronous timer lag create an unfair advantage during fast-reaction windows?'
    ]
  },
  {
    dimension: 'Canon',
    title: 'World Lore & Sigil Thematics',
    code: 'DIM-07',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    leadAgents: ['GLO-20', 'GLO-21', 'Domain Directors'],
    focusDescription: 'Nexus universe lore, elemental sigils, faction philosophical conflicts, artifact histories, and narrative coherence.',
    keyKeywords: ['lore', 'canon', 'story', 'solaris', 'abyss', 'ignis', 'aether', 'sanctuary', 'sigil', 'flavor text', 'narrative'],
    sampleQuestions: [
      'Would a Tempest Stormcaller ever use Abyss Void magic in canonical lore?',
      'What is the historical origin of the Hearthbreak Hammer in the Sunforged Citadel?',
      'How do the 5 Domains view the awakening of Ancient Nexus Hazards?'
    ]
  },
  {
    dimension: 'Production',
    title: 'Set Architecture & Delivery',
    code: 'DIM-08',
    badgeColor: 'bg-stone-500/20 text-stone-300 border-stone-500/40',
    leadAgents: ['GLO-18', 'GLO-19', 'GLO-22', 'GLO-23'],
    focusDescription: 'Set card counts (280 Base Set), rarity distributions, booster pack slotting, localization text length budgets, and asset rendering pipelines.',
    keyKeywords: ['production', 'rarity', 'booster', 'pack', 'set size', 'card count', 'budget', 'localization', 'vfx', 'print'],
    sampleQuestions: [
      'Does the card frame text box accommodate 4 lines of German translation text without shrinking font below 7pt?',
      'What is the exact common/uncommon/rare/mythic distribution per 14-card booster pack?',
      'What is the digital animation budget for Mythic Legendary Summon entrances?'
    ]
  }
];

export const PRESET_INQUIRIES: FullQuestionAnalysisResult[] = [
  {
    inquiryId: 'INQ-HAZARD-LATE-GAME',
    rawInput: 'Hazards should be way crazier in late game so matches do not drag on forever.',
    rootDesignProblem: 'Late-game stalemate and slow attrition when board states lock up. Hazards need a dynamic scaling mechanism without removing tactical agency or causing sudden unpreventable RNG deaths.',
    classifiedCategory: 'Global World-State & Game Pacing',
    primaryDimension: 'System',
    questionTree: [
      {
        dimension: 'Foundational',
        title: 'Game Length & Win Condition Axioms',
        coreQuestion: 'Does the game enforce a hard turn limit or does it accelerate naturally through escalating resource/hazard pressure?',
        subQuestions: [
          'What is the target match duration (turns vs minutes)? Current target: 8-12 rounds / 10 mins.',
          'Is sudden-death hazard damage acceptable if both players survived to Round 10?'
        ],
        keyConstraints: ['Nexus Core HP cannot be wiped in 1 turn by non-interactable environmental damage.'],
        assignedAgents: ['CMD-01', 'GLO-01'],
        priorityRank: 1
      },
      {
        dimension: 'System',
        title: 'Hazard Tiering & Escalation Mechanics',
        coreQuestion: 'How do Hazard state transitions scale across Round 1-3 (Tier 1), Round 4-7 (Tier 2), and Round 8+ (Tier 3)?',
        subQuestions: [
          'How many rounds in advance must a Tier 3 Cataclysm hazard telegraph its target lane?',
          'Do Tier 3 Hazards affect all 3 combat lanes or rotate dynamically?',
          'Can players interact with or redirect a Hazard using fast spells or structural units?'
        ],
        keyConstraints: ['Telegraph window must be strictly >= 1 full round.'],
        assignedAgents: ['GLO-06', 'GLO-03', 'GLO-05'],
        priorityRank: 2
      },
      {
        dimension: 'Player Experience',
        title: 'Agency & Psychological Frustration',
        coreQuestion: 'Does escalating hazard intensity feel like an exciting climactic event or arbitrary RNG punishment?',
        subQuestions: [
          'Are hazard effects symmetrical or directional?',
          'Can a losing player use the Hazard strategically as a comeback equalizer?'
        ],
        keyConstraints: ['Players must clearly see cause-and-effect; zero hidden hazard RNG.'],
        assignedAgents: ['GLO-08', 'GLO-13', 'NUA-06'],
        priorityRank: 3
      },
      {
        dimension: 'Card',
        title: 'Card & Domain Interactions',
        coreQuestion: 'Which domain cards gain advantage from active hazards (e.g. Tempest storm channeling vs Sanctuary warding)?',
        subQuestions: [
          'Are there cards that accelerate hazard ticks?',
          'Can Sanctuary shields block environmental hazard damage to units?'
        ],
        keyConstraints: ['No single domain should have a 100% immune pass to all hazards.'],
        assignedAgents: ['TEM-DIR', 'SAN-DIR', 'GLO-10'],
        priorityRank: 4
      }
    ],
    hiddenAssumptions: [
      {
        id: 'HA-01',
        statement: 'Assumption: Late-game stalls are primarily caused by insufficient board damage.',
        implicitPremise: 'The designer assumes players stall because units have too much HP or defensive shields, rather than high hand card advantage or lack of decisive win-cons.',
        riskLevel: 'High',
        rootFailureMode: 'If stalls are caused by card advantage, buffing hazards simply destroys all units equally, causing top-deck luck wars.',
        recommendedValidation: 'Check GLO-11 playtest logs: identify whether Round 9+ stalls are caused by board clutter or reactive passivity.'
      },
      {
        id: 'HA-02',
        statement: 'Assumption: Increasing hazard lethality will shorten games without angering players.',
        implicitPremise: 'Assumes players tolerate losing a game they were winning due to an environmental cataclysm.',
        riskLevel: 'Critical',
        rootFailureMode: 'High player churn if environmental deaths feel unfair or non-interactive.',
        recommendedValidation: 'Enforce strict 1-round telegraph visual warning and give both players 1 full turn to evacuate or brace.'
      },
      {
        id: 'HA-03',
        statement: 'Assumption: Both players have equal opportunity to adapt to late-game hazards.',
        implicitPremise: 'Assumes fast aggro decks and slow control decks have equal positional agility in lane movement.',
        riskLevel: 'Medium',
        rootFailureMode: 'Slow faction units (Sanctuary / Abyss) get disproportionately wiped because of low mobility.',
        recommendedValidation: 'Allow Sanctuary barriers and Abyss death-harvesting to mitigate hazard wipe penalties.'
      }
    ],
    dependencyChain: [
      {
        id: 'DEP-01',
        name: 'Core Match Duration & Round Limits',
        level: 0,
        levelName: 'Level 0: Fundamental Axioms',
        description: 'Define target round threshold for late game transition (Round 7+).',
        prerequisites: [],
        affectedDownstream: ['DEP-02', 'DEP-03'],
        ownerAgent: 'GLO-01',
        status: 'LOCKED'
      },
      {
        id: 'DEP-02',
        name: 'Hazard Lifecycle & Telegraph Protocol',
        level: 1,
        levelName: 'Level 1: Global Systems',
        description: 'Codify telegraph state (Phase 1) -> Impact state (Phase 2) -> Lingering state (Phase 3).',
        prerequisites: ['DEP-01'],
        affectedDownstream: ['DEP-03', 'DEP-04'],
        ownerAgent: 'GLO-06',
        status: 'APPROVED'
      },
      {
        id: 'DEP-03',
        name: 'Lane Evacuation & Priority Timing',
        level: 2,
        levelName: 'Level 2: Subsystem Rules',
        description: 'Determine when during turn start/end hazard ticks resolve on the Priority Stack.',
        prerequisites: ['DEP-02'],
        affectedDownstream: ['DEP-04'],
        ownerAgent: 'GLO-03',
        status: 'IN_REVIEW'
      },
      {
        id: 'DEP-04',
        name: 'Card Environmental Synergy & Modifiers',
        level: 3,
        levelName: 'Level 3: Card Mechanics',
        description: 'Design specific domain cards that interact with active hazards.',
        prerequisites: ['DEP-03'],
        affectedDownstream: [],
        ownerAgent: 'GLO-16',
        status: 'PENDING'
      }
    ],
    solvingOrder: [
      '1. Lock Target Match Duration (Round 8-12) with GLO-01',
      '2. Specify Tier 3 Hazard rules & 1-Round Telegraph Law with GLO-06',
      '3. Codify Hazard stack resolution timing in Rules Bible Section 504 with GLO-02 & GLO-03',
      '4. Run Red-Team exploit checks on hazard stalling with GLO-14',
      '5. Validate Player Experience & mobile visual clarity with GLO-13 & GLO-08'
    ],
    targetAgents: ['CMD-01', 'CMD-02', 'GLO-06', 'GLO-01', 'GLO-03', 'GLO-02', 'GLO-13', 'GLO-14', 'NUA-06'],
    estimatedEscalation: 'E2'
  },
  {
    inquiryId: 'INQ-MANA-RAMP-TEMPO',
    rawInput: 'Verdance should have cheap 1-mana ramp spells that give permanent extra Essence every single turn.',
    rootDesignProblem: 'Resource acceleration in a fixed-turn TCG. Early permanent ramp can break the fundamental mana curve math and allow high-cost threats to land 3 turns before defensive answers exist.',
    classifiedCategory: 'Resource Economy & Curve Integrity',
    primaryDimension: 'System',
    questionTree: [
      {
        dimension: 'Foundational',
        title: 'Essence Generation Baseline',
        coreQuestion: 'Is the 1 Essence per turn baseline linear growth a hard axiom or an elastic parameter?',
        subQuestions: [
          'What is the standard maximum Essence cap (10 Essence)?',
          'Does permanent ramp violate the turn-based counterplay window of 4-to-6 cost sweepers?'
        ],
        keyConstraints: ['No player may reach 6 Essence before Round 4 without severe tempo/card disadvantage.'],
        assignedAgents: ['GLO-04', 'GLO-01'],
        priorityRank: 1
      },
      {
        dimension: 'System',
        title: 'Temporary Surge vs Permanent Ramp',
        coreQuestion: 'Should Verdance ramp be structured as temporary "Surge Essence" (usable only this round) or permanent land-like growth?',
        subQuestions: [
          'What is the card advantage cost of ramp (spending 1 card for mana)?',
          'Does Verdance have sufficient high-cost payoffs to justify ramp without becoming dominant?'
        ],
        keyConstraints: ['Permanent ramp must require board investment (e.g. Grove unit with low stats that can be removed).'],
        assignedAgents: ['GLO-04', 'VER-DIR', 'GLO-10'],
        priorityRank: 2
      },
      {
        dimension: 'Meta',
        title: 'Matchup Polarization',
        coreQuestion: 'Does Verdance ramp create a binary matchup where opponent either plays hyper-aggro or loses automatically?',
        subQuestions: [
          'How do Control domains (Abyss/Sanctuary) punish a Verdance player who spends turn 1-2 ramping?',
          'Is the win rate when casting Turn 1 Ramp > 62% in simulation?'
        ],
        keyConstraints: ['Turn 1 ramp win-rate delta cannot exceed +6% over baseline.'],
        assignedAgents: ['GLO-10', 'GLO-11', 'GLO-14'],
        priorityRank: 3
      }
    ],
    hiddenAssumptions: [
      {
        id: 'HA-04',
        statement: 'Assumption: Ramp is the only way to express the Verdance "growth" fantasy.',
        implicitPremise: 'Assumes Verdance identity requires copying classic MTG Green Land Ramp rather than organic growth (e.g. Spore growth, unit evolution, stat scaling over rounds).',
        riskLevel: 'High',
        rootFailureMode: 'Homogenizes Nexus resource system and causes massive balancing nightmares across the entire 280-card set.',
        recommendedValidation: 'Explore Verdance "Wild Growth" counters on existing units rather than un-interactive permanent Essence pool expansion.'
      },
      {
        id: 'HA-05',
        statement: 'Assumption: Opponents have answers to 6-cost units on Round 3.',
        implicitPremise: 'Assumes cheap removal exists in all domains that can handle an accelerated Tier-4 threat.',
        riskLevel: 'Critical',
        rootFailureMode: 'Games end on Round 3 non-interactively if the ramp player drops an unbeatable colossal beast.',
        recommendedValidation: 'Simulate Round 3 Colossus vs average Round 3 defensive hand across all 5 domains.'
      }
    ],
    dependencyChain: [
      {
        id: 'DEP-10',
        name: 'Universal Essence Growth Formula',
        level: 0,
        levelName: 'Level 0: Fundamental Axioms',
        description: 'Establish standard turn-to-essence baseline (Turn N = N Essence, max 10).',
        prerequisites: [],
        affectedDownstream: ['DEP-11'],
        ownerAgent: 'GLO-04',
        status: 'LOCKED'
      },
      {
        id: 'DEP-11',
        name: 'Ramp Mechanics Taxonomy (Surge vs Spore vs Permanent)',
        level: 1,
        levelName: 'Level 1: Global Systems',
        description: 'Define allowed acceleration mechanisms and their strict tempo penalties.',
        prerequisites: ['DEP-10'],
        affectedDownstream: ['DEP-12'],
        ownerAgent: 'GLO-04',
        status: 'APPROVED'
      },
      {
        id: 'DEP-12',
        name: 'Verdance Growth Archetype Cards',
        level: 2,
        levelName: 'Level 2: Subsystem Rules',
        description: 'Design interactive Grove units (e.g. Sylvan Tender: 1/2 for 2 Essence, generates +1 Surge Essence while alive).',
        prerequisites: ['DEP-11'],
        affectedDownstream: [],
        ownerAgent: 'VER-DIR',
        status: 'IN_REVIEW'
      }
    ],
    solvingOrder: [
      '1. Review Essence Baseline Rule 301 with GLO-04',
      '2. Reject pure 1-mana non-interactive permanent ramp spell due to N4 Curve Breakage',
      '3. Re-route to Interactive Unit-Based Ramp (Sylvan Tender, 2-Cost 1/2) with VER-DIR',
      '4. Validate with GLO-10 & GLO-14 Red-Team simulation'
    ],
    targetAgents: ['CMD-01', 'CMD-02', 'GLO-04', 'VER-DIR', 'GLO-10', 'GLO-14', 'NUA-01'],
    estimatedEscalation: 'E3'
  },
  {
    inquiryId: 'INQ-REACTION-WINDOWS',
    rawInput: 'Can players interrupt opponent card plays with counterspells at any time like Instant speed?',
    rootDesignProblem: 'Game pace vs tactical disruption. Infinite reaction windows cause cognitive paralysis and online digital UI stalling; zero reaction windows leads to solitaire gameplay.',
    classifiedCategory: 'Priority Timing & Stack Architecture',
    primaryDimension: 'System',
    questionTree: [
      {
        dimension: 'Foundational',
        title: 'Priority & Turn Ownership',
        coreQuestion: 'Does the active player retain primary priority until an action is committed to the stack?',
        subQuestions: [
          'Can the non-active player act during the active player’s empty main phase?',
          'What triggers open a Fast Reaction Window for the defender?'
        ],
        keyConstraints: ['Defenders may only react when an action is placed on stack or combat is initiated.'],
        assignedAgents: ['GLO-03', 'GLO-02'],
        priorityRank: 1
      },
      {
        dimension: 'Technical',
        title: 'Digital Timer & Network Sync',
        coreQuestion: 'How does the digital client handle priority passing without prompting on every single card play?',
        subQuestions: [
          'What is the reaction timer window (e.g. 5-second automatic pass if no reaction cards in hand)?',
          'Does auto-passing reveal private hand information (tells)?'
        ],
        keyConstraints: ['Client must support smart auto-pass while offering manual priority hold.'],
        assignedAgents: ['GLO-15', 'GLO-12'],
        priorityRank: 2
      },
      {
        dimension: 'Player Experience',
        title: 'Counterplay Satisfaction vs Frustration',
        coreQuestion: 'Are counterspells fun when they completely negate expensive 7-cost turns for 2 mana?',
        subQuestions: [
          'Should counterspells be universal "Hard Counters" or domain-specific "Tax / Delay / Soft Counters"?',
          'How does Tempest differ from Sanctuary in defensive disruption?'
        ],
        keyConstraints: ['Hard counters must have narrow targeting or steep Essence costs (>= 3 Essence).'],
        assignedAgents: ['GLO-08', 'GLO-10', 'NUA-03'],
        priorityRank: 3
      }
    ],
    hiddenAssumptions: [
      {
        id: 'HA-06',
        statement: 'Assumption: High interruption frequency equals high strategic skill.',
        implicitPremise: 'Assumes players enjoy constant back-and-forth micro-interactions on every step of a turn.',
        riskLevel: 'High',
        rootFailureMode: 'Matches double in duration and digital players get exhausted by constant "Do you want to respond?" popups.',
        recommendedValidation: 'Benchmark digital UX with GLO-15: limit reaction windows strictly to: 1. Spell on Stack, 2. Combat Declare, 3. Round End.'
      }
    ],
    dependencyChain: [
      {
        id: 'DEP-20',
        name: 'The 3 Canonical Priority Windows',
        level: 0,
        levelName: 'Level 0: Fundamental Axioms',
        description: 'Define the exact 3 moments non-active players receive priority.',
        prerequisites: [],
        affectedDownstream: ['DEP-21'],
        ownerAgent: 'GLO-03',
        status: 'LOCKED'
      },
      {
        id: 'DEP-21',
        name: 'LIFO Stack Execution Engine',
        level: 1,
        levelName: 'Level 1: Global Systems',
        description: 'Codify Last-In First-Out resolution rules and APNAP trigger ordering.',
        prerequisites: ['DEP-20'],
        affectedDownstream: ['DEP-22'],
        ownerAgent: 'GLO-02',
        status: 'APPROVED'
      },
      {
        id: 'DEP-22',
        name: 'Fast Action & Counterplay Spell Design',
        level: 2,
        levelName: 'Level 2: Subsystem Rules',
        description: 'Specify cost curves for Fast Actions across Tempest and Sanctuary.',
        prerequisites: ['DEP-21'],
        affectedDownstream: [],
        ownerAgent: 'TEM-DIR',
        status: 'IN_REVIEW'
      }
    ],
    solvingOrder: [
      '1. Codify Rules Bible Section 400 (Priority Windows) with GLO-03',
      '2. Specify Smart Priority Passing algorithm with GLO-15 to protect hand privacy',
      '3. Balance Counterspell cost baseline (Minimum 3 Essence for universal counter) with GLO-10'
    ],
    targetAgents: ['CMD-01', 'CMD-02', 'GLO-03', 'GLO-02', 'GLO-15', 'GLO-10', 'GLO-08', 'NUA-03'],
    estimatedEscalation: 'E2'
  }
];

// ================= DYNAMIC QUESTION TREE ENGINE =================

export function analyzeDesignInquiry(rawInput: string): FullQuestionAnalysisResult {
  const lower = rawInput.toLowerCase();
  
  // 1. Determine Primary Dimension based on keyword clustering
  let primaryDimension: QuestionDimension = 'Card';
  let highestScore = 0;

  for (const dim of QUESTION_DIMENSIONS) {
    let score = 0;
    for (const kw of dim.keyKeywords) {
      if (lower.includes(kw)) score += 2;
    }
    if (score > highestScore) {
      highestScore = score;
      primaryDimension = dim.dimension;
    }
  }

  // Fallback heuristic if no keyword matched
  if (highestScore === 0) {
    if (lower.includes('rule') || lower.includes('win') || lower.includes('axiom')) primaryDimension = 'Foundational';
    else if (lower.includes('turn') || lower.includes('stack') || lower.includes('mana') || lower.includes('hazard')) primaryDimension = 'System';
    else if (lower.includes('meta') || lower.includes('strong') || lower.includes('tier')) primaryDimension = 'Meta';
    else if (lower.includes('fun') || lower.includes('feel') || lower.includes('confusing')) primaryDimension = 'Player Experience';
    else if (lower.includes('code') || lower.includes('sync') || lower.includes('digital')) primaryDimension = 'Technical';
    else if (lower.includes('lore') || lower.includes('story') || lower.includes('world')) primaryDimension = 'Canon';
    else primaryDimension = 'Card';
  }

  // 2. Extract Root Design Problem
  let rootDesignProblem = `Clarifying scope, authority boundaries, and downstream rules impact for: "${rawInput}".`;
  if (lower.includes('hazard')) {
    rootDesignProblem = 'Environmental world-state scaling without causing unpreventable board wipe RNG or removing player combat agency.';
  } else if (lower.includes('ramp') || lower.includes('essence') || lower.includes('mana')) {
    rootDesignProblem = 'Resource curve elasticity: balancing early mana acceleration against universal counterplay and high-cost threat timing.';
  } else if (lower.includes('counter') || lower.includes('interrupt') || lower.includes('speed') || lower.includes('priority')) {
    rootDesignProblem = 'Interactive priority flow: providing tactical fast-reactions without creating digital UI fatigue or infinite turn stalling.';
  } else if (lower.includes('loop') || lower.includes('infinite') || lower.includes('rebirth') || lower.includes('death')) {
    rootDesignProblem = 'Exploit containment: establishing deterministic replacement effects vs trigger loops on state transitions.';
  } else if (lower.includes('damage') || lower.includes('hp') || lower.includes('attack')) {
    rootDesignProblem = 'Combat arithmetic and time-to-kill pacing across the 3 battlefield combat lanes.';
  }

  // 3. Hidden Assumption Scraper
  const hiddenAssumptions: HiddenAssumption[] = [];
  
  if (lower.includes('kill') || lower.includes('destroy') || lower.includes('damage')) {
    hiddenAssumptions.push({
      id: `HA-${Date.now()}-1`,
      statement: 'Assumption: Direct damage is the primary answer to problematic board states.',
      implicitPremise: 'Assumes board interaction must be destructive rather than positional, taxing, or disabling.',
      riskLevel: 'Medium',
      rootFailureMode: 'Leads to pure removal-heavy meta where units never survive to attack.',
      recommendedValidation: 'Audit alternative interaction levers: Stun, Exiled to Void, Reposition to adjacent lane, Essence Tax.'
    });
  }

  if (lower.includes('draw') || lower.includes('card') || lower.includes('deck')) {
    hiddenAssumptions.push({
      id: `HA-${Date.now()}-2`,
      statement: 'Assumption: Card velocity can scale without breaking deck consistency thresholds.',
      implicitPremise: 'Assumes decks with heavy card draw won\'t consistently find 100% of their combo pieces by Turn 4.',
      riskLevel: 'High',
      rootFailureMode: 'Combo decks dominate by hyper-cycling 40-card decks in 4 turns.',
      recommendedValidation: 'Enforce hand size cap (7 cards) and limit repeatable draw engines to 1 card per round.'
    });
  }

  hiddenAssumptions.push({
    id: `HA-${Date.now()}-3`,
    statement: 'Assumption: The proposed change operates within existing turn phase structures.',
    implicitPremise: 'Assumes no new sub-phase or special priority window needs to be invented.',
    riskLevel: 'Medium',
    rootFailureMode: 'If a new phase is required, all 280 existing cards must be re-audited for phase triggers.',
    recommendedValidation: 'Verify fit within the 5 Canonical Turn Phases defined in Rules Bible Section 200.'
  });

  // 4. Multi-Dimension Question Tree Construction
  const questionTree: QuestionTreeDecomposition[] = [
    {
      dimension: 'Foundational',
      title: 'Axiomatic & Core Law Alignment',
      coreQuestion: `Does this change conflict with the immutable win/loss axioms or the 3-lane battlefield geometry?`,
      subQuestions: [
        'Does it bypass Nexus Core HP protection?',
        'Does it violate turn order or action limits?'
      ],
      keyConstraints: ['Cannot create infinite loops or unpreventable Turn 1-3 lethals.'],
      assignedAgents: ['CMD-01', 'GLO-01'],
      priorityRank: 1
    },
    {
      dimension: primaryDimension,
      title: `${primaryDimension} Core Architecture Investigation`,
      coreQuestion: `What is the exact mechanical specification required to implement: "${rawInput}"?`,
      subQuestions: [
        'What are the state preconditions and cost requirements?',
        'How does this interact with standard priority timing (LIFO Stack)?'
      ],
      keyConstraints: ['Must use formal Rules Bible grammar (Rule 101.2).'],
      assignedAgents: ['CMD-02', 'GLO-02', 'GLO-03'],
      priorityRank: 2
    },
    {
      dimension: 'Player Experience',
      title: 'Cognitive & Feel Audit',
      coreQuestion: 'How does the player visually comprehend and interact with this change on a mobile screen?',
      subQuestions: [
        'Is the effect clear without consulting an external rulebook?',
        'Does it create a satisfying high moment or a frustrating lockout?'
      ],
      keyConstraints: ['Text must fit within 4 lines on standard card frame.'],
      assignedAgents: ['GLO-13', 'GLO-08', 'NUA-06'],
      priorityRank: 3
    }
  ];

  // 5. Dependency Chain & Prioritization
  const dependencyChain: DependencyNode[] = [
    {
      id: 'DEP-NODE-0',
      name: 'Foundational Rulebook Validation',
      level: 0,
      levelName: 'Level 0: Fundamental Axioms',
      description: 'Confirm no violation of Core Game Constants (30 HP, 40 Cards, 3 Lanes).',
      prerequisites: [],
      affectedDownstream: ['DEP-NODE-1'],
      ownerAgent: 'GLO-01',
      status: 'APPROVED'
    },
    {
      id: 'DEP-NODE-1',
      name: 'Systemic Timing & Priority Stack Integration',
      level: 1,
      levelName: 'Level 1: Global Systems',
      description: 'Map resolution onto the LIFO stack and check state-based actions.',
      prerequisites: ['DEP-NODE-0'],
      affectedDownstream: ['DEP-NODE-2'],
      ownerAgent: 'GLO-03',
      status: 'IN_REVIEW'
    },
    {
      id: 'DEP-NODE-2',
      name: 'Formal Syntax Codification',
      level: 2,
      levelName: 'Level 2: Subsystem Rules',
      description: 'Format trigger, cost, target, and effect into standardized grammar.',
      prerequisites: ['DEP-NODE-1'],
      affectedDownstream: ['DEP-NODE-3'],
      ownerAgent: 'GLO-02',
      status: 'PENDING'
    },
    {
      id: 'DEP-NODE-3',
      name: 'Red-Team Exploit & Nuance Audit',
      level: 3,
      levelName: 'Level 3: Edge Case & Balance',
      description: 'Test for infinite loops, timing deadlocks, and cross-domain exploits.',
      prerequisites: ['DEP-NODE-2'],
      affectedDownstream: [],
      ownerAgent: 'GLO-14',
      status: 'PENDING'
    }
  ];

  const solvingOrder = [
    `1. Scrape Hidden Assumptions with CMD-02 to isolate root design intent`,
    `2. Check Level 0 Foundational Axioms with GLO-01 & GLO-02`,
    `3. Codify Timing & Priority windows with GLO-03`,
    `4. Route to Domain Specialist or Global Architect (${primaryDimension})`,
    `5. Run Red-Team (GLO-14) & Nuance (NUA-01..08) verification checks`,
    `6. Issue CMD-01 Consolidated Decision Brief for human approval`
  ];

  const targetAgents = ['CMD-01', 'CMD-02', 'GLO-01', 'GLO-02', 'GLO-03', 'GLO-14', 'NUA-02', 'GLO-13'];

  return {
    inquiryId: `INQ-${Date.now().toString(36).toUpperCase()}`,
    rawInput,
    rootDesignProblem,
    classifiedCategory: `${primaryDimension} Layer Investigation`,
    primaryDimension,
    questionTree,
    hiddenAssumptions,
    dependencyChain,
    solvingOrder,
    targetAgents,
    estimatedEscalation: hiddenAssumptions.some(a => a.riskLevel === 'Critical') ? 'E3' : 'E1'
  };
}

import { FoundationalCouncilAgentSpec } from '../types';

export const FOUNDATIONAL_COUNCIL_AGENTS: FoundationalCouncilAgentSpec[] = [
  {
    agentId: 'GLO-01',
    name: 'Game Systems Architect',
    subtitle: 'Core Turn Loop, Constants & Global Win Conditions',
    role: 'Defines the non-negotiable structural skeleton of Nexus: turn phases, round progression, action economy, core game constants, and win/loss evaluations.',
    status: 'Stage B Active',
    coreAxioms: [
      'Nexus Core Health is locked at 30 HP per player. 0 HP causes instant loss via State-Based Action.',
      'Deck minimum is exactly 40 cards. Maximum 3 copies per unique card ID.',
      'Battlefield is composed of exactly 3 distinct lanes: Left Flank, Center Vanguard, Right Flank.',
      'Turn structure follows 5 strict phases: 1. Wake & Draw, 2. Main 1, 3. Lane Combat, 4. Main 2, 5. End & Hazard Resolution.'
    ],
    rules: [
      {
        ruleNumber: '100.1',
        title: 'Starting Game State',
        formalText: 'Both players start with 30 Nexus Core HP, 0 starting Essence, and draw an opening hand of 4 cards. A 1-time full or partial mulligan is permitted.',
        precedenceLevel: 1
      },
      {
        ruleNumber: '100.2',
        title: 'Win, Loss, and Draw Conditions',
        formalText: 'A player loses immediately when: (a) Their Nexus Core HP reaches 0, (b) They are required to draw from an empty library, or (c) An authorized Alt-Win card effect resolves on an empty stack. If both players reach 0 HP in the same state-check, the active player loses first.',
        precedenceLevel: 1,
        edgeCaseNote: 'Simultaneous lethal damage in combat triggers active-player loss condition first.'
      },
      {
        ruleNumber: '100.3',
        title: 'Action Economy Limit',
        formalText: 'During Main Phases, the active player may perform any number of standard actions as long as required Essence costs are paid and lane capacity (max 2 units per lane) is respected.',
        precedenceLevel: 2
      }
    ],
    keyMetrics: [
      { label: 'Nexus Core HP', value: '30 HP', detail: 'Equalized starting baseline' },
      { label: 'Deck Size', value: '40 Cards', detail: '3x copy limit per unique card' },
      { label: 'Hand Size Limit', value: '7 Cards', detail: 'Discard to 7 during End Phase' },
      { label: 'Target Match Length', value: '8 - 12 Turns', detail: 'Average 10 minutes duration' }
    ]
  },
  {
    agentId: 'GLO-02',
    name: 'Rules Bible Architect',
    subtitle: 'Formal Rulebook Grammar & Precedence Hierarchy',
    role: 'Maintains the formal canonical Rules Bible, codifies universal keyword syntax, and adjudicates the Rule Precedence Hierarchy.',
    status: 'Stage B Active',
    coreAxioms: [
      'The Golden Rule of Nexus: Card text overrides general rules; specific card restrictions override permissive card text.',
      'All card ability clauses must follow the 4-part Grammar: [Trigger Condition] -> [Cost] -> [Target Legality] -> [Effect Resolution].',
      'Replacement Effects (using "Instead") intercept an event BEFORE it occurs, completely replacing the event rather than reacting to it.'
    ],
    rules: [
      {
        ruleNumber: '101.1',
        title: 'Hierarchy of Rule Precedence',
        formalText: 'Level 1: Golden Rule (Explicit card prohibition > Permissive card text) -> Level 2: Specific Keyword Definition -> Level 3: Rules Bible Chapter Law -> Level 4: Default Systemic Fallback.',
        precedenceLevel: 1
      },
      {
        ruleNumber: '101.2',
        title: 'Formal Grammar of Abilities',
        formalText: 'Triggered abilities MUST start with "When", "Whenever", or "At". Activated abilities MUST use the format: "[Cost] : [Effect]". Replacement effects MUST use the format: "If [Event] would happen, instead [Replacement]".',
        precedenceLevel: 1,
        edgeCaseNote: 'Cards missing formal colon (:) syntax are rejected by the compiler.'
      },
      {
        ruleNumber: '101.3',
        title: 'Targeting & Legality Verification',
        formalText: 'Targets must be declared when placing an ability on the Priority Stack. If all declared targets become illegal before resolution, the ability is countered by game state and fizzles without resolving.',
        precedenceLevel: 2
      }
    ],
    keyMetrics: [
      { label: 'Standard Keywords', value: '14 Codified', detail: 'Shatter, Rebirth, Overload, Soulbinding, Tidecall, etc.' },
      { label: 'Grammar Compliance', value: '100% Target', detail: 'Zero informal English in rules bible' },
      { label: 'Replacement Effect Safety', value: 'Enforced', detail: 'Prevents infinite death-trigger loops' }
    ]
  },
  {
    agentId: 'GLO-03',
    name: 'Priority Timing & Stack Architect',
    subtitle: 'LIFO Stack Engine, APNAP Order & Reaction Windows',
    role: 'Governs all timing windows, Fast-Action responses, Last-In First-Out (LIFO) stack resolution, and the continuous State-Based Actions (SBA) check loop.',
    status: 'Stage B Active',
    coreAxioms: [
      'The Priority Stack operates strictly on Last-In, First-Out (LIFO) resolution.',
      'Whenever the stack is empty and both players pass priority in succession, the game advances to the next step/phase.',
      'Triggers occurring simultaneously are placed on the stack in APNAP order: Active Player triggers first, then Non-Active Player triggers on top.',
      'State-Based Actions (checking lethal damage, 0 HP units, aura persistence) execute continuously before any player receives priority.'
    ],
    rules: [
      {
        ruleNumber: '400.1',
        title: 'Priority Windows',
        formalText: 'The active player receives priority at the start of each phase and after any spell/ability resolves. The non-active player receives priority only when: (1) An action is put on the stack, (2) Active player passes priority, or (3) Combat blockers/reactions are declared.',
        precedenceLevel: 1
      },
      {
        ruleNumber: '400.2',
        title: 'State-Based Actions Check Loop',
        formalText: 'Whenever a player would gain priority, the game checks: (a) Units with damage >= HP are destroyed, (b) Units with 0 HP are moved to the Boneyard, (c) Players with <= 0 HP lose. This check repeats in a loop until no new state changes occur, with no priority required.',
        precedenceLevel: 1,
        edgeCaseNote: 'SBAs do not use the stack and cannot be responded to.'
      },
      {
        ruleNumber: '400.3',
        title: 'Fast Reaction Restrictions',
        formalText: 'Spells with the "Fast" tag or Activated Abilities may be played whenever a player has priority, even during opponent turns or on top of pending stack items.',
        precedenceLevel: 2
      }
    ],
    keyMetrics: [
      { label: 'Stack Type', value: 'LIFO Deterministic', detail: 'Last-in first-out resolution' },
      { label: 'Trigger Order', value: 'APNAP Protocol', detail: 'Active player under non-active player' },
      { label: 'SBA Frequency', value: 'Continuous Loop', detail: 'Executes before every priority handoff' }
    ]
  },
  {
    agentId: 'GLO-04',
    name: 'Resource Curves & Momentum Architect',
    subtitle: 'Essence Curve Math, Momentum Thresholds & Surge Mechanics',
    role: 'Calculates and models the mana economy: linear turn-based Essence generation, maximum Essence caps, Momentum energy progression, and Surge triggers.',
    status: 'Stage B Active',
    coreAxioms: [
      'Universal Essence generation increases by +1 each round up to a hard cap of 10 Essence (Round 1 = 1, Round 2 = 2, ..., Round 10+ = 10).',
      'Unused Essence dissipates at the end of each round; unspent Essence does not carry over unless stored by a specific Reservoir card.',
      'Momentum is an auxiliary resource gained through aggressive lane pressure (+1 per unblocked attack). At thresholds 10/20/30, Domain Ultimates unlock.'
    ],
    rules: [
      {
        ruleNumber: '300.1',
        title: 'Essence Refresh & Progression',
        formalText: 'At the start of the Wake Phase, a player un-exhausts all Essence gems, gains +1 maximum Essence gem (up to 10), and fills their active pool to maximum.',
        precedenceLevel: 1
      },
      {
        ruleNumber: '300.2',
        title: 'Surge & Temporary Essence',
        formalText: 'Effects that grant "Surge Essence" add temporary mana to the current turn pool only. Surge Essence does not increase the permanent maximum Essence gem count and expires at the End Phase.',
        precedenceLevel: 2,
        edgeCaseNote: 'Permanent ramp is strictly restricted to interactive board permanents.'
      },
      {
        ruleNumber: '300.3',
        title: 'Momentum Accumulation and Overload',
        formalText: 'Whenever a player deals unblocked combat damage to the enemy Nexus Core in a lane, they gain 1 Momentum. If a player exceeds 30 Momentum, they enter Overload, unlocking powerful Sigil Arts but taking 1 self-damage per round.',
        precedenceLevel: 2
      }
    ],
    keyMetrics: [
      { label: 'Max Permanent Essence', value: '10 Gems', detail: 'Hard cap reached on Round 10' },
      { label: 'Average Card Cost', value: '3.4 Essence', detail: 'Healthy bell curve centered on 3-4' },
      { label: 'Momentum Milestones', value: '10 / 20 / 30', detail: 'Unlocks Tier 1-3 Domain Ultimates' }
    ]
  },
  {
    agentId: 'GLO-05',
    name: 'Spatial Lanes & Battlefield Architect',
    subtitle: '3-Lane Layout, Positioning Rules & Flanking Dynamics',
    role: 'Manages the physical and digital spatial layout: 3 combat lanes (Left, Center, Right), lane occupancy limits (max 2 units/lane), line-of-sight targeting, and flank charges.',
    status: 'Stage B Active',
    coreAxioms: [
      'The battlefield consists of exactly 3 lanes: Left Flank, Center Vanguard, and Right Flank.',
      'Each player may place up to 2 units per lane (maximum 6 units on board per player).',
      'Units in a lane must attack the opposing enemy units in the same lane first. If no enemy units occupy the lane, the attack strikes the enemy Nexus Core directly (Unblocked Breach).',
      'Flanking abilities allow units to attack diagonally to adjacent lanes if their direct lane is empty.'
    ],
    rules: [
      {
        ruleNumber: '500.1',
        title: 'Lane Occupancy & Positioning',
        formalText: 'Units must be summoned directly into a chosen lane. Once placed, a unit cannot change lanes unless moved by an explicit "Reposition" or "Charge" ability.',
        precedenceLevel: 1
      },
      {
        ruleNumber: '500.2',
        title: 'Combat Resolution by Lane',
        formalText: 'Combat resolves sequentially from Left Lane -> Center Lane -> Right Lane. In each lane, attacking units deal damage to opposing defending units simultaneously. Surplus damage does not trample to the Nexus Core unless the unit has "Overrun" or "Shatter".',
        precedenceLevel: 1,
        edgeCaseNote: 'Simultaneous mutual combat destruction removes both units in the same SBA step.'
      },
      {
        ruleNumber: '500.3',
        title: 'Adjacency & Center Vanguard Bonus',
        formalText: 'The Center Vanguard lane is adjacent to both Left and Right Flanks. Left and Right Flanks are NOT adjacent to each other. Aura effects with "Adjacent Lanes" affect neighboring lanes accordingly.',
        precedenceLevel: 2
      }
    ],
    keyMetrics: [
      { label: 'Total Combat Lanes', value: '3 Lanes', detail: 'Left Flank, Center, Right Flank' },
      { label: 'Max Units Per Lane', value: '2 Units', detail: 'Max 6 total units per board side' },
      { label: 'Combat Sequence', value: 'Left -> Center -> Right', detail: 'Deterministic lane resolution order' }
    ]
  },
  {
    agentId: 'GLO-06',
    name: 'Living Hazards & World-State Architect',
    subtitle: 'Hazard Lifecycle Engine, Tier Scaling & Dynamic Modifiers',
    role: 'Controls the environmental world-state system: dynamic weather, living hazard spawns, telegraphing warnings, symmetric battlefield hazards, and round-based cataclysms.',
    status: 'Stage B Active',
    coreAxioms: [
      'Hazards are neutral environmental forces that affect both players based on clear spatial rules.',
      'All Tier 2 and Tier 3 Hazards MUST display a visual Telegraph Warning 1 full round before detonating.',
      'Hazard damage can never deal direct lethal damage to a Nexus Core above 5 HP in a single round without 2 rounds of warning.',
      'Hazard lifecycle progresses strictly: 1. Telegraph -> 2. Strike / Trigger -> 3. Lingering Hazard Terrain -> 4. Dissipation.'
    ],
    rules: [
      {
        ruleNumber: '600.1',
        title: 'Hazard Tiers and Escalation',
        formalText: 'Rounds 1-3: Tier 1 Minor Hazards (e.g. Fog: -1 Range, Brambles: 1 damage on entry). Rounds 4-7: Tier 2 Elemental Surges (e.g. Volcanic Geyser: 3 damage to lane). Rounds 8+: Tier 3 Nexus Cataclysms (e.g. Solar Flare: lane wipe with 1 round telegraph).',
        precedenceLevel: 1
      },
      {
        ruleNumber: '600.2',
        title: 'The Telegraph Law',
        formalText: 'A Tier 2 or Tier 3 Hazard must display its target lane and detonation round at the start of the preceding round. Players have an entire turn of priority to reposition units, cast defensive barriers, or attack aggressively.',
        precedenceLevel: 1,
        edgeCaseNote: 'Hidden instant hazard board wipes are strictly illegal under Rule 600.2.'
      },
      {
        ruleNumber: '600.3',
        title: 'Hazard Stack Resolution',
        formalText: 'At the end of the End Phase, active hazard triggers are placed onto the Priority Stack before the round closes. Players receive a final fast-action reaction window before hazard damage applies.',
        precedenceLevel: 2
      }
    ],
    keyMetrics: [
      { label: 'Hazard Tiers', value: 'Tier 1 / 2 / 3', detail: 'Scales with match progression rounds' },
      { label: 'Telegraph Advance', value: '1 Full Round', detail: 'Strictly zero untelegraphed wipe RNG' },
      { label: 'Resolution Window', value: 'End Phase Stack', detail: 'Allows fast-action defensive counterplay' }
    ]
  }
];

export interface TurnPhaseSimulatorState {
  currentPhase: number;
  player1Essence: number;
  player1MaxEssence: number;
  player1CoreHp: number;
  player1HandCount: number;
  player2Essence: number;
  player2MaxEssence: number;
  player2CoreHp: number;
  player2HandCount: number;
  roundNumber: number;
  activeLane: 'Left' | 'Center' | 'Right';
  hazardActive: boolean;
  hazardTelegraph: string;
  combatLog: string[];
}

export const INITIAL_SIMULATOR_STATE: TurnPhaseSimulatorState = {
  currentPhase: 1,
  player1Essence: 3,
  player1MaxEssence: 3,
  player1CoreHp: 30,
  player1HandCount: 5,
  player2Essence: 3,
  player2MaxEssence: 3,
  player2CoreHp: 30,
  player2HandCount: 5,
  roundNumber: 3,
  activeLane: 'Center',
  hazardActive: true,
  hazardTelegraph: 'Tier 2 Volcanic Geyser targeting Center Vanguard (Detonates in Round 4)',
  combatLog: [
    'Round 3 Initiated. Wake & Draw complete.',
    'Essence pools refreshed to 3/3.',
    'GLO-06 Hazard Engine: Tier 2 Volcanic Geyser telegraphed for Center Lane next round.'
  ]
};

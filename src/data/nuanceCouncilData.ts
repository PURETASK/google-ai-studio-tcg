// Stage D: The 8-Specialist Nuance Council (NUA-01 through NUA-08)
// Authoritative Data & Nuance Auditing Model

export interface NuanceSpecialistProfile {
  id: string;
  code: string;
  name: string;
  mandate: string;
  perspective: string;
  keyQuestions: string[];
  blockTrigger: string;
}

export interface NuanceLevelSpec {
  level: string;
  name: string;
  impact: string;
  canBlockLock: boolean;
  requiredAction: string;
  colorHex: string;
}

export interface EscalationLevelSpec {
  level: string;
  name: string;
  authority: string;
  resolutionMechanism: string;
  examples: string;
}

export interface NuanceAuditReport {
  id: string;
  cardName: string;
  mechanicProposal: string;
  specialistEvaluations: {
    specialistCode: string;
    specialistName: string;
    score: 'N0' | 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
    finding: string;
    recommendation: string;
  }[];
  aggregateSeverity: 'N1_MINOR' | 'N2_MEANINGFUL' | 'N3_MAJOR' | 'N4_CRITICAL' | 'N5_SYSTEMIC';
  escalationLevelRequired: 'E0' | 'E1' | 'E2' | 'E3' | 'E4' | 'E5';
  decision: 'APPROVED_WITH_MODS' | 'BLOCKED_N4_TILT' | 'RESOLVED_LOCKED';
}

export const NUANCE_SPECIALISTS: NuanceSpecialistProfile[] = [
  {
    id: 'nua-01',
    code: 'NUA-01',
    name: 'Contextual Intent Specialist',
    mandate: 'Evaluates whether a card mechanics proposal genuinely fulfills the thematic and strategic fantasy intended by the designer or domain director.',
    perspective: 'Player Fantasy & Design Alignment',
    keyQuestions: [
      'Does playing this card make the player feel like a master of its respective domain?',
      'Does the card create anti-synergy with its own domain signature identity?'
    ],
    blockTrigger: 'Card completely violates domain fantasy (e.g. Verdant playing like a hyper-control discard deck).'
  },
  {
    id: 'nua-02',
    code: 'NUA-02',
    name: 'Linguistic Ambiguity & Parsing Specialist',
    mandate: 'Audits card syntax against natural language misinterpretations, translation drift, comma splices, and ambiguous target pronouns.',
    perspective: 'Clarity, Syntax & Cognitive Load',
    keyQuestions: [
      'Can a new player misinterpret who decides the target of this trigger?',
      'Does the word "then" imply a mandatory causal prerequisite or independent sequential effect?'
    ],
    blockTrigger: 'Unresolvable syntactic ambiguity where two distinct legal actions could both be valid interpretations of the raw text.'
  },
  {
    id: 'nua-03',
    code: 'NUA-03',
    name: 'Player Psychology & Tilt / Frustration Specialist',
    mandate: 'Measures negative emotional valence, griefing potential, non-interactive lockout tilt, and excessive RNG rage.',
    perspective: 'Emotional Impact & Tilt Index',
    keyQuestions: [
      'Does losing to this card feel like a tactical outplay or an arbitrary punishment?',
      'Does this card force the opponent to sit idly without agency for multiple consecutive turns?'
    ],
    blockTrigger: 'Tilt score >= 8.5/10 (e.g. repeated turn-skipping, blind hand discard, or 50% coin-flip game winners).'
  },
  {
    id: 'nua-04',
    code: 'NUA-04',
    name: 'Future Design Space Trap Specialist',
    mandate: 'Identifies narrow mechanics that inadvertently restrict future set designs or force all future cards of a type to be underpowered.',
    perspective: 'Long-Term Set Scalability',
    keyQuestions: [
      'If we print this 0-cost spell tutor, can we ever print a powerful 0-cost spell again in Set 2 or 3?',
      'Does this universal cost-reduction effect break future high-cost units?'
    ],
    blockTrigger: 'Creates a permanent design tax where an entire category of future cards must be restricted.'
  },
  {
    id: 'nua-05',
    code: 'NUA-05',
    name: 'Tactile & Digital Feel Specialist',
    mandate: 'Evaluates the kinetic enjoyment of dragging, targeting, visual VFX feedback, and screen pacing in the digital client.',
    perspective: 'Digital Ergonomics & Sensory Feedback',
    keyQuestions: [
      'How many clicks/taps does this card require to resolve?',
      'Does resolving this card create awkward pause delays or visual clutter?'
    ],
    blockTrigger: 'Requires more than 4 manual micro-target clicks in a single turn.'
  },
  {
    id: 'nua-06',
    code: 'NUA-06',
    name: 'Physical Print Readability Specialist',
    mandate: 'Ensures font sizes never drop below 7.5pt on standard 63x88mm card stock, and token states do not require complex external book-keeping.',
    perspective: 'Physical Tabletop Ergonomics',
    keyQuestions: [
      'Does the card text fit within standard font limits without micro-scaling?',
      'Can players track this continuous effect on physical paper without 6 dice?'
    ],
    blockTrigger: 'Exceeds 4 lines of rules text or requires tracking more than 3 distinct non-standard counters.'
  },
  {
    id: 'nua-07',
    code: 'NUA-07',
    name: 'Aesthetic & Tonal Resonance Specialist',
    mandate: 'Ensures card flavor text, frame ornaments, soundscape cues, and naming conventions fit the sacred cosmic mythos of Nexus.',
    perspective: 'Narrative & Worldbuilding Cohesion',
    keyQuestions: [
      'Does the card name fit canonical linguistic etymology for its domain?',
      'Does the card feel like a living part of the Nexus cosmos?'
    ],
    blockTrigger: 'Anachronistic, comical, or immersion-breaking card names in core tournament sets.'
  },
  {
    id: 'nua-08',
    code: 'NUA-08',
    name: 'Mechanical Elegance Specialist',
    mandate: 'Champions minimalism and rule parsimony. Challenges cards that use 3 complicated clauses when 1 elegant clause achieves the exact same gameplay.',
    perspective: 'Design Elegance & Parsimony',
    keyQuestions: [
      'Can this 30-word effect be rewritten in 10 words using canonical keywords?',
      'Is the mechanical complexity justified by the strategic depth gained?'
    ],
    blockTrigger: 'Unnecessary mechanical baroque bloat that adds zero real strategic decision-making.'
  }
];

export const NUANCE_LEVELS: NuanceLevelSpec[] = [
  { level: 'N0', name: 'Observation', impact: 'Noted for record; zero design impact.', canBlockLock: false, requiredAction: 'No action needed.', colorHex: '#78716c' },
  { level: 'N1', name: 'Minor Advisory', impact: 'Subtle polish recommendation (e.g. punctuation, slightly crisper flavor).', canBlockLock: false, requiredAction: 'Optional designer consideration.', colorHex: '#a8a29e' },
  { level: 'N2', name: 'Meaningful Nuance', impact: 'Minor tilt risk or slight cognitive friction; should be addressed.', canBlockLock: false, requiredAction: 'Specialist recommendation provided to director.', colorHex: '#f59e0b' },
  { level: 'N3', name: 'Major Risk', impact: 'Severe tilt, notable design space constraint, or frequent player confusion.', canBlockLock: false, requiredAction: 'Director-level review mandatory before approval.', colorHex: '#f97316' },
  { level: 'N4', name: 'Critical Finding', impact: 'High tilt lockout, severe linguistic ambiguity, or fatal design trap.', canBlockLock: true, requiredAction: 'BLOCKS LOCKED STATUS. Must be rewritten.', colorHex: '#ef4444' },
  { level: 'N5', name: 'Systemic Nuance', impact: 'Fundamental defect affecting multiple sets, domains, or player retention.', canBlockLock: true, requiredAction: 'HARD BLOCK. Mandatory escalation to Project Owner.', colorHex: '#dc2626' }
];

export const ESCALATION_LEVELS: EscalationLevelSpec[] = [
  { level: 'E0', name: 'Autonomous Specialist Resolution', authority: 'Single Specialist / Author', resolutionMechanism: 'Resolved directly during draft phase without escalation.', examples: 'Minor typos, standard keyword substitutions.' },
  { level: 'E1', name: 'Peer Comparison', authority: 'CMD-01 TCG Director', resolutionMechanism: 'Director evaluates evidence from two disagreeing specialists.', examples: 'Card Designer vs Balance Lead on +1 Attack.' },
  { level: 'E2', name: 'Discipline Trade-off', authority: 'CMD-01 + Domain Director', resolutionMechanism: 'Cross-functional resolution between balance and flavor.', examples: 'High-power card vs domain identity constraints.' },
  { level: 'E3', name: 'Multi-System Collision', authority: 'Full Nuance Council (NUA-01..08)', resolutionMechanism: 'Specialist plenum convenes to resolve cross-system friction.', examples: 'New game-wide keyword impacting all 5 domains.' },
  { level: 'E4', name: 'Foundational Identity Decision', authority: 'Project Owner (Human)', resolutionMechanism: 'Submitted with complete trade-off dossier to Project Owner.', examples: 'Adding or removing a core domain, changing HP total.' },
  { level: 'E5', name: 'Supreme Creative Philosophy', authority: 'Project Owner (Human Sole Authority)', resolutionMechanism: 'Supreme creative judgment by human creator.', examples: 'Core tone shift, commercial monetization boundaries.' }
];

export const AUDIT_DOSSIERS: NuanceAuditReport[] = [
  {
    id: 'AUD-101',
    cardName: 'Mind-Shatter Gaze (Abyssal Spell)',
    mechanicProposal: '2 Essence Fast Spell: Target opponent discards 2 cards at random from hand.',
    specialistEvaluations: [
      { specialistCode: 'NUA-03', specialistName: 'Tilt & Frustration', score: 'N4', finding: 'Random discard on Turn 2 causes extreme negative player tilt (8.9/10). Player loses tactical agency before playing their first real unit.', recommendation: 'Change to: "Opponent reveals hand and chooses 1 card to discard" or "Discards highest cost non-unit card".' },
      { specialistCode: 'NUA-04', specialistName: 'Future Design Space', score: 'N3', finding: 'Cheap generic discard suppresses all high-cost synergy combos in future expansions.', recommendation: 'Attach a conditional prerequisite (e.g. requires 3+ cards in Graveyard).' },
      { specialistCode: 'NUA-08', specialistName: 'Mechanical Elegance', score: 'N2', finding: 'Targeting phrasing is slightly clunky for physical paper play.', recommendation: 'Simplify to standard reveal phrasing.' }
    ],
    aggregateSeverity: 'N4_CRITICAL',
    escalationLevelRequired: 'E2',
    decision: 'BLOCKED_N4_TILT'
  },
  {
    id: 'AUD-102',
    cardName: 'Sunblade Vanguard (Radiant Unit)',
    mechanicProposal: '3 Essence 3/4 Unit: Whenever an allied unit enters this lane, gain +1/+1 until end of turn.',
    specialistEvaluations: [
      { specialistCode: 'NUA-01', specialistName: 'Contextual Intent', score: 'N1', finding: 'Perfect alignment with Radiant lane fortification and formation synergy.', recommendation: 'Retain core trigger structure.' },
      { specialistCode: 'NUA-02', specialistName: 'Linguistic Ambiguity', score: 'N0', finding: 'Syntax follows canonical Rule 400.1 phrasing perfectly.', recommendation: 'No changes required.' },
      { specialistCode: 'NUA-05', specialistName: 'Tactile Digital Feel', score: 'N1', finding: 'Clean visual aura glow on ally entry provides crisp kinetic feedback.', recommendation: 'Ensure VFX animates in under 200ms.' }
    ],
    aggregateSeverity: 'N1_MINOR',
    escalationLevelRequired: 'E0',
    decision: 'APPROVED_WITH_MODS'
  }
];

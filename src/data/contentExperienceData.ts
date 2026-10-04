// Stage E: Content & Experience Architecture (GLO-07..09 & GLO-16..23)
// Authoritative Data & Specifications

export interface ContentAgentProfile {
  id: string;
  code: string;
  name: string;
  category: 'Content Trio' | 'Production & Experience';
  mandate: string;
  deliverables: string[];
  standards: string[];
}

export interface CanonicalKeyword {
  keyword: string;
  category: 'Evergreen' | 'Domain Signature' | 'Triggered' | 'Activated';
  domain: 'Universal' | 'Radiant' | 'Verdant' | 'Abyssal' | 'Temporal' | 'Sanctum';
  rulesSyntax: string;
  mechanicalExplanation: string;
  canonicalClause: string;
  exampleCard: string;
}

export const CONTENT_EXPERIENCE_AGENTS: ContentAgentProfile[] = [
  {
    id: 'glo-07',
    code: 'GLO-07',
    name: 'Master Card Creator & Content Architect',
    category: 'Content Trio',
    mandate: 'Designs compelling, resonant individual cards following the 7-step Card Creation Protocol and GLO-02 grammar.',
    deliverables: ['Card Text Drafts', 'Mechanical Flavor Links', 'Rarity Allocations'],
    standards: ['Must adhere to GLO-10 stat budgets', 'Must pass NUA-02 linguistic parsing review']
  },
  {
    id: 'glo-08',
    code: 'GLO-08',
    name: 'Keyword Taxonomy & Design Architect',
    category: 'Content Trio',
    mandate: 'Governs keyword vocabulary, ensuring keyword parsimony, domain ownership, and mechanical modularity.',
    deliverables: ['Keyword Registry', 'Keyword Rules Clauses', 'Domain Keyword Quotas'],
    standards: ['Max 2 new keywords per major expansion', 'Zero overlapping duplicate synonyms']
  },
  {
    id: 'glo-09',
    code: 'GLO-09',
    name: 'Archetype Synergy & Cross-Card Architect',
    category: 'Content Trio',
    mandate: 'Architects coherent tribal, mechanical, and strategic deck packages so draft and constructed decks have clear identities.',
    deliverables: ['Archetype Pillars', 'Build-Around Engine Cards', 'Enabler-to-Payoff Ratio Models'],
    standards: ['Minimum 3 distinct strategic archetypes per domain', '7:3 enabler-to-payoff ratio']
  },
  {
    id: 'glo-16',
    code: 'GLO-16',
    name: 'Art Director & Visual Concept Lead',
    category: 'Production & Experience',
    mandate: 'Defines domain visual palettes, lighting hierarchies, character silhouettes, and card illustration composition guidelines.',
    deliverables: ['Art Brief Prompts', 'Domain Visual Styleguides', 'Card Frame Visual Composition'],
    standards: ['High-contrast silhouettes legible at 150px thumbnail', 'Strict domain palette compliance']
  },
  {
    id: 'glo-17',
    code: 'GLO-17',
    name: 'Lore Historian & Narrative Canon Architect',
    category: 'Production & Experience',
    mandate: 'Maintains canonical world history, named legends, faction motivations, and flavor text authenticity.',
    deliverables: ['World Timeline', 'Legend Bios', 'Flavor Text Canon'],
    standards: ['Zero uncertified historical lore inventions', 'Authentic domain linguistic naming']
  },
  {
    id: 'glo-18',
    code: 'GLO-18',
    name: 'Audio & Dynamic SFX Lead',
    category: 'Production & Experience',
    mandate: 'Composes dynamic acoustic landscapes, domain sound signatures, impact transients, and card voice lines.',
    deliverables: ['Audio Cues', 'Domain Ambience Profiles', 'Dynamic Card SFX Triggers'],
    standards: ['Attack impacts <= 180ms latency', 'Audio clarity under heavy multi-sound triggers']
  },
  {
    id: 'glo-19',
    code: 'GLO-19',
    name: 'Frame, Iconography & Typography Layout Architect',
    category: 'Production & Experience',
    mandate: 'Standardizes card frame geometry, stat badge positions, keyword glyphs, and high-legibility typography hierarchy.',
    deliverables: ['Card Layout Templates', 'Icon Glyph Specs', 'Typographic Hierarchy Guides'],
    standards: ['Minimum 8pt equivalent body typography', 'Instant optical distinction for costs and stats']
  },
  {
    id: 'glo-20',
    code: 'GLO-20',
    name: 'Digital UX, UI & Haptics Engineer',
    category: 'Production & Experience',
    mandate: 'Optimizes drag-and-drop targeting physics, board state readability, responsive touch boundaries, and kinetic UI feel.',
    deliverables: ['Interaction Flow Specs', 'Animation Timing Curves', 'HUD State Layouts'],
    standards: ['Single-action resolution under 250ms', 'Clear target indicator snapping']
  },
  {
    id: 'glo-21',
    code: 'GLO-21',
    name: 'Pedagogy & New Player Onboarding Lead',
    category: 'Production & Experience',
    mandate: 'Designs tutorial flow, tooltip glossaries, interactive match hints, and progressive cognitive load gating.',
    deliverables: ['Tutorial Scenarios', 'Glossary Tooltip Engine', 'New Player Progression Path'],
    standards: ['Time to first tactical victory <= 4 minutes', 'Cognitive concept load max 2 per mission']
  },
  {
    id: 'glo-22',
    code: 'GLO-22',
    name: 'Physical Print & Production Quality Engineer',
    category: 'Production & Experience',
    mandate: 'Oversees 300+ DPI print bleed tolerances, foil finish masking, card stock rigidity, and tabletop packaging specs.',
    deliverables: ['Print Bleed Templates', 'Foil Mask Guidelines', 'Physical Packaging Specs'],
    standards: ['Standard 63x88mm cut margin with 3mm safety zone', 'Rich black color calibration']
  },
  {
    id: 'glo-23',
    code: 'GLO-23',
    name: 'Accessibility & Neurodiversity Auditor',
    category: 'Production & Experience',
    mandate: 'Enforces WCAG AA contrast standards, colorblind-safe domain symbology, screen-reader text, and photo-sensitive VFX caps.',
    deliverables: ['Accessibility Audit Reports', 'Colorblind Filter Passports', 'Reduced-Motion Modes'],
    standards: ['4.5:1 text-to-background contrast ratio', 'Zero gameplay reliance on color alone (every domain has unique icon geometry)']
  }
];

export const CANONICAL_KEYWORDS: CanonicalKeyword[] = [
  {
    keyword: 'Guard',
    category: 'Evergreen',
    domain: 'Universal',
    rulesSyntax: 'Guard',
    mechanicalExplanation: 'Enemies in this lane must attack this unit before attacking unfortified units or breaching the lane.',
    canonicalClause: 'Rule 302.1: While a unit with Guard is in a lane, opposing attackers in the same lane must assign combat damage to the Guard unit first.',
    exampleCard: 'Sunlit Initiate (Radiant Unit)'
  },
  {
    keyword: 'Phase Shift',
    category: 'Domain Signature',
    domain: 'Temporal',
    rulesSyntax: 'Phase Shift [X]',
    mechanicalExplanation: 'Remove this unit from the battlefield until the end of turn X. It returns to the exact same lane with all buffs intact.',
    canonicalClause: 'Rule 305.4: A phase-shifted unit exists in the Temporal Expanse. It cannot be targeted, dealt damage, or affected by global board wipes.',
    exampleCard: 'Chrono Warden (Temporal Unit)'
  },
  {
    keyword: 'Soulbound',
    category: 'Domain Signature',
    domain: 'Abyssal',
    rulesSyntax: 'Soulbound (Target)',
    mechanicalExplanation: 'When this unit dies, trigger its Soulbound ability or revive a linked target from the Graveyard to hand.',
    canonicalClause: 'Rule 308.2: Soulbound triggers immediately upon the transition from the Battlefield to the Graveyard during SBA check.',
    exampleCard: 'Abyssal Reaver (Abyssal Unit)'
  },
  {
    keyword: 'Spore Swarm',
    category: 'Domain Signature',
    domain: 'Verdant',
    rulesSyntax: 'Spore Swarm [N]',
    mechanicalExplanation: 'When this unit attacks or dies, summon N 1/1 Sporeling tokens into this lane or adjacent lanes.',
    canonicalClause: 'Rule 312.1: If the destination lane is full (2 units max), excess Sporelings overflow into the adjacent center lane.',
    exampleCard: 'Sporeling Broodmother (Verdant Unit)'
  },
  {
    keyword: 'Divine Ward',
    category: 'Domain Signature',
    domain: 'Sanctum',
    rulesSyntax: 'Divine Ward [X]',
    mechanicalExplanation: 'Prevents the next X instances of spell or ability damage dealt to this unit or hero.',
    canonicalClause: 'Rule 316.3: Divine Ward absorbs the entire damage packet before standard defense reduction occurs.',
    exampleCard: 'Sanctum Arbiter (Sanctum Unit)'
  },
  {
    keyword: 'Echo',
    category: 'Triggered',
    domain: 'Temporal',
    rulesSyntax: 'Echo [Cost]',
    mechanicalExplanation: 'When cast, create a temporary copy in hand that can be cast this turn for [Cost] before dissipating.',
    canonicalClause: 'Rule 320.1: Echo copies are treated as distinct spell objects on the Priority Stack.',
    exampleCard: 'Echo Weaver (Temporal Unit)'
  },
  {
    keyword: 'Radiance',
    category: 'Domain Signature',
    domain: 'Radiant',
    rulesSyntax: 'Radiance [X]',
    mechanicalExplanation: 'While you control 2 or more units in this lane, this unit gains +X Attack and heals the Nexus 1 HP each turn.',
    canonicalClause: 'Rule 325.2: Radiance active status is checked continuously via State-Based Actions (Layer 6 modifier).',
    exampleCard: 'Solar Aegis Titan (Radiant Unit)'
  }
];
